import mongoose, { mongo } from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "User must have a name"],
      trim: true,
      maxLength: [40, "A user name must have less or equal than 40 characters"],
      minLength: [5, "A user name must have more or equal than 5 characters"],
    },
    email: {
      type: String,
      required: [true, "User must have a email"],
      unique: true,
    },
    phoneNumber: {
      type: String,
      required: [true, "User must have a phone number"],
      unique: true,
    },
    address: [String],
    // TODO: xem lai img cho nay, co nen de hay xoa
    photo: { type: String, default: "default.jpg" },
    username: {
      type: String,
      required: true,
      minLength: [6, "A user name must have more or equal than 6 characters"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "User must have a password"],
      minLength: [
        6,
        "A user password must have more or equal than 6 characters",
      ],
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    active: {
      type: Boolean,
      default: true,
      select: false,
    },
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);
