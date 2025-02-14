
// document.addEventListener("DOMContentLoaded", function() {
//     // const user = {
//     //     name: "John Doe",
//     //     email: "johndoe@example.com"
//     // };

//     document.getElementById("user-name").textContent = user.name;
//     document.getElementById("user-email").textContent = user.email;

//     document.getElementById("logout-btn").addEventListener("click", function() {
//         alert("Logging out...");
//         window.location.href = "login.html";
//     });
// });

// document.addEventListener("DOMContentLoaded", function () {
//     const taskList = document.getElementById("task-list");
//     const taskTitle = document.getElementById("task-title");
//     const taskDesc = document.getElementById("task-desc");
//     const addTaskBtn = document.getElementById("add-task");
//     const logoutBtn = document.getElementById("logout-btn");

//     const API_URL = "http://localhost:8000";
//     const token = localStorage.getItem("token");

//     let isEditing = false;
//     let currentTaskId = null;
//     let currentCompleted = null;

//     if (!token) {
//         alert("You are not logged in!");
//         window.location.href = "login.html";
//     }

//     async function fetchTasks() {
//         try {
//             const response = await fetch(`${API_URL}/api/tasks`, {
//                 method: "GET",
//                 headers: {
//                     "Authorization": `Bearer ${token}`
//                 }
//             });
//             if (!response.ok) throw new Error("Failed to fetch tasks");
//             const tasks = await response.json();
//             renderTasks(tasks);
//         } catch (error) {
//             console.error(error);
//         }
//     }

//     function renderTasks(tasks) {
//         taskList.innerHTML = "";
//         tasks.forEach(task => {
//             const taskItem = document.createElement("li");
//             taskItem.className = "task-item";
//             taskItem.innerHTML = `
//                 <div class="task-content">
//                     <strong>${task.title}</strong>
//                     <p>${task.description}</p>
//                 </div>
//                 <div class="task-actions">
//                     <button onclick="editTask(${task.id}, '${task.title}', '${task.description}', ${task.completed})" class="edit-task">Edit</button>
//                     <button onclick="deleteTask(${task.id})" class="delete-task">Delete</button>
//                 </div>
//             `;
//             taskList.appendChild(taskItem);
//         });
//     }

//     addTaskBtn.addEventListener("click", async function () {
//         const title = taskTitle.value.trim();
//         const description = taskDesc.value.trim();

//         if (!title) {
//             alert("Task title is required!");
//             return;
//         }

//         if (isEditing) {
//             try {
//                 const response = await fetch(`${API_URL}/api/tasks/${currentTaskId}`, {
//                     method: "PUT",
//                     headers: {
//                         "Content-Type": "application/json",
//                         "Authorization": `Bearer ${token}`
//                     },
//                     body: JSON.stringify({ title, description, completed: currentCompleted })
//                 });

//                 if (!response.ok) throw new Error("Failed to update task");
//                 fetchTasks();
//                 resetForm();
//             } catch (error) {
//                 console.error(error);
//             }
//         } else {
//             try {
//                 const response = await fetch(`${API_URL}/api/tasks`, {
//                     method: "POST",
//                     headers: {
//                         "Content-Type": "application/json",
//                         "Authorization": `Bearer ${token}`
//                     },
//                     body: JSON.stringify({ title, description })
//                 });

//                 if (!response.ok) throw new Error("Failed to create task");
//                 fetchTasks();
//                 resetForm();
//             } catch (error) {
//                 console.error(error);
//             }
//         }
//     });

//     window.editTask = function (taskId, currentTitle, currentDesc, completed) {
//         isEditing = true;
//         currentTaskId = taskId;
//         currentCompleted = completed;
//         taskTitle.value = currentTitle;
//         taskDesc.value = currentDesc;
//         addTaskBtn.textContent = "Update Task";
//     };

//     window.deleteTask = async function (taskId) {
//         if (!confirm("Are you sure you want to delete this task?")) return;

//         try {
//             const response = await fetch(`${API_URL}/api/tasks/${taskId}`, {
//                 method: "DELETE",
//                 headers: {
//                     "Authorization": `Bearer ${token}`
//                 }
//             });

//             if (!response.ok) throw new Error("Failed to delete task");
//             fetchTasks();
//         } catch (error) {
//             console.error(error);
//         }
//     };

