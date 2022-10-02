import { Schema } from 'prosemirror-model'
import { nodes as basicNodes } from 'prosemirror-schema-basic'
import { builders } from 'prosemirror-test-builder'

import { detailsNodes } from '../schema'

import { validateNodeStructure } from './util'

const setupBuilders = () => {
  const nodes = detailsNodes({ detailContent: 'block*', summaryContent: 'text*' })
  const schema = new Schema({ nodes: { ...nodes, ...basicNodes } })
  return builders(schema)
}

const { details, summary, doc, paragraph } = setupBuilders()

describe('schema', () => {
  describe('detailsNodes', () => {
    it('works validly', () => {
      validateNodeStructure(doc(details(summary('toggle'), paragraph('Content'))))
    })

    it('works validly without summary', () => {
      validateNodeStructure(doc(details(paragraph('Content'))))
    })
  })
})
