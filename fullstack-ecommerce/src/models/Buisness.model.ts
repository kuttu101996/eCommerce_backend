import mongoose from "mongoose";

export interface Business extends mongoose.Document {
  user: mongoose.Schema.Types.ObjectId;
  name: string;
  address: string;
  numberOfListedProducts: number;
  registrationNumber: string;
  documents: { [key: string]: string }; // key-value pairs of document names and URLs or file paths
  products: mongoose.Document[];
}

const BusinessSchema: mongoose.Schema<Business> = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    address: {
      type: String,
    },
    numberOfListedProducts: {
      type: Number,
      default: 0,
    },
    registrationNumber: {
      type: String,
      required: true,
    },
    documents: {
      type: Object,
      default: {},
    },
  },
  { timestamps: true }
);

// Virtual field to populate products associated with the business
BusinessSchema.virtual("products", {
  ref: "Product",
  localField: "_id",
  foreignField: "business",
  justOne: false,
});

// Ensure virtual fields are serialized
BusinessSchema.set("toObject", { virtuals: true });
BusinessSchema.set("toJSON", { virtuals: true });

const BusinessModel =
  (mongoose.models.Business as mongoose.Model<Business>) ||
  mongoose.model<Business>("Business", BusinessSchema);

export default BusinessModel;
