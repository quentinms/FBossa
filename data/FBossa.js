self.port.on("init", init);

var app_id = 350;
var task_id = "-1";
var app_url = "http://crowdcrafting.org/app/catsclassification";

function init(){

$(".cardRightCol").prepend("<div class='uiHeader'> <h6 class='uiHeaderTitle'>PYBOSSA</h6> Is it a cat? (<span id='task-link'></span>)<br> <img id='photo-link' style='width: 100%;' src='http://demo.marcofolio.net/facebook_loader/images/loading.gif'/> <button class='pybutton' value='Yes'>Yes 🐱</button><button class='pybutton' value='No'>No 🐶</button><button class='pybutton' value='NotKnown'>I don't know ❓</button><hr> </div>");
$(".pybutton").click(function(){vote(this.value)});
loadNextTask();

}

function vote(value){
        taskrun = {
            'app_id': app_id,
            'task_id': task_id,
            'info': value
        };

        taskrun = JSON.stringify(taskrun);

        console.log(taskrun);

        $.ajax({
            type: 'POST',
            url: 'http://crowdcrafting.org/api/taskrun',
            dataType: 'json',
            contentType: 'application/json',
            data: taskrun,
            success: function(data){
             console.log(data);
             loadNextTask();
            }
        }).error(function(error) { console.log(error.responseText) });  
}

function loadNextTask(){
    $.getJSON("http://crowdcrafting.org/api/app/"+app_id+"/newtask",
      function(json){
        img_link = json.info.link;
        task_id = json.id;

        $("#photo-link").attr('src', img_link);
        //$("#task-link").attr('href', app_url+'/task/'+task_id);
        $("#task-link").html("Task #"+task_id);
      }
    )
}


