//import Task from "./task.js";
import TaskManager from "./taskmanager.js";

//variables for status and date fields check
var checkValidStatus = false;
var taskID = "";
var checkValidDate = false;

//div in html to append new tasks.
const taskContainer = document.querySelector('#tasksummary');
//Instance of TaskManager class

let id;
//const currentTasks = JSON.parse(localStorage.getItem("myTask")) || [];
const currentID = JSON.parse(localStorage.getItem("currentId")) || 0;
//if ((currentTasks.length < 1) && (currentID == 0))
if(currentID == 0)
{
  id = 1;
}
else{

  id = currentID;
}
const taskManager = new TaskManager(id,taskContainer, editTaskClicked, deleteTaskClicked);


//Variable for add task form in html
const taskForm = document.querySelector('#task-form');

const edttask = document.querySelector("#editTask");

//Variables for add task fields
const addBtn = document.querySelector("#addTask");
const name = document.querySelector("#taskName");
const description = document.querySelector("#textDescription");
const assignee = document.querySelector("#assignedTo");
let dueDate = document.querySelector("#dueDate");
const status = document.querySelector("#taskStatus");


//Variables for edit task fields
const tid = document.getElementById("editTaskID");
const tname = document.getElementById("editTaskName");
const tdesc = document.getElementById("editTextDescription");
const tassignee = document.getElementById("editAssignedTo");
const tdate = document.getElementById("editDueDate");
const tstatus = document.getElementById("editTaskStatus");

taskManager.display();
//Function onclick of "Add Task" button
addBtn.onclick = function() {   
        //Calling addTask function in TaskManager class after successful validation by passing values  
        validateDateElement(dueDate,document.querySelector("#errMsg4"));
        validateStatusElement(status,document.querySelector("#errMsg5"));
        if(checkValidStatus && checkValidDate){
          taskManager.addTask(name.value, description.value, assignee.value, dueDate.value, status.value);
          taskManager.display();
  
          //Resetting the add task form fields.
          taskForm.reset();
        
          //Reset validation messages
          clearErrorFields();
  
          //Hiding of the modal after adding task
          $("#addModal").modal("hide");
        
        }                        
};
  
  // Validation if individual fields are not complete
  name.addEventListener("input", function(event) {
    if (event.target.value && event.target.value.length <= 8) {
      document.querySelector("#errMsg1").innerHTML = "Task name should be longer than 8 characters";
      document.querySelector("#errMsg1").style.color = "red";
      name.focus();
      
    } else {
      document.querySelector("#errMsg1").innerHTML = "Looks Good!";
      document.querySelector("#errMsg1").style.color = "green";
        
    }
  });

  description.addEventListener("input", function(event) {
    if (event.target.value && event.target.value.length <= 15) {
      //errMsg1.innerHTML = "";
      document.querySelector("#errMsg2").innerHTML = "Task description should be longer than 15 characters";
      document.querySelector("#errMsg2").style.color = "red";
      description.focus();
      
      
    } else {
        document.querySelector("#errMsg2").innerHTML = "Looks Good!";
        document.querySelector("#errMsg2").style.color = "green";
        
    }
  });

  assignee.addEventListener("input", function(event) {
    if (event.target.value && event.target.value.length <= 8) {
      //errMsg1.innerHTML = "";
      document.querySelector("#errMsg3").innerHTML = "Assignee name should be longer than 8 characters";
      document.querySelector("#errMsg3").style.color = "red";
      assignee.focus();
      
    } else {
        document.querySelector("#errMsg3").innerHTML = "Looks Good!";
        document.querySelector("#errMsg3").style.color = "green";
        
    }
  });

  function validateDateElement(dateElement,errorElement){
    var currentDate = new Date();
    let dueDateValue = new Date(dateElement.value);

    
    
    if(dateElement.value == ""){
      dateElement.value = new Date().toISOString().slice(0,10);
      checkValidDate = true;
    }
    else if (dueDateValue < currentDate){
      errorElement.innerHTML = "Please choose a date from today";
      errorElement.style.color = "red";
      dateElement.focus();
      checkValidDate = false;
    }
    else
      checkValidDate = true;
    
} 

