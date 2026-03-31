// Select elements
const inputBox = document.getElementById("bar");
const addBtn = document.getElementById("aa");
const listContainer = document.getElementById("al");

// Function to create delete button
function addCloseButton(li) {
    let span = document.createElement("span");
    span.className = "close";

    let img = document.createElement("img");
    img.src = "assets/icons/close.png"; // 🔁 your image path
    img.style.width = "15px";
    img.style.height = "15px";

    span.appendChild(img);
    li.appendChild(span);

    span.onclick = function () {
        li.remove();
    };
}

// Add task function
function addTask() {
    if (inputBox.value.trim() === "") {
        alert("You must write something!");
        return;
    }

    let li = document.createElement("li");
    li.textContent = inputBox.value;
    li.className = "unchecked";

    listContainer.appendChild(li);
    addCloseButton(li);

    inputBox.value = "";
}

// Button click
addBtn.addEventListener("click", addTask);

// Enter key support
inputBox.addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
        addTask();
    }
});

// Toggle checked when clicking list item
listContainer.addEventListener("click", function (e) {
    if (e.target.tagName === "LI") {
        e.target.classList.toggle("checked");
    }
});

// Add close button to existing items
let existingItems = document.querySelectorAll("#al li");
existingItems.forEach(li => addCloseButton(li));