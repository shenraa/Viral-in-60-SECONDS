/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useCallback, useEffect, useRef, useState } from 'react';

interface UseGameTimerProps {
  initialSeconds?: number;
  onTimeExpired: () => void;
  onSecondTick?: (remaining: number) => void;
}

export function useGameTimer({
  initialSeconds = 60,
  onTimeExpired,
  onSecondTick
}: UseGameTimerProps) {
  const [timeRemaining, setTimeRemaining] = useState<number>(initialSeconds);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [isPaused, setIsPaused] = useState<boolean>(false);

  // Authoritative refs
  const totalDurationMsRef = useRef<number>(initialSeconds * 1000);
  const elapsedMsBeforePauseRef = useRef<number>(0);
  const startTimestampRef = useRef<number | null>(null);
  const isRunningRef = useRef<boolean>(false);
  const isPausedRef = useRef<boolean>(false);
  const hasTriggeredEndRef = useRef<boolean>(false);
  const animFrameIdRef = useRef<number | null>(null);
  const lastReportedSecondRef = useRef<number>(initialSeconds);

  // Update duration if initialSeconds changes while not running
  useEffect(() => {
    if (!isRunningRef.current) {
      totalDurationMsRef.current = initialSeconds * 1000;
      setTimeRemaining(initialSeconds);
      lastReportedSecondRef.current = initialSeconds;
    }
  }, [initialSeconds]);

  // Main high-precision tick function driven by requestAnimationFrame & Date.now()
  const tick = useCallback(() => {
    if (!isRunningRef.current || isPausedRef.current) return;

    const now = Date.now();
    const currentRunElapsed = startTimestampRef.current ? now - startTimestampRef.current : 0;
    const totalElapsedMs = elapsedMsBeforePauseRef.current + currentRunElapsed;
    const remainingMs = Math.max(0, totalDurationMsRef.current - totalElapsedMs);
    const remainingSec = Math.ceil(remainingMs / 1000);

    setTimeRemaining(remainingSec);

    if (remainingSec !== lastReportedSecondRef.current) {
      lastReportedSecondRef.current = remainingSec;
      onSecondTick?.(remainingSec);
    }

    if (remainingMs <= 0) {
      // Expiration reached
      isRunningRef.current = false;
      setIsRunning(false);
      if (!hasTriggeredEndRef.current) {
        hasTriggeredEndRef.current = true;
        onTimeExpired();
      }
      return;
    }

    animFrameIdRef.current = requestAnimationFrame(tick);
  }, [onSecondTick, onTimeExpired]);

  // Start timer
  const start = useCallback(() => {
    if (isRunningRef.current) return; // Prevent double start
    hasTriggeredEndRef.current = false;
    elapsedMsBeforePauseRef.current = 0;
    startTimestampRef.current = Date.now();
    isRunningRef.current = true;
    isPausedRef.current = false;
    lastReportedSecondRef.current = initialSeconds;
    setIsRunning(true);
    setIsPaused(false);
    setTimeRemaining(initialSeconds);

    if (animFrameIdRef.current) {
      cancelAnimationFrame(animFrameIdRef.current);
    }
    animFrameIdRef.current = requestAnimationFrame(tick);
  }, [initialSeconds, tick]);

  // Pause timer
  const pause = useCallback(() => {
    if (!isRunningRef.current || isPausedRef.current) return;

    if (startTimestampRef.current) {
      elapsedMsBeforePauseRef.current += Date.now() - startTimestampRef.current;
      startTimestampRef.current = null;
    }

    isPausedRef.current = true;
    setIsPaused(true);

    if (animFrameIdRef.current) {
      cancelAnimationFrame(animFrameIdRef.current);
      animFrameIdRef.current = null;
    }
  }, []);

  // Resume timer
  const resume = useCallback(() => {
    if (!isRunningRef.current || !isPausedRef.current) return;

    startTimestampRef.current = Date.now();
    isPausedRef.current = false;
    setIsPaused(false);

    if (animFrameIdRef.current) {
      cancelAnimationFrame(animFrameIdRef.current);
    }
    animFrameIdRef.current = requestAnimationFrame(tick);
  }, [tick]);

  // Reset timer
  const reset = useCallback(() => {
    if (animFrameIdRef.current) {
      cancelAnimationFrame(animFrameIdRef.current);
      animFrameIdRef.current = null;
    }
    isRunningRef.current = false;
    isPausedRef.current = false;
    hasTriggeredEndRef.current = false;
    elapsedMsBeforePauseRef.current = 0;
    startTimestampRef.current = null;
    setIsRunning(false);
    setIsPaused(false);
    setTimeRemaining(initialSeconds);
    lastReportedSecondRef.current = initialSeconds;
  }, [initialSeconds]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (animFrameIdRef.current) {
        cancelAnimationFrame(animFrameIdRef.current);
      }
    };
  }, []);

  return {
    timeRemaining,
    isRunning,
    isPaused,
    start,
    pause,
    resume,
    reset
  };
}
