import { useCallback, useEffect, useState } from 'react';
import getGlobalWindowName from "@sackrin/useglobalcommon/lib/getGlobalWindowName";
import getGlobalWindowState from "@sackrin/useglobalcommon/lib/getGlobalWindowState";

type UseGlobalCallback = (
  callback: (...args: any[]) => any,
  deps: any,
  path: string,
  prefix?: string,
) => (...args: any[]) => any;

const useGlobalCallback: UseGlobalCallback = (
  callback,
  deps,
  path,
  prefix = '',
) => {
  const _callback = useCallback(callback, deps);
  const [cb, setCb] = useState(() => _callback);
  const windowName = getGlobalWindowName('CALLBACK', path, prefix);
  const windowStash =
    window[windowName] || getGlobalWindowState(callback, windowName);
  windowStash.subscribe((_cb: (...args: any[]) => any) => {
    setCb(() => _cb);
  });
  useEffect(() => {
    windowStash.next(callback);
    setCb(() => _callback);
  }, [windowStash, _callback]);
  return cb;
};

export default useGlobalCallback;
