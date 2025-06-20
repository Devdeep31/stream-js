export class Stream<T> {
  constructor(private iterable: Iterable<T>) {}

  // Basic operations
  filter(predicate: (value: T) => boolean): Stream<T> {
    const self = this;
    return new Stream({
      *[Symbol.iterator]() {
        for (const value of self.iterable) {
          if (predicate(value)) yield value;
        }
      }
    });
  }

  map<U>(mapper: (value: T) => U): Stream<U> {
    const self = this;
    return new Stream({
      *[Symbol.iterator]() {
        for (const value of self.iterable) {
          yield mapper(value);
        }
      }
    });
  }

  flatMap<U>(mapper: (value: T) => Iterable<U>): Stream<U> {
    const self = this;
    return new Stream({
      *[Symbol.iterator]() {
        for (const value of self.iterable) {
          yield* mapper(value);
        }
      }
    });
  }

  // Terminal operations
  toArray(): T[] {
    return [...this.iterable];
  }

  reduce<U>(reducer: (accumulator: U, value: T) => U, initialValue: U): U {
    let result = initialValue;
    for (const value of this.iterable) {
      result = reducer(result, value);
    }
    return result;
  }

  forEach(callback: (value: T) => void): void {
    for (const value of this.iterable) {
      callback(value);
    }
  }

  // Search operations
  find(predicate: (value: T) => boolean): T | undefined {
    for (const value of this.iterable) {
      if (predicate(value)) return value;
    }
    return undefined;
  }

  some(predicate: (value: T) => boolean): boolean {
    for (const value of this.iterable) {
      if (predicate(value)) return true;
    }
    return false;
  }

  every(predicate: (value: T) => boolean): boolean {
    for (const value of this.iterable) {
      if (!predicate(value)) return false;
    }
    return true;
  }

  // Aggregation operations
  count(): number {
    let count = 0;
    for (const _ of this.iterable) count++;
    return count;
  }

  // Sorting operations
  sorted(comparator?: (a: T, b: T) => number): Stream<T> {
    return new Stream([...this.iterable].sort(comparator));
  }

  // Distinct operation
  distinct(): Stream<T> {
    const seen = new Set<T>();
    const self = this;
    return new Stream({
      *[Symbol.iterator]() {
        for (const value of self.iterable) {
          if (!seen.has(value)) {
            seen.add(value);
            yield value;
          }
        }
      }
    });
  }

  // Pagination operations
  limit(maxSize: number): Stream<T> {
    const self = this;
    return new Stream({
      *[Symbol.iterator]() {
        let count = 0;
        for (const value of self.iterable) {
          if (count++ >= maxSize) break;
          yield value;
        }
      }
    });
  }

  skip(n: number): Stream<T> {
    const self = this;
    return new Stream({
      *[Symbol.iterator]() {
        let skipped = 0;
        for (const value of self.iterable) {
          if (skipped++ < n) continue;
          yield value;
        }
      }
    });
  }

  // Static constructor
  static from<T>(source: Iterable<T>): Stream<T> {
    return new Stream(source);
  }
}