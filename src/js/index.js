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
  ]),
];

function render() {
  console.log(state);
}

render();
