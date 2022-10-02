import type { NodeSpec } from 'prosemirror-model'

type DetailsNodesOptions = {
  // The content expression for details node.
  detailsContent: string
  // The content expression for summary node.
  summaryContent: string
}

export const detailsNodes = (
  options: DetailsNodesOptions,
): Record<'details' | 'summary', NodeSpec> => {
  const { detailsContent, summaryContent } = options

  return {
    details: {
      group: 'block',
      content: `summary? ${detailsContent}`,
      attrs: {
        open: { default: false },
      },
      parseDOM: [
        {
          tag: 'details',
          getAttrs(node) {
            if (typeof node === 'string') {
              return null
            }
            const hasOpenAttr = node.hasAttribute('open')

            return { open: hasOpenAttr, htmlOpen: hasOpenAttr }
          },
        },
      ],
      toDOM(node) {
        return ['details', { open: node.attrs['open'] }, 0]
      },
    },
    summary: {
      content: summaryContent,
      parseDOM: [{ tag: 'summary' }],
      toDOM() {
        return ['summary', 0]
      },
    },
  }
}
