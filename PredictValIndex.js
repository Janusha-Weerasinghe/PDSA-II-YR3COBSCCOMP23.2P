// Generate 5000 random numbers between 1 and 1000000
const randomNumbers = Array.from({ length: 5000 }, () => Math.floor(Math.random() * 1000000) + 1);
randomNumbers.sort((a, b) => a - b); // Sort the array in ascending order

// Game logic
let selectedValue;
let choices;
let correctIndex;

function startGame() {
    // Randomly select a value from the list
    selectedValue = randomNumbers[Math.floor(Math.random() * randomNumbers.length)];

    // Generate four choices for the index
    const minIndex = 0;
    const maxIndex = randomNumbers.length - 1;
    correctIndex = randomNumbers.indexOf(selectedValue);

    const choice1 = Math.floor(Math.random() * (maxIndex - minIndex + 1)) + minIndex;
    const choice2 = Math.floor(Math.random() * (maxIndex - minIndex + 1)) + minIndex;
    const choice3 = Math.floor(Math.random() * (maxIndex - minIndex + 1)) + minIndex;
    const choice4 = correctIndex;

    choices = [choice1, choice2, choice3, choice4].sort(() => Math.random() - 0.5);

    // Display the selected value, hint, and choices
    document.getElementById('value').textContent = selectedValue;
    document.getElementById('hint').textContent = getHint(selectedValue, randomNumbers);
    const choiceForm = document.getElementById('choiceForm');
    choiceForm.innerHTML = '';
    choices.forEach((choice, index) => {
        const radioInput = document.createElement('input');
        radioInput.type = 'radio';
        radioInput.name = 'choice';
        radioInput.value = index;
        radioInput.id = `choice${index}`;

        const label = document.createElement('label');
        label.htmlFor = `choice${index}`;
        label.textContent = `${index + 1}. Index: ${choice}`;

        const div = document.createElement('div');
        div.appendChild(radioInput);
        div.appendChild(label);

        choiceForm.appendChild(div);
    });

    // Enable the submit button
    document.getElementById('submitBtn').disabled = false;
}

function getHint(value, arr) {
    const index = arr.indexOf(value);
    const quarter = Math.floor(arr.length / 4);

    if (index < quarter) {
        return "The value is in the first quarter of the array.";
    } else if (index < quarter * 2) {
        return "The value is in the second quarter of the array.";
    } else if (index < quarter * 3) {
        return "The value is in the third quarter of the array.";
    } else {
        return "The value is in the fourth quarter of the array.";
    }
}

function validateChoice() {
    const selectedChoice = choices[document.querySelector('input[name="choice"]:checked').value];
    const result = document.getElementById('result');

    if (selectedChoice === correctIndex) {
        result.textContent = 'Correct! You predicted the right index.';
        saveUserResponse(true);
    } else {
        result.textContent = `Incorrect. The correct index for the value ${selectedValue} is ${correctIndex}.`;
        saveUserResponse(false);
    }

    // Disable the submit button
    document.getElementById('submitBtn').disabled = true;
}

function saveUserResponse(isCorrect) {
    // Code to save user's name and response in the database
    console.log(`User response: ${isCorrect ? 'Correct' : 'Incorrect'}`);
}

// Binary Search
function binarySearch(arr, x) {
    let start = 0;
    let end = arr.length - 1;
    while (start <= end) {
        let mid = Math.floor((start + end) / 2);
        if (arr[mid] === x) return mid;
        else if (arr[mid] < x) start = mid + 1;
        else end = mid - 1;
    }
    return -1;
}

// Jump Search
function jumpSearch(arr, x) {
    const n = arr.length;
    let step = Math.floor(Math.sqrt(n));
    let prev = 0;
    while (arr[Math.min(step, n) - 1] < x) {
        prev = step;
        step += Math.floor(Math.sqrt(n));
        if (prev >= n) return -1;
    }
    while (arr[prev] < x) {
        prev++;
        if (prev === Math.min(step, n)) return -1;
    }
    if (arr[prev] === x) return prev;
    return -1;
}

// Exponential Search
function exponentialSearch(arr, x) {
    if (arr[0] === x) return 0;
    let i = 1;
    while (i < arr.length && arr[i] <= x) i = i * 2;
    return binarySearch(arr.slice(Math.floor(i / 2), Math.min(i, arr.length)), x);
}

// Fibonacci Search
function fibonacciSearch(arr, x) {
    let fib1 = 0;
    let fib2 = 1;
    let fibM = fib1 + fib2;
    while (fibM < arr.length) {
        fib1 = fib2;
        fib2 = fibM;
        fibM = fib1 + fib2;
    }
    let offset = -1;
    while (fibM > 1) {
        let i = Math.min(offset + fib1, arr.length - 1);
        if (arr[i] < x) {
            fibM = fib2;
            fib2 = fib1;
            fib1 = fibM - fib2;
            offset = i;
        } else if (arr[i] > x) {
            fibM = fib1;
            fib2 = fib2 - fib1;
            fib1 = fibM - fib2;
        } else return i;
    }
    if (fib2 === 1 && arr[offset + 1] === x) return offset + 1;
    return -1;
}

// Event listeners
document.getElementById('submitBtn').addEventListener('click', validateChoice);
document.getElementById('playAgainBtn').addEventListener('click', startGame);

// Start the game
startGame();
