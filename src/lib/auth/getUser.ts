import { cookies } from "next/headers";
import jwt, { JwtPayload } from "jsonwebtoken";

export type AuthUser = JwtPayload & {
  id?: string;
  email?: string;
  role?: "STUDENT" | "TUTOR" | "ADMIN";
};

export const getUser = async (): Promise<AuthUser | null> => {
  const token = (await cookies()).get("token")?.value;

  if (!token) return null;

  const secret = process.env.JWT_SECRET;

  try {
    if (secret) {
      return jwt.verify(token, secret) as AuthUser;
    }
    const decoded = jwt.decode(token);
    if (!decoded || typeof decoded === "string") return null;
    const user = decoded as AuthUser;
    if (typeof user.exp === "number" && user.exp * 1000 < Date.now()) {
      return null;
    }
    return user;
  } catch {
    return null;
  }
};