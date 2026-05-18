// ═══════════════════════════════════════════════════════
// panels.js — Estação Vegana
// Painéis deslizantes: carrinho, login, detalhe do produto
// Importar como módulo APÓS main.js em todas as páginas
// ═══════════════════════════════════════════════════════

// ── Dados dos produtos (substitua pelos seus reais) ──────
const PRODUCTS_DATA = {
  'feijoada-vegana': {
    id: 'feijoada-vegana',
    name: 'Feijoada Vegana',
    price: 34.90,
    image: 'assets/products/feijoada.png',
    category: 'Pratos Principais',
    ingredients: [
      'Feijão preto',
      'Linguiça de soja defumada',
      'Tofu temperado',
      'Cebola',
      'Alho',
      'Folhas de louro',
      'Pimenta-do-reino',
      'Sal marinho',
      'Azeite de oliva',
      'Coentro fresco',
    ],
    nutrition: [
      { name: 'Valor Energético', per100: '210 kcal / 879 kJ', vd: '11%' },
      { name: 'Carboidratos',     per100: '24,8g',              vd: '8%'  },
      { name: 'Açúcares totais',  per100: '2,1g',               vd: '**' },
      { name: 'Proteínas',        per100: '14,2g',              vd: '19%' },
      { name: 'Gorduras totais',  per100: '5,6g',               vd: '8%'  },
      { name: 'Gorduras sat.',    per100: '0,8g',               vd: '4%'  },
      { name: 'Gorduras trans',   per100: '0g',                 vd: '**' },
      { name: 'Fibras alimentares',per100: '6,4g',              vd: '23%' },
      { name: 'Sódio',            per100: '520mg',              vd: '23%' },
    ],
    reviews: [
      { text: 'Feijoada vegana que convence até quem come carne. Trouxe para um almoço de família e todo mundo pediu pra repetir.', author: 'Rafael M., Lago Sul', stars: 5 },
      { text: 'Sabor incrível e prático demais. Aqueci em 5 minutos e pareceu feito na hora. Já é fixo no meu freezer toda semana.', author: 'Juliana C., Taguatinga', stars: 5 },
      { text: 'A linguiça de soja é o destaque — temperada do jeito certo, sem aquele gosto artificial. Melhor feijoada vegana que já comi.', author: 'Thiago A., Asa Norte', stars: 5 },
    ],
  },
  // Adicione mais produtos seguindo o mesmo padrão
}

// ── Constantes ───────────────────────────────────────────
const FRETE_GRATIS = 120
const FRETE_VALOR  = 15

// ── Estado ───────────────────────────────────────────────
let cartQty = 1   // quantidade no modal do produto

// ════════════════════════════════════════════════════════
// OVERLAY
// ════════════════════════════════════════════════════════
function createOverlay() {
  const existing = document.getElementById('panel-overlay')
  if (existing) return existing

  const el = document.createElement('div')
  el.id = 'panel-overlay'
  el.className = 'panel-overlay'
  document.body.appendChild(el)
  return el
}

function showOverlay(onClickCallback) {
  const overlay = createOverlay()
  overlay.classList.add('panel-overlay--visible')
  overlay.onclick = () => {
    onClickCallback?.()
  }
  document.body.style.overflow = 'hidden'
}

function hideOverlay() {
  const overlay = document.getElementById('panel-overlay')
  if (overlay) {
    overlay.classList.remove('panel-overlay--visible')
    overlay.onclick = null
  }
  document.body.style.overflow = ''
}

// ════════════════════════════════════════════════════════
// PAINEL CARRINHO
// ════════════════════════════════════════════════════════
function buildCartPanel() {
  const existing = document.getElementById('panel-cart')
  if (existing) return existing

  const panel = document.createElement('div')
  panel.id = 'panel-cart'
  panel.className = 'panel'
  panel.innerHTML = `
    <div class="panel__header">
      <h2 class="panel__title">Minha Cesta</h2>
      <button class="panel__close" id="panel-cart-close" aria-label="Fechar carrinho">
        <svg width="20" height="20" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/>
        </svg>
      </button>
    </div>
    <div class="panel__body" id="panel-cart-body"></div>
    <div class="panel__footer" id="panel-cart-footer"></div>
  `
  document.body.appendChild(panel)

  document.getElementById('panel-cart-close').addEventListener('click', closeCartPanel)
  return panel
}

