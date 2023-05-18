let cart = [];

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

class category {
  constructor(props) {
    this.id = props.id;
    this.description = props.description;
  }
}

let beers = new category({
  id: 1,
  description: 'Beer',
  items : [red_rowan, reiver, stell]
});


export function cli(args) {
  console.log(getArgs(args));
  checkout();
}


function getArgs(args) {
  return args.slice(2);
}

function checkout() {

 console.log(beans.name);
}
