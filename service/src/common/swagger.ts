import { DocumentBuilder } from "@nestjs/swagger";

const swaggerConfig = new DocumentBuilder()
  .setTitle("Smart Test AI Swagger")
  .setDescription("Smart Test AI project APIs")
  .addBearerAuth()
  .build();

export { swaggerConfig };
