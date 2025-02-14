
document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("login-form");
    const isLoggedIn = false; // Connect to authentication system
    
    const guestMessage = document.getElementById("guest-message");
    if (!isLoggedIn) {
        guestMessage.classList.remove("hidden");
    } else {
        guestMessage.classList.add("hidden");
    }

    const addTaskButton = document.getElementById("add-task");
    const taskList = document.getElementById("task-list");
    const taskTitleInput = document.getElementById("task-title");
    const taskDescInput = document.getElementById("task-desc");

    let editTask = null;

    addTaskButton.addEventListener("click", function () {
        const taskTitle = taskTitleInput.value.trim();
        const taskDesc = taskDescInput.value.trim();
        const isValid = taskTitle !== "" && taskDesc !== "";

        if (!isValid) {
            taskTitleInput.classList.add("shake");
            taskDescInput.classList.add("shake");
            
            setTimeout(() => {
                taskTitleInput.classList.remove("shake");
                taskDescInput.classList.remove("shake");
            }, 500);

            alert("Please fill in both fields.");
            return;
        }

        if (editTask) {
            editTask.querySelector(".task-title").textContent = taskTitle;
            editTask.querySelector(".task-desc").textContent = taskDesc;
            editTask = null;
            addTaskButton.textContent = "Add Task";
        } else {
            createTask(taskTitle, taskDesc);
        }

        taskTitleInput.value = "";
        taskDescInput.value = "";
    });

    function createTask(title, desc) {
        const taskItem = document.createElement("li");
        taskItem.classList.add("task-item");
        taskItem.innerHTML = `
            <div class="task-content">
                <h3 class="task-title">${title}</h3>
                <p class="task-desc">${desc}</p>
            </div>
            <div class="task-actions">
                <button class="update-task">Update</button>
                <button class="delete-task">Delete</button>
            </div>
        `;

        taskList.appendChild(taskItem);

        taskItem.querySelector(".delete-task").addEventListener("click", function () {
            taskItem.classList.add("delete");
            setTimeout(() => taskItem.remove(), 300);
        });

        taskItem.querySelector(".update-task").addEventListener("click", function () {
            taskTitleInput.value = taskItem.querySelector(".task-title").textContent;
            taskDescInput.value = taskItem.querySelector(".task-desc").textContent;
            editTask = taskItem;
            addTaskButton.textContent = "Update Task";
        });
    }

    function addFilledClass(input) {
        input.classList.toggle("filled", input.value.trim() !== "");
    }

    taskTitleInput.addEventListener("input", () => addFilledClass(taskTitleInput));
    taskDescInput.addEventListener("input", () => addFilledClass(taskDescInput));
});