const todoKey = "todoList"

const renderCurrentPreviewTodo = () => {
    const currentTodoId = readTodo("currentTodoId");
    // Get the database
    const todoDatabase = readTodo(todoKey);
    // Get the current todo using the current todoId
    const currentTodo = todoDatabase.find(todo => todo.id === currentTodoId)
    const { id, todoName, createdAt, todoDate, description } = currentTodo
    const todoDateDesc = new Date(todoDate).toDateString();
    const todoCreatedAt = new Date(createdAt).toDateString();
    const previewTodoContainer = document.getElementById("preview-todo-container")
    previewTodoContainer.innerHTML = `
    <section class="">
                    <div class="mb-3 flex flex-row justify-between px-2 py-2 rounded-lg border-b-[2px]">
                        <!-- Todo input value -->
                        <button class="text-lg font-medium truncate max-w-sm" id="todo-preview-name">${todoName}</button>

                        <!-- edit icon -->
                        <div class="flex justify-between">
                            <button class="mr-[1rem] border border-gray-400 p-1 rounded-full align-self-start"
                                onclick="updatePreviewTodo('${id}')">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                    stroke-width="1.5" stroke="currentColor" class="w-6 h-6 text-green-700">
                                    <path stroke-linecap="round" stroke-linejoin="round"
                                        d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                                </svg>
                            </button>
                            <!-- Delete icon -->
                            <button onclick="deleteTodo('${id}')" class="border border-gray-400 p-1 rounded-full align-self-start">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                    stroke-width="1.5" stroke="currentColor" class="w-6 h-6 text-red-700">
                                    <path stroke-linecap="round" stroke-linejoin="round"
                                        d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </section>
                <section class="flex gap-20 w-full border border-gray-300 py-2 px-3 rounded-lg text-sm" id="todo-description">
                    <p class="" id="todo-preview-desc">${description || `<span class="text-center text-gray-400 italic text-lg">Your description will appear here</span>`}</p>
                </section>
                <!-- Date -->
                <section class="mt-6 flex gap-x-3">
                    <span class="mr-2 text-xs flex flex-col gap-y-2">
                        <span class="flex gap-x-3 italic">
                            <span class="font-semibold">Todo Due Date:</span>
                            <span class="">${todoDateDesc}</span> 
                        </span>
                        <span class="flex gap-x-3 italic">
                            <span class="font-semibold">Created At:</span>
                            <span class="">${todoCreatedAt}</span> 
                        </span>
                    </span>
                    <span class="mr-2 font-bold text-lg self-center">&middot;</span>
                    <span class="self-center">${new Date(todoDate).getTime() < Date.now()? `<span class="rounded-full px-2 py-1 bg-red-600">Due</span>`: `<span class="rounded-full px-2 py-1 bg-green-600">pending</span>`}</span>
                </section>
                <section class="flex flex-row items-center justify-center mt-12">
                    <a href="./index.html" class="flex flex-row justify-center">
                        <button class="">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                                stroke="currentColor" class="w-4 h-4 text-slate-600 hover:text-slate-800">
                                <path stroke-linecap="round" stroke-linejoin="round"
                                    d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
                            </svg>
                        </button>
                        <span class="text-sm ml-2">View all todos</span>
                    </a>
                </section>
    `
}

renderCurrentPreviewTodo()


const updatePreviewTodo = (todoId) => {
    const todoPreviewName = document.getElementById("todo-preview-name").textContent
    const todoPreviewDesc = document.getElementById("todo-preview-desc").textContent
    Swal.fire({
        title: "Edit Preview Todo",
        html: `
        <div class="flex flex-col gap-6">
        <input type="text" value="${todoPreviewName}" class="p-2 rounded-lg border border-slate-500 focus:border-yellow-500 focus:outline-none" id="todo-input"/>

        <textarea name="" id="todo-description-input" cols="20" rows="5" class="border border-slate-500 focus:border-yellow-500 focus:outline-none p-2 rounded-lg">${todoPreviewDesc}</textarea>
        </div>
        `,
        showCancelButton: true,
        focusConfirm: false,
        confirmButtonText: 'Update',
        preConfirm: () => {
            const todoInput = document.getElementById("todo-input")
            const todoDescriptionInput = document.getElementById("todo-description-input")

            // Check if the fields are empty
            if (!todoInput.value.trim() || !todoDescriptionInput.value.trim()) {
                // Get the values from the input fields
                Swal.showValidationMessage("Fields cannot be empty");
                return false; // Prevent the modal from closing
            }
            return {
                'todo-input': todoInput.value,
                'todo-description-input': todoDescriptionInput.value
            }
        }

    }).then(res => {
        // To access the input values use: res.value.inputFieldName
        const todoDescriptionInput = res.value['todo-description-input'];
        const todoInput = res.value['todo-input'];

        // Fetch the database
        const todoDatabase = readTodo(todoKey);
        const todoIndex = todoDatabase.findIndex((todo) => todo.id === todoId);
        if (todoIndex !== -1) {
            // Update the todo with the edited task
            todoDatabase[todoIndex].description = todoDescriptionInput;
            todoDatabase[todoIndex].todoName = todoInput;
            // Store in local storage
            storeTodo(todoKey, todoDatabase);
            renderCurrentPreviewTodo()
        }
    })
}

// Delete a todo
const deleteTodo = (todoId) => {
    Swal.fire({
        title: 'Delete Todo',
        text: 'Do you want to delete this todo?',
        icon: 'warning',
        confirmButtonText: 'Yes',
        showCancelButton: true
    }).then((res) => {
        if (res.isConfirmed) {
            // Read the local storage
            const todoDatabase = readTodo(todoKey)
            // Delete the actual todo
            const newTodoDatabase = todoDatabase.filter((todo) => todo.id !== todoId)
            // Store in local storage
            storeTodo(todoKey, newTodoDatabase)
            // Render updated todo
            location.href = "./index.html"
        }
    })

}








