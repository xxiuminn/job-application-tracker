import { z } from "zod";

const GetAllListSchema = z.object({
  user_id: z
    .string({
      required_error: "user id is required",
      invalid_type_error: "user id must be a string",
    })
    .min(1, { message: "user id field is required" }),
});

const CreateListSchema = z.object({
  title: z
    .string({
      required_error: "title is required",
      invalid_type_error: "title must be a string",
    })
    .min(1, { message: "title field is required" }),
  user_id: z
    .string({
      required_error: "user id is required",
      invalid_type_error: "user id must be a string",
    })
    .min(1, { message: "user id field is required" }),
});

const DelListSchema = z.object({
  id: z
    .number({
      required_error: "list id is required",
      invalid_type_error: "list id must be a string",
    })
    .min(1, { message: "list id field is required" }),
});

const PatchListSchema = z.object({
  id: z.number({
    required_error: "list id is required",
    invalid_type_error: "list id must be a string",
  }),
  title: z
    .string({
      required_error: "title is required",
      invalid_type_error: "title must be a string",
    })
    .optional(),
});

export { GetAllListSchema, CreateListSchema, DelListSchema, PatchListSchema };
