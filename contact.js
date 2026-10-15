// Menu items — swap this list for real data
const items = [
  { name: "Nyama Choma", price: "KSh 450", tag: "Chef's pick" },
  { name: "Pilau", price: "KSh 300" },
  { name: "Chapati & Beans", price: "KSh 150" },
  { name: "Fresh Juice", price: "KSh 200" },
  { name: "Ugali & Fish", price: "KSh 350", tag: "Today only" },
  { name: "Samosas", price: "KSh 50" },
  { name: "Chicken", price: "KSh 450" },
  { name: "Nyama choma ", price: "KSh 800" },
  { name: "Beef Burger & Fries", price: "KSh 1200" },


];

const track = document.getElementById('track');

// Render the list twice back-to-back so the -50% loop is seamless
function renderSet() {
  return items.map(i => `
    <div class="item">
      <span>${i.name}</span>
      <span class="price">${i.price}</span>
      ${i.tag ? `<span class="tag">${i.tag}</span>` : ""}
    </div>
  `).join("");
}

if (track) {
  track.innerHTML = renderSet() + renderSet();
}