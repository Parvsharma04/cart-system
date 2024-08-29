const root = document.querySelector("#container");
const bill = document.querySelector('#bill');

 function getData() {
  let cart =  JSON.parse(localStorage.getItem('cart')) || null;
  console.log("Getting cart", cart);
  return cart;
}

function saveData(cart) {
  localStorage.setItem('cart', JSON.stringify(cart));
}

function addItem(e) {
  let itemName = e.target.parentNode.parentNode.children[1].innerText;
  let cart = getData();
  if (cart) {
    let item = cart.find(item => item.name === itemName);
    if (item) {
      item.qty++;
      saveData(cart);
      renderData();
    }
  }
}

function removeItem(e) {
  let itemName = e.target.parentNode.parentNode.children[1].innerText;
  let cart = getData();
  if (cart) {
    let item = cart.find(item => item.name === itemName);
    if (item && item.qty > 1) {
      item.qty--;
      saveData(cart);
      renderData();
    }
  }
}

function renderData() {
  root.innerHTML = "";
  bill.innerHTML = ""; // Clear previous total amount
  let products = getData();

  if (!products || products.length === 0) {
    let msg = document.createElement("h1");
    msg.innerText = "Cart Empty";
    const totalAmt = document.createElement('h1')
    const totalItems= document.createElement('h1')
    totalAmt.innerText = 'Net Amount :  '
    const price = document.createElement('span')
    price.innerText = '$0'
    totalItems.innerText =  "Total Items :  0";
    totalAmt.append(price)
    bill.append(totalAmt)
    bill.append(totalItems)
    root.append(msg);
  } else {
    const totalAmt = document.createElement('h1');
    const totalItems= document.createElement('h1')
    totalAmt.innerText = 'Net Amount :  ';
    totalItems.innerText = `Total Items :  ${products.length}`;
    const price = document.createElement('span');
    let totalPrice = 0;
    products.forEach((element) => {
      const div = document.createElement("div");
      const image = document.createElement("img");
      const h1 = document.createElement("h1");
      const info = document.createElement("span");
      const price = document.createElement("span");
      const qty = document.createElement("span");
      const val = document.createElement("span");
      const increase = document.createElement("button");
      const decrease = document.createElement("button");
      increase.innerText = "+";
      decrease.innerText = "-";
      increase.addEventListener("click", addItem);
      decrease.addEventListener("click", removeItem);
      div.className = "item";
      div.className += ` ${element.id}`;
      image.src = `https://dummyjson.com/image/200/008080/ffffff?text=${element.name}`;
      h1.textContent = element.name;
      price.innerHTML = "$ " + element.price;
      qty.innerText = "QTY : ";
      val.innerText = element.qty;
      totalPrice += element.price * element.qty;
      div.appendChild(image);
      div.appendChild(h1);
      div.appendChild(price);
      info.appendChild(increase);
      qty.appendChild(val);
      info.appendChild(qty);
      info.appendChild(decrease);
      div.appendChild(info);
      root.appendChild(div);
    });

    price.innerText = "$" + totalPrice.toFixed(2);
    totalAmt.append(price);
    bill.append(totalAmt);
    bill.append(totalItems);
  }
}


renderData();