export function openCartPanel() {
  const panel = buildCartPanel()
  renderCartPanel()
  requestAnimationFrame(() => {
    panel.classList.add('panel--visible')
    showOverlay(closeCartPanel)
  })
}

function closeCartPanel() {
  document.getElementById('panel-cart')?.classList.remove('panel--visible')
  hideOverlay()
}

function renderCartPanel() {
  const body   = document.getElementById('panel-cart-body')
  const footer = document.getElementById('panel-cart-footer')
  if (!body || !footer) return

  const items = Cart.getItems()

  if (items.length === 0) {
    body.innerHTML = `
      <div class="panel-cart__empty">
        <svg class="panel-cart__empty-icon" width="64" height="64" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"/>
        </svg>
        <p class="panel-cart__empty-text">Sua cesta está vazia.<br/>Que tal explorar nosso cardápio?</p>
        <a href="produtos.html" class="btn-secondary" onclick="closeCartPanel()">Ver Cardápio</a>
      </div>
    `
    footer.innerHTML = ''
    return
  }

  body.innerHTML = items.map(item => `
    <div class="panel-cart__item" data-id="${item.id}">
      <div class="panel-cart__image">
        ${item.image ? `<img src="${item.image}" alt="${item.name}" />` : ''}
      </div>
      <div class="panel-cart__info">
        <p class="panel-cart__name">${item.name}</p>
        <p class="panel-cart__price">${formatCurrency(item.price)}</p>
        <div class="panel-cart__controls">
          <div class="panel-cart__qty">
            <button class="qty-btn cart-minus" data-id="${item.id}">−</button>
            <span class="panel-cart__qty-value">${item.quantity}</span>
            <button class="qty-btn cart-plus"  data-id="${item.id}">+</button>
          </div>
          <span class="panel-cart__total">${formatCurrency(item.price * item.quantity)}</span>
        </div>
      </div>
    </div>
  `).join('')

  // Eventos dos botões
  body.querySelectorAll('.cart-minus').forEach(btn => {
    btn.addEventListener('click', () => {
      const item = Cart.getItems().find(i => i.id === btn.dataset.id)
      if (item) Cart.updateQuantity(btn.dataset.id, item.quantity - 1)
      renderCartPanel()
    })
  })
  body.querySelectorAll('.cart-plus').forEach(btn => {
    btn.addEventListener('click', () => {
      const item = Cart.getItems().find(i => i.id === btn.dataset.id)
      if (item) Cart.updateQuantity(btn.dataset.id, item.quantity + 1)
      renderCartPanel()
    })
  })

  const subtotal = Cart.getTotal()
  const frete    = subtotal >= FRETE_GRATIS ? 0 : FRETE_VALOR
  const total    = subtotal + frete
  const diff     = FRETE_GRATIS - subtotal

  footer.innerHTML = `
    <div class="panel-cart__frete-msg ${frete === 0 ? 'panel-cart__frete-msg--free' : ''}">
      ${frete === 0
        ? '🎉 Você ganhou frete grátis!'
        : `Falta <strong>${formatCurrency(diff)}</strong> para frete grátis`}
    </div>
    <div class="panel-cart__summary">
      <div class="panel-cart__summary-row">
        <span class="panel-cart__summary-label">Subtotal</span>
        <span class="panel-cart__summary-value">${formatCurrency(subtotal)}</span>
      </div>
      <div class="panel-cart__summary-row">
        <span class="panel-cart__summary-label">Frete</span>
        <span class="panel-cart__summary-value">${frete === 0 ? 'Grátis 🎉' : formatCurrency(frete)}</span>
      </div>
      <div class="panel-cart__summary-row panel-cart__summary-row--total">
        <span class="panel-cart__summary-label">Total</span>
        <span class="panel-cart__summary-value">${formatCurrency(total)}</span>
      </div>
    </div>
    <button class="btn-primary" style="width:100%" onclick="showToast('Redirecionando para o pagamento... 🌿')">
      FINALIZAR PEDIDO →
    </button>
  `
}

