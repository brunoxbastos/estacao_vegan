// ═══════════════════════════════════════════════════════
// panels.js — Estação Vegana
// Painéis deslizantes: carrinho, login, detalhe do produto
// Importar como módulo APÓS main.js em todas as páginas
// ═══════════════════════════════════════════════════════

import { Cart, formatCurrency, showToast } from './main.js'

// ── Dados dos produtos ───────────────────────────────────
const PRODUCTS_DATA = {
  'feijoada-vegana': {
    id: 'feijoada-vegana',
    name: 'Feijoada Vegana',
    price: 34.90,
    image: 'assets/feijoada.webp',
    category: 'Pratos Principais',
    ingredients: ['Feijão preto', 'Linguiça de soja defumada', 'Tofu temperado', 'Cebola', 'Alho', 'Folhas de louro', 'Pimenta-do-reino', 'Sal marinho', 'Azeite de oliva', 'Coentro fresco'],
    nutrition: [
      { name: 'Valor Energético',   per100: '210 kcal / 879 kJ', vd: '11%' },
      { name: 'Carboidratos',       per100: '24,8g',              vd: '8%'  },
      { name: 'Açúcares totais',    per100: '2,1g',               vd: '**'  },
      { name: 'Proteínas',          per100: '14,2g',              vd: '19%' },
      { name: 'Gorduras totais',    per100: '5,6g',               vd: '8%'  },
      { name: 'Gorduras sat.',      per100: '0,8g',               vd: '4%'  },
      { name: 'Gorduras trans',     per100: '0g',                 vd: '**'  },
      { name: 'Fibras alimentares', per100: '6,4g',               vd: '23%' },
      { name: 'Sódio',              per100: '520mg',              vd: '23%' },
    ],
    reviews: [
      { text: 'Feijoada vegana que convence até quem come carne. Trouxe para um almoço de família e todo mundo pediu pra repetir.', author: 'Rafael M., Lago Sul', stars: 5 },
      { text: 'Sabor incrível e prático demais. Aqueci em 5 minutos e pareceu feito na hora. Já é fixo no meu freezer toda semana.', author: 'Juliana C., Taguatinga', stars: 5 },
      { text: 'A linguiça de soja é o destaque — temperada do jeito certo, sem aquele gosto artificial. Melhor feijoada vegana que já comi.', author: 'Thiago A., Asa Norte', stars: 5 },
    ],
  },

  'moqueca-palmito': {
    id: 'moqueca-palmito',
    name: 'Moqueca de Palmito',
    price: 32.90,
    image: 'assets/moqueca.webp',
    category: 'Pratos Principais',
    ingredients: ['Palmito pupunha', 'Leite de coco', 'Pimentão colorido', 'Tomate', 'Cebola', 'Coentro fresco', 'Azeite de dendê', 'Alho', 'Sal marinho', 'Pimenta dedo-de-moça'],
    nutrition: [
      { name: 'Valor Energético',   per100: '185 kcal / 774 kJ', vd: '9%'  },
      { name: 'Carboidratos',       per100: '12,3g',              vd: '4%'  },
      { name: 'Açúcares totais',    per100: '3,8g',               vd: '**'  },
      { name: 'Proteínas',          per100: '3,1g',               vd: '4%'  },
      { name: 'Gorduras totais',    per100: '14,2g',              vd: '20%' },
      { name: 'Gorduras sat.',      per100: '9,6g',               vd: '48%' },
      { name: 'Gorduras trans',     per100: '0g',                 vd: '**'  },
      { name: 'Fibras alimentares', per100: '3,2g',               vd: '11%' },
      { name: 'Sódio',              per100: '480mg',              vd: '21%' },
    ],
    reviews: [
      { text: 'Nunca pensei que palmito pudesse ser tão saboroso assim. A moqueca ficou cremosa do jeito certo!', author: 'Camila F., Asa Sul', stars: 5 },
      { text: 'Perfeita para um almoço especial sem sair de casa. O dendê dá um toque incrível.', author: 'Marcos T., Ceilândia', stars: 5 },
    ],
  },

  'bobo-jaca': {
    id: 'bobo-jaca',
    name: 'Bobó de Jaca Verde',
    price: 33.90,
    image: 'assets/bobo.webp',
    category: 'Pratos Principais',
    ingredients: ['Jaca verde', 'Leite de coco', 'Dendê', 'Amendoim torrado', 'Cebola', 'Alho', 'Coentro', 'Sal marinho', 'Azeite', 'Pimenta-do-reino'],
    nutrition: [
      { name: 'Valor Energético',   per100: '198 kcal / 829 kJ', vd: '10%' },
      { name: 'Carboidratos',       per100: '18,5g',              vd: '6%'  },
      { name: 'Açúcares totais',    per100: '4,2g',               vd: '**'  },
      { name: 'Proteínas',          per100: '5,8g',               vd: '8%'  },
      { name: 'Gorduras totais',    per100: '12,1g',              vd: '17%' },
      { name: 'Gorduras sat.',      per100: '7,4g',               vd: '37%' },
      { name: 'Gorduras trans',     per100: '0g',                 vd: '**'  },
      { name: 'Fibras alimentares', per100: '4,8g',               vd: '17%' },
      { name: 'Sódio',              per100: '390mg',              vd: '17%' },
    ],
    reviews: [
      { text: 'A jaca desfiada é impressionante — quem diria que uma fruta pode substituir tão bem a proteína animal!', author: 'Fernanda L., Sudoeste', stars: 5 },
      { text: 'Receita baiana autêntica e vegana. Combinação perfeita de sabores.', author: 'André S., Guará', stars: 5 },
    ],
  },

  'escondidinho-jaca': {
    id: 'escondidinho-jaca',
    name: 'Escondidinho de Jaca',
    price: 31.90,
    image: 'assets/escondidinho.webp',
    category: 'Pratos Principais',
    ingredients: ['Jaca verde desfiada', 'Mandioca', 'Leite vegetal', 'Alho', 'Cebola', 'Cheiro-verde', 'Creme de caju', 'Sal marinho', 'Azeite de oliva', 'Páprica defumada'],
    nutrition: [
      { name: 'Valor Energético',   per100: '175 kcal / 732 kJ', vd: '9%'  },
      { name: 'Carboidratos',       per100: '22,6g',              vd: '8%'  },
      { name: 'Açúcares totais',    per100: '2,9g',               vd: '**'  },
      { name: 'Proteínas',          per100: '6,3g',               vd: '8%'  },
      { name: 'Gorduras totais',    per100: '7,2g',               vd: '10%' },
      { name: 'Gorduras sat.',      per100: '1,8g',               vd: '9%'  },
      { name: 'Gorduras trans',     per100: '0g',                 vd: '**'  },
      { name: 'Fibras alimentares', per100: '3,9g',               vd: '14%' },
      { name: 'Sódio',              per100: '410mg',              vd: '18%' },
    ],
    reviews: [
      { text: 'Purê de mandioca gratinado e jaca desfiada — comfort food perfeito para qualquer dia.', author: 'Letícia B., Águas Claras', stars: 5 },
      { text: 'Minha família inteira adorou, inclusive quem come carne. Pedi mais duas unidades!', author: 'Paulo R., Sobradinho', stars: 5 },
    ],
  },

  'strogonoff-cogumelos': {
    id: 'strogonoff-cogumelos',
    name: 'Strogonoff de Cogumelos',
    price: 33.90,
    image: 'assets/strongonoff.webp',
    category: 'Pratos Principais',
    ingredients: ['Mix de cogumelos (shiitake, paris, shimeji)', 'Creme de caju', 'Mostarda dijon', 'Cebola', 'Alho', 'Shoyu', 'Azeite de oliva', 'Pimenta-do-reino', 'Sal marinho', 'Salsinha'],
    nutrition: [
      { name: 'Valor Energético',   per100: '190 kcal / 795 kJ', vd: '10%' },
      { name: 'Carboidratos',       per100: '11,4g',              vd: '4%'  },
      { name: 'Açúcares totais',    per100: '3,1g',               vd: '**'  },
      { name: 'Proteínas',          per100: '8,9g',               vd: '12%' },
      { name: 'Gorduras totais',    per100: '13,2g',              vd: '19%' },
      { name: 'Gorduras sat.',      per100: '2,4g',               vd: '12%' },
      { name: 'Gorduras trans',     per100: '0g',                 vd: '**'  },
      { name: 'Fibras alimentares', per100: '2,6g',               vd: '9%'  },
      { name: 'Sódio',              per100: '560mg',              vd: '24%' },
    ],
    reviews: [
      { text: 'Cremoso, saboroso e sem nada de origem animal. Os cogumelos dão uma textura incrível!', author: 'Bianca M., Plano Piloto', stars: 5 },
      { text: 'Meu prato favorito do cardápio. Compro toda semana — combina demais com arroz.', author: 'Ricardo A., Taguatinga', stars: 5 },
    ],
  },

  'curry-grao': {
    id: 'curry-grao',
    name: 'Curry de Grão-de-Bico',
    price: 30.90,
    image: 'assets/curry.webp',
    category: 'Pratos Principais',
    ingredients: ['Grão-de-bico', 'Leite de coco', 'Tomate', 'Cebola', 'Alho', 'Gengibre', 'Curry em pó', 'Cúrcuma', 'Cominho', 'Coentro fresco', 'Sal marinho'],
    nutrition: [
      { name: 'Valor Energético',   per100: '165 kcal / 691 kJ', vd: '8%'  },
      { name: 'Carboidratos',       per100: '20,8g',              vd: '7%'  },
      { name: 'Açúcares totais',    per100: '3,4g',               vd: '**'  },
      { name: 'Proteínas',          per100: '7,6g',               vd: '10%' },
      { name: 'Gorduras totais',    per100: '6,8g',               vd: '10%' },
      { name: 'Gorduras sat.',      per100: '4,2g',               vd: '21%' },
      { name: 'Gorduras trans',     per100: '0g',                 vd: '**'  },
      { name: 'Fibras alimentares', per100: '5,2g',               vd: '19%' },
      { name: 'Sódio',              per100: '350mg',              vd: '15%' },
    ],
    reviews: [
      { text: 'Especiarias na medida certa — nem muito forte, nem fraco. Perfeito com arroz basmati.', author: 'Sofia K., Lago Norte', stars: 5 },
      { text: 'Me fez sentir que estava num restaurante indiano. Incrível para o preço.', author: 'Henrique D., Samambaia', stars: 5 },
    ],
  },

  'coxinha-palmito': {
    id: 'coxinha-palmito',
    name: 'Coxinha de Palmito',
    price: 28.90,
    image: 'assets/coxinha_palmito.webp',
    category: 'Lanches e Snacks',
    ingredients: ['Palmito pupunha', 'Alho-poró', 'Massa de batata', 'Farinha de arroz', 'Cebola', 'Azeite de oliva', 'Cheiro-verde', 'Pimenta-do-reino', 'Sal marinho'],
    nutrition: [
      { name: 'Valor Energético',   per100: '220 kcal / 921 kJ', vd: '11%' },
      { name: 'Carboidratos',       per100: '32,4g',              vd: '11%' },
      { name: 'Açúcares totais',    per100: '1,8g',               vd: '**'  },
      { name: 'Proteínas',          per100: '4,2g',               vd: '6%'  },
      { name: 'Gorduras totais',    per100: '8,6g',               vd: '12%' },
      { name: 'Gorduras sat.',      per100: '1,2g',               vd: '6%'  },
      { name: 'Gorduras trans',     per100: '0g',                 vd: '**'  },
      { name: 'Fibras alimentares', per100: '2,1g',               vd: '8%'  },
      { name: 'Sódio',              per100: '430mg',              vd: '19%' },
    ],
    reviews: [
      { text: 'A massa fica crocante por fora e macia por dentro. Meus filhos amaram!', author: 'Cláudia N., Ceilândia', stars: 5 },
      { text: 'Sem glúten e saborosa. Serve 6 unidades generosas, ótimo custo-benefício.', author: 'Rodrigo P., Recanto das Emas', stars: 5 },
    ],
  },

  'kibbeh-vegetal': {
    id: 'kibbeh-vegetal',
    name: 'Kibbeh Vegetal',
    price: 26.90,
    image: 'assets/kibbeh.webp',
    category: 'Lanches e Snacks',
    ingredients: ['Trigo burgol', 'Cogumelos frescos', 'Nozes', 'Hortelã fresca', 'Cebola', 'Canela', 'Pimenta síria', 'Limão', 'Azeite de oliva', 'Sal marinho'],
    nutrition: [
      { name: 'Valor Energético',   per100: '235 kcal / 983 kJ', vd: '12%' },
      { name: 'Carboidratos',       per100: '28,6g',              vd: '10%' },
      { name: 'Açúcares totais',    per100: '1,4g',               vd: '**'  },
      { name: 'Proteínas',          per100: '7,8g',               vd: '10%' },
      { name: 'Gorduras totais',    per100: '10,4g',              vd: '15%' },
      { name: 'Gorduras sat.',      per100: '1,4g',               vd: '7%'  },
      { name: 'Gorduras trans',     per100: '0g',                 vd: '**'  },
      { name: 'Fibras alimentares', per100: '3,6g',               vd: '13%' },
      { name: 'Sódio',              per100: '310mg',              vd: '13%' },
    ],
    reviews: [
      { text: 'Sabor autêntico com recheio de cogumelos e nozes. Trouxe de volta a memória afetiva!', author: 'Mariana Z., Asa Norte', stars: 5 },
      { text: 'Crocante por fora, recheado por dentro. Difícil comer só um.', author: 'Carlos E., Park Way', stars: 5 },
    ],
  },

  'steak-vegano': {
    id: 'steak-vegano',
    name: 'Steak Vegano',
    price: 29.90,
    image: 'assets/steak_vetgano.webp',
    category: 'Lanches e Snacks',
    ingredients: ['Proteína texturizada de soja', 'Ervas finas (tomilho, alecrim, manjericão)', 'Shoyu', 'Alho', 'Cebola em pó', 'Páprica defumada', 'Azeite de oliva', 'Pimenta-do-reino', 'Sal marinho'],
    nutrition: [
      { name: 'Valor Energético',   per100: '242 kcal / 1013 kJ', vd: '12%' },
      { name: 'Carboidratos',       per100: '14,2g',               vd: '5%'  },
      { name: 'Açúcares totais',    per100: '2,0g',                vd: '**'  },
      { name: 'Proteínas',          per100: '22,8g',               vd: '30%' },
      { name: 'Gorduras totais',    per100: '9,6g',                vd: '14%' },
      { name: 'Gorduras sat.',      per100: '1,4g',                vd: '7%'  },
      { name: 'Gorduras trans',     per100: '0g',                  vd: '**'  },
      { name: 'Fibras alimentares', per100: '3,8g',                vd: '14%' },
      { name: 'Sódio',              per100: '620mg',               vd: '27%' },
    ],
    reviews: [
      { text: 'Alta proteína, sabor defumado marcante. Perfeito antes do treino.', author: 'Bruno G., Núcleo Bandeirante', stars: 5 },
      { text: 'Textura muito boa, parece carne mesmo. Aprovado até pelo meu marido onívoro!', author: 'Aline S., Gama', stars: 5 },
    ],
  },

  'hamburguer-soja': {
    id: 'hamburguer-soja',
    name: 'Hambúrguer de Soja',
    price: 27.90,
    image: 'assets/hamburguerr_soja.webp',
    category: 'Lanches e Snacks',
    ingredients: ['Proteína de soja texturizada', 'Páprica defumada', 'Alho', 'Cebola', 'Mostarda', 'Farinha de aveia', 'Azeite de oliva', 'Pimenta-do-reino', 'Sal marinho'],
    nutrition: [
      { name: 'Valor Energético',   per100: '228 kcal / 954 kJ', vd: '11%' },
      { name: 'Carboidratos',       per100: '16,8g',              vd: '6%'  },
      { name: 'Açúcares totais',    per100: '1,6g',               vd: '**'  },
      { name: 'Proteínas',          per100: '20,4g',              vd: '27%' },
      { name: 'Gorduras totais',    per100: '8,2g',               vd: '12%' },
      { name: 'Gorduras sat.',      per100: '1,0g',               vd: '5%'  },
      { name: 'Gorduras trans',     per100: '0g',                 vd: '**'  },
      { name: 'Fibras alimentares', per100: '4,4g',               vd: '16%' },
      { name: 'Sódio',              per100: '540mg',              vd: '23%' },
    ],
    reviews: [
      { text: 'Hambúrguer sem glúten e cheio de proteína. Não fico sem no freezer.', author: 'Tatiane V., Santa Maria', stars: 5 },
      { text: 'Sabor defumado que pega no gosto. Ótimo na air fryer!', author: 'Felipe C., Cruzeiro', stars: 5 },
    ],
  },

  'pastel-vegano': {
    id: 'pastel-vegano',
    name: 'Pastel Vegano',
    price: 24.90,
    image: 'assets/pastel_vegetal.webp',
    category: 'Lanches e Snacks',
    ingredients: ['Massa de farinha de trigo integral', 'Proteína de soja', 'Azeitona preta', 'Tomate', 'Cebola', 'Cheiro-verde', 'Pimenta-do-reino', 'Sal marinho', 'Azeite de oliva'],
    nutrition: [
      { name: 'Valor Energético',   per100: '265 kcal / 1109 kJ', vd: '13%' },
      { name: 'Carboidratos',       per100: '35,2g',               vd: '12%' },
      { name: 'Açúcares totais',    per100: '2,2g',                vd: '**'  },
      { name: 'Proteínas',          per100: '9,4g',                vd: '13%' },
      { name: 'Gorduras totais',    per100: '9,8g',                vd: '14%' },
      { name: 'Gorduras sat.',      per100: '1,8g',                vd: '9%'  },
      { name: 'Gorduras trans',     per100: '0g',                  vd: '**'  },
      { name: 'Fibras alimentares', per100: '3,0g',                vd: '11%' },
      { name: 'Sódio',              per100: '480mg',               vd: '21%' },
    ],
    reviews: [
      { text: 'Massa crocante e recheio bem temperado. Desaparece em segundos!', author: 'Nathalia G., Riacho Fundo', stars: 5 },
      { text: 'Leva 8 min na air fryer e fica perfeito. Melhor lanche vegano que já comi.', author: 'Eduardo W., Estrutural', stars: 5 },
    ],
  },

  'maionese-alho': {
    id: 'maionese-alho',
    name: 'Maionese de Alho',
    price: 18.90,
    image: 'assets/maionese_de_alho.webp',
    category: 'Condimentos Artesanais',
    ingredients: ['Castanha de caju', 'Alho assado', 'Limão', 'Mostarda dijon', 'Azeite de oliva extra virgem', 'Sal marinho', 'Água filtrada'],
    nutrition: [
      { name: 'Valor Energético',   per100: '310 kcal / 1297 kJ', vd: '16%' },
      { name: 'Carboidratos',       per100: '8,4g',                vd: '3%'  },
      { name: 'Açúcares totais',    per100: '1,2g',                vd: '**'  },
      { name: 'Proteínas',          per100: '5,6g',                vd: '7%'  },
      { name: 'Gorduras totais',    per100: '28,4g',               vd: '41%' },
      { name: 'Gorduras sat.',      per100: '4,8g',                vd: '24%' },
      { name: 'Gorduras trans',     per100: '0g',                  vd: '**'  },
      { name: 'Fibras alimentares', per100: '1,2g',                vd: '4%'  },
      { name: 'Sódio',              per100: '280mg',               vd: '12%' },
    ],
    reviews: [
      { text: 'Cremosa demais! Fica ótima com pão, salada, pastel — coloco em tudo.', author: 'Priscila H., Guará', stars: 5 },
      { text: 'Melhor maionese vegana do mercado. Nunca mais voltei para a industrializada.', author: 'Leonardo M., Taguatinga Sul', stars: 5 },
    ],
  },

  'pate-tomate': {
    id: 'pate-tomate',
    name: 'Patê de Tomate Seco',
    price: 19.90,
    image: 'assets/pate_de_tomate.webp',
    category: 'Condimentos Artesanais',
    ingredients: ['Tomate seco', 'Castanha de caju', 'Azeite de oliva extra virgem', 'Alho', 'Manjericão fresco', 'Limão', 'Sal marinho', 'Pimenta-do-reino'],
    nutrition: [
      { name: 'Valor Energético',   per100: '290 kcal / 1213 kJ', vd: '15%' },
      { name: 'Carboidratos',       per100: '12,6g',               vd: '4%'  },
      { name: 'Açúcares totais',    per100: '5,8g',                vd: '**'  },
      { name: 'Proteínas',          per100: '6,2g',                vd: '8%'  },
      { name: 'Gorduras totais',    per100: '24,8g',               vd: '36%' },
      { name: 'Gorduras sat.',      per100: '4,2g',                vd: '21%' },
      { name: 'Gorduras trans',     per100: '0g',                  vd: '**'  },
      { name: 'Fibras alimentares', per100: '2,4g',                vd: '9%'  },
      { name: 'Sódio',              per100: '320mg',               vd: '14%' },
    ],
    reviews: [
      { text: 'Patê intenso e aromático. Perfeito com torradas e também em receitas.', author: 'Vanessa R., Lago Sul', stars: 5 },
      { text: 'Sabor de tomate seco concentrado, artesanal de verdade. Compro sempre!', author: 'Gustavo P., Asa Norte', stars: 5 },
    ],
  },

  'manteiga-ervas': {
    id: 'manteiga-ervas',
    name: 'Manteiga Vegetal com Ervas',
    price: 22.90,
    image: 'assets/manteiga_vegteetal.webp',
    category: 'Condimentos Artesanais',
    ingredients: ['Gordura de coco', 'Azeite de oliva', 'Ervas frescas (alecrim, tomilho, sálvia)', 'Alho assado', 'Sal marinho com flor de sal', 'Cúrcuma'],
    nutrition: [
      { name: 'Valor Energético',   per100: '720 kcal / 3013 kJ', vd: '36%' },
      { name: 'Carboidratos',       per100: '0,8g',                vd: '0%'  },
      { name: 'Açúcares totais',    per100: '0,2g',                vd: '**'  },
      { name: 'Proteínas',          per100: '0,4g',                vd: '1%'  },
      { name: 'Gorduras totais',    per100: '80,2g',               vd: '116%'},
      { name: 'Gorduras sat.',      per100: '54,6g',               vd: '273%'},
      { name: 'Gorduras trans',     per100: '0g',                  vd: '**'  },
      { name: 'Fibras alimentares', per100: '0g',                  vd: '0%'  },
      { name: 'Sódio',              per100: '380mg',               vd: '17%' },
    ],
    reviews: [
      { text: 'Substitui a manteiga comum completamente. Espalha bem e o sabor das ervas é delicioso!', author: 'Isabela T., Noroeste', stars: 5 },
      { text: 'Ótima em pão, torrada, arroz — dá um toque gourmet a tudo.', author: 'Alexandre C., Lago Norte', stars: 5 },
    ],
  },

  'kit-semana': {
    id: 'kit-semana',
    name: 'Kit Semana Resolvida',
    price: 149.90,
    image: 'assets/kit_semana_resolvida.webp',
    category: 'Kits e Combos',
    ingredients: ['5 pratos à escolha', '1 molho ou condimento artesanal', 'Embalagem isotérmica com gelo seco', 'Validade de 90 dias no freezer'],
    nutrition: [
      { name: 'Valor Energético',   per100: 'Varia por prato',    vd: '—'   },
      { name: 'Carboidratos',       per100: 'Varia por prato',    vd: '—'   },
      { name: 'Proteínas',          per100: 'Varia por prato',    vd: '—'   },
      { name: 'Gorduras totais',    per100: 'Varia por prato',    vd: '—'   },
      { name: 'Fibras alimentares', per100: 'Varia por prato',    vd: '—'   },
      { name: 'Sódio',              per100: 'Varia por prato',    vd: '—'   },
    ],
    reviews: [
      { text: 'A semana fica muito mais fácil com esses pratos no freezer. Economizo tempo e como bem!', author: 'Patrícia L., Sudoeste', stars: 5 },
      { text: 'Kit perfeito para quem não tem tempo de cozinhar. Vale cada centavo.', author: 'Roberto S., Cruzeiro', stars: 5 },
    ],
  },

  'kit-lanche-fest': {
    id: 'kit-lanche-fest',
    name: 'Kit Lanche Fest',
    price: 89.90,
    image: 'assets/kit_lanche.webp',
    category: 'Kits e Combos',
    ingredients: ['20 salgados variados (coxinha, kibbeh, pastel e hambúrguer)', 'Mix de sabores veganos', 'Embalagem isotérmica com gelo seco', 'Validade de 90 dias no freezer'],
    nutrition: [
      { name: 'Valor Energético',   per100: 'Varia por salgado',  vd: '—'   },
      { name: 'Carboidratos',       per100: 'Varia por salgado',  vd: '—'   },
      { name: 'Proteínas',          per100: 'Varia por salgado',  vd: '—'   },
      { name: 'Gorduras totais',    per100: 'Varia por salgado',  vd: '—'   },
      { name: 'Fibras alimentares', per100: 'Varia por salgado',  vd: '—'   },
      { name: 'Sódio',              per100: 'Varia por salgado',  vd: '—'   },
    ],
    reviews: [
      { text: 'Perfeito para reuniões e festas. Todo mundo ficou surpreso ao saber que era vegano!', author: 'Daniela F., Asa Sul', stars: 5 },
      { text: '20 salgados variados, todos gostosos. Acabou em minutos na nossa festa.', author: 'Thiago N., Samambaia', stars: 5 },
    ],
  },

  'kit-estreia': {
    id: 'kit-estreia',
    name: 'Kit Estreia',
    price: 89.90,
    image: 'assets/kit_estreia.webp',
    category: 'Kits e Combos',
    ingredients: ['3 pratos principais à escolha', '10 salgados variados', '1 condimento artesanal', 'Embalagem isotérmica com gelo seco', 'Validade de 90 dias no freezer'],
    nutrition: [
      { name: 'Valor Energético',   per100: 'Varia por item',     vd: '—'   },
      { name: 'Carboidratos',       per100: 'Varia por item',     vd: '—'   },
      { name: 'Proteínas',          per100: 'Varia por item',     vd: '—'   },
      { name: 'Gorduras totais',    per100: 'Varia por item',     vd: '—'   },
      { name: 'Fibras alimentares', per100: 'Varia por item',     vd: '—'   },
      { name: 'Sódio',              per100: 'Varia por item',     vd: '—'   },
    ],
    reviews: [
      { text: 'Kit ideal para experimentar tudo! Não consegui escolher um favorito — amei todos.', author: 'Camila R., Lago Sul', stars: 5 },
      { text: 'Com 10% de desconto ainda. Melhor primeiro pedido que fiz na minha vida vegana.', author: 'João V., Asa Norte', stars: 5 },
    ],
  },
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
        <a href="produtos.html" class="btn-secondary" id="cart-empty-link">Ver Cardápio</a>
      </div>
    `
    body.querySelector('#cart-empty-link')?.addEventListener('click', closeCartPanel)
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
    <button class="btn-primary" style="width:100%" id="panel-cart-checkout">
      FINALIZAR PEDIDO →
    </button>
  `
  document.getElementById('panel-cart-checkout').addEventListener('click', () => {
    showToast('Redirecionando para o pagamento... 🌿')
  })
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
          <tr><td colspan="3" class="nutri-table__sub">Porção de 300g | % Valores Diários</td></tr>
        </table>
        <h3 class="product-modal__section-title">O QUE DIZEM NOSSOS CLIENTES</h3>
        <div class="product-modal__reviews-wrapper">
          <button class="reviews-nav reviews-nav--prev" id="modal-reviews-prev" aria-label="Anterior">&#8249;</button>
          <div class="product-modal__reviews" id="modal-reviews"></div>
          <button class="reviews-nav reviews-nav--next" id="modal-reviews-next" aria-label="Próximo">&#8250;</button>
        </div>
      </div>
      <div class="product-modal__add-bar">
        <div class="product-modal__qty">
          <button class="qty-btn" id="modal-qty-minus">−</button>
          <span class="product-modal__qty-value" id="modal-qty-value">1</span>
          <button class="qty-btn" id="modal-qty-plus">+</button>
        </div>
        <button class="btn-primary" id="modal-add-cart">ADICIONAR →</button>
      </div>
    </div>
  `
  document.body.appendChild(modal)

  // Fechar
  document.getElementById('modal-close-btn').addEventListener('click', closeProductModal)
  modal.addEventListener('click', e => {
    if (e.target === modal) closeProductModal()
  })

  // Navegação dos reviews
  const reviewsTrack = document.getElementById('modal-reviews')
  document.getElementById('modal-reviews-prev').addEventListener('click', () => {
    reviewsTrack.scrollBy({ left: -240, behavior: 'smooth' })
  })
  document.getElementById('modal-reviews-next').addEventListener('click', () => {
    reviewsTrack.scrollBy({ left: 240, behavior: 'smooth' })
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

// ══════════════════════════════════════════════════════
// produtos.js — lógica da página de produtos
// Adicionar no final do panels.js
// ══════════════════════════════════════════════════════

function initProdutosPage() {
  const chips   = document.querySelectorAll('.filter-chip')
  const cards   = document.querySelectorAll('.product-card')
  const headers = document.querySelectorAll('.category-header')
  const search  = document.getElementById('search-input')

  if (!chips.length) return   // não estamos na página de produtos

  // ── Filtro por categoria ──────────────────────────────
  function applyFilter(f) {
    chips.forEach(c => c.classList.toggle('filter-chip--active', c.dataset.filter === f))
    headers.forEach(h => {
      h.style.display = (f === 'todos' || h.dataset.category === f) ? '' : 'none'
    })
    cards.forEach(c => {
      c.style.display = (f === 'todos' || c.dataset.category === f) ? '' : 'none'
    })
  }

  chips.forEach(chip => chip.addEventListener('click', () => applyFilter(chip.dataset.filter)))

  // ── Busca por texto ───────────────────────────────────
  search?.addEventListener('input', () => {
    const q = search.value.toLowerCase().trim()
    if (!q) { applyFilter('todos'); return }

    chips.forEach(c => c.classList.remove('filter-chip--active'))
    headers.forEach(h => h.style.display = 'none')

    const visible = new Set()
    cards.forEach(c => {
      const name = c.querySelector('.product-card__name')?.textContent.toLowerCase() || ''
      const desc = c.querySelector('.product-card__desc')?.textContent.toLowerCase() || ''
      const show = name.includes(q) || desc.includes(q)
      c.style.display = show ? '' : 'none'
      if (show) visible.add(c.dataset.category)
    })
    headers.forEach(h => { if (visible.has(h.dataset.category)) h.style.display = '' })
  })

  // ── Botão add — adiciona direto ao carrinho ───────────
  document.querySelectorAll('.product-card__add-btn').forEach(btn => {
    btn.addEventListener('click', e => {
      e.stopPropagation()
      const id = btn.dataset.addId
      const data = PRODUCTS_DATA[id]
      if (data) {
        Cart.addItem({ id: data.id, name: data.name, price: data.price, image: data.image })
        showToast(`${data.name} adicionado! 🌿`)
      } else {
        openProductModal(id)
      }
    })
  })

  // ── Clique no card abre modal ─────────────────────────
  cards.forEach(card => {
    card.addEventListener('click', e => {
      if (e.target.closest('.product-card__add-btn')) return
      openProductModal(card.dataset.productId)
    })
  })
}

// Adiciona initProdutosPage ao DOMContentLoaded existente
// (cola dentro do document.addEventListener('DOMContentLoaded', () => { ... })
// que já existe no final do panels.js, antes do último } )
//
// Ou, se preferir manter separado, adiciona esta linha no final:
document.addEventListener('DOMContentLoaded', initProdutosPage)