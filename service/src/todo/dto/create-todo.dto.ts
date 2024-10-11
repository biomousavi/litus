import { IsNotEmpty, IsNumber, IsString, Min } from "class-validator";
export class CreateTodoDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsNumber()
  @Min(0)
  estimated_time: number;
}
