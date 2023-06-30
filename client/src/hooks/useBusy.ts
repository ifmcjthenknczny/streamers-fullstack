import { useState } from "react";

const useBusy = (
  initialState = false
): [boolean, <T extends (...args: any[]) => any>(f: T) => T] => {
  const [isBusy, setBusy] = useState(initialState);

  const busyWrapper = <T extends (...args: any[]) => any>(f: T): T =>
    (async (...args) => {
      setBusy(true);
      try {
        return await f(...args);
      } finally {
        setBusy(false);
      }
    }) as T;

  return [isBusy, busyWrapper];
};

export default useBusy;
