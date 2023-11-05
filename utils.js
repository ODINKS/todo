// Generate unique id
function uuid() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = Math.random() * 16 | 0,
            v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}

// Throw empty field error
const throwEmptyFieldError = (idValue) =>{
    const errorText = document.getElementById(idValue)
    console.log("here", errorText);
    errorText.classList.remove("hidden")
    setTimeout(() => {
        errorText.classList.add("hidden")
    }, 3000)
}

// Retrieve todos from database
const readTodo = (todoKey) => {
    if(!todoKey){
        throw new Error("todos does not exist!")
        return
    }
    return JSON.parse(localStorage.getItem(todoKey)) || [];
}

//Store todos in the database
const storeTodo = (todoKey, todoDatabase) => {
    localStorage.setItem(todoKey, JSON.stringify(todoDatabase))
}

// we want to create a funxtion that will
// 1. handle preview todo(id)       //capture the id of the todo to be used in thr next page
// 2. get current preview todo id
// render current preview todo


const handlePreviewTodo = (todoId) =>{
    storeTodo("currentTodoId", todoId)
    location.href = "./preview-todo.html"
}