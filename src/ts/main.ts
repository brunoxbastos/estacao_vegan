// ═══════════════════════════════════════════════════════
// main.ts — Funcionalidades compartilhadas (todos os pages)
// Estação Vegana
// ═══════════════════════════════════════════════════════

import '../css/main.css'

// ── Tipos ────────────────────────────────────────────────
export interface CartItem {
  id: string
  name: string
  price: number
  quantity: number
  image?: string
}

// ── Menu Mobile ──────────────────────────────────────────
export function initMenu(): void {
  const overlay   = document.getElementById('menu-overlay')
  const btnOpen   = document.getElementById('open-menu')
  const btnClose  = document.getElementById('close-menu')
  const menuLinks = document.querySelectorAll<HTMLAnchorElement>('[data-menu-link]')

  if (!overlay) return

  const open = (): void => {
    overlay.classList.remove('menu-overlay--hidden')
    document.body.style.overflow = 'hidden'
  }

  const close = (): void => {
    overlay.classList.add('menu-overlay--hidden')
    document.body.style.overflow = ''
  }

  btnOpen?.addEventListener('click', open)
  btnClose?.addEventListener('click', close)
  menuLinks.forEach(link => link.addEventListener('click', close))

  // Fechar com Escape
  document.addEventListener('keydown', (e: KeyboardEvent) => {
    if (e.key === 'Escape') close()
  })
}

// ── Scroll Fade-In ───────────────────────────────────────
export function initScrollFade(): void {
  const elements = document.querySelectorAll<HTMLElement>('.fade-in')

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('fade-in--visible')
          observer.unobserve(entry.target)
        }
      })
    },
    { threshold: 0.1 }
  )

  elements.forEach(el => observer.observe(el))
}

// ── Carrinho (localStorage) ──────────────────────────────
export const Cart = {
  getItems(): CartItem[] {
    try {
      const raw = localStorage.getItem('ev_cart')
      return raw ? (JSON.parse(raw) as CartItem[]) : []
    } catch {
      return []
    }
  },

  saveItems(items: CartItem[]): void {
    localStorage.setItem('ev_cart', JSON.stringify(items))
    window.dispatchEvent(new Event('cart-updated'))
  },

  addItem(item: Omit<CartItem, 'quantity'>): void {
    const items = this.getItems()
    const existing = items.find(i => i.id === item.id)
    if (existing) {
      existing.quantity++
    } else {
      items.push({ ...item, quantity: 1 })
    }
    this.saveItems(items)
  },

  removeItem(id: string): void {
    const items = this.getItems().filter(i => i.id !== id)
    this.saveItems(items)
  },

  updateQuantity(id: string, quantity: number): void {
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

  getTotal(): number {
    return this.getItems().reduce((sum, i) => sum + i.price * i.quantity, 0)
  },

  getCount(): number {
    return this.getItems().reduce((sum, i) => sum + i.quantity, 0)
  },

  clear(): void {
    this.saveItems([])
  },
}

// ── Cart Badge (header) ──────────────────────────────────
export function initCartBadge(): void {
  const badge = document.getElementById('cart-count')

  const update = (): void => {
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
export function formatCurrency(value: number): string {
  return value.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  })
}

// ── Toast de notificação ─────────────────────────────────
export function showToast(message: string, type: 'success' | 'error' = 'success'): void {
  const existing = document.getElementById('ev-toast')
  existing?.remove()

  const toast = document.createElement('div')
  toast.id = 'ev-toast'
  toast.className = [
    'fixed bottom-6 left-1/2 -translate-x-1/2 z-50',
    'px-5 py-3 rounded-full shadow-lg',
    'font-onest font-medium text-sm text-white',
    'transition-all duration-300 opacity-0 translate-y-4',
    type === 'success' ? 'bg-verde-agua' : 'bg-red-500',
  ].join(' ')
  toast.textContent = message

  document.body.appendChild(toast)

  requestAnimationFrame(() => {
    toast.classList.remove('opacity-0', 'translate-y-4')
    toast.classList.add('opacity-100', 'translate-y-0')
  })

  setTimeout(() => {
    toast.classList.add('opacity-0', 'translate-y-4')
    setTimeout(() => toast.remove(), 300)
  }, 2500)
}
