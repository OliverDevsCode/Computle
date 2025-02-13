
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