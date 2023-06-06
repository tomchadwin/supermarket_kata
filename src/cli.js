let cart = [];

class category {
  constructor(props) {
    this.id = props.id;
    this.description = props.description;
  }
}

class item {
  constructor(props) {
    this.id = props.id;
    this.name = props.name;
    this.price = props.price;
    this.model = props.model;
  }
};

let beans = new item({
  id: 1, 
  name: 'Baked beans', 
  price: .99,
  model: 'quantity'
});
let cola = new item({
  id: 2,
  name: 'Can of cola', 
  price: .75,
  model: 'quantity'
});
let onions = new item({
  id: 3,
  name: 'Onions', 
  price: .49,
  model: 'kilo'
});
let red_rowan = new item({
  id: 4,
  name: 'Red Rowan ale', 
  price: 2.99,
  model: 'item'
});
let reiver = new item({
  id: 5,
  name: 'Reiver bitter', 
  price: 2.99,
  model: 'item'
});
let stell = new item({
  id: 6,
  name: 'Stell stout', 
  price: 2.99,
  model: 'item'
});

let beers = new category({
  id: 1,
  description: 'Beer',
  items : [red_rowan, reiver, stell]
});


cart.push([beans, 1], [cola, 1], [onions, 0.75]);


export function cli(args) {
  let cmd = getArgs(args);
  checkout();
}


function getArgs(args) {
  return args.slice(2);
}

function checkout() {
  for (const product of cart) {
    console.log(product[0].name, pounds_and_pence(product[0].price * product[1]));
  }
}

function pounds_and_pence(cost) {
  return cost.toFixed(2);
}