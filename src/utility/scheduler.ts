import { scheduleJob } from 'node-schedule';

export const createJob = (cron: string, jobs: Function[]) => {
    return scheduleJob(cron, async function () {
        try {
            for (const job of jobs) {
                job();
            }
        } catch (error) {
            console.error(error);
            throw error;
        }
    });
};
