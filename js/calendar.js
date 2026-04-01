let currentDate = new Date();
let selectedDateKey = null;

let tasks = {}; // store tasks per date

function renderCalendar(){
  const dates = document.getElementById("dates");
  const monthYear = document.getElementById("monthYear");

  dates.innerHTML = "";

  let year = currentDate.getFullYear();
  let month = currentDate.getMonth();

  let firstDay = new Date(year, month, 1).getDay();
  let lastDate = new Date(year, month + 1, 0).getDate();

  const monthNames = ["Jan","Feb","Mar","Apr","May","Jun",
                      "Jul","Aug","Sep","Oct","Nov","Dec"];

  monthYear.innerText = monthNames[month] + " " + year;

  for(let i=0;i<firstDay;i++){
    dates.appendChild(document.createElement("div"));
  }

  for(let i=1;i<=lastDate;i++){
    let day = document.createElement("div");
    day.classList.add("date");
    day.innerText = i;

    let key = `${year}-${month}-${i}`;

    day.onclick = () => selectDate(key, day);

    dates.appendChild(day);
  }
}

function selectDate(key, element){
  selectedDateKey = key;

  document.querySelectorAll(".date").forEach(d => d.classList.remove("selected"));
  element.classList.add("selected");

  document.getElementById("selected-date").innerText = key;

  renderTasks();
}

function addTask(){
  let input = document.getElementById("taskText");
  let value = input.value.trim();

  if(!value || !selectedDateKey) return;

  if(!tasks[selectedDateKey]){
    tasks[selectedDateKey] = [];
  }

  tasks[selectedDateKey].push(value);

  input.value = "";
  renderTasks();
}

function renderTasks(){
  let list = document.getElementById("task-list");
  list.innerHTML = "";

  let dayTasks = tasks[selectedDateKey] || [];

  dayTasks.forEach((task, index)=>{
    let li = document.createElement("li");

    li.innerHTML = `
      ${task}
      <button onclick="deleteTask(${index})">✖</button>
    `;

    list.appendChild(li);
  });
}

function deleteTask(index){
  tasks[selectedDateKey].splice(index,1);
  renderTasks();
}

function nextMonth(){
  currentDate.setMonth(currentDate.getMonth() + 1);
  renderCalendar();
}

function prevMonth(){
  currentDate.setMonth(currentDate.getMonth() - 1);
  renderCalendar();
}

renderCalendar();