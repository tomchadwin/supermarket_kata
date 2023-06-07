let total_savings = 0;


export function cli(args) {

  const gbp = new Intl.NumberFormat('en-GB', {
    style: 'decimal',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });

  let cart = [];
  let cart_totals = {};
  let subtotal = 0;

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

  class deal {
    constructor(props) {
      this.id = props.id;
      this.name = props.name;
      this.products = props.products;
      this.quantity = props.quantity;
      this.discount = props.discount;
    }
  }

  let beans = new product_item({
    id: 1, 
    name: 'Baked beans', 
    price: 0.99,
    unit: 'item'
  });
  let cola = new product_item({
    id: 2,
    name: 'Can of cola', 
    price: 0.70,
    unit: 'item'
  });
  let onions = new product_item({
    id: 3,
    name: 'Onions', 
    price: 0.49,
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

  if (!cart.length) {
    cart.push(
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
  
  let checkout_result = checkout(cart, cart_totals, gbp, subtotal, deals);
  console.log(checkout_result);
  return checkout_result;
}


function getArgs(args) {
  return args.slice(2);
}

function checkout(cart, cart_totals, gbp, subtotal, deals) {
  let listed_contents = list_cart_contents(cart, cart_totals, gbp);
  subtotal = sum_cart(cart);
  let sub_total = `Sub-total: ${gbp.format(subtotal)}`;
  let calculated_discounts = calculate_discounts(deals, cart_totals, gbp, subtotal);
  return `${listed_contents}\n${sub_total}\n${calculated_discounts}`;
}

function list_cart_contents(cart, cart_totals, gbp) {
  let formatted_details = ''
  for (const cart_item of cart) {
    if (Object.hasOwn(cart_totals, cart_item.product.name)) {
      cart_totals[cart_item.product.name] = cart_totals[cart_item.product.name] + cart_item.quantity;
    } else {
      cart_totals[cart_item.product.name] = cart_item.quantity;      
    }
    let item_price_details = item_price(cart_item);
    formatted_details = formatted_details + `${cart_item.product.name} ${gbp.format(item_price_details.price)}\n`;
    if (cart_item.product.unit != 'item') {
      formatted_details = formatted_details + item_price_details.quantity_message;
    }
  }
  return formatted_details;
}

function calculate_discounts(deals, cart_totals, gbp, subtotal) {
  let applied_discount_output = '';
  for (const deal of deals) {
    let item_total = 0;
    for (let deal_product of deal.products) {
      if (Object.hasOwn(cart_totals, deal_product.name)) {
        item_total = item_total + cart_totals[deal_product.name]
      }
    }
    if (item_total >= deal.quantity) {
      applied_discount_output = applied_discount_output + apply_discount(deal, item_total);
    }
  }
  let total_savings_output = `Total savings: ${0 - total_savings}`;
  let total_to_pay = `Total to Pay: ${gbp.format(subtotal - total_savings)}`;
  return `${applied_discount_output}\n${total_savings_output}\n${total_to_pay}`;
}

function apply_discount(deal, quantity) {
  let applied_discount = '';
  if (total_savings == 0) {
    applied_discount = 'Savings\n';
  }
  let calculated_discount = Math.floor(quantity / deal.quantity) * deal.discount;
  applied_discount = applied_discount + `${deal.name} ${0 - calculated_discount}\n`;
  total_savings = total_savings + calculated_discount;
  return applied_discount;
}

function sum_cart(cart) {
  let cart_total = cart.reduce(
  (accumulator, cart_item) => accumulator + item_price(cart_item).price, 0);
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
  // Could possibly use Intl.NumberFormat, but this way applies rounding 
  // to the penny for each item, which is probably the approach taken 
  // by shops
  
  let rounded_price = parseFloat(price.toFixed(2)); 
  return rounded_price;
}
