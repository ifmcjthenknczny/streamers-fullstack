import { useState } from 'react';

type CallbackFunction = () => Promise<void>;

const useBusy = (initialState = false): [boolean, (callback: CallbackFunction) => Promise<void>] => {
  const [isBusy, setIsBusy] = useState(initialState);

  const busyWrapper = async (callback: CallbackFunction) => {
    setIsBusy(true);
    await callback();
    setIsBusy(false);
  };

  return [isBusy, busyWrapper];
};

export default useBusy;