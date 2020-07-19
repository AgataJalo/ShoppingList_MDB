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

  const shoppingBoard = document.getElementById('shoppingBoard');
  shoppingBoard.innerHTML = '';

  const shoppingList = document.createElement('table');
  shoppingList.classList.add("table");

  const tbody = document.createElement('tbody');
  shoppingList.appendChild(tbody);


  
  shoppingBoard.appendChild(shoppingList);
  // Loop through CategoryBucket array
  let counter=0;

  for (let i = 0; i < state.length; i++) {
    const categoryBucket = state[i];
    if(categoryBucket.products.length === 0){
      continue
    }

    const categoryTr = document.createElement('tr');
    categoryTr.classList.add('table-primary');

    const categoryTd = document.createElement('td');
    categoryTd.classList.add('text-center');
    categoryTd.setAttribute('colspan','4');
    categoryTd.textContent = categoryBucket.name;
    categoryTr.appendChild(categoryTd);
    tbody.appendChild(categoryTr);


    // Loop through Product array
    for (let j = 0; j < categoryBucket.products.length; j++) {
      counter++;
      const product = categoryBucket.products[j];

      const productTr = document.createElement('tr');
      const tdName = document.createElement('td');
      tdName.textContent = product.name;
      productTr.appendChild(tdName);
      
      const tdNum = document.createElement('td');
      tdNum.textContent = product.inputNum;
      productTr.appendChild(tdNum);
      
      const tdNumType = document.createElement('td');
      tdNumType.textContent = product.inputNumType;
      productTr.appendChild(tdNumType);

      const tdRemove = document.createElement('td');
      const removeBtn = document.createElement('button');
      removeBtn.className = "remove"
      tdRemove.appendChild(removeBtn);
      
      productTr.appendChild(tdRemove);
      
      tbody.appendChild(productTr);
      
      let removeFunction = function () {
        categoryBucket.products.splice(j,1);
        render();
       }

       removeBtn.onclick = removeFunction;
    }
  }
  let counterDiv = document.getElementById('counterDiv');
  counterDiv.textContent = "Products on list: "+counter;
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
