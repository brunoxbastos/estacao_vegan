// ═══════════════════════════════════════════════════════
// produtos.ts — Listagem de produtos
// Estação Vegana
// ═══════════════════════════════════════════════════════

import { initMenu, initScrollFade, initCartBadge, Cart, showToast } from './main'

// ── Tipos ────────────────────────────────────────────────
interface Product {
  id: string
  name: string
  description: string
  price: number
  category: 'pratos' | 'lanches' | 'condimentos' | 'kits'
  image: string
  badge?: string
}

// ── Dados dos produtos ───────────────────────────────────
const PRODUCTS: Product[] = [
  { id: 'feijoada',       name: 'Feijoada Vegana',            description: 'Feijão preto, linguiça de soja, tempero baiano.',         price: 28.90, category: 'pratos',      image: 'assets/feijoada.jpg' },
  { id: 'moqueca',        name: 'Moqueca de Palmito',          description: 'Palmito pupunha, leite de coco, coentro.',                price: 29.90, category: 'pratos',      image: 'assets/moqueca.jpg' },
  { id: 'escondidinho',   name: 'Escondidinho de Jaca',        description: 'Jaca desfiada, purê de mandioca gratinado.',              price: 26.90, category: 'pratos',      image: 'assets/escondidinho.jpg' },
  { id: 'strogonoff',     name: 'Strogonoff de Cogumelos',     description: 'Mix de cogumelos, creme de caju, mostarda.',             price: 27.90, category: 'pratos',      image: 'assets/strogonoff.jpg' },
  { id: 'curry',          name: 'Curry de Grão-de-Bico',       description: 'Grão-de-bico, leite de coco, especiarias indianas.',      price: 25.90, category: 'pratos',      image: 'assets/curry.jpg' },
  { id: 'bobo',           name: 'Bobó de Jaca Verde',          description: 'Jaca verde, dendê, amendoim, leite de coco.',             price: 27.90, category: 'pratos',      image: 'assets/bobo.jpg' },
  { id: 'coxinha',        name: 'Coxinha de Palmito',          description: 'Palmito com alho-poró. Sem glúten. 6 unid.',              price: 39.90, category: 'lanches',     image: 'assets/coxinha.jpg', badge: 'Sem glúten' },
  { id: 'kibbeh',         name: 'Kibbeh Vegetal',              description: 'Trigo, hortelã, recheio de cogumelos e nozes.',           price: 38.90, category: 'lanches',     image: 'assets/kibbeh.jpg' },
  { id: 'hamburguer',     name: 'Hambúrguer de Soja',          description: 'Proteína de soja, tempero defumado. Sem glúten.',         price: 12.90, category: 'lanches',     image: 'assets/hamburguer.jpg', badge: 'Sem glúten' },
  { id: 'steak',          name: 'Steak Vegano',                description: 'Proteína texturizada, ervas finas, shoyu. 2 unid.',       price: 14.90, category: 'lanches',     image: 'assets/steak.jpg' },
  { id: 'pastel',         name: 'Pastel Vegano',               description: 'Massa crocante, proteína de soja, azeitona. 4 unid.',     price: 22.90, category: 'lanches',     image: 'assets/pastel.jpg' },
  { id: 'bola-queijo',    name: 'Bola de Queijo Vegano',       description: 'Queijo de caju, polvilho azedo. Sem glúten. 8 unid.',     price: 24.90, category: 'lanches',     image: 'assets/bola-queijo.jpg', badge: 'Sem glúten' },
  { id: 'maio-caju',      name: 'Maionese de Castanha de Caju', description: 'Feita aqui, sem conservantes. 150g',                    price: 16.90, category: 'condimentos', image: 'assets/maio-caju.jpg' },
  { id: 'maio-alho',      name: 'Maionese de Alho',            description: 'Cremosa e aromática. 150g',                              price: 16.90, category: 'condimentos', image: 'assets/maio-alho.jpg' },
  { id: 'molho-pimenta',  name: 'Molho de Pimenta Artesanal',  description: 'Apimentado na medida certa. 100ml',                      price: 14.90, category: 'condimentos', image: 'assets/molho-pimenta.jpg' },
  { id: 'pate-tomate',    name: 'Patê de Tomate Seco',         description: 'Para acompanhar qualquer coisa. 150g',                   price: 18.90, category: 'condimentos', image: 'assets/pate-tomate.jpg' },
  { id: 'pasta-amendoim', name: 'Pasta de Amendoim Temperada', description: 'Salgada, encorpada, versátil. 200g',                     price: 15.90, category: 'condimentos', image: 'assets/pasta-amendoim.jpg' },
  { id: 'manteiga',       name: 'Manteiga Vegetal com Ervas',  description: 'Feita com ervas frescas. 150g',                          price: 19.90, category: 'condimentos', image: 'assets/manteiga.jpg' },
  { id: 'kit-semana',     name: 'Kit Semana Resolvida',        description: '5 pratos à escolha + 1 molho artesanal.',                price: 119.90, category: 'kits',       image: 'assets/kit-semana.jpg', badge: 'Mais popular' },
  { id: 'kit-lanche',     name: 'Kit Lanche Fest',             description: '20 salgados variados à sua escolha.',                    price: 89.90,  category: 'kits',       image: 'assets/kit-lanche.jpg' },
  { id: 'kit-estreia',    name: 'Kit Estreia',                 description: '3 pratos + 10 salgados + 1 condimento.',                 price: 89.90,  category: 'kits',       image: 'assets/kit-estreia.jpg', badge: '10% off' },
]

