import mongoose from "mongoose";

export interface User extends mongoose.Document {
  name: string;
  email: string;
  password: string;
  address: string;
  verifyCode: string;
  verifyCodeExpiry: Date;
  emailVerified: boolean;
  isAcceptingMessage: boolean;
  pic: string;
  mobile: number;
  mobileVerified: boolean;
  role: string;
}

const UserSchema: mongoose.Schema<User> = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      match: [
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}$/,
        "Please use a valid email address.",
      ],
    },
    password: { type: String },
    address: { type: String },
    verifyCode: { type: String },
    verifyCodeExpiry: { type: Date, default: Date.now() },
    emailVerified: { type: Boolean, default: false },
    pic: {
      type: String,
      default:
        "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg",
    },
    mobile: { type: Number },
    mobileVerified: { type: Boolean, default: false },
    role: {
      type: String,
      enum: [
        "user",
        "model",
        "admin",
        "super-admin",
        "seller",
        "seller-helper",
      ],
    },
  },
  { timestamps: true }
);

const UserModel =
  (mongoose.models.User as mongoose.Model<User>) ||
  mongoose.model<User>("User", UserSchema);

export default UserModel;
