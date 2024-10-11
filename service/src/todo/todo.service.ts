import { Injectable, InternalServerErrorException, NotFoundException } from "@nestjs/common";
import { CreateTodoDto } from "./dto/create-todo.dto";
import { DeleteTodoDto } from "./dto/delete-todo.dto";
import { InjectModel } from "@nestjs/mongoose";
import { Todo } from "./todo.schema";
import { Model, Types } from "mongoose";

@Injectable()
export class TodoService {
  constructor(@InjectModel(Todo.name) private todoModel: Model<Todo>) {}

  async create({ estimated_time, title }: CreateTodoDto): Promise<Todo> {
    // create new Todo
    const createdTodo = new this.todoModel({
      title,
      estimated_time,
      creation_time: new Date(),
    });
    return createdTodo.save();
  }

  findAll(): Promise<Todo[]> {
    // getting all items except deleted items
    return this.todoModel
      .find({ deletion_time: { $exists: false } })
      .lean()
      .exec();
  }

  async remove(_id: Types.ObjectId): Promise<void> {
    // soft delete the todo
    const result = await this.todoModel.findOneAndUpdate(
      { _id, deletion_time: { $exists: false } },
      { $set: { deletion_time: new Date() } },
    );

    // throw error
    if (!result) {
      throw new NotFoundException(`Todo with id ${_id} not found`);
    }
  }
}
