//store market list in localstorage
let fruitsnveggies = [];
let localStorageArray = JSON.parse(localStorage.getItem("localArray"));
if (localStorage.getItem("localArray") != null) {
  console.log("not null");
  fruitsnveggies = localStorageArray;
  console.log(fruitsnveggies);
} else {
  console.log("null");
  fruitsnveggies = [
    { item: " Enter the product", price: 0, photo: "product.jpg", barCode: 0 },
    { item: "Apples", price: 30, photo: "Apple.jpg", barCode: 1 },
    { item: "Oranges", price: 35, photo: "Oranges.jpg", barCode: 2 },
    { item: "Carrots", price: 70, photo: "carrots.png", barCode: 3 },
    { item: "Mango", price: 20, photo: "Mango.jpg", barCode: 4 },
    { item: "Brocoli", price: 50, photo: "Brocoli.jpg", barCode: 5 },
    { item: "Chillipowder", price: 40, photo: "Chillipowder.jpeg", barCode: 6 },
    { item: "Onions", price: 30, photo: "Onions.jpg", barCode: 7 },
    { item: "Ketchup", price: 10, photo: "Ketchup.jpg", barCode: 8 },
  ];
  console.log(fruitsnveggies);
}

//store receipts list in localstorage
let receiptsList = [];
let receiptsListArray = JSON.parse(localStorage.getItem("receiptsList"));
if (localStorage.getItem("receiptsList") != null) {
  receiptsList = receiptsListArray;
  console.log(receiptsList);
} else {
  console.log("null");
}

//loop on barCode items in the array
let barCodesNums = [];
for (let i = 0; i < fruitsnveggies.length; i++) {
  barCodesNums.push(fruitsnveggies[i].barCode);
}

//some declarations
let detailsContainer = document.getElementById("detailsContainer");
let productPhoto = document.getElementById("productImage");
let productName = document.getElementById("productName");
let productPrice = document.getElementById("productPrice");
let quantityNum = document.getElementById("couantity-num");
let totalPrice = document.getElementById("total-price");

let getInPrice = fruitsnveggies[0].price;
let quantity = 1;
let total = getInPrice * quantity;

productName.innerHTML = fruitsnveggies[0].item;
productPrice.innerHTML = getInPrice;
quantityNum.innerHTML = quantity;
totalPrice.innerHTML = total;

let increaseBtn = document.getElementById("increaseBtn");
let decreaseBtn = document.getElementById("decreaseBtn");

// increase and decrease Function
increaseBtn.addEventListener("click", function () {
  changeQuantity(+1);
});
decreaseBtn.addEventListener("click", function () {
  changeQuantity(-1);
});

function changeQuantity(getIndex) {
  if (quantity >= 1) {
    quantity += getIndex;
    quantityNum.innerHTML = quantity;
    total = getInPrice * quantity;
    totalPrice.innerHTML = total;
  } else {
    // window.location.reload(true);
    quantity = 1;
    quantityNum.innerHTML = quantity;
    total = getInPrice * quantity;
    totalPrice.innerHTML = total;
  }
}

// Function - search
searchButton.addEventListener("click", function () {
  let inputValue = searchField.value;
  for (let i = 0; i < fruitsnveggies.length; i++) {
    if (fruitsnveggies[i].barCode == inputValue) {
      productName.innerHTML = fruitsnveggies[i].item;
      productPrice.innerHTML = getInPrice = fruitsnveggies[i].price;
      totalPrice.innerHTML = total = getInPrice * quantity;
      productPhoto.src = `img/foods/${fruitsnveggies[i].photo}`;
    } else if (fruitsnveggies[i].barCode == !inputValue) {
      productName.innerHTML = "Barcode is Incorrect";
      productPrice.innerHTML = getInPrice = fruitsnveggies[0].price;
      totalPrice.innerHTML = total = getInPrice * quantity;
      productPhoto.src = `img/${fruitsnveggies[0].photo}`;
    }
  }
});

// Function - Add productes to the list
let productsList = [];
let addPackages = document.getElementById("addPackages");
let CostBeforeDiscount = document.getElementById("CostBeforeDiscount");
let discount = document.getElementById("discount");
let costAfterDiscount = document.getElementById("costAfterDiscount");
let discoutValue;
let getCost;
let details = "";
let finallytotal = 0;

function addProductToList() {
  finallytotal = 0;
  details = "";

  let newProduct = {
    newitem: productName.innerHTML,
    newprice: productPrice.innerHTML,
    newQuantity: quantity,
    newTotal: total,
  };

  productsList.push(newProduct);
  if (newProduct.newprice == 0) {
    productName.innerHTML = " Please choose a product";
    alert("Please choose a product");
    productsList.pop(newProduct);
    // console.log(productsList)s;
  } else {
    displayProdutsInList();
    getDiscount();
  }
}

