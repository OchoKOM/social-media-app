import { z } from "zod";

const requiredString = z.string().trim().min(1, "Champ obligatoire");

export const signupSchema = z.object({
  email: requiredString.email("Adresse email invalide"),
  username: requiredString.regex(
    /^[a-zA-Z0-9_-]+$/,
    "Nom d'utilisateur doit contenir uniquement des lettres, des chiffres, des tirets ou des tirets bas",
  ),
  password: z
    .string()
    .min(8, "Mot de passe doit contenir au moins 8 caractères"),
});

export type SignupValues = z.infer<typeof signupSchema>;

export const loginSchema = z.object({
  username: requiredString,
  password: requiredString,
});

export type LoginValues = z.infer<typeof loginSchema>;


export const createPostSchema = z.object({
  content: requiredString,
  mediaIds: z.array(z.string()).max(5,
    "Vous pouvez ajouter jusqu'à 5 médias",
  )
})

export const updateUserProfileSchema = z.object({
  displayName: requiredString,
  bio: z.string().max(1000, "La bio ne peut pas depasser 1000 caractères."),
})

export type UpdateUserProfileValues = z.infer<typeof updateUserProfileSchema>