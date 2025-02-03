import mongoose, { Document, Schema } from "mongoose";

export interface IRoom extends Document {
  users: string[];
  createdAt: Date;
  updatedAt: Date;
}

const RoomSchema: Schema = new Schema(
  {
    users: [{ type: String, required: true }],
  },
  { timestamps: true }
);

export const Room = mongoose.model<IRoom>("Room", RoomSchema);
