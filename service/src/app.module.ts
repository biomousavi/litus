import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { TodoModule } from "./todo/todo.module";
import { MongooseModule } from "@nestjs/mongoose";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { EnvironmentVariables } from "./common/env.validation";

@Module({
  imports: [
    TodoModule,
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService<EnvironmentVariables>) => ({
        dbName: configService.get("MONGO_DATEBASE"),
        uri: `mongodb://${configService.get("MONGO_HOST")}:${configService.get("MONGO_PORT")}`,
        auth: {
          username: configService.get("MONGO_USERNAME"),
          password: configService.get("MONGO_PASSWORD"),
        },
      }),
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
