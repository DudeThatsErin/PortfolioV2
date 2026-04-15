'use client'

import { useEffect, useState } from 'react'

export default function SashaHint() {
  const [visible, setVisible] = useState<boolean | null>(null)

  useEffect(() => {
    const hasOpened = localStorage.getItem('sasha_widget_opened')
    setVisible(!hasOpened)

    const onOpen = () => setVisible(false)
    window.addEventListener('sasha_opened', onOpen)
    return () => window.removeEventListener('sasha_opened', onOpen)
  }, [])

  if (!visible) return null

  return (
    <div
      className="fixed bottom-9 right-24 z-[999] flex items-center max-w-[50%] text-[#5eead4] font-mono text-4xl sm:text-3xl [600px]:text-xs text-right pointer-events-none"
      aria-hidden="true"
    >
      <span className="break-words">Try out my AI that knows about me!</span>
    </div>
  )
}
