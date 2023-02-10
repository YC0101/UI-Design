let names = [
    "Phyllis",
    "Angela"
]

let list = []

function makeNames(names){
    $("#updatenonppc").html("");
    $("#names").empty()
    $.each(names,function(index, value){
        //make the draggable name object                   
        let new_name = $("<div id = 'name'>");
        $(new_name).html("<div data-name = '"+value+"'>" + value + " </div> ");
        $(new_name).data("name", value);
        $(new_name).draggable({ revert: "invalid" });
        $("#updatenonppc").append(new_name);     
    });
}

function makeList(list){
    $("#updateppc").html("");
    $("#list").empty()
    $.each(list,function(index, value){
        //make the draggable name object                   
        let new_name = $("<div id = 'name'>");
        $(new_name).html("<div data-name='"+value+"'>" + value + " </div> ");
        $(new_name).data("name", value);
        $(new_name).draggable({ revert: "invalid" });
        $("#updateppc").append(new_name);     
    });
}

$(document).ready(function(){
    
    makeNames(names)

    $("#ppc_label").droppable({
        drop: function(event,ui){
            //get dropped name
            let add_name = console.log(ui.draggable.data("name"));
            //update names array
            let index = names.indexOf(add_name);
            names.splice(index,1);
            //updata list array
            list.push(add_name);
            //update the interface to display the new lists
            
            makeNames(names);
            makeList(list);
        }
    });

    $("#nonppc_label").droppable({
        drop: function(event,ui){
            //get dropped name
            let add_name = console.log(ui.draggable.data("name"));
            //update names array
            let index = list.indexOf(add_name);
            list.splice(index,1);
            //updata list array
            names.push(add_name);
            //update the interface to display the new lists
    
            makeNames(names);
            makeList(list);
        }
    });


})