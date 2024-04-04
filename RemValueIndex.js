// Generate 5000 random numbers between 1 to 1000000
// const numbers = Array.from(
//   { length: 5000 },
//   () => Math.floor(Math.random() * 1000000) + 1
// );

// Function to generate 5000 random numbers between 1 to 1000000
function generateNumbers() {
  numbers = [];
  for (let i = 0; i < 5000; i++) {
    numbers.push(Math.floor(Math.random() * 1000000) + 1);
  }
}

// Sorting function
const bubbleSort = (arr) => {
  const start = performance.now();
  let swapped;
  do {
    swapped = false;
    for (let i = 0; i < arr.length - 1; i++) {
      if (arr[i] > arr[i + 1]) {
        [arr[i], arr[i + 1]] = [arr[i + 1], arr[i]];
        swapped = true;
      }
    }
  } while (swapped);
  const end = performance.now();
  const time = end - start;
  console.log(`Bubble Sort: ${time} ms`);
  //console.log(arr);
};

let sortedNumbers;
let targetIndices = [];
let correctIndices = 0;
let displayedNumbers = [];
let playerName = "";

const startGame = () => {
  generateNumbers();
  // Sort the numbers using bubble sort
  sortedNumbers = [...numbers];
  bubbleSort(sortedNumbers);

  // Display the first 20 numbers one by one with a 2-second delay
  const gameBoard = document.getElementById("game-board");
  gameBoard.innerHTML = "";
  displayedNumbers = [];
  for (let i = 0; i < 20; i++) {
    const value = sortedNumbers[i];
    const valueElement = document.createElement("div");
    valueElement.textContent = value;
    //gameBoard.appendChild(valueElement);
    console.log(i + ":" + value);
    displayedNumbers.push(value);
    displayNumbers(displayedNumbers);
    setTimeout(() => {
      valueElement.style.display = "none";
    }, (i + 1) * 2000);
  }

  // Choose two random indices from the first 20 numbers
  targetIndices = [];
  while (targetIndices.length < 2) {
    const randomIndex = Math.floor(Math.random() * 20);
    if (!targetIndices.includes(randomIndex)) {
      targetIndices.push(randomIndex);
    }
  }

  // Ask the user to enter the indices
  const inputSection = document.getElementById("input-section");
  const instructionText = document.getElementById("instruction-text");
  inputSection.style.display = "block";
  instructionText.textContent = `${playerName} Enter the Indexes of the following numbers: ${
    displayedNumbers[targetIndices[0]]
  } and ${displayedNumbers[targetIndices[1]]}`;
  correctIndices = 0;
};

// Function to display the sorted numbers
function displayNumbers(sortedNumbers) {
  let index = 0;
  document.getElementById("numbersDisplay").innerText = "";
  let interval = setInterval(() => {
    if (index < 20) {
      document.getElementById("numbersDisplay").innerText =
        sortedNumbers[index];
      const value = sortedNumbers[index];
      displayedNumbers.push(value);
      index++;
    } else {
      document.getElementById("numbersDisplay").innerText = "Done";
    }
  }, 2000);
}

// Function to save player's name and result to the database
function saveToDatabase(playerName, result) {
  // Here you would make a request to your backend to save the player's name and result to the database
  console.log(`Player Name: ${playerName}, Result: ${result}`);
}

const submitIndices = () => {
  const index1Input = document.getElementById("index1-input");
  const index2Input = document.getElementById("index2-input");
  const enteredIndex1 = parseInt(index1Input.value);
  const enteredIndex2 = parseInt(index2Input.value);
  const message = document.getElementById("message");

  if (
    targetIndices.includes(enteredIndex1) &&
    targetIndices.includes(enteredIndex2)
  ) {
    message.textContent = "Congratulations! You've identified both numbers correctly.";
    nameInput.disabled = false;
    index1Input.value = "";
    index2Input.value = "";
    openModal();   
  } else if (
    targetIndices.includes(enteredIndex1) ||
    targetIndices.includes(enteredIndex2)
  ) {
    message.textContent =
      "One index is correct! Try again for the other index.";
  } else {
    message.textContent = "Incorrect! Try again.";
  }

  index1Input.value = "";
  index2Input.value = "";
};

const startBtn = document.getElementById("startBtn");
startBtn.addEventListener("click", startGame);

const submitBtn = document.getElementById("submit-btn");
submitBtn.addEventListener("click", submitIndices);

const restartBtn = document.getElementById("restart-btn");
restartBtn.addEventListener("click", startGame);

// const playerNameInput = document.getElementById("player-name");
// playerNameInput.addEventListener("input", () => {
//   playerName = playerNameInput.value || "Player";
// });



function openModal() {
  document.getElementById('myModal').style.display = 'block';
}

function closeModal() {
  document.getElementById('myModal').style.display = 'none';
}

let names = [];
function addName() {
  const nameInput = document.getElementById('nameInput');
  const name = nameInput.value.trim();
  if (name !== '') {
    names.push(name);
    nameInput.value = '';
    nameInput.disabled = true;
  }
}
function downloadJson() {
  const jsonContent = JSON.stringify({ names: names }, null, 2);
  const blob = new Blob([jsonContent], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'names.json';
  document.body.appendChild(a);
  a.click();
  setTimeout(() => {
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }, 0);
}
