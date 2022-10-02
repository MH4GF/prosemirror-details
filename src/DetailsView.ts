import type { Node } from 'prosemirror-model'
import type { EditorView, NodeView } from 'prosemirror-view'

const canToggle = (event: MouseEvent) =>
  event.target &&
  ((event.target instanceof HTMLElement && event.target.closest('summary')) ||
    event.target instanceof HTMLDetailsElement)

export class DetailsView implements NodeView {
  dom: HTMLDetailsElement
  contentDOM: HTMLDetailsElement

  constructor(node: Node, view: EditorView, getPos: () => number) {
    this.dom = this.contentDOM = document.createElement('details')
    if (node.attrs['open']) {
      this.dom.open = true
    }

    this.dom.addEventListener('click', (event) => {
      if (canToggle(event)) {
        const { open } = node.attrs
        const tr = view.state.tr.setNodeMarkup(getPos(), undefined, { ...node.attrs, open: !open })
        view.dispatch(tr)
      }
    })
  }

  update(node: Node) {
    if (node.type.name !== 'details') {
      return false
    }
    return true
  }
}
