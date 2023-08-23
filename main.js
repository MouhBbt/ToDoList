let input = document.querySelector(".input");
let submit = document.querySelector(".add");
let taskdiv = document.querySelector(".tasks");
let arraytasks = [];
//check if there is data in local storage
if (localStorage.getItem("tasks")) {
  arraytasks = JSON.parse(localStorage.getItem("tasks"));
}
getdata();
//  ADD TASK
submit.onclick = function () {
  if (input.value !== "") {
    addtasktoarray(input.value); //add task to array
    input.value = ""; //empty
  }
};
taskdiv.addEventListener("click", (e) => {
  // delete button
  if (e.target.classList.contains("del")) {
    //remove task from local storage
    deletefromstorage(e.target.parentElement.getAttribute("data-id"));
    //remove element from page
    e.target.parentElement.remove();
  }
  //TASK ELEMENT
  if (e.target.classList.contains("task")) {
    togglestatus(e.target.getAttribute("data-id"));
    e.target.classList.toggle("done");
  }
});

function addtasktoarray(tasktext) {
  const task = {
    id: Date.now(),
    title: tasktext,
    completed: false,
  };
  arraytasks.push(task);
  addelementstopage(arraytasks);
  //ADD TASKS TO LOCAL STORAGE
  addtolocalstorage(arraytasks);
}
function addelementstopage(arraytasks) {
  //EMPTY TASK DIV
  taskdiv.innerHTML = "";
  //LOOPING ON ARRAY OF TASKS
  arraytasks.forEach((task) => {
    // CREATE MAIN DIV
    let div = document.createElement("div");
    div.className = "task";
    //CHECK IF TASK IS DONE
    if (task.completed) {
      div.className = "task done";
    }
    div.setAttribute("data-id", task.id);
    div.appendChild(document.createTextNode(task.title));
    // CREATE DELETE BUTTON
    let span = document.createElement("span");
    span.className = "del";
    span.appendChild(document.createTextNode("delete"));
    //APPEND BUTTON TO MAIN DIV
    div.appendChild(span);
    //ADD TASK TO THE TASKS CONTAINER
    taskdiv.appendChild(div);
  });
}
function addtolocalstorage(arraytasks) {
  window.localStorage.setItem("tasks", JSON.stringify(arraytasks));
}
function getdata() {
  let data = window.localStorage.getItem("tasks");
  if (data) {
    let tasks = JSON.parse(data);
    addelementstopage(tasks);
  }
}
function deletefromstorage(taskid) {
  arraytasks = arraytasks.filter((task) => task.id != taskid);
  addtolocalstorage(arraytasks);
}
function togglestatus(taskid) {
  for (let i = 0; i < arraytasks.length; i++) {
    if (arraytasks[i].id == taskid) {
      arraytasks[i].completed == false
        ? (arraytasks[i].completed = true)
        : (arraytasks[i].completed = false);
    }
  }
  addtolocalstorage(arraytasks);
}
