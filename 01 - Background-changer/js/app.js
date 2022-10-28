const button = document.getElementById('btn');
const colorText = document.querySelector(".color"); 

// const colors = ['#22E6512', '#F0E624', '#D9822B', '#F02474', '#6B4FE6'];

const hex = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "A", "B", "C", "D", "E", "F"]

button.addEventListener('click', () => {
  let mainColor = generateHex();
  document.body.style.backgroundColor = mainColor;
  colorText.textContent = mainColor;
});

function generateHex() {
  let hexColor = "#";
  for (let i = 0; i < 6; i++) {
    hexColor += hex[getRandomNumber()]
  }
  
  return hexColor;
};

function getRandomNumber() {
  return Math.floor(Math.random() * hex.length);
}


