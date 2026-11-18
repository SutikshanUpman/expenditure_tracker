import { useEffect, useState } from 'react';
import { api } from '../services/api';

export function useResource(path, revision = 0) {
  const [state, setState] = useState({ data: null, loading: true, error: '' });
  useEffect(() => {
    const controller = new AbortController();
    setState({ data: null, loading: true, error: '' });
    api(path, { signal: controller.signal })
      .then((data) => setState({ data, loading: false, error: '' }))
      .catch((error) => {
        if (error.name !== 'AbortError')
          setState({ data: null, loading: false, error: error.message });
      });
    return () => controller.abort();
  }, [path, revision]);
  return state;
}
