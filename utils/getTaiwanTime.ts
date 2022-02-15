import { DateTime } from "luxon";

export const getTaiwanTime = () => {
  const dateTime = DateTime.now().setZone("Asia/Taipei");
  return {
    hour: dateTime.hour,
    minute: dateTime.minute,
  };
};
