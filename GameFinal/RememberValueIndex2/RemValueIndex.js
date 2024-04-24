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
  
  // // Tim Sort (Not implemented in JavaScript directly, we can use the built-in sort)
  // function timSort(arr) {
  //   return arr.sort((a, b) => a - b);
  //   const end = performance.now();
  //   const time = end - start;
  //   console.log(`Bubble Sort: ${time} ms`);
  // }
  
  
  const insertionSort = (arr) => {
    const start = performance.now();
    for (let i = 1; i < arr.length; i++) {
      let current = arr[i];
      let j = i - 1;
      while (j >= 0 && arr[j] > current) {
        arr[j + 1] = arr[j];
        j--;
      }
      arr[j + 1] = current;
    }
    const end = performance.now();
    const time = end - start;
    console.log(`Insertion Sort: ${time} ms`);
  };
  
  const mergeSort = (arr) => {
    const merge = (left, right) => {
      let result = [];
      let leftIndex = 0;
      let rightIndex = 0;
  
      while (leftIndex < left.length && rightIndex < right.length) {
        if (left[leftIndex] < right[rightIndex]) {
          result.push(left[leftIndex]);
          leftIndex++;
        } else {
          result.push(right[rightIndex]);
          rightIndex++;
        }
      }
  
      return result.concat(left.slice(leftIndex)).concat(right.slice(rightIndex));
    };
  
    const start = performance.now();
    
    const sort = (arr) => {
      if (arr.length <= 1) {
        return arr;
      }
      
      const middle = Math.floor(arr.length / 2);
      const left = arr.slice(0, middle);
      const right = arr.slice(middle);
      
      return merge(sort(left), sort(right));
    };
  
    arr = sort(arr);
  
    const end = performance.now();
    const time = end - start;
    console.log(`Merge Sort: ${time} ms`);
  };
  const shellSort = (arr) => {
    const start = performance.now();
  
    const n = arr.length;
    for (let gap = Math.floor(n / 2); gap > 0; gap = Math.floor(gap / 2)) {
      for (let i = gap; i < n; i++) {
        const temp = arr[i];
        let j;
        for (j = i; j >= gap && arr[j - gap] > temp; j -= gap) {
          arr[j] = arr[j - gap];
        }
        arr[j] = temp;
      }
    }
  
    const end = performance.now();
    const time = end - start;
    console.log(`Shell Sort: ${time} ms`);
  };
  
  const quickSort = (arr) => {
    const start = performance.now();
  
    const partition = (arr, low, high) => {
      const pivot = arr[high];
      let i = low - 1;
      for (let j = low; j < high; j++) {
        if (arr[j] < pivot) {
          i++;
          [arr[i], arr[j]] = [arr[j], arr[i]];
        }
      }
      [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
      return i + 1;
    };
  
    const sort = (arr, low, high) => {
      if (low < high) {
        const pi = partition(arr, low, high);
        sort(arr, low, pi - 1);
        sort(arr, pi + 1, high);
      }
    };
  
    sort(arr, 0, arr.length - 1);
  
    const end = performance.now();
    const time = end - start;
    console.log(`Quick Sort: ${time} ms`);
  };
  
  const radixSort = (arr) => {
    const start = performance.now();
  
    const getMax = (arr) => {
      let max = arr[0];
      for (let i = 1; i < arr.length; i++) {
        if (arr[i] > max) {
          max = arr[i];
        }
      }
      return max;
    };
  
    const countingSort = (arr, exp) => {
      const output = new Array(arr.length).fill(0);
      const count = new Array(10).fill(0);
  
      for (let i = 0; i < arr.length; i++) {
        count[Math.floor(arr[i] / exp) % 10]++;
      }
  
      for (let i = 1; i < 10; i++) {
        count[i] += count[i - 1];
      }
  
      for (let i = arr.length - 1; i >= 0; i--) {
        output[count[Math.floor(arr[i] / exp) % 10] - 1] = arr[i];
        count[Math.floor(arr[i] / exp) % 10]--;
      }
  
      for (let i = 0; i < arr.length; i++) {
        arr[i] = output[i];
      }
    };
  
    const max = getMax(arr);
  
    for (let exp = 1; Math.floor(max / exp) > 0; exp *= 10) {
      countingSort(arr, exp);
    }
  
    const end = performance.now();
    const time = end - start;
    console.log(`Radix Sort: ${time} ms`);
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
    insertionSort([...numbers]);
    mergeSort([...numbers]);
    radixSort([...numbers]);
    shellSort([...numbers]);
    quickSort([...numbers]);
  
  
    
  
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
  