import { plainToClass } from "class-transformer";
import { IsEnum, IsNotEmpty, IsNumber, IsString, validateSync } from "class-validator";

enum EnvironmenteEnum {
  Development = "development",
  Production = "production",
  Test = "test",
}

export class EnvironmentVariables {
  @IsNotEmpty()
  @IsEnum(EnvironmenteEnum)
  NODE_ENV: EnvironmenteEnum;

  @IsNotEmpty()
  @IsNumber()
  SERVICE_PORT: number;


  @IsNotEmpty()
  @IsString()
  MONGO_USERNAME: string;

  @IsNotEmpty()
  @IsString()
  MONGO_PASSWORD: string;

  @IsNotEmpty()
  @IsString()
  MONGO_HOST = "localhost";

  @IsNotEmpty()
  @IsString()
  MONGO_DATEBASE: string;

  @IsNotEmpty()
  @IsNumber()
  MONGO_PORT: number;
}

export function validateEnv(config: Record<string, unknown>) {
  const validatedConfig = plainToClass(EnvironmentVariables, config, {
    enableImplicitConversion: true,
  });

  const errors = validateSync(validatedConfig, {
    skipMissingProperties: false,
  });

  if (errors.length > 0) {
    throw new Error(errors.toString());
  }

  return validatedConfig;
}
