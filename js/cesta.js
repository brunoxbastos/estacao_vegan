// ═══════════════════════════════════════════════════════
// cesta.js — Cesta de compras
// Estação Vegana
// ═══════════════════════════════════════════════════════

const FRETE_GRATIS = 120
const FRETE_VALOR  = 15

document.addEventListener('DOMContentLoaded', () => {
  initMenu()
  initCartBadge()
  renderCart()
  document.getElementById('btn-finalizar')?.addEventListener('click', handleFinalizar)
})

function renderCart() {
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
    <div class="cart-item" data-id="${item.id}">
      <div class="cart-item__image">
        ${item.image ? `<img src="${item.image}" alt="${item.name}" />` : ''}
      </div>
      <div class="cart-item__info">
        <h3 class="cart-item__name">${item.name}</h3>
        <p class="cart-item__price">${formatCurrency(item.price)}</p>
        <div class="cart-item__controls">
          <div class="cart-item__qty">
            <button class="qty-btn qty-minus" data-id="${item.id}">−</button>
            <span class="cart-item__qty-value">${item.quantity}</span>
            <button class="qty-btn qty-plus" data-id="${item.id}">+</button>
          </div>
          <div style="display:flex;align-items:center;gap:0.75rem">
            <span class="cart-item__total">${formatCurrency(item.price * item.quantity)}</span>
            <button class="btn-remove" data-id="${item.id}" aria-label="Remover">
              <svg width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  `).join('')

  container.querySelectorAll('.qty-minus').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = btn.dataset.id
      const item = Cart.getItems().find(i => i.id === id)
      if (item) Cart.updateQuantity(id, item.quantity - 1)
      renderCart()
    })
  })

  container.querySelectorAll('.qty-plus').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = btn.dataset.id
      const item = Cart.getItems().find(i => i.id === id)
      if (item) Cart.updateQuantity(id, item.quantity + 1)
      renderCart()
    })
  })

  container.querySelectorAll('.btn-remove').forEach(btn => {
    btn.addEventListener('click', () => {
      Cart.removeItem(btn.dataset.id)
      renderCart()
      showToast('Item removido', 'error')
    })
  })

  updateSummary()
}

function updateSummary() {
  const subtotal = Cart.getTotal()
  const frete    = subtotal >= FRETE_GRATIS ? 0 : FRETE_VALOR
  const total    = subtotal + frete

  const elSubtotal = document.getElementById('summary-subtotal')
  const elFrete    = document.getElementById('summary-frete')
  const elTotal    = document.getElementById('summary-total')
  const elFreteMsg = document.getElementById('frete-message')

  if (elSubtotal) elSubtotal.textContent = formatCurrency(subtotal)
  if (elFrete)    elFrete.textContent    = frete === 0 ? 'Grátis 🎉' : formatCurrency(frete)
  if (elTotal)    elTotal.textContent    = formatCurrency(total)

  if (elFreteMsg) {
    if (frete === 0) {
      elFreteMsg.textContent = '🎉 Você ganhou frete grátis!'
      elFreteMsg.classList.add('frete-message--free')
    } else {
      const diff = FRETE_GRATIS - subtotal
      elFreteMsg.textContent = `Falta ${formatCurrency(diff)} para frete grátis`
      elFreteMsg.classList.remove('frete-message--free')
    }
  }
}

function handleFinalizar() {
  if (Cart.getItems().length === 0) {
    showToast('Seu carrinho está vazio!', 'error')
    return
  }
  showToast('Redirecionando para o pagamento... 🌿')
}
