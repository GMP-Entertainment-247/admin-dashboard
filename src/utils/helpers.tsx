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
    return `${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
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
}