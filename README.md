# ProseMirror details module

This module defines an open/closeable [details](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/details) element that works with rich text editor based on ProseMirror.

## Documentation

### `detailsNodes` (options: DetailsNodesOptions) → Object

This function creates a set of [node specs](https://prosemirror.net/docs/ref/#model.SchemaSpec.nodes) for details and summary.

### `DetailsNodesOptions`

- `detailsGroup`: string
  - A group name (something like "block") to add to the details node type.
- `detailsContent`: string
  - The content expression for details node. The first child is already added in summary, and summary is optional.
- `summaryContent`: string
  - The content expression for summary node. A text or inline group would be specified. Check to see if the element can be included internally as part of the HTML specification for [summary element](https://developer.mozilla.org/ja/docs/Web/HTML/Element/summary).

### `DetailsNode` class implements [NodeView](https://prosemirror.net/docs/ref/#view.NodeView)

[NodeView](https://prosemirror.net/docs/ref/#view.NodeView) for open/close interaction. Use it in EditorView as follows:

```typescript
new EditorView(document.querySelector('#editor'), {
  state,
  nodeViews: {
    details: (node, view, getPos) => new DetailsView(node, view, getPos),
  },
})
```
