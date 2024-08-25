"use server"

import { validateRequest } from "@/auth"
import prisma from "@/lib/prisma";
import { postDataIncludes } from "@/lib/types";
import { createPostSchema } from "@/lib/validation";

export async function submitPost (input: string) {
    const {user} = await validateRequest();

    if (!user) {
        throw new Error("Action non autorisée");
    }

    const {content} = createPostSchema.parse({content: input})

    const newPost = await prisma.post.create({
        data:{
            content,
            userId: user.id
        },
        include: postDataIncludes,
    })

    return newPost
}