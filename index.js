const todoKey = "todoList"
const todoInput = document.getElementById("todo-input")

// Generate a template for each todo
const generateTodoTemplate = (inputValue, createdAt, id) => {
    const todoDate = new Date(createdAt).toDateString();
    return (`<section class="group">
    <div class="group mb-3 flex flex-row justify-between px-2 py-2 group-hover:bg-gray-200 rounded-lg border-b-[2px]">
        <!-- Todo input value -->
        <button class="text-lg font-medium truncate max-w-sm" onclick="handlePreviewTodo('${id}')">${inputValue}</button>
        <p class="text-sm font-medium flex items-center italic">${todoDate}</p>
        
        <!-- edit icon -->
        <div class="invisible group-hover:visible">
        <button class="mr-[1rem]  border border-gray-400 p-1 rounded-full" onclick="handleEditMode('${id}')">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 text-green-700">                    <path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
        </svg> 
        </button>
        <!-- Delete icon -->
        <button onclick="deleteTodo('${id}')" class="border border-gray-400 p-1 rounded-full">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 text-red-700">
        <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
        </svg>
        </button>
        </div>
        </div>
        </section>`)
    }
    
    
    
    // Display todo
    const displayNewTodos = (parentAttribute, getChildElement) => {
        // Retrieve item from database
        const todoDatabase = readTodo(todoKey)?.sort((a, b) => b.createdAt - a.createdAt)
        // Get the parent element
        const parentElement = document.querySelector(`${parentAttribute}`)
        if (todoDatabase.length === 0) {
            parentElement.innerHTML = `<p class="text-center text-gray-600 my-auto">Your todos will appear here</p>`
            return
        }
        parentElement.innerHTML = ""
        todoDatabase?.forEach((todo) => {
        // Grab the parent
        parentElement.innerHTML += getChildElement(todo.todoName, todo.createdAt, todo.id)
    })
}

displayNewTodos("#todos", generateTodoTemplate)


// Create a todo
const createTodo = (event) => {
    event.preventDefault()
    const todoValue = todoInput.value
    // Grab the input field
    if (!todoValue) {
        throwEmptyFieldError("error-text")
        return
    }
    // New todo the user creates
    const newTodo = {
        todoName: todoValue,
        id: uuid(),
        createdAt: Date.now()
    }
    const todoDatabase = readTodo(todoKey)
    // Store new todo in the database.
    todoDatabase?.push(newTodo);

    // Store back in the localstorage
    storeTodo(todoKey,todoDatabase);
    // Update the UI
    displayNewTodos("#todos", generateTodoTemplate)
    // Reset form value
    todoInput.value = ""
}

const handleEditMode = (todoId) => {
    const todoDatabase = readTodo(todoKey);
    // Find the exact todo to edit
    const todoToUpdate = todoDatabase?.find((todo) => todo.id === todoId)
    if (!todoToUpdate) {
        return
    }
    todoInput.focus()
    todoInput.value = todoToUpdate.todoName
    const updateTodoButton = document.getElementById("update-todo-btn")
    const addTodoButton = document.getElementById('add-todo-btn')
    addTodoButton.classList.add("hidden")
    updateTodoButton.classList.remove("hidden")
    updateTodoButton.setAttribute("todo-id-to-update", todoId)

}





// Update
const updateTodo = () => {
    const todoValue = todoInput.value
    if (!todoValue) {
        throwEmptyFieldError("error-text")
        return
    }
    const updateTodoButton = document.getElementById("update-todo-btn")
    const addTodoButton = document.getElementById('add-todo-btn')
    const todoId = updateTodoButton.getAttribute("todo-id-to-update")
    // Read the local storage
    const todoDatabase = readTodo(todoKey);
    // Find the todo's index
    const todoIndex = todoDatabase.findIndex((todo) => todo.id === todoId);
    if (todoIndex !== -1) {
        // Update the todo with the edited task
        todoDatabase[todoIndex].todoName = todoInput.value;
        // Store in local storage
        storeTodo(todoKey, todoDatabase);
        addTodoButton.classList.remove("hidden")
        updateTodoButton.classList.add("hidden")
        todoInput.value = ""
        // Update the displayed todos
        displayNewTodos("#todos", generateTodoTemplate);
    }
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
            storeTodo(todoKey,newTodoDatabase)
            // Render updated todo
            displayNewTodos("#todos", generateTodoTemplate)
        }
    })

}

