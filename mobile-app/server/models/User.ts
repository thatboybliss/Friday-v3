import mongoose, { Schema, type HydratedDocument, type Model } from "mongoose";

export type UserRole = "user" | "admin";

export interface IUser {
  id?: number;
  openId: string;
  name?: string | null;
  email?: string | null;
  loginMethod?: string | null;
  role: UserRole;
  createdAt: Date;
  updatedAt: Date;
  lastSignedIn: Date;
}

const UserSchema = new Schema<IUser>(
  {
    openId: { type: String, required: true, unique: true, index: true },
    name: { type: String, default: null },
    email: { type: String, default: null },
    loginMethod: { type: String, default: null },
    role: { type: String, enum: ["user", "admin"], default: "user", required: true },
    lastSignedIn: { type: Date, default: Date.now, required: true },
  },
  { timestamps: true },
);

export type UserDocument = HydratedDocument<IUser>;
export const UserModel: Model<IUser> =
  (mongoose.models.User as Model<IUser>) || mongoose.model<IUser>("User", UserSchema);
