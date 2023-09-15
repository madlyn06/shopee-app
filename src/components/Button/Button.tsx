import React from 'react'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean
}
export default function Button(props: ButtonProps) {
  const { isLoading, children, className } = props
  const newClassName = isLoading ? className + ' cursor-not-allowed' : className
  return (
    <button className={newClassName} disabled={isLoading}>
      {children}
    </button>
  )
}
