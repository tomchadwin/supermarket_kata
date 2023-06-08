export class deal {
  constructor(props) {
    this.id = props.id;
    this.name = props.name;
    this.products = props.products;
    this.quantity = props.quantity;
    this.discount = props.discount;
  }
}

export class product_item {
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
    this.formatted_details = ''
    for (const cart_item of this.contents) {
      if (Object.hasOwn(this.totals, cart_item.product.name)) {
        this.totals[cart_item.product.name] = this.totals[cart_item.product.name] + cart_item.quantity;
      } else {
        this.totals[cart_item.product.name] = cart_item.quantity;      
      }
      let item_price_details = this.item_price(cart_item);
      this.formatted_details = this.formatted_details + `${cart_item.product.name} ${this.gbp.format(item_price_details.price)}\n`;
      if (cart_item.product.unit != 'item') {
        this.formatted_details = this.formatted_details + item_price_details.quantity_message;
      }
    }
    return this.formatted_details;
  }

  calculate_discounts() {
    let applied_discount_output = '';
    for (const deal of this.deals) {
      let item_total = 0;
      for (let deal_product of deal.products) {
        if (Object.hasOwn(this.totals, deal_product.name)) {
          item_total = item_total + this.totals[deal_product.name]
        }
      }
      if (item_total >= deal.quantity) {
        applied_discount_output = applied_discount_output + this.apply_discount(deal, item_total);
      }
    }
    let total_savings_output = `Total savings: ${0 - this.total_savings}`;
    let total_to_pay = `Total to Pay: ${this.gbp.format(this.subtotal - this.total_savings)}`;
    return `${applied_discount_output}\n${total_savings_output}\n${total_to_pay}`;
  }
  
  // List products, quantities and calculated prices *before deals/discounts*
  // Determine which discounts apply to cart contents
  // Apply discounts identified
  apply_discount(deal, quantity) {
    let applied_discount = '';
    if (this.total_savings == 0) {
      applied_discount = 'Savings\n';
    }
    let calculated_discount = Math.floor(quantity / deal.quantity) * deal.discount;
    applied_discount = applied_discount + `${deal.name} ${0 - calculated_discount}\n`;
    this.total_savings = this.total_savings + calculated_discount;
    return applied_discount;
  }

  // Get total price of all items in cart *before deals/discounts*
  sum_cart(cart) {
    let cart_total = this.contents.reduce(
    (accumulator, cart_item) => accumulator + this.item_price(cart_item).price, 0);
    return cart_total;
  }
  
  // Calculate item price from product price and quantity
  item_price(cart_item) {
    let unit_price = cart_item.product.price;
    let quantity = cart_item.quantity;
    let unit = cart_item.product.unit;

    let price = this.pounds_and_pence(unit_price * quantity);

    let quantity_message = '';
    if (unit != 'item') {
      quantity_message = `${quantity}${unit} @ £${unit_price}/${unit}`;
    }
    return {'price': price, 'quantity_message': quantity_message};
  }

  // Rounds to two decimal places at each item/discount, since that is expected
  pounds_and_pence(price) {
    // Could possibly use Intl.NumberFormat, but this way applies rounding 
    // to the penny for each item, which is probably the approach taken 
    // by shops
    
    let rounded_price = parseFloat(price.toFixed(2)); 
    return rounded_price;
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
