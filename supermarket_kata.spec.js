const cart = require('./src/cli');

describe('supermarket_kata', () => {
  const expected = expect.any(Function);

  it("returns correct output for sample data", () => {
    expect(cart.cli()).toEqual(`Baked beans 0.99
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
Total to Pay: 11.03`);
  });
});



