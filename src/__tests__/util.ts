// export const tag = builders(schema)
import type { Node } from 'prosemirror-model'

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
