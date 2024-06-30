import { Schema, model } from "mongoose";

const blogSchema = new Schema(
  {
    publishDate: {
      type: Date,
      default: Date.now,
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: "Admin",
    },
    image: {
      type: String,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Blog = model("Blog", blogSchema);
