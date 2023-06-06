# supermarket_kata
Implementation of http://codekata.com/kata/kata01-supermarket-pricing/ in NodeJS via CLI

## Installation
Clone repository and install with `npm i`.

## Usage
Call checkout with `/bin/cart`.

## Configuration

### Changing products
Edit `/src/cli.js`, and add products to the catalogue as follows:

```
let beans = new product_item({
  id: 1, 
  name: 'Baked beans', 
  price: 0.99,
  unit: 'item'
});
```

| Property | Details |
|----------|---------|
| id | Unique identifier (set this manually - not currently used) |
| name | Human-readable product name |
| price | Numeric product price |
| unit | Either the units of measure (eg 'kg', 'ml') or 'item' if sold individually |

### Changing deals
Edit `/src/cli.js`, and add `deal`s to `deals[]` as follows:

```
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
```

| Property | Details |
|----------|---------|
| id | Unique identifier (set this manually - not currently used) |
| name | Human-readable deal name |
| products | Array of product objects to which this deal applies |
| quantity | Number of products which triggers the deal |
| discount | Discount subtracted when deal is applied |

### Changing cart contents
Edit `/src/cli.js`, and add items to the cart as follows:

```
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
);```

| Property | Details |
|----------|---------|
| product | Product object name |
| quantity | Quantity in the product's units |
