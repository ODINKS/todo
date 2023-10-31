// Utility function
function uuid() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = Math.random() * 16 | 0,
            v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}

const todoKey = "todoList"

// READ  TODO FUNCTION: Retrieve todos from database
const readTodo = () =>{
    return JSON.parse(localStorage.getItem(todoKey)) || [];
}

//Store todos in the database
const storeTodo = (todoDatabase) =>{
    localStorage.setItem(todoKey, JSON.stringify(todoDatabase))
}

const childElement = (inputValue, id) =>{
    return( `<section class="group">
    <div class="group mb-3 flex flex-row justify-between px-2 py-2 group-hover:bg-gray-200 rounded-lg">
        <!-- Todo input value -->
        <p class="text-lg font-medium">${inputValue}</p>
        <!-- edit icon -->
        <div class="invisible group-hover:visible">
            <button class="mr-[1rem] onclick="updateTodo(event)" id="todos-${id}"">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                </svg> 
            </button>
            <!-- Delete icon -->
            <button onclick="deleteTodo(event)" id="todo-${id}">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                  </svg>
            </button>
        </div>
    </div>
    </section>`)
}


// Display todo
const displayNewTodo = (parentAttribute, childElement) =>{
    // Retrieve item from database
    const todoDatabase = readTodo()
    // Get the parent element
    const parentElement = document.querySelector(`${parentAttribute}`)
    console.log("here");
    parentElement.innerHTML = ""
    todoDatabase.forEach((todo) =>{
        // Grab the parent
        parentElement.innerHTML += childElement(todo.todoName, todo.id)
    })
}

displayNewTodo("#todos", childElement)


// Create a todo
const createTodo = (event) => {
    event.preventDefault()
    // Grab the input field
    const todoInput = document.getElementById("todo-input")
    const todoValue = todoInput.value
    const todoDatabase = readTodo()

    // New todo the user creates
    const newTodo = {
        todoName: todoValue,
        id: uuid(),
        createdAt: Date.now()
    }
    // Store new todo in the database.
    todoDatabase.push(newTodo);

    // Store back in the localstorage
    storeTodo(todoDatabase);
    displayNewTodo("#todos", childElement)

    todoInput.value = ""
}





// UPDATE TODO FUNCTION
const updateTodo = (event) =>{
    console.log(event);
    // Get the id of the delete button
    todoId = event.target.parentElement.id.replace('todos-', '')
    console.log(todoId);
    // Take input from user
    updatedTodo = prompt("Edit your tasks")
    // Read the local storage
    const todoDatabase = readTodo()
    // Find the todos index
    todoIndex = todoDatabase.findIndex(todo => todo.id === todoId)
    if(todoIndex !== -1){
        // Remove the todo at the specified index
        todoDatabase[todoIndex].todoName = updatedTodo
        // Store in local storage
        storeTodo(todoDatabase)
        displayNewTodo("#todos", childElement)
    }

}


// DELETE TODO FUNCTION
const deleteTodo = (event) =>{
    // Get the id of the delete button
    todoId = event.target.parentElement.id.replace('todo-', '')
    // Read the local storage
    const todoDatabase = readTodo()
    // Find the todos index
    todoIndex = todoDatabase.findIndex(todo => todo.id === todoId)
    if(todoIndex !== -1){
        // Remove the todo at the specified index
        todoDatabase.splice(todoIndex, 1)
        // Store in local storage
        storeTodo(todoDatabase)
        displayNewTodo("#todos", childElement)
    }

}




