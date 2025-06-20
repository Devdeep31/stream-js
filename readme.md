# Custom Stream API for TypeScript

![npm](https://img.shields.io/npm/v/custom-stream-ts)
![License](https://img.shields.io/npm/l/custom-stream-ts)
![TypeScript](https://img.shields.io/badge/TypeScript-4.0+-blue)

A Java-inspired Stream API implementation for TypeScript with lazy evaluation and fluent interface.

## Features

- **Lazy evaluation** - Operations are only executed when needed
- **Fluent API** - Chainable method calls
- **Type-safe** - Full TypeScript support
- **Comprehensive operations** - All major stream operations included
- **Lightweight** - Zero dependencies

## Installation

```bash
npm install @devdeep31/stream
# or
yarn add @devdeep31/stream
```

## Usage

### Basic Usage

```typescript
import { stream } from 'devdeep31/stream';

const result = stream([1, 2, 3, 4, 5])
  .filter(x => x % 2 === 0)  // [2, 4]
  .map(x => x * 2)           // [4, 8]
  .toArray();

console.log(result); // [4, 8]
```

### Using the Stream Class Directly

```typescript
import { stream } from 'devdeep31/stream';

const result = Stream.from([1, 2, 3])
  .map(x => x + 1)
  .toArray(); // [2, 3, 4]
```

## API Reference

### Static Methods

| Method | Description | Example |
|--------|-------------|---------|
| `Stream.from(source)` | Creates stream from iterable | `Stream.from([1,2,3])` |

### Intermediate Operations (Lazy)

| Method | Description | Example |
|--------|-------------|---------|
| `filter(predicate)` | Filters elements | `.filter(x => x > 2)` |
| `map(mapper)` | Transforms elements | `.map(x => x * 2)` |
| `flatMap(mapper)` | Flattens nested structures | `.flatMap(x => [x, x+1])` |
| `distinct()` | Removes duplicates | `.distinct()` |
| `sorted(comparator?)` | Sorts elements | `.sorted((a,b) => a - b)` |
| `limit(maxSize)` | Limits stream size | `.limit(5)` |
| `skip(n)` | Skips first n elements | `.skip(2)` |

### Terminal Operations (Eager)

| Method | Description | Example |
|--------|-------------|---------|
| `toArray()` | Collects to array | `.toArray()` |
| `reduce(reducer, initial)` | Reduces to single value | `.reduce((a,b) => a+b, 0)` |
| `forEach(callback)` | Executes for each element | `.forEach(x => console.log(x))` |
| `find(predicate)` | Finds first match | `.find(x => x > 2)` |
| `some(predicate)` | Tests if any match | `.some(x => x > 2)` |
| `every(predicate)` | Tests if all match | `.every(x => x > 2)` |
| `count()` | Counts elements | `.count()` |

## Advanced Examples

### Chaining Multiple Operations

```typescript
import { stream } from 'devdeep31/stream';

const users = [
  { id: 1, name: 'Alice', age: 25 },
  { id: 2, name: 'Bob', age: 30 },
  { id: 3, name: 'Charlie', age: 35 }
];

const result = stream(users)
  .filter(user => user.age > 25)
  .map(user => user.name)
  .sorted()
  .toArray();

// ['Bob', 'Charlie']
```

### Working with Objects

```typescript
const stats = stream([1, 2, 3, 4, 5])
  .reduce(
    (acc, val) => {
      acc.sum += val;
      acc.count++;
      return acc;
    },
    { sum: 0, count: 0 }
  );

// { sum: 15, count: 5 }
```

### Lazy Evaluation Demo

```typescript
const lazyStream = stream([1, 2, 3, 4])
  .map(x => {
    console.log(`Processing ${x}`);
    return x * 2;
  });

// Nothing logged yet - evaluation is lazy

const result = lazyStream.toArray();
// Now logs:
// Processing 1
// Processing 2
// Processing 3
// Processing 4
```

## Performance Considerations

While this implementation provides a convenient API, for very large datasets:

1. Native array methods may be faster for simple operations
2. Consider chunking very large datasets
3. Lazy evaluation helps with memory efficiency

## Comparison with Native Array Methods

| Feature | Custom Stream | Native Array |
|---------|--------------|--------------|
| Lazy evaluation | ✅ Yes | ❌ No |
| Method chaining | ✅ Yes | ✅ Yes |
| Infinite sequences | ✅ Possible | ❌ No |
| Memory efficiency | ✅ Better | ❌ Worse |
| Performance | ⚠️ Good | ✅ Better |

## Contributing

Contributions are welcome! Please:

1. Fork the repository
2. Create a feature branch
3. Submit a pull request

## License

MIT © Deep Govale