//     logoutBtn.addEventListener("click", function () {
//         localStorage.removeItem("token");
//         alert("Logged out!");
//         window.location.href = "login.html";
//     });

//     function resetForm() {
//         isEditing = false;
//         currentTaskId = null;
//         currentCompleted = null;
//         addTaskBtn.textContent = "Add Task";
//         taskTitle.value = "";
//         taskDesc.value = "";
//     }

//     fetchTasks();

// });

// document.addEventListener("DOMContentLoaded", function() {
//     const logoutBtn = document.getElementById("logout-btn");

//     logoutBtn.addEventListener("click", function() {
//         localStorage.removeItem("token");
//         alert("Logged out!");
//         window.location.href = "login.html";
//     });
// });

// document.addEventListener("DOMContentLoaded", function () {
//     const taskList = document.getElementById("task-list");
//     const taskTitle = document.getElementById("task-title");
//     const taskDesc = document.getElementById("task-desc");
//     const addTaskBtn = document.getElementById("add-task");
//     const logoutBtn = document.getElementById("logout-btn");

//     const API_URL = "http://localhost:8000";
//     const token = localStorage.getItem("token");

//     let isEditing = false;
//     let currentTaskId = null;
//     let currentCompleted = null;

//     if (!token) {
//         alert("You are not logged in!");
//         window.location.href = "login.html";
//     }

//     async function fetchTasks() {
//         try {
//             const response = await fetch(`${API_URL}/api/tasks`, {
//                 method: "GET",
//                 headers: {
//                     "Authorization": `Bearer ${token}`
//                 }
//             });
//             if (!response.ok) throw new Error("Failed to fetch tasks");
//             const tasks = await response.json();
//             renderTasks(tasks);
//         } catch (error) {
//             console.error(error);
//         }
//     }

//     function renderTasks(tasks) {
//         taskList.innerHTML = "";
//         tasks.forEach(task => {
//             const taskItem = document.createElement("li");
//             taskItem.className = "task-item";
//             taskItem.innerHTML = `
//                 <div class="task-content">
//                     <strong>${task.title}</strong>
//                     <p>${task.description}</p>
//                 </div>
//                 <div class="task-actions">
//                     <button onclick="editTask(${task.id}, '${task.title}', '${task.description}', ${task.completed})" class="edit-task">Edit</button>
//                     <button onclick="deleteTask(${task.id})" class="delete-task">Delete</button>
//                 </div>
//             `;
//             taskList.appendChild(taskItem);
//         });
//     }

//     addTaskBtn.addEventListener("click", async function () {
//         const title = taskTitle.value.trim();
//         const description = taskDesc.value.trim();

//         if (!title) {
//             alert("Task title is required!");
//             return;
//         }

//         if (isEditing) {
//             try {
//                 const response = await fetch(`${API_URL}/api/tasks/${currentTaskId}`, {
//                     method: "PUT",
//                     headers: {
//                         "Content-Type": "application/json",
//                         "Authorization": `Bearer ${token}`
//                     },
//                     body: JSON.stringify({ title, description, completed: currentCompleted })
//                 });

//                 if (!response.ok) throw new Error("Failed to update task");
//                 fetchTasks();
//                 resetForm();
//             } catch (error) {
//                 console.error(error);
//             }
//         } else {
//             try {
//                 const response = await fetch(`${API_URL}/api/tasks`, {
//                     method: "POST",
//                     headers: {
//                         "Content-Type": "application/json",
//                         "Authorization": `Bearer ${token}`
//                     },
//                     body: JSON.stringify({ title, description })
//                 });

//                 if (!response.ok) throw new Error("Failed to create task");
//                 fetchTasks();
//                 resetForm();
//             } catch (error) {
//                 console.error(error);
//             }
//         }
//     });

//     window.editTask = function (taskId, currentTitle, currentDesc, completed) {
//         isEditing = true;
//         currentTaskId = taskId;
//         currentCompleted = completed;
//         taskTitle.value = currentTitle;
//         taskDesc.value = currentDesc;
//         addTaskBtn.textContent = "Update Task";
//     };

//     window.deleteTask = async function (taskId) {
//         if (!confirm("Are you sure you want to delete this task?")) return;

