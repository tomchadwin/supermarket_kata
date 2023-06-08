import { item, category, deal, cart } from './cart.js';

let beans = new item({
  id: 1, 
  name: 'Baked beans', 
  price: 0.99,
  unit: 'item'
});
let cola = new item({
  id: 2,
  name: 'Can of cola', 
  price: 0.70,
  unit: 'item'
});
let onions = new item({
  id: 3,
  name: 'Onions', 
  price: 0.49,
  unit: 'kg'
});
let red_rowan = new item({
  id: 4,
  name: 'Red Rowan ale', 
  price: 2.99,
  unit: 'item'
});
let reiver = new item({
  id: 5,
  name: 'Reiver bitter', 
  price: 2.99,
  unit: 'item'
});
let stell = new item({
  id: 6,
  name: 'Stell stout', 
  price: 2.99,
  unit: 'item'
});

let beers = new category({
  id: 1,
  description: 'Beer',
  product_items : [red_rowan, reiver, stell]
});

let deals = [
  new deal({
    id: 1,
    name: 'Three tins of beans for the price of two', 
    products: [beans],
    quantity: 3,
    discount: beans.price
  }),
  new deal({
    id: 2,
    name: 'Two cans of coca-cola for £1', 
    products: [cola],
    quantity: 2,
    discount: 0.40
  }),
  new deal({
    id: 3,
    name: 'Any 3 ales from the First and Last Brewery for £6', 
    products: [red_rowan, reiver, stell],
    quantity: 3,
    discount: 2.97
  })
];

export function create_cart() {
  let shopping_cart = new cart(deals);

  // If the cart is empty, add some sample items
  // ALTER THESE ITEMS HERE TO TEST DIFFERENT BEHAVIOURS
  if (!shopping_cart.contents.length) {
    shopping_cart.contents.push(
     {'product': beans, 'quantity': 1},
     {'product': cola, 'quantity': 1},
     {'product': beans, 'quantity': 1},
     {'product': beans, 'quantity': 1},
     {'product': beans, 'quantity': 1},
     {'product': beans, 'quantity': 1},
     {'product': beans, 'quantity': 1},
     {'product': stell, 'quantity': 1},
     {'product': reiver, 'quantity': 1},
     {'product': red_rowan, 'quantity': 1},
     {'product': onions, 'quantity': 0.75}
    );
  }
  return shopping_cart.checkout();
}
