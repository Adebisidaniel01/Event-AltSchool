import cron from "node-cron";

export const scheduleReminder = (date: Date, callback: () => void) => {
  const cronTime = `${date.getMinutes()} ${date.getHours()} ${date.getDate()} ${
    date.getMonth() + 1
  } *`;

  cron.schedule(cronTime, callback);
};
