let newTask = document.querySelector('#inputer');
    let form = document.querySelector('form');
    let submitBtn = document.querySelector('#submitBtn');
    let incompleteUl = document.querySelector('#inc-list');
    let runningUl = document.querySelector('.runningUl ol');
    let completeUl = document.querySelector('.completeUl ol');

    let createTask = function(task) {
      let listItem = document.createElement('li');
      let label = document.createElement('label');
      label.innerText = task;

      let updateBtn = document.createElement('input');
      updateBtn.type = 'button';
      updateBtn.className = 'update'
      updateBtn.value = 'Update';

      let runBtn = document.createElement('input');
      runBtn.type = 'button';
      runBtn.className = 'run';
      runBtn.value = 'Run';
      
      let Btn = document.createElement("span")

      Btn.appendChild(updateBtn)
      Btn.appendChild(runBtn)

      listItem.appendChild(label);
      listItem.appendChild(Btn);

      return listItem;
    }

    let addTask = function(e){
      e.preventDefault();
      if (newTask.value.trim() !== "") {
        let listItem = createTask(newTask.value);
        incompleteUl.appendChild(listItem);
        newTask.value = "";
        
        bindInCompleteListItems(listItem, completeTask);
      }
    }

    let todoUpdate = document.querySelector('#inc-list');

    todoUpdate.addEventListener('click', function(event){
      let target = event.target;

      if (target.classList.contains('update')) {
        let toEditableText = target.parentNode.previousElementSibling;
        toEditableText.contentEditable = true;
        toEditableText.focus();
        toEditableText.addEventListener('keydown', function(event) {
          if(event.key === 'Enter'){
            toEditableText.contentEditable = false;
          }
        })
      }
    })

    let completeTask = function(){
      let listItem = this.parentNode.parentNode;
      let doneBtn = document.createElement('input');
      doneBtn.type = 'button';
      doneBtn.className = 'done'
      doneBtn.value = 'Done';
      listItem.appendChild(doneBtn);

      let updateBtn = listItem.querySelector('.update');
      updateBtn.remove();
      let runBtn = listItem.querySelector('.run');
      runBtn.remove();

      runningUl.appendChild(listItem)

      bindRunListItems(listItem, runTask)
    }

    let runTask = function(){
      let listItem = this.parentNode;
      let deleteBtn = document.createElement('input');
      deleteBtn.type = 'button';
      deleteBtn.className = 'delete'
      deleteBtn.value = 'Delete';
      listItem.appendChild(deleteBtn);

      let doneBtn = listItem.querySelector('.done');
      doneBtn.remove();

      runningUl.removeChild(listItem)
      completeUl.appendChild(listItem)

      bindCompleteListItems(listItem, deleteTask)
    }

    let deleteTask = function(){
      let listItem = this.parentNode;
      completeUl.removeChild(listItem);
    }

    let bindRunListItems = function(taskList, doneBtnClick) {
      let doneBtn = taskList.querySelector('.done');
      doneBtn.addEventListener('click', doneBtnClick);
    }

    let bindCompleteListItems = function(taskList, deleteBtnClick){
      let deleteBtn = taskList.querySelector('.delete');
      deleteBtn.addEventListener('click', deleteBtnClick);
    }

    let bindInCompleteListItems = function(taskList, runBtnClick) {
      let runBtn = taskList.querySelector('.run');
      runBtn.addEventListener('click', runBtnClick);
    }

    form.addEventListener('submit', addTask);

    newTask.addEventListener('input', function() {
      submitBtn.disabled = newTask.value.trim() === "";
    });
