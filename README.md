# vertical-rate-calculator

A TypeScript utility to calculate aircraft climb and descent parameters.

## Features

- Calculate required vertical rate (feet per minute) for both climb and descent
- Calculate distance at which to begin descent using the 3:1 rule
- Input validation using Zod
- TypeScript type definitions

## Installation

```bash
npm install vertical-rate-calculator
```

## Usage

### Calculate Generic Vertical Rate

Calculate the vertical speed (feet per minute) needed to change altitude over a specified distance:

```typescript
import { calculateVerticalRate } from 'vertical-rate-calculator';

// For descent - returns negative value
const descentVerticalRate = calculateVerticalRate({
  currentAltitude: 10000, // feet
  targetAltitude: 2000, // feet
  groundSpeed: 180, // knots
  distance: 30, // nautical miles
});
console.log(`Vertical rate: ${descentVerticalRate} feet per minute`); // -800 feet per minute

// For climb - returns positive value
const climbVerticalRate = calculateVerticalRate({
  currentAltitude: 2000, // feet
  targetAltitude: 10000, // feet
  groundSpeed: 150, // knots
  distance: 25, // nautical miles
});
console.log(`Vertical rate: ${climbVerticalRate} feet per minute`); // 800 feet per minute
```

### Calculate Descent Point Using 3:1 Rule

The 3:1 rule is a common aviation rule of thumb: for every 1,000 feet of altitude to lose, you need 3 nautical miles of distance.

```typescript
import { calculateDescentPointUsing3To1Rule } from 'aircraft-vertical-rate-calculator';

const descentPoint = calculateDescentPointUsing3To1Rule({
  currentAltitude: 10000, // feet
  targetAltitude: 2000, // feet
});

console.log(
  `Begin descent at: ${descentPoint} nautical miles from destination`,
); // 24 nautical miles
```

## Aviation Background

### Vertical Rate Calculation

The vertical rate (feet per minute) is calculated as:

- Altitude change ÷ Time to travel

Where time to travel is:

- Distance ÷ Ground speed (converted to minutes)

Positive values indicate climb, negative values indicate descent.

### The 3:1 Rule

The 3:1 rule is a quick way for pilots to estimate when to start descending:

- Take the altitude to lose (in thousands of feet)
- Multiply by 3 to get the distance needed (in nautical miles)

This assumes a comfortable 3° glidepath.

## Disclaimer

This software is provided as-is, without any warranties or guarantees of accuracy or fitness for a particular purpose. Use it at your own discretion and risk.

## License

This project is licensed under the MIT License.

## Author

Alberto Rico
