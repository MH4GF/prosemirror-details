import { detailsNodes, DetailsView } from '@mh4gf/prosemirror-details'
import { buildMenuItems, exampleSetup } from 'prosemirror-example-setup'
import { Dropdown, MenuItem } from 'prosemirror-menu'
import { Schema, DOMParser } from 'prosemirror-model'
import { nodes, marks } from 'prosemirror-schema-basic'
import type { Command } from 'prosemirror-state'
import { EditorState } from 'prosemirror-state'
import { EditorView } from 'prosemirror-view'

const schema = new Schema({
  nodes: {
    ...nodes,
    ...detailsNodes({
      detailsGroup: 'block',
      detailsContent: 'block+',
      summaryContent: 'text*',
    }),
  },
  marks,
})

const insertDetails = ({
  open,
  withSummary = true,
}: {
  open: boolean
  withSummary?: boolean
}): Command => {
  return (state, dispatch) => {
    const summary = schema.nodes.summary.createAndFill({}, schema.text('Summary'))
    if (!summary) return false

    const details = schema.nodes.details.createAndFill({ open }, withSummary ? [summary] : [])
    if (!details) return false

    if (dispatch) {
      dispatch(state.tr.replaceSelectionWith(details))
    }

    return true
  }
}

const item = (label: string, cmd: Command) => new MenuItem({ label, select: cmd, run: cmd })

const detailsMenu = [
  item('Insert closed details', insertDetails({ open: false })),
  item('Insert opened details', insertDetails({ open: true })),
  item('Insert details without summary', insertDetails({ open: true, withSummary: false })),
]
const menuContent = buildMenuItems(schema).fullMenu
menuContent.splice(2, 0, [new Dropdown(detailsMenu, { label: 'details' })])

const dom = document.querySelector('#content')
if (!dom) {
  throw new Error('No #content element found')
}

const doc = DOMParser.fromSchema(schema).parse(dom)
const state = EditorState.create({
  doc,
  plugins: exampleSetup({
    schema,
    menuContent: menuContent as MenuItem[][],
  }),
})

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
window.view = new EditorView(document.querySelector('#editor'), {
  state,
  nodeViews: {
    details: (node, view, getPos) => new DetailsView(node, view, getPos),
  },
})
