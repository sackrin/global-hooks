import { useState } from 'react';
import getMicroUIWindowName from "@sackrin/useglobalcommon/lib/getGlobalWindowName";
import getMicroUIWindowState from "@sackrin/useglobalcommon/lib/getGlobalWindowState";

type UseGlobalStateReadOnly = <S>(
  defaultState: S,
  path: string,
  prefix?: string,
) => [S];

const useGlobalStateReadOnly: UseGlobalStateReadOnly = (
  defaultState,
  path,
  prefix = '',
) => {
  const [state, setState] = useState(defaultState);
  const windowName = getMicroUIWindowName('STATE', path, prefix);
  const windowStash =
    window[windowName] || getMicroUIWindowState(state, windowName);
  windowStash.subscribe((value: any) => {
    setState(value);
  });
  return [state];
};

export default useGlobalStateReadOnly;
