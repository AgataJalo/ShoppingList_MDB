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

  const shoppingList = document.createElement('ul');
  shoppingList.classList.add("list-group");
  const shoppingBoard = document.getElementById('shoppingBoard');
  shoppingBoard.innerHTML = '';
  shoppingBoard.appendChild(shoppingList);
  // Loop through CategoryBucket array
  let counter=0;

  for (let i = 0; i < state.length; i++) {
    const categoryBucket = state[i];
    if(categoryBucket.products.length === 0){
      continue
    }
    const categoryBucketElement = document.createElement('li');
    categoryBucketElement.classList.add("list-group-item");
    shoppingList.appendChild(categoryBucketElement);
    categoryBucketElement.appendChild(document.createTextNode(categoryBucket.name));
    const categoryNameList = document.createElement('ul');
    categoryNameList.classList.add("list-group");
    categoryNameList.classList.add("list-group-flush");
    categoryBucketElement.appendChild(categoryNameList);
    // Loop through Product array
    for (let j = 0; j < categoryBucket.products.length; j++) {
      const product = categoryBucket.products[j];

      const productElement = document.createElement('li');
      productElement.classList.add("list-group-item");
      productElement.appendChild(document.createTextNode(product.name));
      productElement.appendChild(document.createTextNode(product.inputNum));
      productElement.appendChild(document.createTextNode(product.inputNumType));
      categoryNameList.appendChild(productElement);
      counter++;
      const removeButton = document.createElement('button');
      const buttonText = document.createTextNode('delete');
      removeButton.className = "remove"
      removeButton.appendChild(buttonText)
      productElement.appendChild(removeButton);

      
      let removeFunction = function () {
       categoryBucket.products.splice(j,1);
       render();
      }

      removeButton.onclick = removeFunction;
    }
  }
  let counterDiv = document.getElementById('counterDiv');
  counterDiv.textContent = counter;
}

render();

const addButton = document.getElementById('addButton');
addButton.addEventListener('click', addToList);

function addToList() {
  const productNameInput = document.getElementById('productNameInput');
  const inputValue = productNameInput.value;
  if(inputValue == 0){
    return;
  }
  const categorySelect = document.getElementById('categorySelect');
  let selectedCategory = categorySelect.options[categorySelect.selectedIndex].value;
  

  if (selectedCategory===""){
    return;
  }

  let categoryBucket;
  for (let i=0; i<state.length; i++){
    if(state[i].name === selectedCategory){
      categoryBucket=state[i];
      break;
    }
  }
  
  if (categoryBucket === undefined){
    categoryBucket = new CategoryBucket (selectedCategory, [])
    state.push(categoryBucket);
  }

  //num input
  const quantityInput = document.getElementById('quantityInput');
  const quantityInputValue = quantityInput.value;
 
  if (quantityInputValue === ""){
         return;
    }
 
  //Radios
  const changeRadioQuantity = document.getElementById('changeRadioQuantity');
  
  let quantityTypeValue;
  if(changeRadioQuantity.checked === true){
    quantityTypeValue = inputNumTypePieces;
  } else {
    quantityTypeValue=inputNumTypeWeight;
  }
  categoryBucket.products.push(new Product (inputValue, quantityInputValue, quantityTypeValue));
  render();
}
