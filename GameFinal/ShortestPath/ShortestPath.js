const cities = [
  "City A",
  "City B",
  "City C",
  "City D",
  "City E",
  "City F",
  "City G",
  "City H",
  "City I",
  "City J",
];
let graph = Array(10)
  .fill()
  .map(() => Array(10).fill(0));
let openCity;

function assignRandomDistances() {
  for (let i = 0; i < 10; i++) {
    for (let j = i + 1; j < 10; j++) {
      const distance = Math.floor(Math.random() * 46) + 5; // Random distance between 5 and 50
      graph[i][j] = distance;
      graph[j][i] = distance;
      console.log(`graph ${graph[i][j]}  Distance ${distance}`);
    }
  }
}

function createTable() {
  const distanceTableDiv = document.getElementById("distanceTable");
  let tableHTML = "<table border='1'><thead><tr><th>City</th>";
  for (let city of cities) {
    tableHTML += `<th>${city}</th>`;
  }
  tableHTML += "</tr></thead><tbody>";

  for (let i = 0; i < cities.length; i++) {
    tableHTML += `<tr><td>${cities[i]}</td>`;
    for (let j = 0; j < cities.length; j++) {
      if (i === j) {
        tableHTML += `<td></td>`; // Empty cell for diagonal entries
      } else if (i === 0) {
        // City A to all cities
        tableHTML += `<td></td>`;
      } else if (i === 1 && j >= 1) {
        // City B to City B and beyond
        tableHTML += `<td></td>`;
      } else if (i === 2 && j >= 2) {
        // City C to City C and beyond
        tableHTML += `<td></td>`;
      } else if (i === 3 && j >= 3) {
        // City D to City D and beyond
        tableHTML += `<td></td>`;
      } else if (i === 4 && j >= 4) {
        // City E to City E and beyond
        tableHTML += `<td></td>`;
      } else if (i === 5 && j >= 5) {
        // City F to City F and beyond
        tableHTML += `<td></td>`;
      } else if (i === 6 && j >= 6) {
        // City G to City G and beyond
        tableHTML += `<td></td>`;
      } else if (i === 7 && j >= 7) {
        // City H to City H and beyond
        tableHTML += `<td></td>`;
      } else if (i === 8 && j >= 8) {
        // City I to City I and beyond
        tableHTML += `<td></td>`;
      } else if (i === 9 && j === 9) {
        // City J to City J
        tableHTML += `<td></td>`;
      } else {
        tableHTML += `<td>${graph[i][j]}</td>`;
      }
    }
    tableHTML += "</tr>";
  }
  tableHTML += "</tbody></table>";
  distanceTableDiv.innerHTML = tableHTML;
}

function dijkstra(source) {
  const n = graph.length;
  const visited = Array(n).fill(false);
  const dist = Array(n).fill(Number.POSITIVE_INFINITY);
  dist[source] = 0;

  for (let count = 0; count < n - 1; count++) {
    let u = -1;
    for (let i = 0; i < n; i++) {
      if (!visited[i] && (u === -1 || dist[i] < dist[u])) {
        u = i;
      }
    }
    visited[u] = true;
    for (let v = 0; v < n; v++) {
      if (!visited[v] && graph[u][v] && dist[u] + graph[u][v] < dist[v]) {
        dist[v] = dist[u] + graph[u][v];
      }
    }
  }
  return dist;
}

function bellmanFord(source) {
  const n = graph.length;
  const dist = Array(n).fill(Number.POSITIVE_INFINITY);
  dist[source] = 0;

  for (let i = 1; i < n; i++) {
    for (let u = 0; u < n; u++) {
      for (let v = 0; v < n; v++) {
        if (graph[u][v] && dist[u] + graph[u][v] < dist[v]) {
          dist[v] = dist[u] + graph[u][v];
        }
      }
    }
  }

  for (let u = 0; u < n; u++) {
    for (let v = 0; v < n; v++) {
      if (graph[u][v] && dist[u] + graph[u][v] < dist[v]) {
        console.error("Graph contains a negative-weight cycle");
        return;
      }
    }
  }
  return dist;
}

