import * as mdb from 'mdb-ui-kit';
import CategoryBucket from './categoryBucket';
import Product from './product';

export default {
  mdb,
};

const inputNumTypePieces = 0;
const inputNumTypeWeight = 1;

const state = [
  new CategoryBucket('pieczywo', [
    new Product('chleb', 2, inputNumTypePieces),
    new Product('bułka', 1, inputNumTypePieces),
  ]),
  new CategoryBucket('owoce', [
    new Product('jabłko', 2, inputNumTypeWeight),
    new Product('arbuz', 1, inputNumTypePieces),
    new Product('banan', 6, inputNumTypePieces),
  ]),
];

function render() {
  const shoppingList = document.createElement('ul');
  const shoppingBoard = document.getElementById('shoppingBoard');
  shoppingBoard.innerHTML = '';
  shoppingBoard.appendChild(shoppingList);
  // Loop through CategoryBucket array
  for (let i = 0; i < state.length; i++) {
    const categoryBucket = state[i];
    const categoryBucketElement = document.createElement('li');
    shoppingList.appendChild(categoryBucketElement);
    categoryBucketElement.appendChild(document.createTextNode(categoryBucket.name));
    const categoryNameList = document.createElement('ul');
    categoryBucketElement.appendChild(categoryNameList);
    // Loop through Product array
    for (let j = 0; j < categoryBucket.products.length; j++) {
      const product = categoryBucket.products[j];

      const productElement = document.createElement('li');
      productElement.appendChild(document.createTextNode(product.name));
      categoryNameList.appendChild(productElement);
    }
  }
}

render();

let addButton = document.getElementById('addButton');
addButton.addEventListener('click', addToList);

function addToList() {
  let productNameInput = document.getElementById('productNameInput');
  let inputValue = productNameInput.value;
  if(inputValue == 0){
    return;
  }
  state[0].products.push(new Product (inputValue, 1, inputNumTypePieces));
  render();
}


