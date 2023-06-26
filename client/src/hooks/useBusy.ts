import { useState } from 'react';

const useBusy = (initialState = false): [boolean, (callback: () => void) => void] => {
  const [isBusy, setIsBusy] = useState(initialState);

  const busyWrapper = (callback: () => void): void => {
    setIsBusy(true);
    callback();
    setIsBusy(false);
  };

  return [isBusy, busyWrapper];
};

export default useBusy;