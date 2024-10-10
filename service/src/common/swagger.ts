import { DocumentBuilder } from "@nestjs/swagger";

const swaggerConfig = new DocumentBuilder()
  .setTitle("Litus AI Swagger")
  .setDescription("Litus AI project APIs")
  .addBearerAuth()
  .build();

export { swaggerConfig };
