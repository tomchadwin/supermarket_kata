# supermarket_kata
Implementation of http://codekata.com/kata/kata01-supermarket-pricing/ in NodeJS via CLI

## Installation
Clone repository and install with `npm i`.

## Usage
Call checkout with `cd bin && ./cart`:

```
$ cd bin/
$ ./cart
Baked beans 0.99
Can of cola 0.70
Baked beans 0.99
Baked beans 0.99
Baked beans 0.99
Baked beans 0.99
Baked beans 0.99
Stell stout 2.99
Reiver bitter 2.99
Red Rowan ale 2.99
Onions 0.37
0.75kg @ £0.49/kg
Sub-total: 15.98
Savings
Three tins of beans for the price of two -1.98
Any 3 ales from the First and Last Brewery for £6 -2.97

Total savings: -4.95
Total to Pay: 11.03
```

## Configuration

### Changing products
Edit `/src/example.js`, and add products to the catalogue as follows:

```
let beans = new item({
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
Edit `/src/example.js`, and add `deal`s to `deals[]` as follows:

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
Edit `/src/example.js`, and add items to the cart as follows:

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
);
```

| Property | Details |
|----------|---------|
| product | Product object name |
| quantity | Quantity in the product's units |

## Discussion

I decided to try to write this application in a very Javascript-friendly fashion, 
and so heavy use is made of objects. Clarity of the code was prioritized over 
performance, and I therefore haven't done any benchmarking.

I've tried to maintain healthy separation of concerns, with products, cart, and discounts 
all independently enumerated. 

This code implements the example pricing methods and discounts mentioned in the brief, 
but does so *extremely* closely. As a result, there are some obvious limitations in the 
logic which would need to be corrected in the future:

- A discount applied to a group of products will fail if those products differ in price - 
try adding `beans` to the beer `discount`. To fix, more discount models are required, 
perhaps which replace the qualifying items subtotal with a fixed price, rather than a 
discount. This would then obviously require logic to determine which qualifying product(s) 
were cheapest, so that the most common "Get the cheapest one FREE!" approach could be 
implemented.

- I still feel as though I don't have a good enough handle on floating-point maths in JS, 
and would want to read up in order to determine that rounding was occurring in a way 
suitable to this domain.

## Possible enhancements

The code could be extended to add support for:

- multiple currencies
- common product flags (eg age-restricted goods)
- product flags I've never seen implemented but which I wish were (eg allergy/dietary 
preference info, security tagging)

## Tests

The most rudimentary test framework is in place using Jest. However, only a single 
reference test is currently present, and unit tests should be built.

Tests are run automatically via a Github workflow on all commits to the repository's 
master branch. Run manually from your local cloned repo root via `npm test`:

```
$ npm test

> supermarket_kata@1.0.0 test
> jest --no-cache ./*

 PASS  ./supermarket_kata.spec.js
  supermarket_kata
    ✓ returns correct output for sample data (32 ms)

  console.log
    Baked beans 0.99
    Can of cola 0.70
    Baked beans 0.99
    Baked beans 0.99
    Baked beans 0.99
    Baked beans 0.99
    Baked beans 0.99
    Stell stout 2.99
    Reiver bitter 2.99
    Red Rowan ale 2.99
    Onions 0.37
    0.75kg @ £0.49/kg
    Sub-total: 15.98
    Savings
    Three tins of beans for the price of two -1.98
    Any 3 ales from the First and Last Brewery for £6 -2.97

    Total savings: -4.95
    Total to Pay: 11.03

      at cart.checkout (src/cart.js:45:13)

Test Suites: 1 passed, 1 total
Tests:       1 passed, 1 total
Snapshots:   0 total
Time:        1.213 s
Ran all test suites matching /.\/LICENSE|.\/README.md|.\/babel.config.js|.\/bin|.\/index.js|.\/node_modules|.\/package-lock.json|.\/package.json|.\/src|.\/supermarket_kata.spec.js/i
```
