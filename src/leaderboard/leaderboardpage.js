// Get the toggle button
const toggleButton = document.getElementById("dark-mode-toggle");

// Check if user has a preferred theme stored
if (localStorage.getItem("theme") === "dark") {
    document.body.classList.add("dark-mode");
    toggleButton.textContent = "☀️ Light Mode";
    canvasColour = "#7DA6DE"
}

// Toggle Dark Mode
toggleButton.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");

    // Store user preference
    if (document.body.classList.contains("dark-mode")) {
        localStorage.setItem("theme", "dark");
        toggleButton.textContent = "☀️ Light Mode";

        
    } else {
        localStorage.setItem("theme", "light");
        toggleButton.textContent = "🌙 Dark Mode";


    }
});

async function getLeaderboard() {
  try {
    const sampleSize = document.getElementById('list-select').value
    console.log(sampleSize)
    const response = await fetch('https://computle-backend.vercel.app/api/leaderboard', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        sampleSize: sampleSize
      })
    });

    if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

    const data = await response.json();
    return data?.data || [];
  } catch (error) {
    console.error('Error fetching leaderboard:', error);
    return [];
  }
}

async function displayLeaderboard(subjectFilter = "all") {
  const tableBody = document.querySelector('#leaderboard-table tbody');
  tableBody.innerHTML = '';

  const boardData = await getLeaderboard();
  if (boardData.length === 0) {
    tableBody.innerHTML = '<tr><td colspan="4">No leaderboard data available.</td></tr>';
    return;
  }

  // Filter by subject if not "all"
  let filteredData = subjectFilter === "all" 
    ? boardData 
    : boardData.filter(entry => entry.subject.includes(subjectFilter));

  if(subjectFilter == 'other'){
    filteredData = boardData.filter(entry => entry.subject.toUpperCase().includes(inputField.value.toUpperCase()));
  }

  // Get current user
  const currentUser = localStorage.getItem("msal_userName");

  filteredData.forEach((entry, index) => {
    const row = document.createElement('tr');

    // Highlight the current user in green
    if (entry.username === currentUser) {
      row.style.backgroundColor = "lightgreen";
      row.style.fontWeight = "bold";
    }

    row.innerHTML = `
      <td>${index + 1}</td>
      <td>${entry.username}</td>
      <td>${entry.score} points</td>
      <td>${entry.subject}</td>
    `;

    tableBody.appendChild(row);
  });
}

// Filter buttons
document.addEventListener('DOMContentLoaded', () => {
  displayLeaderboard();

  document.querySelectorAll('.filter-btn').forEach(button => {
    button.addEventListener('click', () => {
      const subject = button.getAttribute('data-subject');
      displayLeaderboard(subject);
    });
  });
});

const inputField = document.getElementById('subject-input')

inputField.addEventListener("input", logInputType);

function logInputType(event) {
  console.log( `Input: ${inputField.value}`);
  const subject = 'other'
  displayLeaderboard(subject);
}

const resultsLength = document.getElementById('list-select')
// Selection Button
document.addEventListener('DOMContentLoaded', () => {
    resultsLength.addEventListener('input', () => {
      console.log("list length change")
      displayLeaderboard('all');
    });
});

