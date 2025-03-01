import {
  type ThreeToOneRuleInput,
  ThreeToOneRuleSchema,
  type VerticalRateInput,
  VerticalRateInputSchema,
} from './schemas';

/**
 * Calculates the required rate of climb or descent for an aircraft based on current parameters
 *
 * This function computes the vertical speed (in feet per minute) needed to climb or descend
 * from the current altitude to the target altitude over a specified distance,
 * while maintaining the given ground speed.
 *
 * @param {object} params - Object containing all required vertical rate parameters
 * @param {number} params.currentAltitude - Current altitude in feet (MSL)
 * @param {number} params.targetAltitude - Target altitude in feet (MSL) to reach at the end of the climb/descent
 * @param {number} params.groundSpeed - Aircraft ground speed in knots
 * @param {number} params.distance - Distance over which to accomplish the altitude change in nautical miles
 * @returns {number} Vertical rate in feet per minute (FPM), rounded to the nearest whole number.
 *
 * @throws {ZodError} If any of the parameters fail validation
 */
function calculateVerticalRate(params: VerticalRateInput): number {
  const validatedInput = VerticalRateInputSchema.parse(params);

  const altitudeChange =
    validatedInput.targetAltitude - validatedInput.currentAltitude;

  const timeToTravelMinutes =
    (validatedInput.distance / validatedInput.groundSpeed) * 60;

  const verticalRate = altitudeChange / timeToTravelMinutes;

  return Math.round(verticalRate);
}

/**
 * Calculates the distance at which to begin descent based on the 3:1 rule commonly used in aviation
 *
 * The 3:1 rule states: For every 1,000 feet of altitude to lose, you need 3 nautical miles of distance
 *
 * @param {object} params - Object containing current and target altitudes
 * @param {number} params.currentAltitude - Current altitude in feet (MSL)
 * @param {number} params.targetAltitude - Target altitude in feet (MSL)
 * @returns {number} Distance in nautical miles at which to begin descent
 *
 * @throws {ZodError} If any of the parameters fail validation
 * @throws {Error} If current altitude is not greater than target altitude
 */
function calculateDescentPointUsing3To1Rule(
  params: ThreeToOneRuleInput,
): number {
  const validatedInput = ThreeToOneRuleSchema.parse(params);

  if (validatedInput.currentAltitude <= validatedInput.targetAltitude) {
    throw new Error(
      'For descent calculations, current altitude must be greater than target altitude',
    );
  }

  const altitudeLossInThousands =
    (validatedInput.currentAltitude - validatedInput.targetAltitude) / 1000;

  return altitudeLossInThousands * 3;
}

export {
  calculateVerticalRate,
  calculateDescentPointUsing3To1Rule,
  VerticalRateInputSchema,
  ThreeToOneRuleSchema,
  type VerticalRateInput,
  type ThreeToOneRuleInput,
};