//         try {
//             const response = await fetch(`${API_URL}/api/tasks/${taskId}`, {
//                 method: "DELETE",
//                 headers: {
//                     "Authorization": `Bearer ${token}`
//                 }
//             });

//             if (!response.ok) throw new Error("Failed to delete task");
//             fetchTasks();
//         } catch (error) {
//             console.error(error);
//         }
//     };

//     function resetForm() {
//         isEditing = false;
//         currentTaskId = null;
//         currentCompleted = null;
//         addTaskBtn.textContent = "Add Task";
//         taskTitle.value = "";
//         taskDesc.value = "";
//     }

//     fetchTasks();
// });


document.addEventListener("DOMContentLoaded", function () {
    const taskList = document.getElementById("task-list");
    const taskTitle = document.getElementById("task-title");
    const taskDesc = document.getElementById("task-desc");
    const addTaskBtn = document.getElementById("add-task");
    const logoutBtn = document.getElementById("logout-btn");

    const API_URL = "http://localhost:8000";
    const token = localStorage.getItem("token");

    let isEditing = false;
    let currentTaskId = null;
    let currentCompleted = null;

    // Check authentication
    if (!token) {
        alert("You are not logged in!");
        window.location.href = "login.html";
    }

    // Logout functionality
    logoutBtn.addEventListener("click", function () {
        localStorage.removeItem("token");
        alert("Logged out!");
        window.location.href = "login.html";
    });

    // Fetch tasks from server
    async function fetchTasks() {
        try {
            const response = await fetch(`${API_URL}/api/tasks`, {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            });
            if (!response.ok) throw new Error("Failed to fetch tasks");
            const tasks = await response.json();
            renderTasks(tasks);
        } catch (error) {
            console.error(error);
        }
    }

    // Render tasks in UI
    function renderTasks(tasks) {
        taskList.innerHTML = "";
        tasks.forEach(task => {
            const taskItem = document.createElement("li");
            taskItem.className = "task-item";
            taskItem.innerHTML = `
                <div class="task-content">
                    <strong>${task.title}</strong>
                    <p>${task.description}</p>
                </div>
                <div class="task-actions">
                    <button onclick="editTask(${task.id}, '${task.title}', '${task.description}', ${task.completed})">Edit</button>
                    <button onclick="deleteTask(${task.id})">Delete</button>
                </div>
            `;
            taskList.appendChild(taskItem);
        });
    }

    // Add/update task
    addTaskBtn.addEventListener("click", async function () {
        const title = taskTitle.value.trim();
        const description = taskDesc.value.trim();

        if (!title) {
            alert("Task title is required!");
            return;
        }

        if (isEditing) {
            try {
                const response = await fetch(`${API_URL}/api/tasks/${currentTaskId}`, {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`
                    },
                    body: JSON.stringify({ title, description, completed: currentCompleted })
                });

                if (!response.ok) throw new Error("Failed to update task");
                fetchTasks();
                resetForm();
            } catch (error) {
                console.error(error);
            }
        } else {
            try {
                const response = await fetch(`${API_URL}/api/tasks`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`
                    },
                    body: JSON.stringify({ title, description })
                });

                if (!response.ok) throw new Error("Failed to create task");
                fetchTasks();
                resetForm();
            } catch (error) {
                console.error(error);
            }
        }
    });

    // Edit task
    window.editTask = function (taskId, currentTitle, currentDesc, completed) {
        isEditing = true;
        currentTaskId = taskId;
        currentCompleted = completed;
        taskTitle.value = currentTitle;
        taskDesc.value = currentDesc;
        addTaskBtn.textContent = "Update Task";
    };

    // Delete task
    window.deleteTask = async function (taskId) {
        if (!confirm("Are you sure you want to delete this task?")) return;

        try {
            const response = await fetch(`${API_URL}/api/tasks/${taskId}`, {
                method: "DELETE",
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            });

            if (!response.ok) throw new Error("Failed to delete task");
            fetchTasks();
        } catch (error) {
            console.error(error);
        }
    };

    // Reset form state
    function resetForm() {
        isEditing = false;
        currentTaskId = null;
        currentCompleted = null;
        addTaskBtn.textContent = "Add Task";
        taskTitle.value = "";
        taskDesc.value = "";
    }

    // Initial task fetch
    fetchTasks();
});