import { flushPromises } from '@vue/test-utils';
import { expect } from 'vitest';

/**
 * Flushes all pending promises in the event loop until the expectation passes or maxRetries is reached.
 * This is useful for testing asynchronous code where you need to wait for promises to resolve.
 * @param expectation The expectation function that should eventually pass.
 * @param maxRetries The maximum number of times to retry the expectation before failing.
 * @returns A promise that resolves when the expectation passes or fails after maxRetries.
 */
export const flushPromisesUntil = async (
  expectation: () => void,
  maxRetries: number = 10
): Promise<void> => {
  let numberOfTries: number = 0;
  let lastError: any;
  while (numberOfTries < maxRetries) {
    try {
      expectation();
      return;
    } catch (e) {
      lastError = e;
      numberOfTries++;
      await flushPromises();
    }
  }
  expect.fail(`Expectation never met after ${maxRetries} flushes: ${lastError}`);
};
