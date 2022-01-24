//import TaskManager from "./taskmanager.js";

export default class Task {
    constructor(id, name, description, assignee, date, status) {
            this.id = id;
            this.name = name;
            this.description = description;
            this.assignee = assignee;
            this.date = date;
            this.status = status;
            this.isDelete = false;
        }
        // Function to set the HTML code for all task
        toHTMLString() {
            const HTML = `
        <div class="card-body py-3">
        <div class="row no-gutters align-items-center" id="taskEdit">
            <div class="col"> <p class="text-big" id="${this.id}" data-abc="true">${this.name}-${this.date}</p>
            <p class="text-big">${this.description}</p>
            <p class="text-big">${this.assignee}-${this.status}</p>
            </div>
            <div class="col-4 text-muted">           
                <button class="edit btn btn-primary ml-4"><i class="far fa-edit"></i></i></button>
                <button class="delete btn btn-danger ml-4"><i class="far fa-trash-alt"></i></i></button>               
            </div>
        </div>
        </div>
        <hr class="m-0">
    `;
    return HTML;
    }
    // Function to create HTML elements for task
    toHtmlElement(editTaskClicked, deleteTaskClicked) {
        const html = this.toHTMLString();
        const element = document.createRange().createContextualFragment(html);
        element
            .querySelector("button.edit")
            .addEventListener("click", editTaskClicked);
        element
            .querySelector("button.delete")
            .addEventListener("click", deleteTaskClicked);
        return element;
    }

}