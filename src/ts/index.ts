// ═══════════════════════════════════════════════════════
// index.ts — Home page
// Estação Vegana
// ═══════════════════════════════════════════════════════

import { initMenu, initScrollFade, initCartBadge } from './main'

// ── Init ─────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  initMenu()
  initScrollFade()
  initCartBadge()
  initHeroParallax()
})

// ── Hero parallax suave ao scroll ────────────────────────
function initHeroParallax(): void {
  const heroBg = document.getElementById('hero-bg') as HTMLImageElement | null
  if (!heroBg) return

  const handleScroll = (): void => {
    const scrollY = window.scrollY
    heroBg.style.transform = `translateY(${scrollY * 0.3}px)`
  }

  window.addEventListener('scroll', handleScroll, { passive: true })
}
