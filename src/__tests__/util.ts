// export const tag = builders(schema)
import type { Node } from 'prosemirror-model'
import { Schema } from 'prosemirror-model'
import { nodes as basicNodes } from 'prosemirror-schema-basic'
import { builders } from 'prosemirror-test-builder'

import { detailsNodes } from '../schema'

export const tmpSchema = new Schema({
  nodes: { ...detailsNodes({ detailsContent: 'block*', summaryContent: 'text*' }), ...basicNodes },
})

export const tag = builders(tmpSchema)
export const { details, summary, doc, paragraph } = tag

export const validateNodeStructure = (node: Node, path: Array<string> = [node.type.name]) => {
  try {
    expect(node.type.validContent(node.content)).toBeTruthy()
  } catch (error) {
    console.error(`The schema does not accept the document. path: ${path.join('.')}`)
  }

  node.forEach((child, _offset, index) =>
    validateNodeStructure(child, [...path, child.type.name + `(${index})`]),
  )
}
