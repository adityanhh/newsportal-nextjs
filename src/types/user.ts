import { User } from "@prisma/client";

export interface ExtendedUser extends User {
  profileImage?: string | null;
}
