// Generate unique id
function uuid() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = Math.random() * 16 | 0,
            v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
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
const storeTodo = (todoDatabase) => {
    localStorage.setItem(todoKey, JSON.stringify(todoDatabase))
}