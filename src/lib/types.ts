import { Prisma } from "@prisma/client";

export const userDataSElect = {
  id: true,
  username: true,
  displayName: true,
  avatarUrl: true,
} satisfies Prisma.UserSelect;

export const postDataIncludes = {
  user: {
    select:userDataSElect,
  },
} satisfies Prisma.PostInclude;

export type PostData = Prisma.PostGetPayload<{
  include: typeof postDataIncludes;
}>;

export interface PostsPage{
  posts: PostData[];
  nextCursor: string | null;
}