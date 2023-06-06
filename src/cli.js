let cart = [];

class category {
  constructor(props) {
    this.id = props.id;
    this.description = props.description;
  }
}

class product_item {
  constructor(props) {
    this.id = props.id;
    this.name = props.name;
    this.price = props.price;
    this.unit = props.unit;
  }
};

let beans = new product_item({
  id: 1, 
  name: 'Baked beans', 
  price: .99,
  unit: 'item'
});
let cola = new product_item({
  id: 2,
  name: 'Can of cola', 
  price: .75,
  unit: 'item'
});
let onions = new product_item({
  id: 3,
  name: 'Onions', 
  price: .49,
  unit: 'kg'
});
let red_rowan = new product_item({
  id: 4,
  name: 'Red Rowan ale', 
  price: 2.99,
  unit: 'item'
});
let reiver = new product_item({
  id: 5,
  name: 'Reiver bitter', 
  price: 2.99,
  unit: 'item'
});
let stell = new product_item({
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


cart.push(
 {'product': beans, 'quantity': 1},
 {'product': cola, 'quantity': 1},
 {'product': onions, 'quantity': 0.75}
);


export function cli(args) {
  let cmd = getArgs(args);
  checkout();
}


function getArgs(args) {
  return args.slice(2);
}

function checkout() {
  list_cart_contents();
  console.log('TOTAL:', sum_cart());
}

function list_cart_contents() {
  for (const cart_item of cart) {
    let item_price_details = item_price(cart_item);
    console.log(cart_item.product.name, item_price_details.price);
    if (cart_item.product.unit != 'item') {
      console.log(item_price_details.quantity_message);
    }
  }
}

function sum_cart() {
  let cart_total = cart.reduce(
  (accumulator, cart_item) => accumulator + Number(item_price(cart_item).price), 0);
  return cart_total;
}

function item_price(cart_item) {
  let unit_price = cart_item.product.price;
  let quantity = cart_item.quantity;
  let unit = cart_item.product.unit;

  let price = pounds_and_pence(unit_price * quantity);

  let quantity_message = '';
  if (unit != 'item') {
    quantity_message = `${quantity}${unit} @ £${unit_price}/${unit}`;
  }
  return {'price': price, 'quantity_message': quantity_message};
}

function pounds_and_pence(price) {
  let rounded_price = price.toFixed(2)
  return rounded_price;
}
