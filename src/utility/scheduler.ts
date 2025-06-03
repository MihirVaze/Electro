import { scheduleJob } from 'node-schedule';

export const createJob = (cron: string, job: Function) => {
    return scheduleJob(cron, async function () {
        try {
            job();
        } catch (error) {
            console.error(error);
            throw error;
        }
    });
};
