import mongoose from "mongoose";

export interface Product extends mongoose.Document {
  photos: Array<string>; // string[]
  price: number;
  discount: number;
  rating: number;
  user: mongoose.Schema.Types.ObjectId;
  business: mongoose.Schema.Types.ObjectId;
}

const ProductSchema: mongoose.Schema<Product> = new mongoose.Schema(
  {
    photos: {
      type: [String],
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    discount: {
      type: Number,
      default: 0,
    },
    rating: {
      type: Number,
      default: 0,
      min: 0,
      max: 5,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    business: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Business",
      required: true,
    },
  },
  { timestamps: true }
);

const ProductModel =
  (mongoose.models.Product as mongoose.Model<Product>) ||
  mongoose.model<Product>("Product", ProductSchema);

export default ProductModel;
