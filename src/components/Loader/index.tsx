import React from "react"

import "./style.css"

interface LoaderProps {
  text?: string
  size?: number
}

/**
 * A loading spinner component.
 * @param {LoaderProps} props - The props for the Loader component.
 * @returns {JSX.Element} - The Loader component.
 * @example
 * // Example usage:
 * <Loader text="Loading..." size={40} />
 */
const Loader: React.FC<LoaderProps> = ({ text = "Loading...", size = 30 }: LoaderProps): JSX.Element => {
  return (
    <div className="loader-container" >
      <div className="loader" style={{ width: size, height: size }}>
        <div className="loader-circle" />
      </div>
      <p className="loading-text">{text}</p>
    </div>
  )
}

export default Loader
