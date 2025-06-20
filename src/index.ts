export * from './stream';

// Optional: Add convenience functions if desired
/**
 * Creates a stream from an array, set, or other iterable
 * @param source Iterable collection
 * @example
 * ```ts
 * import { stream } from 'custom-stream-ts';
 * 
 * const result = stream([1, 2, 3])
 *   .filter(x => x > 1)
 *   .toArray(); // [2, 3]
 * ```
 */
export function stream<T>(source: Iterable<T>): Stream<T> {
  return Stream.from(source);
}

// Re-export the Stream class for backward compatibility
import { Stream } from './stream';
export { Stream };