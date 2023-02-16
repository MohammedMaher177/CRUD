let productName = document.getElementById("produactName");
let productPrice = document.getElementById("productPrice");
let productModel = document.getElementById("productModel");
let productDesc = document.getElementById("productDesc");
let addProductBtn = document.getElementById("addProduct");
let displayData = document.getElementById("displayDataa");
let ubdateProductBtn = document.getElementById("ubdateProduct");
let InvalidName = document.querySelector("#InvalidName");
let invalidPrice = document.querySelector("#invalidPrice");
let invalidDesc = document.querySelector("#invalidDesc");
let indexContainer;
let mySearchInput = document.getElementById("searchInput");
let productList = [];
if (localStorage.getItem("products") != null) {
  productList = JSON.parse(localStorage.getItem("products"));
  displayProducts(productList);
}
addProductBtn.addEventListener("click", (e) => {
  e.preventDefault();
  addProduct();
});
ubdateProductBtn.addEventListener("click", (e) => {
  console.log("KKK");
  updateProduct();
  e.preventDefault();
});
mySearchInput.addEventListener("input", searchProduct);

function addProduct() {
  validation();
  if (
    !validateName(productName.value) ||
    !validatePrice(productPrice.value) ||
    !validateDesc(productDesc.value)
  ) {
    return;
  }
  let product = {
    name: productName.value,
    price: productPrice.value,
    model: productModel.value,
    desc: productDesc.value,
  };
  console.log(product);
  productList.push(product);
  displayProducts(productList);
  localStorage.setItem("products", JSON.stringify(productList));
  clearData();
  console.log("ADDED");
}

function displayProducts(list) {
  let cartona = ` `;
  for (let i = 0; i < list.length; i++) {
    cartona += `<tr class="mb-5">
                    <td>${i + 1}</td>
                    <td>${list[i].newName ? list[i].newName : list[i].name}</td>
                    <td>${list[i].price}</td>
                    <td>${list[i].model}</td>
                    <td>${list[i].desc}</td>
                    <td><button class="btn btn-warning" onclick="updateForm(${i})">Ubdate</button></td>
                    <td><button class="btn btn-danger" onclick="deleteProduct(${i})">Delete</button></td>
                </tr>`;
  }
  displayData.innerHTML = cartona;
}

function clearData() {
  productName.value = "";
  productPrice.value = "";
  productModel.value = "";
  productDesc.value = "";
}

function deleteProduct(index) {
  productList.splice(index, 1);
  displayProducts(productList);
  localStorage.setItem("products", JSON.stringify(productList));
}

function updateForm(index) {
  ubdateProductBtn.classList.replace("d-none", "d-block");
  addProductBtn.classList.replace("d-block", "d-none");
  productName.value = productList[index].name;
  productPrice.value = productList[index].price;
  productModel.value = productList[index].model;
  productDesc.value = productList[index].desc;
  indexContainer = index;
}

function updateProduct() {
  validation();
  if (
    !validateName(productName.value) ||
    !validatePrice(productPrice.value) ||
    !validateDesc(productDesc.value)
  ) {
    return;
  }
  ubdateProductBtn.classList.replace("d-block", "d-none");
  addProductBtn.classList.replace("d-none", "d-block");
  productList[indexContainer].name = productName.value;
  productList[indexContainer].price = productPrice.value;
  productList[indexContainer].model = productModel.value;
  productList[indexContainer].desc = productDesc.value;
  displayProducts(productList);
  clearData();
  console.log("Update");
  localStorage.setItem("products", JSON.stringify(productList));
}
function searchProduct() {
  let searchList = [];
  let term = mySearchInput.value;
  for (let i = 0; i < productList.length; i++) {
    if (
      productList[i].name
        .toLowerCase()
        .includes(mySearchInput.value.toLowerCase())
    ) {
      productList[i].newName = productList[i].name
        .toLowerCase()
        .replace(
          term.toLowerCase(),
          `<span class=" text-danger">${term}</span>`
        );
      searchList.push(productList[i]);
    }
  }
  displayProducts(searchList);
}

function validateName(name) {
  let regex = /^[A-Z][a-z]{3,8}$/;
  return regex.test(name) == true;
}

function validatePrice(price) {
  let regex = /^[1-9][0-9]{3}$|(10000)/;
  return regex.test(price) == true;
}

function validateDesc(descrepsion) {
  let regex = /^[a-zA-Z]{30,100}$/;
  return regex.test(descrepsion) == true;
}

function validation() {
  if (!validateName(productName.value)) {
    productName.classList.add("border-danger");
    InvalidName.classList.replace("d-none", "d-block");
  } else {
    productName.classList.remove("border-danger");
    InvalidName.classList.replace("d-block", "d-none");
  }
  if (!validatePrice(productPrice.value)) {
    productPrice.classList.add("border-danger");
    invalidPrice.classList.replace("d-none", "d-block");
  } else {
    productPrice.classList.remove("border-danger");
    invalidPrice.classList.replace("d-block", "d-none");
  }
  if (!validateDesc(productDesc.value)) {
    productDesc.classList.add("border-danger");
    invalidDesc.classList.replace("d-none", "d-block");
  } else {
    productDesc.classList.remove("border-danger");
    invalidDesc.classList.replace("d-block", "d-none");
  }
}

document.addEventListener("keyup", (e) => {
  // console.log(e);
  if (ubdateProductBtn.classList.contains("d-block")) {
    switch (e.key) {
      case "Enter":
        updateProduct();
        console.log(e.key);
        break;
      default:
        break;
    }
  }
  if (addProductBtn.classList.contains("d-block")) {
    switch (e.key) {
      case "Enter":
        addProduct();
        console.log(e.key);
        break;
      default:
        break;
    }
  }
});
