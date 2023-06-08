export class deal {
  constructor(props) {
    this.id = props.id;
    this.name = props.name;
    this.products = props.products;
    this.quantity = props.quantity;
    this.discount = props.discount;
  }
}

export class item {
  constructor(props) {
    this.id = props.id;
    this.name = props.name;
    this.price = props.price;
    this.unit = props.unit;
  }
};

// For future use
export class category {
  constructor(props) {
    this.id = props.id;
    this.description = props.description;
  }
}

export class cart {
  constructor(deals) {
    this.contents = [];
    this.totals = {};
    this.subtotal = 0;
    this.total_savings = 0;
    
    this.deals = deals;
  }
  
  checkout() {
    let listed_contents = this.list_cart_contents();
    this.subtotal = this.sum_cart(cart);
    let sub_total = `Sub-total: ${this.gbp.format(this.subtotal)}`;
    let calculated_discounts = this.calculate_discounts();
    let checkout_result = `${listed_contents}\n${sub_total}\n${calculated_discounts}`;

    console.log(checkout_result);
    return checkout_result;
  }

  list_cart_contents() {
    let contents = ''
    for (const item of this.contents) {
      if (Object.hasOwn(this.totals, item.product.name)) {
        this.totals[item.product.name] = this.totals[item.product.name] + item.quantity;
      } else {
        this.totals[item.product.name] = item.quantity;      
      }
      let item_price = this.item_price(item);
      let price = this.gbp.format(item_price.price);
      contents = contents + `${item.product.name} ${price}\n`;
      if (item.product.unit != 'item') {
        contents = contents + item_price.quantity_message;
      }
    }
    return contents;
  }

  calculate_discounts() {
    let discount = '';
    for (const deal of this.deals) {
      let total = 0;
      for (let product of deal.products) {
        if (Object.hasOwn(this.totals, product.name)) {
          total = total + this.totals[product.name]
        }
      }
      if (total >= deal.quantity) {
        discount = discount + this.apply_discount(deal, total);
      }
    }
    let savings = `Total savings: ${0 - this.total_savings}`;
    let total_to_pay = `Total to Pay: ${this.gbp.format(this.subtotal - this.total_savings)}`;
    return `${discount}\n${savings}\n${total_to_pay}`;
  }
  
  // List products, quantities and calculated prices *before deals/discounts*
  // Determine which discounts apply to cart contents
  // Apply discounts identified
  apply_discount(deal, quantity) {
    let output = '';
    if (this.total_savings == 0) {
      output = 'Savings\n';
    }
    let discount = Math.floor(quantity / deal.quantity) * deal.discount;
    output = output + `${deal.name} ${0 - discount}\n`;
    this.total_savings = this.total_savings + discount;
    return output;
  }

  // Get total price of all items in cart *before deals/discounts*
  sum_cart(cart) {
    let total = this.contents.reduce(
    (accumulator, item) => accumulator + this.item_price(item).price, 0);
    return total;
  }
  
  // Calculate item price from product price and quantity
  item_price(item) {
    let price = item.product.price;
    let quantity = item.quantity;
    let unit = item.product.unit;

    let formatted = this.pounds_and_pence(price * quantity);

    let message = '';
    if (unit != 'item') {
      message = `${quantity}${unit} @ £${price}/${unit}`;
    }
    return {'price': formatted, 'quantity_message': message};
  }

  // Rounds to two decimal places at each item/discount, since that is expected
  pounds_and_pence(price) {
    // Could possibly use Intl.NumberFormat, but this way applies rounding 
    // to the penny for each item, which is probably the approach taken 
    // by shops
    
    let rounded = parseFloat(price.toFixed(2)); 
    return rounded;
  }

  // Retrieve arguments from CLI invocation
  getArgs(args) {
    return args.slice(2);
  }

  // Ensure correct GBP formatting for final output
  gbp = new Intl.NumberFormat('en-GB', {
    style: 'decimal',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });
}
