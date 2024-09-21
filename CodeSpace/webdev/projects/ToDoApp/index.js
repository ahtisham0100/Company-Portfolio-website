var eventControl= 0;

console.log("working");



//adding event listener to addtask btn; 

$("#addTaskBtn").click( function () {
    var taskname = prompt("Enter The Task Name :");
    var DeadlineTime= prompt("Enter the Deadline Time.");

   var id = ".upcoming-tasks";
 $(id).append(addTask(taskname ,DeadlineTime));
}

);


// Mark complete function 
function markComplete(taskName) {
    var hrs, minutes;  
    const date = new Date();
    hrs = date.getHours(); 
    console.log("hors"+ hrs);
    minutes = date.getMinutes();
    var time = hrs + ":" + (minutes < 10 ? "0" + minutes : minutes); // Pad minutes with leading zero if needed
    

    // Create the task object
    var taskContainer = $('<div>').addClass('completed-task-container');
    
    var innerTextDiv = $('<div>').addClass('innertext item').html('<span id="completionText">' + taskName + '</span>');
    var innerTimeDiv = $('<div>').addClass('innertime item').html('Completed at <span id="completion-time">' +( time ) + '</span>');
    var buttonDiv = $('<div>').addClass('btn item').html('<button class="addtaskButton" id="markInComplete">Mark as InComplete</button>');
     
     
    // Append the inner divs to the task container
    taskContainer.append(innerTextDiv, innerTimeDiv, buttonDiv);
     
    $(taskContainer).find("#markInComplete").click( function (e) {

       var taskName= $(this).parent().parent().children().first().text();
       console.log(taskName); 
       var time =    prompt("Enter The Deadline(may be time / date /month ) ");
       
        $(".upcoming-tasks").append(addTask(taskName , time));
        taskName="";
        $(this).parent().parent().remove();
    })




    return taskContainer;
}





// Add Task Function
function addTask(taskName, time) {
    console.log("inside the add task "); 
    // Create the task object
    var taskContainer = $('<div>').addClass('incompleted-task');
    
    var innerTextDiv = $('<div>').addClass('innertext item').html('<span id="incompletiontext">' + taskName + '</span>');
    var innerTimeDiv = $('<div>').addClass('innertime item').html('To be Completed by <span id="deadline">' +( time ) + '</span>');
    var buttonDiv = $('<div>').addClass('btn item').html('<button class="" id="markComplete">Mark as Completed</button>');
  
    taskContainer.append(innerTextDiv, innerTimeDiv, buttonDiv);

    $(taskContainer).find("#markComplete").click(function (){

        // Get the task name
        var taskname = $(this).parent().parent().find("div").first().text();
    
         // Append the task to completedTasks container
         var id = "#completedTasks"; // Updated to be jQuery selector
         $(id).append(markComplete(taskname)); // Add the task using the addTask function

        // Remove the incompleted task
        $(this).parent().parent().remove();

    
    }) ;
    // Append the inner divs to the task container
    
    return taskContainer;
}

