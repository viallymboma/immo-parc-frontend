import { z } from 'zod';

export const UpdatePackageDto = z.object({
  name: z.string().optional(),
  level: z.number().int().positive().optional(),
  investment: z.number().int().positive().optional(),
  numberOfTaskPerDay: z.number().int().positive().optional(),
  priceEarnedPerTaskDone: z.number().int().positive().optional(),
  priceEarnedForAllTaskDonePerDay: z.number().int().positive().optional(),
  priceEarnedForAllTaskDonePerMonth: z.number().int().positive().optional(),
  priceEarnedForAllTaskDonePerYear: z.number().int().positive().optional(),
  description: z.string().optional(),
});
