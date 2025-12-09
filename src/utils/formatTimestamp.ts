import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import duration from "dayjs/plugin/duration";

// Extend dayjs with plugins
dayjs.extend(relativeTime);
dayjs.extend(duration);

/**
 * Formats a timestamp according to the following rules:
 * - Less than 1 minute: "X sec ago" or "X secs ago"
 * - Less than 1 hour: "X min ago" or "X mins ago"
 * - Less than 1 day: "X hr ago" or "X hrs ago"
 * - Less than 7 days: "X day ago" or "X days ago"
 * - 7 days or more: "dd/mm/yyyy (X wk ago)" or "dd/mm/yyyy (X wks ago)"
 */
export const formatTimestamp = (timestamp: string | undefined): string => {
  if (!timestamp) return "";

  const now = dayjs();
  const time = dayjs(timestamp);
  const diffInSeconds = now.diff(time, "second");
  const diffInMinutes = now.diff(time, "minute");
  const diffInHours = now.diff(time, "hour");
  const diffInDays = now.diff(time, "day");
  const diffInWeeks = now.diff(time, "week");

  // Less than 1 minute
  if (diffInSeconds < 60) {
    return diffInSeconds === 1 ? "1 sec ago" : `${diffInSeconds} secs ago`;
  }

  // Less than 1 hour
  if (diffInMinutes < 60) {
    return diffInMinutes === 1 ? "1 min ago" : `${diffInMinutes} mins ago`;
  }

  // Less than 1 day
  if (diffInHours < 24) {
    return diffInHours === 1 ? "1 hr ago" : `${diffInHours} hrs ago`;
  }

  // Less than 7 days
  if (diffInDays < 7) {
    return diffInDays === 1 ? "1 day ago" : `${diffInDays} days ago`;
  }

  // 7 days or more
  const formattedDate = time.format("DD/MM/YYYY");
  const weeksAgo = diffInWeeks === 1 ? "1 wk ago" : `${diffInWeeks} wks ago`;
  return `${formattedDate} (${weeksAgo})`;
};