// Update the setupGame function to populate the city dropdowns
function setupGame() {
  const playerName = prompt("Enter your name:");
  if (!playerName) {
    alert("Please enter your name to start the game.");
    return;
  }
  assignRandomDistances();
  createTable();
  openCity = Math.floor(Math.random() * cities.length);
  document.getElementById("playerName").textContent = playerName;

  // Populate start and end city dropdowns
  const startCityDropdown = document.getElementById("startCityInput");
  const endCityInputs = document.getElementById("endCityInputs");

  cities.forEach((city) => {
    const option = document.createElement("option");
    option.text = city;
    startCityDropdown.add(option);

    const label = document.createElement("label");
    label.textContent = `Distance to ${city}:`;
    const input = document.createElement("input");
    input.type = "number";
    input.min = 5; // Minimum distance
    input.max = 50; // Maximum distance
    input.setAttribute("data-end-city", city);
    endCityInputs.appendChild(label);
    endCityInputs.appendChild(input);
  });

  document.getElementById("gameContainer").style.display = "block";
}

function checkDistances() {
  const startCity = document.getElementById("startCityInput").value;
  const endCityInputs = document.querySelectorAll("#endCityInputs input");
  const resultsDiv = document.getElementById("results");
  const playerName = document.getElementById("playerName").textContent;
  resultsDiv.innerHTML = ""; // Clear previous results

  let allCorrect = true;
  const distances = [];
  distances.push(playerName);

  endCityInputs.forEach((input) => {
    const endCity = input.getAttribute("data-end-city");
    const userDistance = parseInt(input.value.trim());

    if (isNaN(userDistance)) {
      alert(`Please enter a valid distance for ${endCity}.`);
      allCorrect = false;
      return;
    }

    const startCityIndex = cities.indexOf(startCity);
    const endCityIndex = cities.indexOf(endCity);
    const correctDistance = graph[startCityIndex][endCityIndex];
    distances.push(correctDistance);

    if (userDistance === correctDistance) {
      resultsDiv.innerHTML += `${endCity}: Correct<br>`;
    } else {
      resultsDiv.innerHTML += `${endCity}: Wrong<br>`;
      allCorrect = false;
    }
  });

  if (allCorrect) {
    showRegistrationForm(); // Show the registration form
    sendDataToDB(distances);
    // if (playerName) {
    //   //resultsDiv.innerHTML += `<br>Winner: ${winnerName}`;
    //   playerScores[winnerName] = (playerScores[winnerName] || 0) + 1; // Update player score
    //   message.innerText = `${winnerName} wins!`;

      
    // } else {
    //   resultsDiv.innerHTML += "<br>No name entered.";
    // }
  }
  const firstTenDistances = distances.slice(0, 10);
  console.log(firstTenDistances);
  
  console.log(playerName);
  
}



function sendDataToDB(answers) {
  const firstTenDistances = answers.slice(0, 11);
  for (let i = 1; i <= 11; i++) {
    const variableName = `answer_variable_${i}`;
    if (answers[i - 1] !== undefined) {
      eval(`${variableName} = answers[${i - 1}];`);
    } else {
      // Handle case where there are fewer than 11 elements in the answers array
      console.log(`Answer for ${variableName} not found.`);
    }
  }

  
  let time_taken = "12";
  // Prepare the data as a query string
  var data =
    "Player_name=" +
    answer_variable_1 +
    "&answer1=" +
    answer_variable_2 +
    "&answer2=" +
    answer_variable_3 +
    "&answer3=" +
    answer_variable_4 +
    "&answer4=" +
    answer_variable_5 +
    "&answer5=" +
    answer_variable_6 +
    "&answer6=" +
    answer_variable_7 +
    "&answer7=" +
    answer_variable_8+
    "&answer8=" +
    answer_variable_9 +
    "&answer9=" +
    answer_variable_10 +
    "&answer10=" +
    answer_variable_11 +
    "&time_taken=" +
    time_taken;

  // Create a new XMLHttpRequest object
  var xhttp = new XMLHttpRequest();

  // Define the callback function to handle the response
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      console.log(this.responseText); // Log the response from the server
    }
  };

  // Open a POST request to the PHP script
  xhttp.open("POST", "ShortestPath.php", true);

  // Set the content type header
  xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

  // Send the data to the PHP script
  xhttp.send(data);
}

// Function to show the registration form
function showRegistrationForm() {
  const registrationContainer = document.getElementById(
    "registration-container"
  );
  registrationContainer.style.display = "block";
}
document.addEventListener("DOMContentLoaded", setupGame);
