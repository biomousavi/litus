import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type TodoDocument = HydratedDocument<Todo>;

@Schema({ collection: "todos", timestamps: false, versionKey: false })
export class Todo {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  estimated_time: number;

  // soft deletion
  @Prop({ required: false })
  deletion_time?: Date;

  @Prop({ required: true })
  creation_time: Date;
}

export const TodoSchema = SchemaFactory.createForClass(Todo);
