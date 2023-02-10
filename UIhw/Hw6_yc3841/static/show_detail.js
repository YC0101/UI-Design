function empty_all(){
    $("#showtitle").empty();
    $("#showimg").empty();
    $("#score").empty();
    $("#summary").empty();
    $("#stars").empty();
    $("#genres").empty();
}



function display_details(data,key){
    //empty old data
   empty_all()
    //insert all new data
    let show = data[key]
    let showtitle = $("<div>"+show["title"]+"</div>");
    $("#showtitle").append(showtitle);

    let showimg = $("<img src='"+show["image"]+"'></img>");
    $("#showimg").append(showimg);

    let score = $("<div> Score:"+show["score"]+"</div>");
    $("#score").append(score);

    let summary = $("<div>"+show["summary"]+"</div>");
    $("#summary").append(summary);

    $.each(show["stars"], function(i, datum){
        let stars = $("<div>"+datum+"</div>");
        $("#stars").append(stars);
    })

    $.each(show["director"], function(i, datum){
        let director = $("<div>"+datum+"</div>");
        $("#director").append(director);
    })

    $.each(show["genres"], function(i, datum){
        let genres = $("<div>"+datum+"</div>");
        $("#genres").append(genres);
    })

}


$(document).ready(function(){
    display_details(data,key)

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
})