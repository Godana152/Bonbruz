const tickerItems = [
  { name: "Chicken Pilau", price: "KSh 450" },
  { name: "Nyama Choma", price: "KSh 800", tag: "Chef's pick" },
  { name: "Beef Burger & Fries", price: "KSh 1,200" },
  { name: "Samosa", price: "KSh 50" },
  { name: "Chapati", price: "KSh 100" },
  { name: "Pilau", price: "KSh 300" },
  { name: "Fresh Juice", price: "KSh 200" },
  { name: "Ugali Choma", price: "KSh 350" },
  { name: "Chapati Beans", price: "KSh 150" },
];

const ticker = document.getElementById("track");
const menu = document.querySelector(".popular-dishes");
const orderButton = document.getElementById("order-button");
const cartCount = document.getElementById("cart-count");
const cartStatus = document.getElementById("cart-status");
const cart = new Map();

function createTickerSet() {
  const fragment = document.createDocumentFragment();

  tickerItems.forEach(({ name, price, tag }) => {
    const item = document.createElement("div");
    item.className = "item";

    const itemName = document.createElement("span");
    itemName.textContent = name;

    const itemPrice = document.createElement("span");
    itemPrice.className = "price";
    itemPrice.textContent = price;

    item.append(itemName, itemPrice);

    if (tag) {
      const itemTag = document.createElement("span");
      itemTag.className = "tag";
      itemTag.textContent = tag;
      item.append(itemTag);
    }

    fragment.append(item);
  });

  return fragment;
}

if (ticker) {
  ticker.append(createTickerSet(), createTickerSet());
}

function getCartQuantity() {
  return Array.from(cart.values()).reduce(
    (total, entry) => total + entry.quantity,
    0,
  );
}

function updateCartCount() {
  const quantity = getCartQuantity();
  if (cartCount) {
    cartCount.textContent = `${quantity} ${quantity === 1 ? "item" : "items"}`;
  }
}

if (menu) {
  menu.addEventListener("click", (event) => {
    if (!(event.target instanceof Element)) return;

    const button = event.target.closest(".cart");
    if (!button) return;

    const card = button.closest(".dish");
    const name = card?.querySelector("h3")?.textContent.trim();
    const priceText = card?.querySelector(".price")?.textContent ?? "";
    const price = Number(priceText.replace(/[^\d.]/g, ""));
    if (!name || !Number.isFinite(price)) return;

    const current = cart.get(name);
    cart.set(name, {
      quantity: (current?.quantity ?? 0) + 1,
      price,
    });

    updateCartCount();
    if (cartStatus) {
      cartStatus.textContent = `${name} added to your order.`;
    }
  });
}

if (orderButton) {
  orderButton.addEventListener("click", () => {
    const quantity = getCartQuantity();

    if (quantity === 0) {
      if (cartStatus) {
        cartStatus.textContent = "Choose a dish and add it to your order first.";
      }
      menu?.scrollIntoView({ behavior: "smooth", block: "start" });
      return;
    }

    const total = Array.from(cart.values()).reduce(
      (sum, entry) => sum + entry.quantity * entry.price,
      0,
    );

    if (cartStatus) {
      cartStatus.textContent = `Your order has ${quantity} ${
        quantity === 1 ? "item" : "items"
      } — total KSh ${total.toLocaleString()}.`;
    }
  });
}
