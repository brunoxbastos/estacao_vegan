// ═══════════════════════════════════════════════════════
// main.js — Estação Vegana
// JavaScript puro — sem dependências
// ═══════════════════════════════════════════════════════

// Ativa animações só quando JS está disponível
document.documentElement.classList.add('js-ready')

// ── Menu Mobile ──────────────────────────────────────────
function initMenu() {
  const overlay  = document.getElementById('menu-overlay')
  const btnOpen  = document.getElementById('open-menu')
  const btnClose = document.getElementById('close-menu')
  const menuLinks = document.querySelectorAll('[data-menu-link]')

  if (!overlay) return

  function open() {
    overlay.classList.remove('menu-overlay--hidden')
    document.body.style.overflow = 'hidden'
  }

  function close() {
    overlay.classList.add('menu-overlay--hidden')
    document.body.style.overflow = ''
  }

  btnOpen?.addEventListener('click', open)
  btnClose?.addEventListener('click', close)
  menuLinks.forEach(link => link.addEventListener('click', close))

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') close()
  })
}

// ── Scroll Fade-In ───────────────────────────────────────
function initScrollFade() {
  const elements = document.querySelectorAll('.fade-in')

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('fade-in--visible')
        observer.unobserve(entry.target)
      }
    })
  }, { threshold: 0.1 })

  elements.forEach(el => observer.observe(el))
}

// ── Carrinho (localStorage) ──────────────────────────────
export const Cart = {
  getItems() {
    try {
      const raw = localStorage.getItem('ev_cart')
      return raw ? JSON.parse(raw) : []
    } catch {
      return []
    }
  },

  saveItems(items) {
    localStorage.setItem('ev_cart', JSON.stringify(items))
    window.dispatchEvent(new Event('cart-updated'))
  },

  addItem(item) {
    const items = this.getItems()
    const existing = items.find(i => i.id === item.id)
    if (existing) {
      existing.quantity++
    } else {
      items.push({ ...item, quantity: 1 })
    }
    this.saveItems(items)
  },

  removeItem(id) {
    const items = this.getItems().filter(i => i.id !== id)
    this.saveItems(items)
  },

  updateQuantity(id, quantity) {
    const items = this.getItems()
    const item = items.find(i => i.id === id)
    if (!item) return
    if (quantity <= 0) {
      this.removeItem(id)
      return
    }
    item.quantity = quantity
    this.saveItems(items)
  },

  getTotal() {
    return this.getItems().reduce((sum, i) => sum + i.price * i.quantity, 0)
  },

  getCount() {
    return this.getItems().reduce((sum, i) => sum + i.quantity, 0)
  },

  clear() {
    this.saveItems([])
  },
}

// ── Cart Badge (header) ──────────────────────────────────
function initCartBadge() {
  const badge = document.getElementById('cart-count')

  function update() {
    if (!badge) return
    const count = Cart.getCount()
    badge.textContent = String(count)
    badge.classList.toggle('hidden', count === 0)
  }

  update()
  window.addEventListener('cart-updated', update)
  window.addEventListener('storage', update)
}

// ── Formatar valor em BRL ────────────────────────────────
export function formatCurrency(value) {
  return value.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  })
}

// ── Toast de notificação ─────────────────────────────────
export function showToast(message, type = 'success') {
  const existing = document.getElementById('ev-toast')
  existing?.remove()

  const toast = document.createElement('div')
  toast.id = 'ev-toast'
  toast.className = 'toast toast--' + type
  toast.textContent = message

  document.body.appendChild(toast)

  requestAnimationFrame(() => {
    toast.classList.add('toast--visible')
  })

  setTimeout(() => {
    toast.classList.remove('toast--visible')
    setTimeout(() => toast.remove(), 300)
  }, 2500)
}

// ── Hero parallax suave ──────────────────────────────────
function initHeroParallax() {
  const heroBg = document.getElementById('hero-bg')
  if (!heroBg) return

  window.addEventListener('scroll', () => {
    heroBg.style.transform = `translateY(${window.scrollY * 0.3}px)`
  }, { passive: true })
}

// ── Init ─────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  initMenu()
  initScrollFade()
  initCartBadge()
  initHeroParallax()
})
