// Global variables to store generated numbers and sorted numbers
let numbers = [];
let sortedNumbers = [];
let startTime, endTime;

let playerName = '';
let displayedNumbers = [];
let targetIndices = [];

// Event listener for the "Start Game" button
document.getElementById('startBtn').addEventListener('click', startGame);
// Event listener for the "Restart Game" button
document.getElementById('restart-btn').addEventListener('click', restartGame);

// Function to start the game
function startGame() {
    generateNumbers(); // Generate random numbers
    sortNumbers(); // Sort the generated numbers

    // Ask the user to enter the indices
    const inputSection = document.getElementById('input-section');
    const instructionText = document.getElementById('instruction-text');
    
    instructionText.textContent = `${playerName} Enter the Indexes of the following numbers: ${displayedNumbers[targetIndices[0]]} and ${displayedNumbers[targetIndices[1]]}`;
    correctIndices = 0;
}

// Function to restart the game
function restartGame() {
    // Clear input fields and result message
    document.getElementById('indexInput1').value = "";
    document.getElementById('indexInput2').value = "";
    document.getElementById('result').innerText = "";
    startGame(); // Restart the game
}

// Function to generate 5000 random numbers between 1 to 1000000
function generateNumbers() {
    numbers = [];
    for (let i = 0; i < 5000; i++) {
        numbers.push(Math.floor(Math.random() * 1000000) + 1);
    }
}

// Function to sort the generated numbers using various sorting algorithms
function sortNumbers() {
    let bubbleSorted, insertionSorted, mergeSorted, radixSorted, shellSorted, quickSorted, timSorted;

    // Bubble Sort
    startTime = performance.now();
    bubbleSorted = bubbleSort([...numbers]);
    endTime = performance.now();
    recordSortTime("Bubble Sort", endTime - startTime);

    // Insertion Sort
    startTime = performance.now();
    insertionSorted = insertionSort([...numbers]);
    endTime = performance.now();
    recordSortTime("Insertion Sort", endTime - startTime);

    // Merge Sort
    startTime = performance.now();
    mergeSorted = mergeSort([...numbers]);
    endTime = performance.now();
    recordSortTime("Merge Sort", endTime - startTime);

    // Radix Sort
    startTime = performance.now();
    radixSorted = radixSort([...numbers]);
    endTime = performance.now();
    recordSortTime("Radix Sort", endTime - startTime);

    // Shell Sort
    startTime = performance.now();
    shellSorted = shellSort([...numbers]);
    endTime = performance.now();
    recordSortTime("Shell Sort", endTime - startTime);

    // Quick Sort
    startTime = performance.now();
    quickSorted = quickSort([...numbers]);
    endTime = performance.now();
    recordSortTime("Quick Sort", endTime - startTime);

    // Tim Sort
    startTime = performance.now();
    timSorted = timSort([...numbers]);
    endTime = performance.now();
    recordSortTime("Tim Sort", endTime - startTime);

    // Display sorted numbers (using bubble sort by default)
    displayNumbers(bubbleSorted);
}

// Function to display the sorted numbers
function displayNumbers(sortedNumbers) {
    let index = 0;
    let interval = setInterval(() => {
        if (index < 20) {
            document.getElementById('numbersDisplay').innerText = sortedNumbers[index];
            index++;
        } else {
            clearInterval(interval);
            askIndex(sortedNumbers); // After displaying numbers, ask for indices
        }
    }, 2000);
}
// Function to ask the user for the index of two random numbers
function askIndex(sortedNumbers) {
    let randomIndex1 = Math.floor(Math.random() * 20);
    let randomIndex2 = Math.floor(Math.random() * 20);
    let number1 = sortedNumbers[randomIndex1];
    let number2 = sortedNumbers[randomIndex2];

    document.getElementById('submitBtn').addEventListener('click', function () {
        let guess1 = parseInt(document.getElementById('indexInput1').value);
        let guess2 = parseInt(document.getElementById('indexInput2').value);

        if (!isNaN(guess1) && !isNaN(guess2)) {
            if (guess1 === randomIndex1 && guess2 === randomIndex2) {
                let playerName = prompt("Congratulations! You've identified both numbers correctly. Please enter your name:");
                saveToDatabase(playerName, "Correct");
                document.getElementById('result').innerText = "Congratulations! You've identified both numbers correctly.";
            } else {
                document.getElementById('result').innerText = "Incorrect guesses. Try again.";
            }
        } else {
            document.getElementById('result').innerText = "Please enter valid indices.";
        }
    });
}

