import { useMemo } from 'react';

// Utils
import formatter from './formatter';

export const usePrettyBytes = bytes => {
  const prettyBytes = useMemo(() => formatter(bytes), [bytes]);

  return prettyBytes;
};
