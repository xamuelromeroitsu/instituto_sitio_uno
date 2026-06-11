import { useEffect, useState } from 'react'

const SHRINK_THRESHOLD = 20
const HIDE_THRESHOLD = 80

export function useHeaderScroll() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isHidden, setIsHidden] = useState(false)

  useEffect(() => {
    let lastScrollY = 0
    let ticking = false

    const updateHeaderState = () => {
      const currentScrollY = window.scrollY || 0

      setIsScrolled(currentScrollY > SHRINK_THRESHOLD)
      setIsHidden(currentScrollY > lastScrollY && currentScrollY > HIDE_THRESHOLD)

      lastScrollY = currentScrollY
    }

    const onScroll = () => {
      if (ticking) {
        return
      }

      ticking = true

      window.requestAnimationFrame(() => {
        updateHeaderState()
        ticking = false
      })
    }

    updateHeaderState()
    window.addEventListener('scroll', onScroll, { passive: true })

    return () => {
      window.removeEventListener('scroll', onScroll)
    }
  }, [])

  return { isScrolled, isHidden }
}