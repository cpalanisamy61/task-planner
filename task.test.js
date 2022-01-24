import Task from "./task.js";
test("Task Constructor", () => {
    const task = new Task("task1", "Task Name 1", "To buy groceries for this week", "Anuradha", "20/08/2020", "todo");
    expect(task.id).toBe("task1");
    expect(task.name).toBe("Task Name 1");
    expect(task.description).toBe("To buy groceries for this week");
    expect(task.assignee).toBe("Anuradha");
    expect(task.date).toBe("20/08/2020");
    expect(task.status).toBe("todo");
});