const root = document.querySelector("#container");
let products = getData();

if (products == null) {
  let msg = document.createElement("h1");
  msg.innerText = "Cart Empty";
  root.append(msg);
} else
  products.forEach((element) => {
    const div = document.createElement("div");
    const image = document.createElement("img");
    const h1 = document.createElement("h1");
    const info = document.createElement("div");
    const price = document.createElement("p");
    const qty = document.createElement("p");

    div.className = "item";
    div.className += ` ${element.id}`;
    image.src = `https://dummyjson.com/image/350/008080/ffffff?text=${element.name}`;
    h1.textContent = element.name;
    price.innerHTML = "$ " +element.price;
    qty.innerText = "QTY : "+element.qty;
    div.appendChild(image);
    div.appendChild(h1);
    info.appendChild(price);
    info.appendChild(qty);
    div.appendChild(info);
    root.appendChild(div);
  });

function getData() {
  let cart = JSON.parse(localStorage.getItem("cart"));
  console.log("getting cart", cart);
  return cart;
}
