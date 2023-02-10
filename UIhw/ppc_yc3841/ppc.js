let employees = [
    "Phyllis",
    "Angela",
    "Dwight",
    "Oscar",
    "Creed",
    "Pam",
    "Jim",
    "Stanley",
    "Michael",
    "Kevin",
    "Kelly"
    ];

let list = [];

function makeNames(employees){
    $("#updatenonppc").html("");

    $.each(employees,function(index, value){
        //make the draggable name object                   
        let new_name = $("<div class = 'name'>");
        $(new_name).html(index+":"+ value);
        $(new_name).data("name", value);
        $(new_name).draggable({ revert: "invalid" });
        $("#updatenonppc").append(new_name);     
    });
}

function makeList(list){
    $("#updateppc").html("");

    $.each(list,function(index, value){
        //make the draggable name object                   
        let new_name = $("<div class = 'name'>");
        $(new_name).html(index+":"+ value);
        $(new_name).data("name", value);
        $(new_name).draggable({ revert: "invalid" });
        $("#updateppc").append(new_name);     
    });
}

$(document).ready(function(){
    
    makeNames(employees)
    

    $("#ppc_label").droppable({
        classes: {
            "ui-droppable-active": "ui-state-active",
            "ui-droppable-hover": "ui-state-hover"
          },

        drop: function(event,ui){
            $(this).addClass('dropped');
            $("#nonppc_label").removeClass('dropped');
            //get dropped name
            let add_name =ui.draggable.data("name");
            console.log(ui.draggable.data("name"));
            //update names array
            let index = employees.indexOf(add_name);
            employees.splice(index,1);
            //updata list array
            list.push(add_name);
            //update the interface to display the new lists
            
            makeNames(employees);
            makeList(list);
        }
    });

    $("#nonppc_label").droppable({
        classes: {
            "ui-droppable-active": "ui-state-active",
            "ui-droppable-hover": "ui-state-hover"
          },

        drop: function(event,ui){
            $(this).addClass('dropped');
            $("#ppc_label").removeClass('dropped');
            console.log(ui.draggable.data("name"));
            //get dropped name
            let add_name = ui.draggable.data("name");
            //update names array
            let index = list.indexOf(add_name);
            list.splice(index,1);
            //updata list array
            employees.push(add_name);
            //update the interface to display the new lists
    
            makeNames(employees);
            makeList(list);
        }
    });


})