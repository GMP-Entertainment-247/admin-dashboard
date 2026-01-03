import { FormikContextType } from "formik";

export const flatten = (
  obj: Record<string, any> | Array<Record<string, any>>,
  key = "",
  sep = "."
): Record<string, string> => {
  if (Array.isArray(obj)) {
    const ret = (obj as Record<string, any>).reduce(
      (prev: any, curr: any, index: number) => {
        const newKey = key ? key + sep + index : String(index);
        if (typeof curr === "object") {
          Object.assign(prev, flatten(curr, newKey, sep));
        } else {
          prev[newKey] = curr;
        }
        return prev;
      },
      {} as Record<string, any>
    );
    return ret;
  }

  if (typeof obj === "object") {
    return Object.keys(obj).reduce((prev, k) => {
      const newKey = key ? key + sep + k : k;
      if (typeof obj[k] === "object") {
        Object.assign(prev, flatten(obj[k], newKey, sep));
      } else {
        prev[newKey] = obj[k];
      }
      return prev;
    }, {} as Record<string, any>);
  }
  return obj;
};

export const formProps = <T,>(
  name: string,
  form: FormikContextType<T>,
  field: "input" | "select" | "date" | "phone" | "upload" = "input"
) => {
  const props = form.getFieldProps(name);

  return {
    ...props,
    context: true,
    onChange:
      field !== "input"
        ? (v: string | number | (string | number)[] | React.ChangeEvent<any>) =>
            form.setFieldValue(name, v)
        : props.onChange,
  };
};

export const startCountdown = (
  timeInSeconds: number,
  onTick: (val: string) => void,
  onComplete?: () => void
) => {
  let remainingSeconds = timeInSeconds;

  function formatTime(seconds: number) {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(minutes).padStart(2, "0")}:${String(secs).padStart(
      2,
      "0"
    )}`;
  }

  onTick(formatTime(remainingSeconds));

  const interval = setInterval(() => {
    remainingSeconds--;

    if (remainingSeconds >= 0) {
      onTick(formatTime(remainingSeconds));
    }

    if (remainingSeconds <= 0) {
      clearInterval(interval);
      if (onComplete) onComplete();
    }
  }, 1000);
};

export const formatNumber = (num: number, isCompact: boolean = false) => {
  if (isCompact) {
    const compactFormatter = new Intl.NumberFormat('en-US', {
      notation: 'compact',
      compactDisplay: 'short' // Uses 'K', 'M', 'B'
    });
    return compactFormatter.format(num)
  } else {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
};

export const imageProp = (
  url: string | undefined,
  defaultImg = "/images/no-image-found.jpeg"
) => {
  return {
    src: url ? url : defaultImg,
  };
};

export const formatTimeAgo = (dateString: string) => {
  const date = new Date(dateString);
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  if (diffInSeconds < 60) return `${diffInSeconds} secs ago`;
  if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} mins ago`;
  if (diffInSeconds < 86400)
    return `${Math.floor(diffInSeconds / 3600)} hrs ago`;
  return `${Math.floor(diffInSeconds / 86400)} days ago`;
};

export const combineDateTime = (date?: string, time?: string) => {
  if (!date || !time) return "";
  // Remove seconds if they exist (HH:mm:ss -> HH:mm)
  const normalizedTime = time.split(":").slice(0, 2).join(":");
  return `${date} ${normalizedTime}:00`;
};

export const splitDateTime = (value: string | null) => {
  if (!value) return { date: "", time: "" };
  const [date, time] = value.split(" ");
  if (!date || !time) return { date: date || "", time: "" };
  // Remove seconds if they exist (HH:mm:ss -> HH:mm)
  const normalizedTime = time.split(":").slice(0, 2).join(":");
  return { date: date || "", time: normalizedTime || "" };
};

/**
 * Formats time from 24-hour format (HH:mm or HH:mm:ss) to 12-hour format (h:mm am/pm)
 * @param time - Time string in 24-hour format (e.g., "11:03", "11:03:00", "23:05")
 * @returns Formatted time string (e.g., "11:03 am", "11:05 pm")
 */
export const formatTime12Hour = (time?: string | null) => {
  if (!time) return "";

  // Remove seconds if they exist
  const [hourStr, minute] = time.split(":").slice(0, 2);
  if (!hourStr || !minute) return time;

  const hour = Number(hourStr);
  if (isNaN(hour) || isNaN(Number(minute))) return time;

  const period = hour >= 12 ? "pm" : "am";
  const displayHour = hour % 12 || 12; // convert 0 → 12, 13-23 → 1-11

  return `${displayHour}:${minute} ${period}`;
};


export const formatDateTime = (value: string | null) => {
  if (!value) return "";
  const {date, time} = splitDateTime(value);
  return `${date} ${formatTime12Hour(time)}`;
};