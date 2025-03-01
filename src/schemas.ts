import { z } from 'zod';

export const VerticalRateInputSchema = z
  .object({
    currentAltitude: z
      .number()
      .nonnegative('Current altitude must be non-negative'),
    targetAltitude: z
      .number()
      .nonnegative('Target altitude must be non-negative'),
    groundSpeed: z.number().positive('Ground speed must be positive'),
    distance: z.number().positive('Distance must be positive'),
  })
  .refine((data) => data.currentAltitude !== data.targetAltitude, {
    message: 'Current altitude must be different from target altitude',
    path: ['targetAltitude'],
  });

export const ThreeToOneRuleSchema = z
  .object({
    currentAltitude: z
      .number()
      .nonnegative('Current altitude must be non-negative'),
    targetAltitude: z
      .number()
      .nonnegative('Target altitude must be non-negative'),
  })
  .refine((data) => data.currentAltitude !== data.targetAltitude, {
    message: 'Current altitude must be different from target altitude',
    path: ['targetAltitude'],
  });

export type VerticalRateInput = z.infer<typeof VerticalRateInputSchema>;
export type ThreeToOneRuleInput = z.infer<typeof ThreeToOneRuleSchema>;
