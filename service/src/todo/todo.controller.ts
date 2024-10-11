import { Controller, Get, Post, Body, Patch, Param, Delete, HttpStatus, HttpCode } from "@nestjs/common";
import { TodoService } from "./todo.service";
import { CreateTodoDto } from "./dto/create-todo.dto";
import { ParseObjectIdPipe } from "./pipe/parse-object-id.pipe";
import { Types } from "mongoose";

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

  @Delete(":id")
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param("id", ParseObjectIdPipe) id: Types.ObjectId) {
    return this.todoService.remove(id);
  }
}
