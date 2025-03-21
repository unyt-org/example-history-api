# DATEX History API Example

This is a example project demonstrating how to use the
[History API](https://docs.unyt.org/manual/datex/history) of DATEX. The API
provides a way to undo and redo state changes of one or multiple pointers.

## Usage

The history for a pointer can be managed by creating a new History object and
adding the pointer to the history:

```ts
import { History } from "datex-core-legacy/utils/history.ts";

const entries = $$([]);
const history = new History();
history.add(entries);
```

Now, every state change of the entries array is recorded and can be undone or
repeated:

```ts
entries.push("Entry 1");
entries.push("Entry 2");
entries.push("Entry 3");
console.log(entries); // ["Entry 1", "Entry 2", "Entry 3"]

// undo last change
history.back();
console.log(entries); // ["Entry 1", "Entry 2"]

// undo second last change
history.back();
console.log(entries); // ["Entry 1"]

// repeat second last change
history.forward();
console.log(entries); // ["Entry 1", "Entry 2"]
```

---

<sub>&copy; unyt 2025 • [unyt.org](https://unyt.org)</sub>
