require('dotenv').config();
console.log(process.env.USER_NAME); // "Victoria"
console.log(process.env.WEEKLY_GOAL); // "150"

const { healthMetricsCounter } = require('./healthReader');
const { workoutCalculator } = require('./workoutReader');

async function processFiles() {
    try {
        const userName = process.env.USER_NAME;
        const weeklyGoal = Number(process.env.WEEKLY_GOAL);

        console.log("Processing data for:", userName);

        console.log("\n Reading workout data...");
        const workoutData = await workoutCalculator('./data/workouts.csv');

        console.log("\n Reading health data...");
        const healthData = await healthMetricsCounter('./data/health-metrics.json');

        if (workoutData === null || healthData === null) {
            console.log("Unable to process all fitness data.");
            return;
        }

        console.log("\n=== SUMMARY ===");
        console.log("Workouts found:", workoutData.totalWorkouts);
        console.log("Total workout minutes:", workoutData.totalMinutes);
        console.log("Health entries found:", healthData.totalEntries);
        console.log("Weekly goal:", weeklyGoal, "minutes");

        if (workoutData.totalMinutes >= weeklyGoal) {
            console.log(` Congratulations ${userName}! You have met your weekly goal!`);
        } else {
            console.log(`Keep going, ${userName}! You need ${weeklyGoal - workoutData.totalMinutes} more minutes to reach your weekly goal.`);
        }

    } catch (error) {
        console.log("Error processing fitness data:", error.message);
    }
}

processFiles();