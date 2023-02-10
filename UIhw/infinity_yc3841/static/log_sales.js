let hasClient = 1;

function display_sales_list(sales){
    //empty old data
    $("#updates").empty();

    //insert all new data
    $.each(sales, function(i, datum){
        let salesname = datum["salesperson"];
		let clientname = datum["client"];
		let reamsnum = datum["reams"];

		let deletebut = $("<button class='delete'>X</button>");
		deletebut.data("id", datum["id"]);

		let user = $("<span class = 'user'>");
		let new_client = $("<span class = 'newclient'>");
		let new_reams = $("<span class = 'newreams'>");
		$(user).html(""+salesname);
		$(new_client).html(""+clientname);
		$(new_reams).html(""+reamsnum);
		$("#updates").append(user);
		$("#updates").append(new_client);
		$("#updates").append(new_reams);
		$("#updates").append(deletebut);
		$("#updates").append("<br>");	
    })
}


function get_sale(){
    let reamsnum = 0;
    let clientname = "";
    if($("#inputclient").val().length == 0){
        hasClient = 0;
    }
    else{
        hasClient = 1;
        clientname = $("#inputclient").val();
    }
    
	reamsnum =parseInt($("#inputreams").val(), 10);

	let data_to_save = {
		"salesperson": "James D. Halpert",
		"client": clientname,
		"reams": reamsnum
	};
    return data_to_save;
}

function save_sale(new_sales){
    $.ajax({
        type: "POST",
        url: "save_sale",                
        dataType : "json",
        contentType: "application/json; charset=utf-8",
        data : JSON.stringify(new_sales),
        success: function(result){
            let all_sales = result["sales"]
            sales = all_sales
            display_sales_list(sales)
            console.log(sales)
            $("#inputclient").val("")
            $("#inputreams").val("")
        },
        error: function(request, status, error){
            console.log("Error");
            console.log(request)
            console.log(status)
            console.log(error)
        }
    });
}

function delete_sale(id){
    $.ajax({
        type: "POST",
        url: "delete_sale",                
        dataType : "json",
        contentType: "application/json; charset=utf-8",
        data : JSON.stringify(id),
        success: function(result){
            let all_sales = result["sales"]
            sales = all_sales
            display_sales_list(sales)
            console.log(sales)
            $("#inputclient").val("")
            $("#inputreams").val("")
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
    $("#inputclient").autocomplete({
        source: clients
      });

    //when the page loads, display all the names
    display_sales_list(sales);  
    
    $("#submit").click(function(){
        $("#warning").empty();                
        let new_sales = get_sale();
        if (new_sales.reams){
            save_sale(new_sales);
        }
        else{
            $("#warning").append("<div>Warning:Reams not number!!</div>");
            $("#inputreams").select();
        }

        if(!hasClient){
            $("#warning").append("<div>Warning:Client empty!!</div>");
            $("#inputclient").select();
        }

        

    });

    $("#inputreams").keypress(function(e){     
        if(e.which == 13) {
            $("#warning").empty();                
            let new_sales = get_sale();
            if (new_sales.reams){
                save_sale(new_sales);
            }
            else{
                $("#warning").append("<div>Warning:Reams not number!!</div>");
                $("#inputreams").select();
            }

            if(!hasClient){
                $("#warning").append("<div>Warning:Client empty!!</div>");
                $("#inputclient").select();
            }
        }   
    })
    
    $("#inputclient").keypress(function(e){     
        if(e.which == 13) {
            $("#warning").empty();                
            let new_sales = get_sale();
            if (new_sales.reams){
                save_sale(new_sales);
            }
            else{
                $("#warning").append("<div>Warning:Reams not number!!</div>");
                $("#inputreams").select();
            }

            if(!hasClient){
                $("#warning").append("<div>Warning:Client empty!!</div>");
                $("#inputclient").select();
            }
        }   
    })
    

    $(document.body).on("click", ".delete", function(){
		let deleteid = $(this).data("id");
		delete_sale(deleteid);
	});


})