
const fs = require('fs/promises');
const { healthMetricsCounter } = require('../healthReader');

    test('reads a valid JSON file and counts health entries', async () => {
        const result = await healthMetricsCounter('./data/health-metrics.json');

        expect(result).not.toBeNull();
        expect(result.totalEntries).toBe(8);
    });

    test('returns the expected data structure', async () => {
        const result = await healthMetricsCounter('./data/health-metrics.json');

        expect(result).toHaveProperty('totalEntries');
        expect(typeof result.totalEntries).toBe('number');
    });

    test('handles a missing JSON file', async () => {
        const result = await healthMetricsCounter('./data/missing-health.json');

        expect(result).toBeNull();
    });

    test('handles invalid JSON data', async () => {
        const filepath = './data/invalid-health-test.json';

        try {
            await fs.writeFile(filepath, '{ invalid JSON }');

            const result = await healthMetricsCounter(filepath);

            expect(result).toBeNull();
        } finally {
            await fs.unlink(filepath);
        }
    });