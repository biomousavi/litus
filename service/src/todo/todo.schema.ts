import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema({ collection: "todos", timestamps: false, versionKey: false })
export class User {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  estimated_time: number;

  @Prop({ required: false })
  deletion_time?: Date;

  @Prop({ required: true })
  creation_time: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);
