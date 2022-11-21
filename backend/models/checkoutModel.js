import mongoose from "mongoose";

const checkoutSchema = new mongoose.Schema(
  {
    product: {
      type: mongoose.Schema.ObjectId,
      ref: "Product",
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: [true, "Checkout must be done by a user"],
    },
    deliveryAddress: {
      type: String,
      required: [true, "Checkout must has a deliveryAddress"],
    },
    //price of all items = quantity * price of a product
    quantity: {
      type: Number,
      default: 1
    },
    price: {
      type: Number,
      required: true
    },
    shipCost: {
      type: Number,
      default: 0,
    },
    // TODO: sua lai required total cost
    totalCost: {
      type: Number,
      //required: [true, "Checkout must has the totalCost"],
    },
    // TODO: có nên xóa status ?
    // status: {
    //   type: String,
    //   enum: ["Awaiting confirmation", "Delivering", "Received"],
    //   required: true,
    //   default: "Awaiting confirmation"
    // }
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// TODO: pre save có nên dùng không?
checkoutSchema.pre("save", function (next) {
  this.totalCost = this.price * this.quantity + this.shipCost;
  next();
});
export default mongoose.model("Checkout", checkoutSchema);

