import { details, doc, paragraph, summary, validateNodeStructure } from './util'

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
