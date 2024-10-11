import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model, Types } from "mongoose";
import { CreateTodoDto } from "./dto/create-todo.dto";
import { Todo } from "./todo.schema";

@Injectable()
export class TodoService {
  constructor(@InjectModel(Todo.name) private todoModel: Model<Todo>) {}

  /**
   * Creates a new todo item.
   *
   * @returns A promise that resolves to the created todo
   *
   * @throws {MongooseError}
   * Throws if there's an error saving to the database
   */
  async create({ estimated_time, title }: CreateTodoDto): Promise<Todo> {
    return await this.todoModel.create({
      title,
      estimated_time,
      creation_time: new Date(),
    });
  }

  /**
   * Retrieves all non-deleted todos.
   *
   * @returns A promise that resolves to an array of todos
   *
   * @remarks
   * This method uses `.lean()` for better performance as it returns plain JavaScript objects
   * instead of Mongoose documents.
   *
   * @throws {MongooseError}
   * Throws if there's an error querying the database
   */
  findAll(): Promise<Todo[]> {
    return this.todoModel
      .find({ deletion_time: { $exists: false } })
      .lean()
      .exec();
  }

  /**
   * Soft deletes a todo by setting its deletion_time.
   *
   * @param _id - The ObjectId of the todo to delete
   *
   * @throws {NotFoundException}
   * Throws if the todo with the given ID doesn't exist or is already deleted
   *
   * @throws {MongooseError}
   * Throws if there's an error updating the database
   * ```
   */
  async remove(_id: Types.ObjectId): Promise<void> {
    const result = await this.todoModel.findOneAndUpdate(
      { _id, deletion_time: { $exists: false } },
      { $set: { deletion_time: new Date() } },
    );

    if (!result) {
      throw new NotFoundException(`Todo with id ${_id} not found`);
    }
  }
}
