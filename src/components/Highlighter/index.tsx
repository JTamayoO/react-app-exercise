import React from "react"

import "./style.css"

interface HighlighterProps {
  text: string
  textToHighlight: string
}

/**
 * A component that highlights the matching fragments of the text based on the provided highlight string.
 * @param {HighlighterProps} props - The props for the Highlighter component.
 * @returns {JSX.Element} - The Highlighter component.
 * @example
 * // Example usage:
 * <Highlighter text="Hello, world!" textToHighlight="hello" />
 */
const Highlighter: React.FC<HighlighterProps> = ({ text, textToHighlight }: HighlighterProps): JSX.Element => {
  const fragments: string[] = text?.split(new RegExp(`(${textToHighlight})`, "gi"))

  return (
    <>
      {fragments?.map((textFragment, i) => {
        const highlightStyle =
          textFragment.toLowerCase() === textToHighlight.toLowerCase() && textFragment !== ""
            ? "highlighted"
            : ""

        return (
          <span key={i} className={highlightStyle}>
            {textFragment}
          </span>
        )
      })}
    </>
  )
}

export default Highlighter
