import { z } from 'zod';

export const CreatePackageDto = z.object({
  name: z.string(),
  level: z.number().int().positive(),
  investment: z.number().int().positive(),
  numberOfTaskPerDay: z.number().int().positive(),
  priceEarnedPerTaskDone: z.number().int().positive(),
  priceEarnedForAllTaskDonePerDay: z.number().int().positive(),
  priceEarnedForAllTaskDonePerMonth: z.number().int().positive(),
  priceEarnedForAllTaskDonePerYear: z.number().int().positive(),
  description: z.string().optional(),
  listOfTasks: z.array(z.string()).optional(),
});
