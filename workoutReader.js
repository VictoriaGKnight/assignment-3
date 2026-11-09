const fs = require('fs');
const csv = require('csv-parser');

async function workoutCalculator(filepath) {
    try {
        const workouts = await new Promise((resolve, reject) => {
            const results = [];

            fs.createReadStream(filepath)
                .on('error', reject)
                .pipe(csv())
                .on('data', (row) => {
                    results.push(row);
                })
                .on('end', () => {
                    resolve(results);
                })
                .on('error', reject);
        });

        const totalWorkouts = workouts.length;

        let totalMinutes = 0;

        for (let i = 0; i < workouts.length; i++) {
            totalMinutes += parseFloat(workouts[i].duration);
        }

        console.log("Total workouts:", totalWorkouts);
        console.log("Total minutes:", totalMinutes);

        return { totalWorkouts, totalMinutes };

    } catch (error) {
        if (error.code === 'ENOENT') {
            console.log("Error: Workout CSV file not found.");
        } else {
            console.log("Error reading workout data:", error.message);
        }

        return null;
    }
}

module.exports = { workoutCalculator };
