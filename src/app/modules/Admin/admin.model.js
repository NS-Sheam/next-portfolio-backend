import { Schema, model } from "mongoose";
import { personalInfoSchema } from "../PersonalInfo/PersonalInfo.model.js";

const adminSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    contactNo: String,
    isActive: {
      type: Boolean,
      default: true,
    },
    personalInfo: {
      type: personalInfoSchema,
    },
  },
  {
    timestamps: true,
  }
);

export const Admin = model("Admin", adminSchema);