function displayProdutsInList() {
  for (let i = 0; i < productsList.length; i++) {
    finallytotal += productsList[i].newTotal;

    details += `
            <div class="container mw-100">
               <div class="row" >
                  <div class="col-sm-4" style="text-align:center ;">${
                    productsList[i].newitem
                  }</div>
                  <div class="col-sm-2"  style="text-align:center ;">${
                    productsList[i].newprice + " $"
                  }</div>
                  <div class="col-sm-2" style="text-align:center ;">${
                    productsList[i].newQuantity
                  }</div>
                  <div class="col-sm-2" style="text-align:center ;">${
                    productsList[i].newTotal + " $"
                  }</div>
                  <div class="col-sm-2 " style="text-align:center ;"><button class="btn btn-danger"  onclick="deleteProductFromList(${i})">Delete</button></div>
      
               </div>
            </div>
      `;
  }
  detailsContainer.innerHTML = details;
}

function getDiscount() {
  discoutValue = 0.05;
  CostBeforeDiscount.innerHTML = finallytotal;
  discount.innerHTML = discoutValue;
  getCost = finallytotal - discoutValue * finallytotal;
  costAfterDiscount.innerHTML = getCost;
}
addPackages.addEventListener("click", addProductToList);

// Function -  delete product from the list
function deleteProductFromList(getIndex) {
  finallytotal = 0;
  details = "";
  productsList.splice(getIndex, 1);
  displayProdutsInList();
  getDiscount();
}

// Function - get receipt
let getLastReceipt = document.getElementById("getLastReceipt");
let receiptHead = document.getElementById("receiptHead");
let receiptBody = document.getElementById("receiptBody");
let receiptDetials = "";

function getReceipt() {
  receiptDetials = "";
  let itemNum = 0;
  receiptHeadAndBodyDetails(itemNum);
  receiptAccounmentFun();
  getLastReceipt.style.visibility = "visible";
  saveReceipt();
}
function receiptHeadAndBodyDetails(itemNum) {
  for (let i = 0; i < productsList.length; i++) {
    itemNum++;
    receiptDetials += `
      <div class="container">
          <div class="row">
          <div class="col-sm-6">
              <h5>${productsList[i].newitem}</h5>
          </div>
          <div class="col-sm-6">
              <span>${
                productsList[i].newQuantity +
                " X" +
                productsList[i].newprice +
                " $"
              }</span>
              <span>${productsList[i].newTotal + " $"}</span>
          </div>
          </div>
      </div>
  </div>
      `;
  }
  receiptHead.innerHTML = `
  <h4>Purchase ( total ${itemNum} items )</h4>
`;
  receiptBody.innerHTML = receiptDetials;
}

function receiptAccounmentFun() {
  receiptAccounment.innerHTML = `
    <div class="container">
      <div class="row">
        <div class="col-sm-6">
            <h4>Sub-Total</h4>
        </div>
        <div class="col-sm-6">
            <h4>${finallytotal + " $"}</h4>
        </div>
      </div>
      <div class="row">
          <div class="col-sm-6">
              <h5>Discount</h5>
          </div>
          <div class="col-sm-6">
              <h5>${discoutValue + " %"}</h5>
          </div>
      </div>
      <div class="row">
           <div class="col-sm-6">
              <h4>Total</h4>
           </div>
          <div class="col-sm-6">
              <h4>${getCost + " $"}</h4>
          </div>
      </div>
    </div>
  `;
}

function saveReceipt() {
  let productsListForReceipt = [...productsList];
  let customerHisap = {
    costBeforeDisc: finallytotal,
    Disc: discoutValue,
    costAfterDisc: getCost,
  };
  productsListForReceipt.push(customerHisap);

  receiptsList.push(productsListForReceipt);
  console.log(receiptsList);
  localStorage.setItem("receiptsList", JSON.stringify(receiptsList));
}
payButton.addEventListener("click", getReceipt);

// Function -  Add product to the whole market
let valueOfErrorName = document.getElementById("error-name");
let valueOfErrorPrice = document.getElementById("error-price");
let valueOfErrorId = document.getElementById("error-id");
let valueOfErrorImage = document.getElementById("error-Image");
let newItemPhotoSrc;

