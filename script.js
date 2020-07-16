const form = document.querySelector('#task-form')
const taskList = document.querySelector('.collection')
const clearBtn = document.querySelector('.clear-tasks')
const filter = document.querySelector('#filter')
const taskInput = document.querySelector('#task')

//Add task
form.addEventListener('submit', function (e){
    e.preventDefault()
    //if input is empty
    if (taskInput.value === ''){
        alert("Add Task")
    }else{
        //create list element
        const li = document.createElement('li')
        li.className = 'collection-item'
        li.appendChild(document.createTextNode(taskInput.value))
        //create link element
        const link = document.createElement('a')
        link.className= 'delete-item secondary-content'
        link.innerHTML = '<i class="fa fa-remove" onclick="remove(this)"></i>'
        //add link to list
        li.appendChild(link)
        //add list to collection
        taskList.appendChild(li)

        storeTaskInLocalStorage(taskInput.value)

        taskInput.value = ''
        
    }
})
//store task
function storeTaskInLocalStorage(task){
    let tasks
    if(localStorage.getItem('tasks')===null){
        tasks = []
    }else{
        tasks = JSON.parse(localStorage.getItem('tasks'))
    }
    tasks.push(task)
    localStorage.setItem('tasks', JSON.stringify(tasks))

}

//clear everything
clearBtn.addEventListener('click', function(e){
    if(taskList.innerHTML!=''){
        if (confirm('Delete All Tasks?')){
            taskList.innerHTML = ''
        }
        clearTasksFromLocalStorage()
    }
    
})
function clearTasksFromLocalStorage(){
    localStorage.clear()
}
function remove(x){
    if (confirm('Delete This Task?')){
        x.parentElement.parentElement.remove()
        //remove from LS
        removeTaskFromLocalStorage(x.parentElement.parentElement)
    }
}

function removeTaskFromLocalStorage(taskItem){
    let tasks
    if(localStorage.getItem('tasks')===null){
        tasks = []
    }else{
        tasks = JSON.parse(localStorage.getItem('tasks'))
    }

    tasks.forEach(function (task, index){
        if(taskItem.textContent === task){
            tasks.splice(index,1)
        }
    })
    localStorage.setItem('tasks', JSON.stringify(tasks))
}

//filter all tasks
function displayTasks(filters){

    let filtered =document.querySelectorAll('.collection-item').forEach(function (task){
        const item = task.textContent
        if(item.toLowerCase().includes(filters)){
            task.style.display = 'block'
        }else{
            task.style.display = 'none'
        }
    })
}

//filter input
filter.addEventListener('keyup', function(e){
    let text = filter.value.toLowerCase()
    displayTasks(text)
})


document.addEventListener('DOMContentLoaded', function (x){
    let tasks
    if(localStorage.getItem('tasks')===null){
        tasks = []
    }else{
        tasks = JSON.parse(localStorage.getItem('tasks'))
    }
    tasks.forEach(function (task){
        const li = document.createElement('li')
        li.className = 'collection-item'
        li.appendChild(document.createTextNode(task))
        //create link element
        const link = document.createElement('a')
        link.className= 'delete-item secondary-content'
        link.innerHTML = '<i class="fa fa-remove" onclick="remove(this)"></i>'
        //add link to list
        li.appendChild(link)
        //add list to collection
        taskList.appendChild(li)
    })
})

