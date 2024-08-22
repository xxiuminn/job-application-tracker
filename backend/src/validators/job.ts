import { z } from "zod";

const CreateJobSchema = z.object({
  title: z
    .string({
      required_error: "title is required",
      invalid_type_error: "title must be a string",
    })
    .min(1, { message: "title cannot be empty" }),
  description: z.string().optional(),
  company: z.string().min(1, { message: "company cannot be empty" }),
  url: z.string().optional(),
  salary: z.string().optional(),
  location: z.string().optional(),
  attachment: z.string().array().optional(),
  list_id: z
    .number({
      required_error: "user id is required",
      invalid_type_error: "user id must be a string",
    })
    .nonnegative()
    .min(1, { message: "list id field cannot be empty" }),
});

const DelJobSchema = z.object({
  id: z
    .number({
      required_error: "id is required",
      invalid_type_error: "id must be number",
    })
    .min(1, { message: "id field cannot be empty" }),
});

const PatchJobSchema = z.object({
  id: z
    .number({
      required_error: "job id is required",
      invalid_type_error: "job id must be a number",
    })
    .nonnegative()
    .min(1, { message: "job id field cannot be empty" }),
  title: z
    .string({
      required_error: "title is required",
      invalid_type_error: "title must be a string",
    })
    .optional(),
  company: z.string().optional(),
  description: z.string().optional(),
  url: z.string().url().optional(),
  salary: z.string().optional(),
  location: z.string().optional(),
  attachment: z.string().array().optional(),
  list_id: z
    .number({
      required_error: "user id is required",
      invalid_type_error: "user id must be a string",
    })
    .nonnegative()
    .optional(),
});

export { CreateJobSchema, DelJobSchema, PatchJobSchema };
