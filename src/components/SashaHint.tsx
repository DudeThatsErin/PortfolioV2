'use client'

import { useEffect, useState } from 'react'

export default function SashaHint() {
  const [show, setShow] = useState(false)

  useEffect(() => {
    const hasOpened = localStorage.getItem('sasha_widget_opened')
    if (!hasOpened) {
      setShow(true)
    }

    const onOpen = () => setShow(false)
    window.addEventListener('sasha_opened', onOpen)
    return () => window.removeEventListener('sasha_opened', onOpen)
  }, [])

  if (!show) return null

  return (
    <div className="sasha-hint" aria-hidden="true">
      <span className="sasha-hint-text">Try out my AI that knows about me!</span>
      <span className="sasha-hint-arrow">↓</span>
    </div>
  )
}
