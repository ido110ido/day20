const submit = document.getElementById('submit')
const clean_button = document.getElementById('clean')
const textFilde = document.getElementById('text')
const darkMoodButton = document.getElementById('dark')
const taskList = document.getElementById('list_placeHolder') 

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

submit.addEventListener('click',function(event){
    event.preventDefault();
    addTask();
})

clean_button.addEventListener('click',function(event) {
    event.preventDefault();
    clear()   
})

darkMoodButton.addEventListener('click',function(event){
    event.preventDefault();
    document.body.classList.contains('dark')?
    document.body.classList.remove('dark'):
    document.body.classList.add('dark');
})

function addTask() {
    if(textFilde.value == 0){
        alert('no task enterd')
    }
    else{
    const task ={
        key: Date.now(),
        text: textFilde.value,
        cheacked: false
    }
    tasks.push(task)
    randerList()
    localStorage.setItem('tasks',JSON.stringify(tasks))
    textFilde.value = ''
}
}

function randerList(){
    taskList.innerHTML = ''
    tasks.length === 0 ?
        submit.classList.add('empty_list_bottom'):
        submit.classList.remove('empty_list_bottom');
    
    for( let i = 0 ; i < tasks.length; i++){
        const task = tasks[i]

        let task_Block = document.createElement('li')
        task_Block.classList.add('todoBrick') 
        
        let label = document.createElement('label')
        label.innerText = task.text
        
        let checkbox = document.createElement('input')
        checkbox.type = "checkbox"
        checkbox.addEventListener('click',function(event){
            event.preventDefault();
            cheacked(task.key)
        })
        checkbox.checked = task.cheacked? true : false

        let deleteButton = document.createElement('button')
        deleteButton.textContent = 'delete'
        deleteButton.classList.add('button')
        deleteButton.classList.add('task_button')
        deleteButton.addEventListener('click',function(event){
            event.preventDefault();
            removeTask(task.key)
        })
        
        
        task_Block.appendChild(checkbox)
        task_Block.appendChild(label)
        task_Block.appendChild(deleteButton)
        taskList.appendChild(task_Block)

    }
}

function removeTask(key){
    console.log(key);
    const taskIndex = tasks.findIndex((obj) => obj.key === key);
    console.log(taskIndex);
    if(tasks[taskIndex].cheacked){
        console.log(tasks[taskIndex].cheacked);
        tasks.splice(taskIndex, 1);
    }
    else{
             alert('task was not completed!!')  
    }
        localStorage.setItem("tasks", JSON.stringify(tasks));
        randerList()
  }

function cheacked(key){
    const taskIndex = tasks.findIndex((obj) => obj.key === key);
    tasks[taskIndex].cheacked = !tasks[taskIndex].cheacked
    console.log(tasks[taskIndex].cheacked);

    localStorage.setItem("tasks", JSON.stringify(tasks));
    randerList()

}
function clear(){
    console.log('clean');
    localStorage.clear()
    tasks = JSON.parse(localStorage.getItem("tasks")) || []
    randerList()
}

randerList()