import type { NodeSpec } from 'prosemirror-model'

type DetailsNodesOptions = {
  // A group name (something like "block") to add to the details node type.
  detailsGroup: string
  // The content expression for details node.
  detailsContent: string
  // The content expression for summary node.
  summaryContent: string
}

export const detailsNodes = (
  options: DetailsNodesOptions,
): Record<'details' | 'summary', NodeSpec> => {
  const { detailsGroup, detailsContent, summaryContent } = options

  return {
    details: {
      group: detailsGroup,
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

            return { open: node.hasAttribute('open') }
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
