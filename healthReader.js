const fs = require('fs/promises');

async function healthMetricsCounter(filepath) {
    try {
        const data = await fs.readFile(filepath, 'utf8');

        const healthData = JSON.parse(data);

        const totalEntries = healthData.metrics.length;

        console.log("Total health entries:", totalEntries);

        return { totalEntries };

    } catch (error) {
        if (error.code === 'ENOENT') {
            console.log("Error: Health data file not found.");
        } else if (error instanceof SyntaxError) {
            console.log("Error: Invalid JSON format.");
        } else {
            console.log("Error reading health data:", error.message);
        }

        return null;
    }
}

module.exports = { healthMetricsCounter };