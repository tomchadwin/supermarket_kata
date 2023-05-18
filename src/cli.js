class item {
  constructor(name='unknown', price=0, model='quantity') {
    this.name = name;
    this.price = price;
    this.model = model;
  }
}

let beans = new item('Baked beans', .99, 'quantity');
let cola = new item('Can of cola', .75, 'quantity');
let onions = new item('Onions', .49, 'kilo');

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
