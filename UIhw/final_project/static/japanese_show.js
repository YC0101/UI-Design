let keylist=[]

function get_popular(popular){
    keylist = popular    
    console.log(keylist)
}

function display_popular_list(data){
    //empty old data
    $("#pic1").empty();
    $("#pic2").empty();
    $("#pic3").empty();
    $("#title1").empty();
    $("#title2").empty();
    $("#title3").empty();
    console.log(keylist)

    let pics=[];
    let names=[];
    //insert all new data


    $.each(data,function(key,showdata){
        console.log(key)
        //let newrow = $("<div class ='row'></div>");
        
        if(keylist.indexOf(key) != -1){
            console.log("Yes")
            let showname = showdata["title"];
            let showimg = showdata["image"];

            //let listname = $("<a href='/view/"+key+"'>"+showname+"</a>")
            //let listimg = $("<a href='/view/"+key+"'><img src='"+showimg+"' alt='cover for the show'></a>")
            //let listname = $("<div class = 'listname'>");
            //$(listname).html(""+showname);
            
            pics.push(showimg);
            names.push(showname);
            //$("#popularlist").append(listimg);
            //$("#popularlist").append(listname);
            //$("#popularlist").append("<br>");
        }
    });
    console.log(pics);
    console.log(names);
    let picture1 = $("<a href='/view/"+keylist[0]+"'><img class='smallpic' src='"+pics[0]+"' alt='cover for the show'></a>");
    let names1 = $("<a href='/view/"+keylist[0]+"'>"+names[0]+"</a>");
    let picture2 = $("<a href='/view/"+keylist[1]+"'><img class='smallpic' src='"+pics[1]+"' alt='cover for the show'></a>");
    let names2 = $("<a href='/view/"+keylist[1]+"'>"+names[1]+"</a>");
    let picture3 = $("<a href='/view/"+keylist[2]+"'><img class='smallpic' src='"+pics[2]+"' alt='cover for the show'></a>");
    let names3 = $("<a href='/view/"+keylist[2]+"'>"+names[2]+"</a>");   
    $("#pic1").append(picture1);
    $("#pic2").append(picture2);
    $("#pic3").append(picture3);
    $("#title1").append(names1);
    $("#title2").append(names2);
    $("#title3").append(names3);


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