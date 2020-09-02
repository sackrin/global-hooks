import { useState, useEffect, SetStateAction } from 'react';
import getMicroUIWindowName from "@sackrin/useglobalcommon/lib/getGlobalWindowName";
import getMicroUIWindowState from "@sackrin/useglobalcommon/lib/getGlobalWindowState";

type UseGlobalState = <S>(
  defaultState: S,
  path: string,
  prefix?: string,
) => [S, React.Dispatch<SetStateAction<S>>];

const useGlobalState: UseGlobalState = (defaultState, path, prefix = '') => {
  const [state, setState] = useState(defaultState);
  const windowName = getMicroUIWindowName('STATE', path, prefix);
  const windowStash =
    window[windowName] || getMicroUIWindowState(state, windowName);
  windowStash.subscribe((value: any) => {
    setState(value);
  });
  useEffect(() => {
    windowStash.next(state);
  }, [windowStash, state]);
  return [state, setState];
};

export default useGlobalState;