// Function to save player's name and result to the database
function saveToDatabase(playerName, result) {
    // Here you would make a request to your backend to save the player's name and result to the database
    console.log(`Player Name: ${playerName}, Result: ${result}`);
}

// Function to record the time taken for sorting
function recordSortTime(sortMethod, timeTaken) {
    // Here you would make a request to your backend to save the sort method and time taken to the database
    console.log(`Sort Method: ${sortMethod}, Time Taken: ${timeTaken} ms`);
}

// Implementation of sorting algorithms (bubbleSort, insertionSort, mergeSort, radixSort, shellSort, quickSort, timSort)...

// Bubble Sort
function bubbleSort(arr) {
    const n = arr.length;
    for (let i = 0; i < n - 1; i++) {
        for (let j = 0; j < n - i - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                let temp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = temp;
            }
        }
    }
    return arr;
}

// Insertion Sort
function insertionSort(arr) {
    const n = arr.length;
    for (let i = 1; i < n; i++) {
        let key = arr[i];
        let j = i - 1;
        while (j >= 0 && arr[j] > key) {
            arr[j + 1] = arr[j];
            j--;
        }
        arr[j + 1] = key;
    }
    return arr;
}

// Merge Sort
function mergeSort(arr) {
    if (arr.length <= 1) {
        return arr;
    }

    const mid = Math.floor(arr.length / 2);
    const left = arr.slice(0, mid);
    const right = arr.slice(mid);

    return merge(mergeSort(left), mergeSort(right));
}

function merge(left, right) {
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
}

// Radix Sort
function radixSort(arr) {
    const maxDigitLength = Math.max(...arr).toString().length;
    let buckets = Array.from({ length: 10 }, () => []);

    for (let i = 0; i < maxDigitLength; i++) {
        for (let j = 0; j < arr.length; j++) {
            const digit = getDigit(arr[j], i);
            buckets[digit].push(arr[j]);
        }
        arr = [].concat(...buckets);
        buckets = Array.from({ length: 10 }, () => []);
    }
    return arr;
}

function getDigit(num, i) {
    return Math.floor(Math.abs(num) / Math.pow(10, i)) % 10;
}

// Shell Sort
function shellSort(arr) {
    const n = arr.length;
    let gap = Math.floor(n / 2);

    while (gap > 0) {
        for (let i = gap; i < n; i++) {
            let temp = arr[i];
            let j = i;
            while (j >= gap && arr[j - gap] > temp) {
                arr[j] = arr[j - gap];
                j -= gap;
            }
            arr[j] = temp;
        }
        gap = Math.floor(gap / 2);
    }
    return arr;
}

// Quick Sort
function quickSort(arr) {
    if (arr.length <= 1) {
        return arr;
    }

    const pivot = arr[arr.length - 1];
    const left = [];
    const right = [];

    for (let i = 0; i < arr.length - 1; i++) {
        if (arr[i] < pivot) {
            left.push(arr[i]);
        } else {
            right.push(arr[i]);
        }
    }

    return [...quickSort(left), pivot, ...quickSort(right)];
}

// Tim Sort (Not implemented in JavaScript directly, we can use the built-in sort)
function timSort(arr) {
    return arr.sort((a, b) => a - b);
}