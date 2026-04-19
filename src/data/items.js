export const categories = [
  { key: 'top', label: 'Top' },
  { key: 'layer', label: 'Layer' },
  { key: 'bottom', label: 'Bottoms' },
  { key: 'shoes', label: 'Shoes' },
  { key: 'bag', label: 'Bag' },
  { key: 'sunglasses', label: 'Sunglasses' },
]

export const items = {
  top: [
    { name: 'Blue & White Striped Oxford', image: '/items/blue and white striped oxford.png' },
    { name: 'Red Striped Oxford', image: '/items/red striped oxford.png' },
    { name: 'White Oxford', image: '/items/fe30f85d-aa92-42eb-bd25-7e6923a0fe91.png' },
    { name: 'Cin Cin Sweatshirt', image: '/items/cin cin sweatshirt.png' },
    { name: 'Grazie Sweatshirt', image: '/items/c590e1ff-69ba-403b-b77e-2e287e0b30fe.png' },
    { name: 'Striped Sweater', image: '/items/striped sweater.png' },
  ],
  bottom: [
    { name: 'Black Pant', image: '/items/black pant.png' },
    { name: 'Dark Wash Barrel Jeans', image: '/items/dark wash barrel jeans.png' },
    { name: 'Light Wash Barrel Jeans', image: '/items/light wash barrel jeans.png' },
    { name: 'Straight Leg Mother Denim', image: '/items/straight leg mother denim.png' },
  ],
  shoes: [
    { name: 'Animal Print Reeboks', image: '/items/animal print reeboks.png' },
    { name: 'Black Loafers', image: '/items/black loafers.png' },
    { name: 'Red Adidas', image: '/items/red adidas.png' },
  ],
  bag: [
    { name: 'Blue Portland Leather', image: '/items/blue portland leather bag.png' },
    { name: 'Black Crossbody', image: '/items/cross body leather bag.png' },
  ],
  layer: [
    { name: 'Leather Jacket', image: '/items/leather jacket.png' },
    { name: 'Found Patch Jacket', image: '/items/found jacket.png' },
    { name: 'Yellow Cardigan', image: '/items/yellow-cardigan.png' },
  ],
  sunglasses: [
    { name: 'Beige Sunglasses', image: '/items/beige glasses.png' },
    { name: 'Blue Sunglasses', image: '/items/blue glasses.png' },
    { name: 'Green Sunglasses', image: '/items/green glasses.png' },
    { name: 'Purple Sunglasses', image: '/items/purple glasses.png' },
  ],
}

export function getRandomItem(category, exclude) {
  const pool = items[category].filter(item => item.name !== exclude?.name)
  if (pool.length === 0) return items[category][0]
  return pool[Math.floor(Math.random() * pool.length)]
}

export function getRandomOutfit() {
  const outfit = {}
  for (const cat of categories) {
    outfit[cat.key] = items[cat.key][Math.floor(Math.random() * items[cat.key].length)]
  }
  return outfit
}
