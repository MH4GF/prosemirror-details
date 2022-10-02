import { screen, fireEvent } from '@testing-library/dom'
import type { Node } from 'prosemirror-model'
import { EditorState } from 'prosemirror-state'
import { EditorView } from 'prosemirror-view'

import { DetailsView } from '../DetailsView'

import { details, doc, paragraph, summary, tmpSchema } from './util'

const setupView = (doc: Node) => {
  const view = new EditorView(document.createElement('div'), {
    state: EditorState.create({ schema: tmpSchema, doc }),
    nodeViews: {
      details: (node, view, getPos) => new DetailsView(node, view, getPos),
    },
  })
  document.body.appendChild(view.dom)
  return view
}

describe('DetailsView', () => {
  afterEach(() => {
    document.body.innerHTML = ''
  })

  it('should be closed by default', () => {
    setupView(doc(details(summary('toggle'), paragraph('inner text')), paragraph('outer text')))
    expect(screen.getByRole('group')).not.toBeVisible()
  })

  it('can open and close when click summary tag', () => {
    setupView(doc(details(summary('toggle')), paragraph('inner text'), paragraph('outer text')))

    fireEvent.click(screen.getByText('toggle'))
    expect(screen.getByRole('group')).toBeVisible()
    fireEvent.click(screen.getByText('toggle'))
    expect(screen.getByRole('group')).not.toBeVisible()
  })

  it('cannot open and close when click tag inside of details tag', () => {
    setupView(doc(details(summary('toggle'), paragraph('inner text')), paragraph('outer text')))

    fireEvent.click(screen.getByText('toggle'))
    expect(screen.getByRole('group')).toBeVisible()

    fireEvent.click(screen.getByText('inner text'))
    expect(screen.getByRole('group')).toBeVisible()
  })

  it('cannot open and close when click tag outside of details tag', () => {
    setupView(doc(details(summary('toggle'), paragraph('inner text')), paragraph('outer text')))
    fireEvent.click(screen.getByText('outer text'))
    expect(screen.getByRole('group')).not.toBeVisible()
  })

  it('should be open when open attribute is true', () => {
    setupView(
      doc(
        details({ open: true }, summary('toggle'), paragraph('inner text')),
        paragraph('outer text'),
      ),
    )

    expect(screen.getByRole('group')).toBeVisible()
  })
})
