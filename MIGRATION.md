# React 19.3 migration

React and React DOM 19.3 or newer are required.

## Browser-only rendering

`useMounted` is deprecated. Its compatibility implementation now suspends on
the server and returns `true` immediately in the browser. It no longer reports
whether a DOM commit has completed, and its caller needs a surrounding
`Suspense` boundary during server rendering.

Replace browser-only render guards with React's API directly:

```tsx
import { Suspense, use } from 'react';
import { browser } from 'react-dom';

function BrowserContent() {
  use(browser());
  return <p>Browser content</p>;
}

function Example() {
  return (
    <Suspense fallback={null}>
      <BrowserContent />
    </Suspense>
  );
}
```

Keep indexable content outside the browser-only boundary. DOM measurement and
imperative initialization still belong in effects or ref callbacks.

## DataTable

DataTable now uses TanStack Table 9's native `useTable` API, which supports the
React Compiler. Its standard table features remain available.

- Read state from `table.state` instead of `table.getState()`.
- Use `{ start: [], end: [] }` for column pinning instead of `left`/`right`.
- Use `sortFn` instead of `sortingFn` in column definitions.
- The package's `ColumnDef<TData>`, `TableInstance<TData>`, and `Row<TData>`
  aliases retain a single data generic. Advanced consumers can use the exported
  `DataTableFeatures` with TanStack's native types.
- A memoized custom cell that receives a stable row/column object and reads
  mutable table state must subscribe to the state it uses. See the selection
  and expansion stories for `Subscribe` examples.

References: [React browser API](https://react.dev/reference/react-dom/browser),
[TanStack V9 migration](https://tanstack.com/table/latest/docs/framework/react/guide/migrating),
[TanStack React Compiler guide](https://tanstack.com/table/latest/docs/framework/react/guide/react-compiler).
