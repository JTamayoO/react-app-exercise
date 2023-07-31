import Highlighter from "./index"

import { render } from "@testing-library/react"

describe("Highlighter Component", () => {
  it("should highlight the matched fragments correctly", () => {
    const text = "Lorem ipsum dolor sit amet"
    const textToHighlight = "lorem" // Case-insensitive match with 'Lorem'

    const { container } = render(<Highlighter text={text} textToHighlight={textToHighlight} />)

    // Check if all the 'span' elements with className 'highlighted' are found in the rendered component
    // eslint-disable-next-line testing-library/no-container, testing-library/no-node-access
    const highlightedSpans = container.querySelectorAll("span.highlighted")
    expect(highlightedSpans.length).toBe(1) // Should have one match

    // Check if the content of the matched fragment is 'Lorem'
    expect(highlightedSpans[0].textContent).toBe("Lorem")
  })

  it("should not highlight when no match is found", () => {
    const text = "Lorem ipsum dolor sit amet"
    const textToHighlight = "xyz" // No match in the text

    const { container } = render(<Highlighter text={text} textToHighlight={textToHighlight} />)

    // Check if no 'span' elements with className 'highlighted' are found in the rendered component
     // eslint-disable-next-line testing-library/no-container, testing-library/no-node-access
    const highlightedSpans = container.querySelectorAll("span.highlighted")
    expect(highlightedSpans.length).toBe(0) // No matches should be found
  })
})
