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
  console.log(state);
  addToList();
}

render();

function addToList() {
  const shoppingList = document.createElement('ul');
  const shoppingBoard = document.getElementById('shoppingBoard');
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
      const aaaproduct = categoryBucket.products[j];

      const productElement = document.createElement('li');
      productElement.appendChild(document.createTextNode(aaaproduct.name));
      categoryNameList.appendChild(productElement);
    }
  }
}
