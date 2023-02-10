let keylist=[]

function get_popular(popular){
    keylist = popular    
    console.log(keylist)
}

function display_popular_list(data){
    //empty old data
    $("#popularlist").empty();
    console.log(keylist)
    //insert all new data
    $.each(data,function(key,showdata){
        console.log(key)
        if(keylist.indexOf(key) != -1){
            console.log("Yes")
            let showname = showdata["title"];
            let listname = $("<a href='/view/"+key+"'>"+showname+"</a>")
            //let listname = $("<div class = 'listname'>");
            //$(listname).html(""+showname);
            $("#popularlist").append(listname);
            $("#popularlist").append("<br>");
        }
    })
}


$(document).ready(function(){
    get_popular(popular)
    display_popular_list(data)

    $("#searchTV").submit(function( event ) {
        inputText = $("#searchinput").val().replace(/^\s+/, '').replace(/\s+$/, '');
        if(!(inputText === '')){
            console.log(inputText)
            window.location.href="/search_results/"+inputText+""
        }
        else{
            console.log("empty")
            $("#searchinput").val("");
            $("#searchinput").select();
        }
        event.preventDefault();
    });
})