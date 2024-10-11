import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { CreateTodoDto } from "./dto/create-todo.dto";
import { UpdateTodoDto } from "./dto/update-todo.dto";
import { InjectModel } from "@nestjs/mongoose";
import { Todo } from "./todo.schema";
import { Model } from "mongoose";

@Injectable()
export class TodoService {
  constructor(@InjectModel(Todo.name) private todoModel: Model<Todo>) {}

  async create({ estimated_time, title }: CreateTodoDto): Promise<Todo> {
    // catching unexpected error and throwing an expected error
    try {
      // create new Todo
      const createdTodo = new this.todoModel({
        title,
        estimated_time,
        creation_time: new Date(),
      });
      return createdTodo.save();
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  findAll() {
    return `This action returns all todo`;
  }

  findOne(id: number) {
    return `This action returns a #${id} todo`;
  }

  update(id: number, updateTodoDto: UpdateTodoDto) {
    return `This action updates a #${id} todo`;
  }

  remove(id: number) {
    return `This action removes a #${id} todo`;
  }
}
