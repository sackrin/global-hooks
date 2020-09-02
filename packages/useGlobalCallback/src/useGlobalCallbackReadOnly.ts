import { useState } from 'react';
import getGlobalWindowName from '@sackrin/useglobalcommon/lib/getGlobalWindowName';
import getGlobalWindowState from '@sackrin/useglobalcommon/lib/getGlobalWindowState';

type UseGlobalCallbackReadOnly = (
  path: string,
  prefix?: string,
) => (...args: any[]) => any;

const useGlobalCallbackReadOnly: UseGlobalCallbackReadOnly = (
  path,
  prefix = '',
) => {
  const [cb, setCb] = useState(() => () => {});
  const windowName = getGlobalWindowName('CALLBACK', path, prefix);
  const windowStash =
    window[windowName] || getGlobalWindowState(cb, windowName);
  windowStash.subscribe((_cb: (...args: any[]) => any) => {
    setCb(() => _cb);
  });
  return cb;
};

export default useGlobalCallbackReadOnly;