// ════════════════════════════════════════════════════════
// PAINEL LOGIN
// ════════════════════════════════════════════════════════
function buildLoginPanel() {
  const existing = document.getElementById('panel-login')
  if (existing) return existing

  const panel = document.createElement('div')
  panel.id = 'panel-login'
  panel.className = 'panel'
  panel.innerHTML = `
    <div class="panel__header">
      <h2 class="panel__title">Minha Conta</h2>
      <button class="panel__close" id="panel-login-close" aria-label="Fechar login">
        <svg width="20" height="20" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/>
        </svg>
      </button>
    </div>
    <div class="panel__body">
      <p class="panel-login__subtitle">Acesse sua conta para acompanhar seus pedidos e salvar seus favoritos.</p>
      <div class="panel-login__form">
        <div>
          <label class="form-label" for="login-email">E-mail</label>
          <input class="form-input" type="email" id="login-email" placeholder="seu@email.com" autocomplete="email" />
        </div>
        <div>
          <label class="form-label" for="login-senha">Senha</label>
          <input class="form-input" type="password" id="login-senha" placeholder="••••••••" autocomplete="current-password" />
        </div>
        <a class="panel-login__forgot">Esqueci minha senha</a>
        <button class="btn-primary" style="width:100%" id="btn-login-submit">ENTRAR →</button>
        <div class="panel-login__divider">
          <span class="panel-login__divider-text">ou</span>
        </div>
        <p class="panel-login__register">Ainda não tem conta? <a href="#">Cadastre-se</a></p>
      </div>
    </div>
  `
  document.body.appendChild(panel)

  document.getElementById('panel-login-close').addEventListener('click', closeLoginPanel)
  document.getElementById('btn-login-submit').addEventListener('click', () => {
    showToast('Entrando... 🌿')
  })
  return panel
}

export function openLoginPanel() {
  const panel = buildLoginPanel()
  requestAnimationFrame(() => {
    panel.classList.add('panel--visible')
    showOverlay(closeLoginPanel)
  })
}

function closeLoginPanel() {
  document.getElementById('panel-login')?.classList.remove('panel--visible')
  hideOverlay()
}

// ════════════════════════════════════════════════════════
// MODAL DETALHE DO PRODUTO
// ════════════════════════════════════════════════════════
function buildProductModal() {
  const existing = document.getElementById('product-modal')
  if (existing) return existing

  const modal = document.createElement('div')
  modal.id = 'product-modal'
  modal.className = 'product-modal'
  modal.innerHTML = `
    <div class="product-modal__sheet">
      <div class="product-modal__handle"></div>
      <div class="product-modal__image" id="modal-image">
        <img id="modal-img" src="" alt="" />
      </div>
      <div class="product-modal__body" id="modal-body">
        <button class="panel__close product-modal__close-btn" id="modal-close-btn" aria-label="Fechar">
          <svg width="20" height="20" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/>
          </svg>
        </button>
        <h2 class="product-modal__name" id="modal-name"></h2>
        <p class="product-modal__price" id="modal-price"></p>
        <h3 class="product-modal__section-title">INGREDIENTES</h3>
        <ul id="modal-ingredients"></ul>
        <h3 class="product-modal__section-title">INFORMAÇÃO NUTRICIONAL</h3>
        <table class="nutri-table" id="modal-nutri">
          <tr><td colspan="3" class="nutri-table__header">Informação Nutricional</td></tr>
          <tr><td colspan="3" class="nutri-table__sub">Porção de 300g | % Valores Diários</td></tr>
        </table>
        <h3 class="product-modal__section-title">O QUE DIZEM NOSSOS CLIENTES</h3>
        <div class="product-modal__reviews" id="modal-reviews"></div>
        <div class="product-modal__add-bar">
          <div class="product-modal__qty">
            <button class="qty-btn" id="modal-qty-minus">−</button>
            <span class="product-modal__qty-value" id="modal-qty-value">1</span>
            <button class="qty-btn" id="modal-qty-plus">+</button>
          </div>
          <button class="btn-primary" id="modal-add-cart">ADICIONAR →</button>
        </div>
      </div>
    </div>
  `
  document.body.appendChild(modal)

  // Fechar
  document.getElementById('modal-close-btn').addEventListener('click', closeProductModal)
  modal.addEventListener('click', e => {
    if (e.target === modal) closeProductModal()
  })

  // Quantidade
  document.getElementById('modal-qty-minus').addEventListener('click', () => {
    cartQty = Math.max(1, cartQty - 1)
    document.getElementById('modal-qty-value').textContent = cartQty
  })
  document.getElementById('modal-qty-plus').addEventListener('click', () => {
    cartQty++
    document.getElementById('modal-qty-value').textContent = cartQty
  })

  return modal
}

