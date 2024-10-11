import { IsNotEmpty, IsString, IsMongoId } from "class-validator";

export class DeleteTodoDto {
  @IsString()
  @IsMongoId()
  @IsNotEmpty()
  _id: string;
}
