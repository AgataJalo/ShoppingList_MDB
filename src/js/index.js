import * as mdb from 'mdb-ui-kit';
import CategoryBucket from './categoryBucket';
import Product from './product';

export default {
  mdb,
};

const inputNumTypePieces = 0;
const inputNumTypeWeight = 1;
const localStorageKey = 'storage';

let state = [];

loadFromLocalStorage();
render();

function saveToLocalStorage() {
  localStorage.setItem(localStorageKey, JSON.stringify(state));
}

function loadFromLocalStorage() {
  const retrievedObject = localStorage.getItem(localStorageKey);
  if (retrievedObject != null) {
    state = JSON.parse(retrievedObject);
  } else {
    state = [];
  }
}

function render() {
  console.log(state);
  saveToLocalStorage();

  const shoppingBoard = document.getElementById('shoppingBoard');
  shoppingBoard.innerHTML = '';

  const shoppingList = document.createElement('table');
  shoppingList.classList.add('table');

  const tbody = document.createElement('tbody');
  shoppingList.appendChild(tbody);

  shoppingBoard.appendChild(shoppingList);
  // Loop through CategoryBucket array
  let counter = 0;
  let counterWeight = 0;
  let counterQuantity = 0;

  for (let i = 0; i < state.length; i++) {
    const categoryBucket = state[i];
    if (categoryBucket.products.length === 0) {
      continue;
    }

    const categoryTr = document.createElement('tr');
    categoryTr.classList.add('table-primary');

    const categoryTd = document.createElement('td');
    categoryTd.classList.add('text-center');
    categoryTd.setAttribute('colspan', '4');
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

      if (product.inputNumType === inputNumTypeWeight) {
        counterWeight = counterWeight + product.inputNum;
        if (product.inputNum === 1) {
          tdNumType.textContent = 'gram';
        } else {
          tdNumType.textContent = 'grams';
        }
      } else {
        counterQuantity = counterQuantity + product.inputNum;
        if (product.inputNum === 1) {
          tdNumType.textContent = 'piece';
        } else {
          tdNumType.textContent = 'pieces';
        }
      }

      productTr.appendChild(tdNumType);

      const tdRemove = document.createElement('td');
      tdRemove.className = 'd-flex justify-content-end';
      const removeBtn = document.createElement('button');
      removeBtn.className = 'btn';
      removeBtn.textContent = 'delete';
      tdRemove.appendChild(removeBtn);

      productTr.appendChild(tdRemove);

      tbody.appendChild(productTr);

      let removeFunction = function () {
        categoryBucket.products.splice(j, 1);
        render();
      };

      removeBtn.onclick = removeFunction;
      document.getElementById('productNameInput').value = "";
      document.getElementById('quantityInput').value = "";
      document.getElementById('categorySelect').value = "";
      document.getElementById('changeRadioWeight').checked= false;
    }
  }
  let counterDiv = document.getElementById('counterDiv');
  counterDiv.textContent =
    'Products on list: ' + counter + ' Weight: ' + counterWeight + 'g ' +' Quantity: ' + counterQuantity;
}

const addButton = document.getElementById('addButton');
addButton.addEventListener('click', addToList);

function addToList() {
  const productNameInput = document.getElementById('productNameInput');
  const inputValue = productNameInput.value;
 
  if (inputValue == 0) {
  swal("You miss product name!");
  return;
  }
  const categorySelect = document.getElementById('categorySelect');
  let selectedCategory = categorySelect.options[categorySelect.selectedIndex].value;

  if (selectedCategory === '') {
    swal("Choose category!");
    return;
  }

  let categoryBucket;
  for (let i = 0; i < state.length; i++) {
    if (state[i].name === selectedCategory) {
      categoryBucket = state[i];
      break;
    }
  }

  if (categoryBucket === undefined) {
    categoryBucket = new CategoryBucket(selectedCategory, []);
    state.push(categoryBucket);
  }

  //num input
  const quantityInput = document.getElementById('quantityInput');
  const quantityInputValue = parseInt(quantityInput.value);

  if (isNaN(quantityInputValue)) {
    swal("Enter quantity or weight(g)!");
    return;
  }

  //Radios
  const changeRadioQuantity = document.getElementById('changeRadioQuantity');
  const changeRadioWeight = document.getElementById('changeRadioWeight');

  let quantityTypeValue;
  if (changeRadioQuantity.checked === true) {
    quantityTypeValue = inputNumTypePieces;
  } else if (changeRadioWeight.checked === true) {
    quantityTypeValue = inputNumTypeWeight;
  } else {
    swal("Choose quantity or weight category!");
    return;
  }
  categoryBucket.products.push(new Product(inputValue, quantityInputValue, quantityTypeValue));
  render();
}
