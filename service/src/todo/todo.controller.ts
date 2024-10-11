import { Controller, Get, Post, Body, Patch, Param, Delete, HttpStatus, HttpCode } from "@nestjs/common";
import { TodoService } from "./todo.service";
import { CreateTodoDto } from "./dto/create-todo.dto";
import { DeleteTodoDto } from "./dto/delete-todo.dto";

@Controller("/todo")
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Post("/")
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createTodoDto: CreateTodoDto) {
    return this.todoService.create(createTodoDto);
  }

  @Get("/")
  findAll() {
    return this.todoService.findAll();
  }

  @Patch(":id")
  update(@Param("id") id: string, @Body() updateTodoDto: DeleteTodoDto) {
    return this.todoService.update(+id, updateTodoDto);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.todoService.remove(+id);
  }
}