function validateStatusElement(statusElement,errorElement){
  if (statusElement.value === "Please choose") {
    //errMsg1.innerHTML = "";
    errorElement.innerHTML = "Please select a valid status."
    errorElement.style.color = "red";
    statusElement.focus();
    checkValidStatus = false;
  } else {
      errorElement.innerHTML = "Looks Good!";
      errorElement.style.color = "green";
      checkValidStatus = true;
  }
  
} 
  

  tname.addEventListener("input", function(event) {
    if (event.target.value && event.target.value.length <= 8) {
      document.querySelector("#errMsg6").innerHTML = "Task name should be longer than 8 characters";
      document.querySelector("#errMsg6").style.color = "red";
      tname.focus();
      
    } else {
      document.querySelector("#errMsg6").innerHTML = "Looks Good!";
      document.querySelector("#errMsg6").style.color = "green";
      
    }
  });

  tdesc.addEventListener("input", function(event) {
    if (event.target.value && event.target.value.length <= 15) {
      //errMsg1.innerHTML = "";
      document.querySelector("#errMsg7").innerHTML = "Task description should be longer than 15 characters";
      document.querySelector("#errMsg7").style.color = "red";
      tdesc.focus();
            
    } else {
        document.querySelector("#errMsg7").innerHTML = "Looks Good!";
        document.querySelector("#errMsg7").style.color = "green";
        
    }
  });
  
  tassignee.addEventListener("input", function(event) {
    if (event.target.value && event.target.value.length <= 8) {
      //errMsg1.innerHTML = "";
      document.querySelector("#errMsg8").innerHTML = "Assignee name should be longer than 8 characters";
      document.querySelector("#errMsg8").style.color = "red";
      tassignee.focus();
      
    } else {
        document.querySelector("#errMsg8").innerHTML = "Looks Good!";
        document.querySelector("#errMsg8").style.color = "green";
        
    }
  });


// Clear all error message labels
function clearErrorFields() {
  document.querySelector("#errMsg1").innerHTML = "";
  document.querySelector("#errMsg2").innerHTML = "";
  document.querySelector("#errMsg3").innerHTML = "";
  document.querySelector("#errMsg4").innerHTML = "";
  document.querySelector("#errMsg5").innerHTML = "";
  document.querySelector("#errMsg6").innerHTML = "";
  document.querySelector("#errMsg7").innerHTML = "";
  document.querySelector("#errMsg8").innerHTML = "";
  document.querySelector("#errMsg9").innerHTML = "";
  document.querySelector("#errMsg10").innerHTML = "";
}

  

edttask.onclick = function() {
  //const tid = document.getElementById("editTaskID");
  const tname = document.getElementById("editTaskName");
  const tdesc = document.getElementById("editTextDescription");
  const tassignee = document.getElementById("editAssignedTo");
  let tdate = document.getElementById("editDueDate");
  const tstatus = document.getElementById("editTaskStatus");

  validateDateElement(tdate,document.querySelector("#errMsg9"));
  validateStatusElement(tstatus,document.querySelector("#errMsg10"));
  if(checkValidStatus && checkValidDate){
      taskManager.updateTask(taskID, tname.value, tdesc.value, tassignee.value, tdate.value, tstatus.value);
      taskManager.display();
      clearErrorFields();
      $("#editModal").modal("hide");

  }

}


function editTaskClicked(event) {
    var currentElement = $(this.parentElement).closest("#taskEdit")[0].getElementsByTagName("p");
    taskID = currentElement[0].id;
    const contentsToSplit1 = currentElement[0].innerText.split('-');
    const taskName = contentsToSplit1[0];
    //console.log(contentsToSplit1);
    var contentsToSplit = currentElement[2].innerHTML.split('-');
    //console.log(contentsToSplit);
    const taskDesc = currentElement[1].innerHTML;
    const taskAssignee = contentsToSplit[0];
    const taskDate = contentsToSplit1[1] + "-" + contentsToSplit1[2] + "-" + contentsToSplit1[3];
    //console.log(taskDate);
    const taskStatus = contentsToSplit[1];
    
    document.getElementById("editTaskName").value = taskName;
    document.getElementById("editTextDescription").value = taskDesc;
    document.getElementById("editAssignedTo").value = taskAssignee;
    document.getElementById("editDueDate").value = taskDate;
    document.getElementById("editTaskStatus").value = taskStatus;
    $("#editModal").modal("show");
    
}

function deleteTaskClicked(event) {
    //const taskElement = event.target.closest(".task");
    var currentElement = $(this.parentElement).closest("#taskEdit")[0].getElementsByTagName("p");
    const taskID = currentElement[0].id;
    taskManager.deleteTask(taskID);
    taskManager.display();
}

//let statusCheck = document.querySelector("button.dropdown-item").addEventListener("click", byStatus);
const statusInprogress = document.querySelector("#inprogress"); // Inprogress tasks
statusInprogress.addEventListener("click", byStatus);

const statusTodo = document.querySelector("#todo"); // To Do tasks
statusTodo.addEventListener("click", byStatus);

const statusReview = document.querySelector("#review"); // Review tasks
statusReview.addEventListener("click", byStatus);

const statusDone = document.querySelector("#done"); // Done tasks
statusDone.addEventListener("click", byStatus);

const statusAll = document.querySelector("#allTask"); // All tasks 
statusAll.addEventListener("click", byStatus);

function byStatus(event){
 var selectedStatus = event.target.value;
 //console.log(selectedStatus);
 taskManager.displayStatus(selectedStatus);
}

// const todayTask = document.querySelector("#todayTask");
// todayTask.onclick = function (){
//   taskManager.displayStatus("today");
// };