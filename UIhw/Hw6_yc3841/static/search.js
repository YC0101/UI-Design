let hasinput = 1
let sinput =""

function display_result(skey){
    $("#searchlist").empty();
    console.log(skey)
    let count = 0;
    //insert all new data
    $.each(data,function(key,showdata){
        console.log(key)
        if(skey.indexOf(key) != -1){
            count++
            console.log("Yes")
            let showname = showdata["title"];
            let listname = $("<a href='/view/"+key+"'>"+showname+"</a>")
            //let listname = $("<div class = 'listname'>");
            //$(listname).html(""+showname);
            $("#searchlist").append(listname);
            $("#searchlist").append("<br>");
        }
        
    })
    if(count==0){
        $("#searchlist").append("<div> No result found... QWQ</div>");
    }
}

function get_search(){    
    sinput = search_input;
}

function search_show(input){
    $.ajax({
        type: "POST",
        url: "/search_show",                
        dataType : "json",
        contentType: "application/json; charset=utf-8",
        data : JSON.stringify(input),
        success: function(result){
            let skey = result["searchkey"]
            searchkey = skey
            console.log(searchkey)
            display_result(searchkey)
            console.log(searchkey)
            $("#searchinput").val("")
        },
        error: function(request, status, error){
            console.log("Error");
            console.log(request)
            console.log(status)
            console.log(error)
        }
    });
}

$(document).ready(function(){
    
    get_search()
    //console.log(sinput)
    let warning = $("<div>Search results for \"" + sinput +"\" </div>")
    $("#searchwarning").append(warning)
    search_show(sinput)
  
    $("#searchTV").submit(function( event ) {
        inputText = $("#searchinput").val().replace(/^\s+/, '').replace(/\s+$/, '');
        if(!(inputText === '')){
            console.log(inputText)
            window.location.href="/search_results/"+$("#searchinput").val()+""
        }
        else{
            $("#searchinput").val("");
            $("#searchinput").select();
        }
        event.preventDefault();
    });

    //display_result(sinput)
})