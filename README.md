# supermarket_kata
Implementation of http://codekata.com/kata/kata01-supermarket-pricing/ in NodeJS via CLI

## Details
Clone repository and install with `npm i`.

Call checkout with `/bin/cart`.

## Changing products
Edit `/src/cli.js`, and ad products to the catalogue as follows:

```
let beans = new product_item({
  id: 1, 
  name: 'Baked beans', 
  price: 0.99,
  unit: 'item'
});
```

| id | Unique identifier (set this manually - not currently used) |
| name | Human-readable product name |
| price | Numeric product price |
| unit | Either the units of measure (eg 'kg', 'ml') or 'item' if sold individually |
