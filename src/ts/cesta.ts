// ═══════════════════════════════════════════════════════
// cesta.ts — Cesta de compras
// Estação Vegana
// ═══════════════════════════════════════════════════════

import { initMenu, initCartBadge, Cart, formatCurrency, showToast } from './main'

const FRETE_GRATIS_THRESHOLD = 120
const FRETE_VALOR = 15

// ── Init ─────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  initMenu()
  initCartBadge()
  renderCart()

  document.getElementById('btn-finalizar')?.addEventListener('click', handleFinalizar)
})

// ── Renderizar cesta ─────────────────────────────────────
function renderCart(): void {
  const container  = document.getElementById('cart-items')
  const emptyState = document.getElementById('cart-empty')
  const summary    = document.getElementById('cart-summary')
  if (!container) return

  const items = Cart.getItems()

  if (items.length === 0) {
    emptyState?.classList.remove('hidden')
    summary?.classList.add('hidden')
    container.innerHTML = ''
    return
  }

  emptyState?.classList.add('hidden')
  summary?.classList.remove('hidden')

  container.innerHTML = items.map(item => `
    <div class="cart-item flex gap-4 py-5 border-b border-verde-menta" data-id="${item.id}">
      <div class="w-20 h-20 rounded-xl bg-verde-menta overflow-hidden shrink-0">
        ${item.image
          ? `<img src="${item.image}" alt="${item.name}" class="w-full h-full object-cover" onerror="this.style.display='none'">`
          : ''}
      </div>
      <div class="flex-1 min-w-0">
        <h3 class="font-onest font-semibold text-sm text-verde-floresta leading-tight">${item.name}</h3>
        <p class="font-onest text-verde-agua font-bold text-sm mt-1">${formatCurrency(item.price)}</p>
        <div class="flex items-center justify-between mt-3">
          <div class="flex items-center gap-3">
            <button class="qty-btn qty-minus" data-id="${item.id}" aria-label="Diminuir">−</button>
            <span class="font-onest font-bold text-verde-floresta text-sm w-6 text-center">${item.quantity}</span>
            <button class="qty-btn qty-plus" data-id="${item.id}" aria-label="Aumentar">+</button>
          </div>
          <div class="flex items-center gap-3">
            <span class="font-onest font-bold text-verde-floresta text-sm">
              ${formatCurrency(item.price * item.quantity)}
            </span>
            <button class="btn-remove text-red-400 hover:text-red-600 transition-colors" data-id="${item.id}" aria-label="Remover">
              <svg width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  `).join('')

  // Bind eventos
  container.querySelectorAll<HTMLButtonElement>('.qty-minus').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = btn.dataset['id'] ?? ''
      const item = Cart.getItems().find(i => i.id === id)
      if (item) Cart.updateQuantity(id, item.quantity - 1)
      renderCart()
    })
  })

  container.querySelectorAll<HTMLButtonElement>('.qty-plus').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = btn.dataset['id'] ?? ''
      const item = Cart.getItems().find(i => i.id === id)
      if (item) Cart.updateQuantity(id, item.quantity + 1)
      renderCart()
    })
  })

  container.querySelectorAll<HTMLButtonElement>('.btn-remove').forEach(btn => {
    btn.addEventListener('click', () => {
      Cart.removeItem(btn.dataset['id'] ?? '')
      renderCart()
      showToast('Item removido', 'error')
    })
  })

  updateSummary()
}

// ── Atualizar resumo de valores ──────────────────────────
function updateSummary(): void {
  const subtotal = Cart.getTotal()
  const frete    = subtotal >= FRETE_GRATIS_THRESHOLD ? 0 : FRETE_VALOR
  const total    = subtotal + frete

  const elSubtotal = document.getElementById('summary-subtotal')
  const elFrete    = document.getElementById('summary-frete')
  const elTotal    = document.getElementById('summary-total')
  const elFreteMsg = document.getElementById('frete-message')

  if (elSubtotal) elSubtotal.textContent = formatCurrency(subtotal)
  if (elFrete)    elFrete.textContent    = frete === 0 ? 'Grátis' : formatCurrency(frete)
  if (elTotal)    elTotal.textContent    = formatCurrency(total)

  if (elFreteMsg) {
    if (frete === 0) {
      elFreteMsg.textContent = '🎉 Você ganhou frete grátis!'
      elFreteMsg.className   = 'text-verde-agua font-onest font-semibold text-sm text-center'
    } else {
      const diff = FRETE_GRATIS_THRESHOLD - subtotal
      elFreteMsg.textContent = `Falta ${formatCurrency(diff)} para frete grátis`
      elFreteMsg.className   = 'text-verde-floresta/60 font-onest text-sm text-center'
    }
  }
}

// ── Finalizar pedido ─────────────────────────────────────
function handleFinalizar(): void {
  if (Cart.getItems().length === 0) {
    showToast('Seu carrinho está vazio!', 'error')
    return
  }
  // Redirecionar para checkout (placeholder)
  showToast('Redirecionando para o pagamento... 🌿')
  setTimeout(() => {
    alert('Integração com gateway de pagamento em breve!')
  }, 1000)
}
