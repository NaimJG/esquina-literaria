import React from 'react'
import './RightSidebar.css'

type Props = {
  width?: string
  topOffset?: string
  fixed?: boolean
  className?: string
  children?: React.ReactNode
}

const RightSidebar: React.FC<Props> = ({
  width = '320px',
  topOffset = '0',
  fixed = true,
  className = '',
  children,
}) => {
  const style: React.CSSProperties = {
    width,
    top: topOffset,
  }

  return (
    <aside
      className={`right-sidebar ${fixed ? 'fixed' : ''} ${className}`}
      style={style}
    >
      <div className="right-sidebar-inner">{children}</div>
    </aside>
  )
}

export default RightSidebar
