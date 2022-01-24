import Task from "./task.js";

export default class TaskManager {
    constructor(id, parent, editTaskClicked, deleteTaskClicked) {
            this.tasks = [];
            this.currentId = id;
            this.parent = parent;
            this.editTaskClicked = editTaskClicked;
            this.deleteTaskClicked = deleteTaskClicked;

        }
        // Function to add a task after successful validation and push the task to tasks array.
        addTask(name, description, assignee, date, status) {
            const task = new Task(`task${this.currentId++}`, name, description, assignee, date, status);
            this.tasks.push(task);
            this.toAddToLocalStorage(task);
        }

         //Adding task to Local Storage
        toAddToLocalStorage(task){ 
            localStorage.setItem ('currentId', this.currentId);
            let myNewTasks = JSON.parse(localStorage.getItem("myTask")) || [];
            myNewTasks.push(task);
            localStorage.setItem('myTask', JSON.stringify(myNewTasks));
        }

    // Function to update the task with new edited values after successful validation.
    updateTask(id, name, description, assignee, date, status) {
        for (let i = 0; i < this.tasks.length; i++) {
            if (this.tasks[i].id == id) {
                this.tasks[i].name = name;
                this.tasks[i].description = description;
                this.tasks[i].assignee = assignee;
                this.tasks[i].date = date;
                this.tasks[i].status = status;
                //this.display();
                //break;
                this.toUpdateInLocalStorage(id, name, description, assignee, date, status);
            }           

        }

    }
     //Update in Local Storage
    toUpdateInLocalStorage(id, name, description, assignee, date, status){
       let myNewTask = JSON.parse(localStorage.getItem('myTask'));
        for (let i = 0; i < myNewTask.length; i++) {
            if (myNewTask[i].id == id) {
            myNewTask[i].name = name;
            myNewTask[i].description = description;
            myNewTask[i].assignee = assignee;
            myNewTask[i].date = date;
            myNewTask[i].status = status;
            localStorage.setItem('myTask',JSON.stringify(myNewTask));
            }
        }
    }
    
    // Function for deleting a task whose id is passed.
    deleteTask(id) {
            this.tasks = this.tasks.filter(
                (t) => t.id !== id);
            //this.display();
            this.toDeleteFromLocalStorage(id);
            //this.display();
        }
        
        //Remove task from local storage
    toDeleteFromLocalStorage(id){
        let myNewTask = JSON.parse(localStorage.getItem('myTask'));
        myNewTask = myNewTask.filter(
            (t) => t.id !== id);       
            localStorage.setItem('myTask',JSON.stringify(myNewTask));         
    }

        
    // To display all the tasks from "tasks" array.
    display() {
        this.parent.innerHTML = "";//Refresh the landing page
        //String for card heading in landing page
        var cardheading = `<div class="card mb-3" id="tasksummary">
        <div class="card-header pl-0 pr-0">
            <div class="row no-gutters w-100 align-items-center">
                <div class="col ml-3"><strong>Tasks</strong></div>
                <div class="col-4">
                    <div class="row no-gutters align-items-center">
                        <div class="col"><strong>Edit/Delete</strong></div>
                    </div>
                </div>
            </div>
        </div>`;
        //Check if the browser is refreshed/closed
        if (this.tasks.length < 1) {
            //Get data from local storage
            let displayArray = JSON.parse(localStorage.getItem("myTask")) || [];
            //console.log(displayArray);
            //Check if local storage is empty ( cleared )
            if (displayArray.length < 1){
                cardheading = ""; //No cardheading in the landing page
            }
            else { //Data is in local storage and should be displayed on main page
                for (let i = 0; i < displayArray.length; i++ ){
                    const dtask = new Task(displayArray[i].id, displayArray[i].name, displayArray[i].description, displayArray[i].assignee, displayArray[i].date, displayArray[i].status);
                    this.tasks.push(dtask);         
                }
                const helement = document.createRange().createContextualFragment(cardheading);
                this.parent.append(helement);
                this.tasks.forEach((dtask) => {
                //console.log(dtask);
                const taskElement = dtask.toHtmlElement(this.editTaskClicked, this.deleteTaskClicked);
                this.parent.append(taskElement);
                    });
                }
            } 
        else {
            const helement = document.createRange().createContextualFragment(cardheading);
            this.parent.append(helement);
            this.tasks.forEach((task) => {
            //console.log(task);
            const taskElement = task.toHtmlElement(this.editTaskClicked, this.deleteTaskClicked);
            this.parent.append(taskElement);
                });

            }

    }

    displayStatus(selectedStatus) {
        // let today = new Date();
        // var tskDate = new Date("2020-08-29");
        // console.log(today);
        // console.log(tskDate);
        // if(tskDate.getDate() === today.getDate() && tskDate.getMonth() ===today.getMonth() && tskDate.getFullYear() === today.getFullYear()){
        // console.log("You are in Today");
        // }
        let taskElementByStatus;
        this.parent.innerHTML = "";
        if(selectedStatus === "All Tasks"){
            this.display();
        }
        let cardheading = `<div class="card mb-3" id="tasksummary">
        <div class="card-header pl-0 pr-0">
            <div class="row no-gutters w-100 align-items-center" id="bhead">
                <div class="col ml-3">Tasks</div>
                <div class="col-4 ml-3">Edit/Delete</div>                   
            </div>
        </div>`;
        const helement = document.createRange().createContextualFragment(cardheading);
        this.parent.append(helement);


        this.tasks.forEach((task) => {
            if (task.status === selectedStatus){
             taskElementByStatus = task.toHtmlElement(this.editTaskClicked, this.deleteTaskClicked);
            this.parent.append(taskElementByStatus);
            }
          
        });
        
    }
}

