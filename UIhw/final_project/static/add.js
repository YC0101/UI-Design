let currentid=10;

let hastitle=0;
let hasimg=0;
let hasdir=0;
let hasepi=0;
let hasstar=0;
let hasscore=0;
let hasgenre=0;
let hassum=0;

let hasempty = 1;
let haserror=1;


function get_info(){
    hasempty = 1;
    let new_element = {
        "title": "",
        "image": "",
        "summary": "",
        "director": [],
        "episodes": "",
        "stars": [],
        "score": "",
        "genres": []
    };

    if($("#inputtitle").val().replace(/^\s+/, '').replace(/\s+$/, '').length == 0){
        hastitle = 0;
    }
    else{
        hastitle = 1;
        new_element["title"]= $("#inputtitle").val();
    }
//----
    if($("#inputimg").val().replace(/^\s+/, '').replace(/\s+$/, '').length == 0){
        hasimg = 0;
    }
    else{
        hasimg = 1;
        new_element["image"]= $("#inputimg").val();
    }
//----
    if($("#inputdir").val().replace(/^\s+/, '').replace(/\s+$/, '').length == 0){
        hasdir = 0;
    }
    else{
        hasdir = 1;
        new_element["director"]= $("#inputdir").val().split(',');
    }
//-----
    if($("#inputepi").val().replace(/^\s+/, '').replace(/\s+$/, '').length == 0){
        hasepi = 0;
    }
    else{
        hasepi = 1;
        new_element["episodes"]= parseInt($("#inputepi").val(), 10);
    }
//----
    if($("#inputstars").val().replace(/^\s+/, '').replace(/\s+$/, '').length == 0){
        hasstar = 0;
    }
    else{
        hasstar = 1;
        new_element["stars"]= $("#inputstars").val().split(',');
        console.log(new_element["stars"]);
    }
//----
    if($("#inputscore").val().replace(/^\s+/, '').replace(/\s+$/, '').length == 0){
        hasscore = 0;
    }
    else{
        hasscore = 1;
        new_element["score"]= parseInt($("#inputscore").val(), 10);
    }
//----
    if($("#inputgenres").val().replace(/^\s+/, '').replace(/\s+$/, '').length == 0){
        hasgenre = 0;
    }
    else{
        hasgenre = 1;
        new_element["genres"]= $("#inputgenres").val().split(',');
    }
//----
    if($("#inputsum").val().replace(/^\s+/, '').replace(/\s+$/, '').length == 0){
        hassum = 0;
    }
    else{
        hassum = 1;
        new_element["summary"]= $("#inputsum").val();
    }

    if(hastitle && hasimg && hasdir && hasepi && hasstar && hasscore && hasgenre && hassum){
        hasempty = 0;
    }
    else{
        hasempty=1;
    }

    return new_element;
}

function check_error(new_element){
    $("#w1").empty();
    $("#w2").empty();
    $("#w3").empty();
    $("#w4").empty();
    $("#w5").empty();
    $("#w6").empty();
    $("#w7").empty();
    $("#w8").empty();
    let errornum = 2;
    if(!hassum){
        $("#w8").append("<span>*Invalid (balnk)</span>");
        $("#inputsum").select();
    } 
    if(!hasgenre){
        $("#w7").append("<span>*Invalid (balnk)</span>");
        $("#inputgenres").select();
    }
    if((!hasscore)){
        $("#w6").append("<span>*Invalid (number 1-10)</span>");
        $("#inputscore").select();
    }
    else if(new_element["score"]<0 || new_element["score"]>10 || isNaN(new_element["score"])){
        $("#w6").append("<span>*Invalid (number 1-10)</span>");
    }
    else{
        errornum--;
    }


    if(!hasstar){
        $("#w5").append("<span>*Invalid (balnk)</span>");
        $("#inputstars").select();
    }
    if((!hasepi)){
        $("#w4").append("<span>*Invalid (number)</span>");
        $("#inputepi").select();
    }
    else if(new_element["episodes"]<0 || isNaN(new_element["episodes"])){
        $("#w4").append("<span>*Invalid (number)</span>");
    }
    else{
        errornum--;
    }


    if(!hasdir){
        $("#w3").append("<span>*Invalid (balnk)</span>");
        $("#inputdir").select();
    }
    if(!hasimg){
        $("#w2").append("<span>*Invalid (balnk)</span>");
        $("#inputimg").select();
    }
    if(!hastitle){
        $("#w1").append("<span>*Invalid (blank)</div>");
        $("#inputtitle").select();
    } 
    
    if(errornum == 0){
        haserror = 0;
    }
    else{
        haserror = 1;
    }
}

function save_show(new_element){
    $.ajax({
        type: "POST",
        url: "save_show",                
        dataType : "json",
        contentType: "application/json; charset=utf-8",
        data : JSON.stringify(new_element),
        success: function(result){
            let id = result["current_id"]
            currentid = id;            
            console.log(currentid)
            $("#addsuc").append("<div>New show successfully created!!</div>")
            let linktonew = $("<button id = 'gonew' class='btn btn-outline-success my-2 my-sm-0'>See it here</button>")
            
            $("#addsuc").append(linktonew);
            $("#gonew").click(function() {  
                console.log(currentid);      
                window.location.href="/view/"+currentid+"";   
                //event.preventDefault();
            });
            
            
            $(".addinput").val("")  
            $("#inputtitle").select()          
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
    $("#addsubmit").click(function(){
        $("#addsuc").empty();
        let new_element = get_info();
        console.log(hasempty);
        check_error(new_element);
        console.log(new_element["genres"])
        if((!hasempty) && (!haserror)){
            save_show(new_element);
        }
    });

    $("#inputsum").keypress(function(e){
        if(e.which == 13){
            $("#addsuc").empty();
            let new_element = get_info();
            console.log(hasempty);
            check_error(new_element);
            if((!hasempty) && (!haserror)){
            save_show(new_element);
            }
        }    
    });

    

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

