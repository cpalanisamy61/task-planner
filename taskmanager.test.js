import TaskManager from "./taskmanager.js";
//import displayAllTasksFromStorage from "./display.js";

import path from "path";
import fs from "fs";
const html = fs.readFileSync(path.resolve(__dirname, "./index.html"), "utf8");


beforeEach(() =>{ //sets up the DOM
    localStorage.clear();
    document.documentElement.innerHTML = html.toString();
});

//Test Add task in TaskManager
test("Task Addition", () => {
    let id = 1;
    const taskmanager = new TaskManager(id);
    //Add task first
    taskmanager.addTask("Task Name 1", "To buy groceries for this week", "Anuradha", "20/08/2020", "todo");
    //Verify the task added
    expect(taskmanager.tasks[0].id).toBe("task1");
    expect(taskmanager.tasks[0].name).toBe("Task Name 1");
    expect(taskmanager.tasks[0].description).toBe("To buy groceries for this week");
    expect(taskmanager.tasks[0].assignee).toBe("Anuradha");
    expect(taskmanager.tasks[0].date).toBe("20/08/2020");
    expect(taskmanager.tasks[0].status).toBe("todo");
    //Verify the tasks array length
    expect(taskmanager.tasks.length).toBe(1);
});

//Test update task
test("Task Updation", () => {
    let id = 1;
    const taskmanager = new TaskManager(id);
    //Add the task first
    taskmanager.addTask("Unit Testing Task 1", "To buy groceries for this week", "Anuradha", "20/08/2020", "todo");
    //Edit the added task details
    taskmanager.updateTask("task1", "Laundry Services", "To complete the laundry service", "Parimala", "24/08/2020", "todo");
    //Verify the task is updated with the updated details
    expect(taskmanager.tasks[0].id).toBe("task1");
    expect(taskmanager.tasks[0].name).toBe("Laundry Services");
    expect(taskmanager.tasks[0].description).toBe("To complete the laundry service");
    expect(taskmanager.tasks[0].assignee).toBe("Parimala");
    expect(taskmanager.tasks[0].date).toBe("24/08/2020");
    expect(taskmanager.tasks[0].status).toBe("todo");
});

//Test delete task
test("Task Deletion", () => {
    let id = 1;
    const taskmanager = new TaskManager(id);
    //Add the task first
    taskmanager.addTask("Unit Testing Task 1", "To buy groceries for this week", "Anuradha", "20/08/2020", "todo");
    //Delete the added task
    taskmanager.deleteTask("task1");
    //Verify the task is deleted and check the tasks array length
    expect(taskmanager.tasks.length).toBe(0);
    
});

test("HTML element added to page ", () => {
    let id = 1;
    //Select the parent element
    let cardrow = document.querySelector("#tasksummary");
    //Instance of TaskManager class
    const tm = new TaskManager(id,cardrow);
    //Add the task
    tm.addTask("Kumon Worksheets", "To pick kids Kumon worksheets", "Anuradha", "26-08-2020", "Todo");
    //Verify if the task is added by checking the length of the tasks array
    expect(tm.tasks.length).toBe(1);
    tm.display();
    //Verify the number of children appended to the parent element 
    expect(cardrow.children.length).toBe(3);
});

test("HTML element removed from page after deleting the task ", () => {
    let id = 1;
    //Select the parent element
    let cardrow = document.querySelector("#tasksummary");
    //Instance of TaskManager class
    const tm = new TaskManager(id,cardrow);
    //Add the task
    tm.addTask("Task 3", "To pick kids Kumon worksheets", "Anuradha", "26-08-2020", "Todo");
    //Delete the task
    tm.deleteTask("task1");
    tm.display();
    //Verify the number of children after deleting the task
    expect(cardrow.children.length).toBe(0);
});