export function openProductModal(productId) {
  const data = PRODUCTS_DATA[productId]
  if (!data) {
    console.warn('Produto não encontrado:', productId)
    return
  }

  const modal = buildProductModal()
  cartQty = 1

  // Preenche os dados
  document.getElementById('modal-img').src       = data.image
  document.getElementById('modal-img').alt       = data.name
  document.getElementById('modal-name').textContent  = data.name
  document.getElementById('modal-price').textContent = formatCurrency(data.price)
  document.getElementById('modal-qty-value').textContent = '1'

  // Ingredientes
  const ulIngredients = document.getElementById('modal-ingredients')
  ulIngredients.innerHTML = data.ingredients
    .map(i => `<li class="product-modal__ingredient">${i}</li>`)
    .join('')

  // Tabela nutricional
  const table = document.getElementById('modal-nutri')
  const existingRows = table.querySelectorAll('tr.data-row')
  existingRows.forEach(r => r.remove())
  data.nutrition.forEach((row, i) => {
    const tr = document.createElement('tr')
    tr.className = 'data-row'
    tr.innerHTML = `
      <td>${row.name}</td>
      <td class="nutri-table__value">${row.per100}</td>
      <td class="nutri-table__vd">${row.vd}</td>
    `
    table.appendChild(tr)
  })

  // Reviews
  const reviewsEl = document.getElementById('modal-reviews')
  reviewsEl.innerHTML = data.reviews.map(r => `
    <div class="review-card">
      <div class="review-card__stars">${'★'.repeat(r.stars)}</div>
      <p class="review-card__text">"${r.text}"</p>
      <span class="review-card__author">— ${r.author}</span>
    </div>
  `).join('')

  // Botão adicionar
  const btnAdd = document.getElementById('modal-add-cart')
  btnAdd.onclick = () => {
    for (let i = 0; i < cartQty; i++) {
      Cart.addItem({ id: data.id, name: data.name, price: data.price, image: data.image })
    }
    showToast(`${cartQty}× ${data.name} adicionado! 🌿`)
    closeProductModal()
  }

  // Mostra
  requestAnimationFrame(() => {
    modal.classList.add('product-modal--visible')
    showOverlay(closeProductModal)
  })
}

function closeProductModal() {
  document.getElementById('product-modal')?.classList.remove('product-modal--visible')
  hideOverlay()
}

// ════════════════════════════════════════════════════════
// INICIALIZAÇÃO — vincula os ícones do header
// ════════════════════════════════════════════════════════
document.addEventListener('DOMContentLoaded', () => {
  // Ícone do carrinho
  document.querySelectorAll('[data-open-cart], [aria-label="Cesta de compras"]').forEach(btn => {
    btn.addEventListener('click', e => {
      e.preventDefault()
      openCartPanel()
    })
  })

  // Ícone do perfil/login
  document.querySelectorAll('[data-open-login], [aria-label="Minha conta"]').forEach(btn => {
    btn.addEventListener('click', e => {
      e.preventDefault()
      openLoginPanel()
    })
  })

  // Atualiza carrinho quando muda
  window.addEventListener('cart-updated', () => {
    if (document.getElementById('panel-cart')?.classList.contains('panel--visible')) {
      renderCartPanel()
    }
  })

  // Cards de produto com data-product-id
  document.querySelectorAll('[data-product-id]').forEach(card => {
    card.addEventListener('click', e => {
      e.preventDefault()
      openProductModal(card.dataset.productId)
    })
  })
})
