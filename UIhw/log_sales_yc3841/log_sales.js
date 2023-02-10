const username = "James D. Halpert";

let clients = [
    "Shake Shack",
    "Toast",
    "Computer Science Department",
    "Teacher's College",
    "Starbucks",
    "Subsconsious",
    "Flat Top",
    "Joe's Coffee",
    "Max Caffe",
    "Nussbaum & Wu",
    "Taco Bell",
];

var sales = [
	{
		"salesperson": "James D. Halpert",
		"client": "Shake Shack",
		"reams": 100
	},
	{
		"salesperson": "Stanley Hudson",
		"client": "Toast",
		"reams": 400
	},
	{
		"salesperson": "Michael G. Scott",
		"client": "Computer Science Department",
		"reams": 1000
	},
];

function createlist(sales){
    $("#updates").html("");
    $.each(sales,function(index, value){
		let salesname = value.salesperson;
		let clientname = value.client;
		let reamsnum = value.reams;

		let deletebut = $("<button class='delete'>X</button>");
		deletebut.data("rec", value);

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
    });
}



function addSales(){
	let clientname = $("#inputclient").val();
	let reamsnum = $("#inputreams").val();

	let new_sales = {
		"salesperson": username,
		"client": clientname,
		"reams": reamsnum
	};

	sales.push(new_sales);

	if(clients.indexOf(clientname) == -1){
		clients.push(clientname);
	}

}

$(document).ready(function(){
    $("#inputclient").autocomplete({
        source: clients
      });

	createlist(sales);

	$("#submit").click(function(){
		addSales();
		createlist(sales);
		$("#inputclient").val("");
		$("#inputreams").val("");
		$("#inputclient").focus();
	});

	$(document.body).on("click", ".delete", function(){
		let record = $(this).data("rec");
		let idx = sales.indexOf(record);
		sales.splice(idx,1);
		createlist(sales);

	});


})