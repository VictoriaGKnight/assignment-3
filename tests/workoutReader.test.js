// Test your workoutReader.js module here
const { workoutCalculator } = require('../workoutReader');

    test('reads a valid CSV file and counts workouts', async () => {
        const result = await workoutCalculator('./data/workouts.csv');

        expect(result).not.toBeNull();
        expect(result.totalWorkouts).toBe(10);
    });

    test('calculates the total workout minutes correctly', async () => {
        const result = await workoutCalculator('./data/workouts.csv');

        expect(result.totalMinutes).toBe(330);
    });

    test('returns the expected data structure', async () => {
        const result = await workoutCalculator('./data/workouts.csv');

        expect(result).toHaveProperty('totalWorkouts');
        expect(result).toHaveProperty('totalMinutes');
        expect(typeof result.totalWorkouts).toBe('number');
        expect(typeof result.totalMinutes).toBe('number');
    });

    test('handles a missing CSV file', async () => {
        const result = await workoutCalculator('./data/missing-workouts.csv');

        expect(result).toBeNull();
    });