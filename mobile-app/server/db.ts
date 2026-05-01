import type { IUser } from "./models/User";
import { UserModel } from "./models/User";
import { ENV } from "./_core/env";

export type InsertUser = Partial<Omit<IUser, "createdAt" | "updatedAt">> & { openId: string };

export async function upsertUser(user: InsertUser): Promise<void> {
  if (!user.openId) throw new Error("User openId is required for upsert");

  const updateSet: Partial<IUser> = {};
  const textFields: Array<keyof Pick<IUser, "name" | "email" | "loginMethod">> = [
    "name",
    "email",
    "loginMethod",
  ];

  for (const field of textFields) {
    if (user[field] !== undefined) {
      updateSet[field] = user[field] ?? null;
    }
  }

  updateSet.lastSignedIn = user.lastSignedIn ?? new Date();
  updateSet.role = user.role ?? (user.openId === ENV.ownerOpenId ? "admin" : "user");

  await UserModel.updateOne({ openId: user.openId }, { $set: updateSet }, { upsert: true });
}

export async function getUserByOpenId(openId: string) {
  return UserModel.findOne({ openId }).lean<IUser | null>();
}
