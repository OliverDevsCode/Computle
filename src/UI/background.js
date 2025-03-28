
let canvasColour = "#DCDCDC";

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
        canvasColour = "#7DA6DE"
        canvas.style('border', '4px solid white')
        updateHomePage()

        
    } else {
        localStorage.setItem("theme", "light");
        toggleButton.textContent = "🌙 Dark Mode";
        canvasColour = "#DCDCDC";
        canvas.style('border', '4px solid black')
        updateHomePage()

    }
});

// Accessibility - Colourblind Mode
const toggleColourBlind = document.getElementById("colour-blind-toggle");
const body = document.body;

// Check Local Storage on Page Load
document.addEventListener("DOMContentLoaded", () => {
    const colourblindEnabled = localStorage.getItem("colourblind") === "true"; 
    if (colourblindEnabled) {
        body.classList.add("colourblind-mode-on");
    }
});

// Toggle Colourblind Mode
toggleColourBlind.addEventListener("click", () => {
    const isColourblindMode = body.classList.toggle("colourblind-mode-on"); 
    localStorage.setItem("colourblind", isColourblindMode); 
});

