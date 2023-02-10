from flask import Flask
from flask import render_template
from flask import Response, request, jsonify
app = Flask(__name__)


current_id = 4

sales = [
 {
 "id": 1,
 "salesperson": "James D. Halpert",
 "client": "Shake Shack",
 "reams": 1000
 },
 {
 "id": 2,
 "salesperson": "Stanley Hudson",
 "client": "Toast",
 "reams": 4000
 },
 {
 "id": 3,
 "salesperson": "Michael G. Scott",
 "client": "Computer Science Department",
 "reams": 10000
 },
]

clients = [
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
]

data = [
    {
        "id": 1,
        "name": "michael scott"
    },
    {
        "id": 2,
        "name": "jim halpert"
    },
]

# ROUTE
@app.route('/')
def welcome():
   return render_template('welcome.html')   


@app.route('/infinity')
def infinity():
    return render_template('log_sales.html', clients=clients, sales=sales) 


# AJAX FUNCTIONS
# ajax for log_sales.js
@app.route('/save_sale', methods=['GET', 'POST'])
def save_sale():
    global sales 
    global current_id 

    json_data = request.get_json()   
    salesperson = json_data["salesperson"] 
    client = json_data["client"] 
    reams = json_data["reams"] 
    
    # add new entry to array with 
    # a new id and the name the user sent in JSON
    current_id += 1
    new_id = current_id 
    new_sale_entry = {
        "id":  new_id,
        "salesperson": salesperson,
        "client": client,
        "reams":reams
    }
    sales.append(new_sale_entry)

    if client not in clients: clients.append(client);   

    #send back the WHOLE array of data, so the client can redisplay it
    return jsonify(sales = sales, clients = clients)
 
# ajax for log_sales.js
@app.route('/delete_sale', methods=['GET', 'POST'])
def delete_sale():
    global sales 
    global current_id 

    json_id = request.get_json()   
    
    # add new entry to array with 
    # a new id and the name the user sent in JSON
    current_id -= 1
    index = 0;

    for i in range(len(sales)):
        if sales[i]["id"] == json_id:
            index = i
            break

    del sales[index];  

    #send back the WHOLE array of data, so the client can redisplay it
    return jsonify(sales = sales)
 



if __name__ == '__main__':
   app.run(debug = True)




