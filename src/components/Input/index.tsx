import React, { ChangeEvent } from "react"

import "./style.css"

/**
 * A custom input component.
 * @param {InputProps} props - The props for the Input component.
 * @returns {JSX.Element} - The Input component.
 */
interface InputProps {
  type?: string
  value: string
  placeholder?: string
  className?: string
  role?: string
  ariaLabel?: string
  onChange: (event: ChangeEvent<HTMLInputElement>) => void
}

const Input: React.FC<InputProps> = (props) => {
  const {
    type = "text",
    value,
    placeholder,
    className,
    role = "search",
    ariaLabel = "Search Input",
    onChange
  } = props

  return (
    <input
      type={type}
      value={value}
      className={`input ${className ? className : ""}`}
      onChange={onChange}
      placeholder={placeholder}
      aria-label={ariaLabel}
      role={role}
    />
  )
}

export default Input
