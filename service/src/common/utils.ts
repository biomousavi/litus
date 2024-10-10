import { BadRequestException } from "@nestjs/common";

export function trimEmptySpaces(value: string) {
  return value && typeof value === "string" ? value.trim() : value;
}

export function throwValidationError(message: Record<string, any>): never {
  throw new BadRequestException({
    message,
    statusCode: 400,
    error: "Bad Request",
  });
}
