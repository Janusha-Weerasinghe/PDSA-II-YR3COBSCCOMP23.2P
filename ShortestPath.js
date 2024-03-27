const cities = ["City A", "City B", "City C", "City D", "City E", "City F", "City G", "City H", "City I", "City J"];
let graph = Array(10).fill().map(() => Array(10).fill(0));
let openCity;

function assignRandomDistances() {
    for (let i = 0; i < 10; i++) {
        for (let j = i + 1; j < 10; j++) {
            const distance = Math.floor(Math.random() * 46) + 5; // Random distance between 5 and 50
            graph[i][j] = distance;
            graph[j][i] = distance;
        }
    }
}

function createTable() {
    const distanceTableDiv = document.getElementById('distanceTable');
    let tableHTML = "<table border='1'><thead><tr><th>City</th>";
    for (let city of cities) {
        tableHTML += `<th>${city}</th>`;
    }
    tableHTML += "</tr></thead><tbody>";

    for (let i = 0; i < cities.length; i++) {
        tableHTML += `<tr><td>${cities[i]}</td>`;
        for (let j = 0; j < cities.length; j++) {
            tableHTML += `<td>${graph[i][j]}</td>`;
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
    document.getElementById('playerName').textContent = playerName;

    // Populate start and end city dropdowns
    const startCityDropdown = document.getElementById('startCityInput');
    const endCityInputs = document.getElementById('endCityInputs');

    cities.forEach(city => {
        const option = document.createElement('option');
        option.text = city;
        startCityDropdown.add(option);

        const label = document.createElement('label');
        label.textContent = `Distance to ${city}:`;
        const input = document.createElement('input');
        input.type = 'number';
        input.min = 5; // Minimum distance
        input.max = 50; // Maximum distance
        input.setAttribute('data-end-city', city);
        endCityInputs.appendChild(label);
        endCityInputs.appendChild(input);
    });

    document.getElementById('gameContainer').style.display = 'block';
}

function checkDistances() {
    const startCity = document.getElementById('startCityInput').value;
    const endCityInputs = document.querySelectorAll('#endCityInputs input');
    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = ''; // Clear previous results

    endCityInputs.forEach(input => {
        const endCity = input.getAttribute('data-end-city');
        const userDistance = parseInt(input.value.trim());

        if (isNaN(userDistance)) {
            alert(`Please enter a valid distance for ${endCity}.`);
            return;
        }

        const startCityIndex = cities.indexOf(startCity);
        const endCityIndex = cities.indexOf(endCity);
        const correctDistance = graph[startCityIndex][endCityIndex];

        if (userDistance === correctDistance) {
            resultsDiv.innerHTML += `${endCity}: Correct<br>`;
        } else {
            resultsDiv.innerHTML += `${endCity}: Wrong<br>`;
        }
    });
}

// Call setupGame when the page is ready
document.addEventListener('DOMContentLoaded', setupGame);