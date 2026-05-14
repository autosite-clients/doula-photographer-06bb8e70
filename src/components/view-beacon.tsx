'use client';

import { useEffect } from 'react';

interface Props {
  sketchId: string;
}

/**
 * Fires once per render to log this preview view. Server dedupes within 30min
 * by device hash so noisy reloads don't pollute the activity feed.
 */
export function ViewBeacon({ sketchId }: Props) {
  useEffect(() => {
    fetch('/api/beacon/view/', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ sketchId }),
      keepalive: true,
    }).catch(() => {
      /* swallow — best-effort tracking */
    });
  }, [sketchId]);

  return null;
}
