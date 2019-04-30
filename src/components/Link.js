import React from 'react'

const Link = ({ active, children, onClick }) => {
  return (
    // eslint-disable-next-line
    <a
      className={active ? 'selected' : ''}
      href="#"
      onClick={e => {
        e.preventDefault()
        onClick()
      }}
    >
      {children}
    </a>
  )
}

export default Link