// ── Estado ───────────────────────────────────────────────
let activeCategory: string = 'todos'
let searchQuery: string = ''

// ── Init ─────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  initMenu()
  initScrollFade()
  initCartBadge()
  initFilters()
  initSearch()
  renderProducts()
  handleHashNavigation()
})

// ── Filtros de categoria ─────────────────────────────────
function initFilters(): void {
  const filterBtns = document.querySelectorAll<HTMLButtonElement>('[data-filter]')

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      activeCategory = btn.dataset['filter'] ?? 'todos'
      filterBtns.forEach(b => {
        b.classList.toggle('bg-verde-agua', b === btn)
        b.classList.toggle('text-white',    b === btn)
        b.classList.toggle('text-verde-floresta', b !== btn)
      })
      renderProducts()
    })
  })
}

// ── Busca ────────────────────────────────────────────────
function initSearch(): void {
  const input = document.getElementById('search-input') as HTMLInputElement | null
  input?.addEventListener('input', () => {
    searchQuery = input.value.toLowerCase()
    renderProducts()
  })
}

// ── Filtrar produtos ─────────────────────────────────────
function getFilteredProducts(): Product[] {
  return PRODUCTS.filter(p => {
    const matchCat = activeCategory === 'todos' || p.category === activeCategory
    const matchSearch = !searchQuery ||
      p.name.toLowerCase().includes(searchQuery) ||
      p.description.toLowerCase().includes(searchQuery)
    return matchCat && matchSearch
  })
}

// ── Renderizar grid ──────────────────────────────────────
function renderProducts(): void {
  const grid = document.getElementById('products-grid')
  if (!grid) return

  const products = getFilteredProducts()

  if (products.length === 0) {
    grid.innerHTML = `
      <div class="col-span-2 text-center py-16">
        <p class="font-alike text-verde-floresta/50 text-lg">Nenhum produto encontrado.</p>
      </div>
    `
    return
  }

  grid.innerHTML = products.map(p => `
    <a href="produto-detalhe.html?id=${p.id}"
       class="product-card bg-white rounded-2xl overflow-hidden shadow-sm border border-verde-menta group">
      <div class="relative aspect-square bg-verde-menta overflow-hidden">
        <img
          src="${p.image}"
          alt="${p.name}"
          class="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          onerror="this.style.display='none'"
        />
        ${p.badge ? `<span class="absolute top-2 left-2 bg-laranja text-white font-onest font-bold text-xs px-2 py-1 rounded-full">${p.badge}</span>` : ''}
      </div>
      <div class="p-4">
        <h3 class="font-onest font-bold text-verde-floresta text-sm leading-tight">${p.name}</h3>
        <p class="font-alike text-verde-floresta/60 text-xs mt-1 leading-snug">${p.description}</p>
        <div class="flex items-center justify-between mt-3">
          <span class="font-onest font-bold text-verde-agua text-base">
            R$ ${p.price.toFixed(2).replace('.', ',')}
          </span>
          <button
            data-product-id="${p.id}"
            class="add-to-cart w-8 h-8 bg-laranja text-white rounded-full flex items-center justify-center text-xl font-bold hover:bg-verde-agua transition-colors"
            aria-label="Adicionar ${p.name} ao carrinho"
          >+</button>
        </div>
      </div>
    </a>
  `).join('')

  // Bind nos botões de adicionar
  grid.querySelectorAll<HTMLButtonElement>('.add-to-cart').forEach(btn => {
    btn.addEventListener('click', (e: Event) => {
      e.preventDefault()
      e.stopPropagation()
      const id = btn.dataset['productId']
      const product = PRODUCTS.find(p => p.id === id)
      if (!product) return
      Cart.addItem({ id: product.id, name: product.name, price: product.price, image: product.image })
      showToast(`${product.name} adicionado! 🌿`)
    })
  })
}

// ── Hash navigation (ex: produtos.html#kits) ─────────────
function handleHashNavigation(): void {
  const hash = window.location.hash.replace('#', '')
  if (!hash) return
  const filterBtn = document.querySelector<HTMLButtonElement>(`[data-filter="${hash}"]`)
  filterBtn?.click()
}
