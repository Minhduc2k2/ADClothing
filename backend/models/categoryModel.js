import mongoose from "mongoose";

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    quantity: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

//export const nameCategory =  mongoose.model('categoryname', categorySchema.category);
export default mongoose.model("Category", categorySchema);
