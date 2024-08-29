const products = [
    {
        "id": 1,
        "name": "Wireless Mouse",
        "price": 29.99,
        "image": "https://example.com/images/wireless-mouse.jpg"
    },
    {
        "id": 2,
        "name": "Mechanical Keyboard",
        "price": 79.99,
        "image": "https://example.com/images/mechanical-keyboard.jpg"
    },
    {
        "id": 3,
        "name": "HD Monitor",
        "price": 199.99,
        "image": "https://example.com/images/hd-monitor.jpg"
    },
    {
        "id": 4,
        "name": "USB-C Hub",
        "price": 39.99,
        "image": "https://example.com/images/usb-c-hub.jpg"
    },
    {
        "id": 5,
        "name": "Laptop Stand",
        "price": 49.99,
        "image": "https://example.com/images/laptop-stand.jpg"
    },
    {
        "id": 6,
        "name": "Gaming Headset",
        "price": 89.99,
        "image": "https://example.com/images/gaming-headset.jpg"
    },
    {
        "id": 7,
        "name": "External SSD",
        "price": 129.99,
        "image": "https://example.com/images/external-ssd.jpg"
    },
    {
        "id": 8,
        "name": "Webcam",
        "price": 59.99,
        "image": "https://example.com/images/webcam.jpg"
    },
    {
        "id": 9,
        "name": "Desk Organizer",
        "price": 19.99,
        "image": "https://example.com/images/desk-organizer.jpg"
    },
    {
        "id": 10,
        "name": "Mouse Pad",
        "price": 14.99,
        "image": "https://example.com/images/mouse-pad.jpg"
    }
]


const root = document.querySelector("#container");
const loadMoreButton = document.querySelector("#load-more");

let currentIndex = 0;
const itemsPerPage = 5;

function toggleDescription(e) {
    const parentElement = e.target.closest(".item");
    const existingDescription = parentElement.querySelector(".description");

    if (existingDescription) {
        existingDescription.remove();
    } else {
        const description = document.createElement("div");
        description.className = "description";
        description.innerText = `Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas, omnis?`;
        parentElement.appendChild(description);
    }
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

function addToCart(e) {
  let selectedProduct = e.target.parentNode.parentNode.classList[1];
  let alreadyInCart = checkCart(selectedProduct);

  console.log(selectedProduct, alreadyInCart)
  let newCart = getCart() || [];

  
  products.forEach((ele) => {
    if (ele.id == selectedProduct && !alreadyInCart) {
      ele.qty = 1;
      newCart.push(ele);
      console.log(newCart, "init");
      setCart(newCart)
      alreadyInCart = true;
    } else if (ele.id == selectedProduct && alreadyInCart) {
      newCart = incrementQty(selectedProduct);
      setCart(newCart)
      console.log(newCart, "repeat");
    }
  });
}
function createProductElement(product) {
    const div = document.createElement("div");
    div.className = `item ${product.id}`;

    const image = document.createElement("img");
    image.src = `https://dummyjson.com/image/200/008080/ffffff?text=${product.name}`;

    const h1 = document.createElement("h1");
    h1.textContent = product.name;

    const p = document.createElement("p");
    p.innerHTML = `$${product.price.toFixed(2)}`;

    const buttonDiv = document.createElement("div");
    buttonDiv.className = "button-div";

    const button1 = document.createElement("button");
    button1.className = "show-desc";
    button1.innerText = "Show Description";
    button1.addEventListener("click", toggleDescription);

    const button2 = document.createElement("button");
    button2.className = "add-to-cart";
    button2.innerText = "Add to cart";
    button2.addEventListener("click", addToCart);

    buttonDiv.appendChild(button1);
    buttonDiv.appendChild(button2);

    div.appendChild(image);
    div.appendChild(h1);
    div.appendChild(p);
    div.appendChild(buttonDiv);

    return div;
}

function displayProducts(productsToShow) {
    productsToShow.forEach(product => {
        root.appendChild(createProductElement(product));
    });
}

function loadMoreProducts() {
    const nextProducts = products.slice(currentIndex, currentIndex + itemsPerPage);
    displayProducts(nextProducts);
    currentIndex += itemsPerPage;

    if (currentIndex >= products.length) {
        loadMoreButton.disabled = true;
        loadMoreButton.innerText = "No More Products";
    }
}



function getCart() {
    return JSON.parse(localStorage.getItem("cart"));
}

function setCart(cart) {

    console.log(cart)
    localStorage.setItem('cart', JSON.stringify(cart));
}

// Initial load
loadMoreProducts();

// Add event listener to the "Load More" button
loadMoreButton.addEventListener("click", loadMoreProducts);