function AddProductToMarketFun() {
  let valueOfNameInputFiled = editeNameOfProduct.value;
  let valueOfPriceInputFiled = Number(editePriceOfProduct.value);
  let valueOfIdInputFiled = Number(editeIdOfProduct.value);
  let valueOfImageField = editeImageOfProduct.value;
  console.log(valueOfImageField);
  if (valueOfNameInputFiled == "") {
    valueOfErrorName.innerHTML = "Please Enter The Product Name *";
  } else if (isNaN(valueOfPriceInputFiled)) {
    valueOfErrorPrice.innerHTML = "Please Enter The Product Price *";
  } else if (isNaN(valueOfIdInputFiled)) {
    valueOfErrorId.innerHTML = "Please Enter The Product Id *";
  } else if (valueOfImageField == "") {
    valueOfErrorImage.innerHTML = "Please Choose Image For The Product*";
  } else {
    checkIdExistToAdd(
      valueOfNameInputFiled,
      valueOfPriceInputFiled,
      valueOfIdInputFiled,
      valueOfImageField,
      valueOfErrorId
    );
  }
}

function checkIdExistToAdd(nameVal, priceVal, idVal, imgVal, idField) {
  if (barCodesNums.includes(idVal)) {
    // console.log("hi");
    idField.innerHTML = "This Id Is Exsist ";
  } else {
    // console.log("nyvgc");
    addNewProduct = {
      item: nameVal,
      price: priceVal,
      photo: newItemPhotoSrc,
      barCode: idVal,
    };
    fruitsnveggies.push(addNewProduct);
    localStorage.setItem("localArray", JSON.stringify(fruitsnveggies));
    done.style.visibility = "visible";
  }
}

// Function to catch th path of imag
editeImageOfProduct.addEventListener("change", function (e) {
  let PhotoName = e.target.files[0].name;
  newItemPhotoSrc = `${PhotoName}`;
  // productPhoto.src = `images/food/${PhotoName}`;
});
AddProductToMarket.addEventListener("click", AddProductToMarketFun);

// Function -  update product in the whole market
function updateProductsInMarketFun() {
  let valueOfNameInputFiled = editeNameOfProduct.value;
  let valueOfPriceInputFiled = Number(editePriceOfProduct.value);
  let valueOfIdInputFiled = Number(editeIdOfProduct.value);
  let valueOfImageField = editeImageOfProduct.value;

  if (valueOfNameInputFiled == "") {
    valueOfErrorName.innerHTML = "Please Enter The Product Name *";
  } else if (isNaN(valueOfPriceInputFiled)) {
    valueOfErrorPrice.innerHTML = "Please Enter The Product Price *";
  } else if (isNaN(valueOfIdInputFiled)) {
    valueOfErrorId.innerHTML = "Please Enter The Product Id *";
  } else if (valueOfImageField == "") {
    valueOfErrorImage.innerHTML = "Please Choose Image For The Product*";
  } else {
    if (barCodesNums.includes(valueOfIdInputFiled)) {
      const index = fruitsnveggies.findIndex((object) => {
        return object.barCode === valueOfIdInputFiled;
      });
      fruitsnveggies[index].item = valueOfNameInputFiled;
      fruitsnveggies[index].price = valueOfPriceInputFiled;
      fruitsnveggies[index].photo = newItemPhotoSrc;
      fruitsnveggies[index].barCode = fruitsnveggies[index].barCode;
      localStorage.setItem("localArray", JSON.stringify(fruitsnveggies));
      done.style.visibility = "visible";
    } else {
      valueOfErrorId.innerHTML =
        "This Id Is Not Exsist, You Can Add It To Market ";
    }
  }
}
updateProductInMarket.addEventListener("click", updateProductsInMarketFun);

// Function -  delete product from the whole market
function deleteProductFromMarket() {
  let productNameValue = productName.innerHTML;
  let productPriceValue = productPrice.innerHTML;
  // let productImageValue = productImage.innerHTML;
  if (
    productNameValue == fruitsnveggies[0].item ||
    productPriceValue == fruitsnveggies[0].price
  ) {
    console.log("please Enter product");
  } else {
    const index = fruitsnveggies.findIndex((object) => {
      return object.item === productNameValue;
    });
    let removedEl = fruitsnveggies.splice(index, 1);
    console.log(removedEl);
    console.log(fruitsnveggies);
    localStorage.setItem("localArray", JSON.stringify(fruitsnveggies));
    productName.innerHTML = fruitsnveggies[0].item;
    productPrice.innerHTML = fruitsnveggies[0].price;
    totalPrice.innerHTML = fruitsnveggies[0].price;
    productImage.src = `img/${fruitsnveggies[0].photo}`;
  }
}
deleteButton.addEventListener("click", deleteProductFromMarket);
