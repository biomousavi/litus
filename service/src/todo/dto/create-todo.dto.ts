import { IsNotEmpty, IsNumber, IsString } from "class-validator";
export class CreateTodoDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsNumber()
  estimated_time: number;
}
