let products = [
  {
    id: 1,
    name: "Wireless Mouse",
    price: 29.99,
    image: "https://example.com/images/wireless-mouse.jpg",
  },
  {
    id: 2,
    name: "Mechanical Keyboard",
    price: 79.99,
    image: "https://example.com/images/mechanical-keyboard.jpg",
  },
  {
    id: 3,
    name: "HD Monitor",
    price: 199.99,
    image: "https://example.com/images/hd-monitor.jpg",
  },
  {
    id: 4,
    name: "USB-C Hub",
    price: 39.99,
    image: "https://example.com/images/usb-c-hub.jpg",
  },
  {
    id: 5,
    name: "Laptop Stand",
    price: 49.99,
    image: "https://example.com/images/laptop-stand.jpg",
  },
];

const root = document.querySelector("#container");
let DESC = false;
products.forEach((element) => {
  const div = document.createElement("div");
  const image = document.createElement("img");
  const h1 = document.createElement("h1");
  const p = document.createElement("p");
  const buttonDiv = document.createElement("div");
  const button1 = document.createElement("button");
  const button2 = document.createElement("button");
  button1.className = "show-desc";
  button2.className = "add-to-cart";

  button1.addEventListener("click", showDesc);
  button2.addEventListener("click", addToCart);
  div.className = "item";
  div.className += ` ${element.id}`;
  buttonDiv.className = "button-div";
  image.src = `https://dummyjson.com/image/200/008080/ffffff?text=${element.name}`;
  h1.textContent = element.name;
  p.innerHTML = element.price;
  button1.innerText = "Show Description";
  button2.innerText = "Add to cart";
  div.appendChild(image);
  div.appendChild(h1);
  div.appendChild(p);
  buttonDiv.appendChild(button1);
  buttonDiv.appendChild(button2);
  div.appendChild(buttonDiv);
  root.appendChild(div);
});

function showDesc(e) {
  let parentElement = e.target.parentNode.parentNode;
  let existingDescription = parentElement.querySelector(".description");

  if (!DESC) {
    if (!existingDescription) {
      let description = document.createElement("div");
      description.className = "description";
      description.innerText = `Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas, omnis?`;
      parentElement.append(description);
    }
  } else {
    if (existingDescription) {
      parentElement.removeChild(existingDescription);
    }
  }

  DESC = !DESC;
}

function addToCart(e) {
  let selectedProduct = e.target.parentNode.parentNode.classList[1];
  let alreadyInCart = checkCart(selectedProduct);

  console.log(selectedProduct, alreadyInCart)
  let newCart = getCart();
  if(newCart == null){
    newCart = [];
  }
  products.forEach((ele) => {
    if (ele.id == selectedProduct && !alreadyInCart) {
      ele.qty = 1;
      newCart.push(ele);
      console.log(newCart, "init");
      setData(newCart)
      alreadyInCart = true;
    } else if (ele.id == selectedProduct && alreadyInCart) {
      newCart = incrementQty(selectedProduct);
      setData(newCart)
      console.log(newCart, "repeat");
    }
  });
}
function checkCart(selectedProduct) {
  let alreadyInCart = false;
  let newCart = getCart();
  if(newCart == null)
    return false;
  console.log("checking", newCart)
  for (let i = 0; i < newCart.length; i++) {
    if (newCart[i].id == selectedProduct) {
      alreadyInCart = true;
    }
  }
  // console.log(selectedProduct, alreadyInCart)
  return alreadyInCart;
}

function incrementQty(ele) {
  let newCart = getCart();
  if (newCart == null) newCart = [];
  newCart.forEach((e) => {
    if (e.id == ele) {
      e.qty++;
    }
  });
  return newCart
}

function getCart() {
  let cart =  JSON.parse(localStorage.getItem("cart"));
  console.log("getting cart", cart)
  return cart
}

function setData(cart) {
  console.log("setting cart", cart)
  localStorage.setItem("cart", JSON.stringify(cart));
}
