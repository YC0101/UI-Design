from flask import Flask
from flask import render_template
from flask import Response, request, jsonify
app = Flask(__name__)


searchkey =[]

current_id = 10
popular = ["1","2","3"]


data = {
    "1": {
        "id": "1",
        "title": "Something is wrong with us, 私たちはどうかしている",
        "image": "https://i.mydramalist.com/W724X_4c.jpg?v=1",
        "summary": "It is originally a Japanese manga serires written and illustrated by Natsumi Ando, which is a romantic story between two Japanese traditional Patissier. ",
        "director": ["Naoko Komuro"],
        "episodes": "16",
        "stars": ["Yokohama Ryusei", "Hamabe Minami"],
        "score": "9.4",
        "genres": ["Comedy", "romantic", "Japanese", "manga", "Okashi","traditional","culture"]
    },
    "2": {
        "id": "2",
        "title": "Shitsuren Chocolatier, 失恋ショコラティエ",
        "image": "https://upload.wikimedia.org/wikipedia/zh/thumb/c/cf/Chocolatier.jpg/300px-Chocolatier.jpg",
        "summary": "Sōta Koyurugi is the son of a baker who owns a cake shop. While a high school student, he fell in love with Saeko Takahashi, the most popular and beautiful girl in school and one year his senior. Saeko only dates handsome men with power, position, and popularity in their school; therefore Sōta, being rather quiet and pale, chased after her from afar like a butterfly. ",
        "director": ["Hiroaki Matsuyama"],
        "episodes": "11",
        "stars": ["Jun Matsumoto", "Satomi Ishihara"],
        "score": "8.5",
        "genres": ["Comedy", "romantic", "Japanese", "manga", "Chocolate"]
    },
    "3": {
        "id": "3",
        "title": "Your Turn to Kill, あなたの番です",
        "image": "https://asianwiki.com/images/e/ee/Your_Turn_to_Kill-P1.jpg",
        "summary": "Nana (Tomoyo Harada) and Shota (Kei Tanaka) are a newlywed couple and Nana is 15 years older than Shota. Nana works as a designer and Shota works as a gym trainer. They both enjoy mystery. The newlywed couple then move to an apartment. Nana attends a resident's meeting there. Nana and Shota become involved in murder cases that take place at the apartment. Residents get murdered one by one. Some residents have a motive, but those suspects have an alibi. Because of this, an arrest has yet to be made.",
        "director": ["Noriyoshi Sakuma"],
        "episodes": "20",
        "stars": ["Tomoyo Harada", "Kei Tanaka"],
        "score": "8.8",
        "genres": ["romantic", "Japanese", "suspense", "murder","crime"]
    },
    "4": {
        "id": "4",
        "title": "Dearest, 最爱",
        "image": "https://asianwiki.com/images/9/92/Deepest_Affection-tp01.jpeg",
        "summary": "In 2006, Sanada Rio (Yoshitaka Yuriko) becomes entangled in a crime. Fifteen years later, she is the president of a successful drug development company when she is involved in a murder case.",
        "director": ["Ayuko Tsukahara"],
        "episodes": "10",
        "stars": ["Yuriko Yoshitaka", "Kouhei Matsushita"],
        "score": "7.8",
        "genres": ["romantic", "Japanese", "suspense", "murder","crime"]
    },
    "5": {
        "id": "5",
        "title": "UNNATURAL, アンナチュラル",
        "image": "https://asianwiki.com/images/8/8d/Unnatural-p01.jpg",
        "summary": "Mikoto Misumi (Satomi Ishihara) is a pathologist at UDI (Unnatural Death Investigation) Lab. She can't stand neglecting unnatural deaths and believes there must be a truth behind the deaths. Team members that work with her are autopsy doctor Kai Nakado (Arata Iura), recorder Rokuro Kube (Masataka Kubota), clinical test technologist Yuko Shoji (Mikako Ichikawa) and UDI director Yasuo Kamikura (Yutaka Matsushige).",
        "director": ["Ayuko Tsukahara"],
        "episodes": "10",
        "stars": ["Yuriko Yoshitaka", "Kouhei Matsushita"],
        "score": "9.8",
        "genres": ["love", "Japanese", "suspense", "murder","crime"]
    },
    "6": {
        "id": "6",
        "title": "Born to be a Flower, 高嶺の花",
        "image": "https://asianwiki.com/images/2/2f/Born_to_be_a_Flower-NTV-p1.jpg",
        "summary": "Momo Tsukishima (Satomi Ishihara) is a daughter from a prestigious family involved with ikebana (art of flower arrangement). She has a perfect life with a beautiful appearance, excellent career in flower arrangement and her prominent family. She also has a fiancé that she loves deeply, but she discovers that her fiancé has been unfaithful to her. Momo Tsukishima decides to end their engagement and she begins to lose confidence. Naohito Kazama (Kazunobu Mineta) appears in front of her. Naohito Kazama is an ordinary bicycle shop owner. Their backgrounds are completely different, but they fall in love.",
        "director": ["Kyoji Otsuka"],
        "episodes": "10",
        "stars": ["Satomi Ishihara", "Kazunobu Mineta"],
        "score": "8.8",
        "genres": ["love", "Japanese","culture"]
    },
    "7": {
        "id": "7",
        "title": "Galileo 1, アンナチュラル 1",
        "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRE3yIRjAA5HKlpBtQqHZCfpUAs-HOfnfCgug&usqp=CAU",
        "summary": "Kaoru Utsumi, a rookie detective who has just been reassigned to the criminal division, finds the investigation of her first murder case stalled by seemingly-supernatural phenomena surrounding the event. She seeks help from Shunpei Kusanagi, a senior detective at the police headquarter famous as a 'Mystery Hunter'. Kusanagi, however, reveals to Utsumi that he was only able to solve the cases thanks to his college friend, Teito University professor Manabu Yukawa.",
        "director": ["Hiroshi Nishitani"],
        "episodes": "10",
        "stars": ["Masaharu Fukuyama", "Ko Shibasaki"],
        "score": "9.3",
        "genres": ["Japanese", "suspense", "murder","crime"]
    },
    "8": {
        "id": "8",
        "title": "Galileo 2, アンナチュラル 2",
        "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRE3yIRjAA5HKlpBtQqHZCfpUAs-HOfnfCgug&usqp=CAU",
        "summary": "Kaoru Utsumi, a rookie detective who has just been reassigned to the criminal division, finds the investigation of her first murder case stalled by seemingly-supernatural phenomena surrounding the event. She seeks help from Shunpei Kusanagi, a senior detective at the police headquarter famous as a 'Mystery Hunter'. Kusanagi, however, reveals to Utsumi that he was only able to solve the cases thanks to his college friend, Teito University professor Manabu Yukawa.",
        "director": ["Hiroshi Nishitani"],
        "episodes": "10",
        "stars": ["Masaharu Fukuyama", "Yuriko Yoshitaka"],
        "score": "9.3",
        "genres": ["Japanese", "suspense", "murder","crime"]
    },
    "9": {
        "id": "9",
        "title": "Suspect X, 容疑者Ｘの献身",
        "image": "https://asianwiki.com/images/d/d1/Suspect_X-jpdvd.jpg",
        "summary": "Kaoru Utsumi, a rookie detective who has just been reassigned to the criminal division, finds the investigation of her first murder case stalled by seemingly-supernatural phenomena surrounding the event. She seeks help from Shunpei Kusanagi, a senior detective at the police headquarter famous as a 'Mystery Hunter'. Kusanagi, however, reveals to Utsumi that he was only able to solve the cases thanks to his college friend, Teito University professor Manabu Yukawa.",
        "director": ["Hiroshi Nishitani"],
        "episodes": "1",
        "stars": ["Masaharu Fukuyama", "Kou Shibasaki"],
        "score": "9.4",
        "genres": ["Japanese", "suspense", "murder","crime"]
    },
    "10": {
        "id": "10",
        "title": "Midsummer Formula, 真夏の方程式",
        "image": "https://asianwiki.com/images/f/fc/Midsummer_Formula-p1.jpg",
        "summary": "Manabu Yukawa (Masaharu Fukuyama) is invited for a presentation on Submarine Mineral Resources Development in Harigaura. He stays at an inn. Manabu meets Kyohei who came to the inn, which is run by his aunt's family, for summer vacation. The next morning, Tsukahara, who is another guest at the inn, is found dead on the bank of a port. Manabu becomes involved in the case.",
        "director": ["Hiroshi Nishitani"],
        "episodes": "1",
        "stars": ["Masaharu Fukuyama", "Yuriko Yoshitaka"],
        "score": "9.1",
        "genres": ["Japanese", "suspense", "murder","crime"]
    }
}

# ROUTE
@app.route('/')
def welcome():
   return render_template('welcome.html',data = data, popular=popular)   


@app.route('/view/<key_show>')
def detail(key_show=0):
    return render_template('details.html', data = data, key = str(key_show)) 

@app.route('/edit/<key_edit>')
def edit(key_edit=0):
    return render_template('edit.html', data = data, key = key_edit)

@app.route('/search_results/<search_input>')
def search(search_input=None):
    return render_template('search_results.html', data = data, search_input = search_input,searchkey = searchkey) 

# AJAX FUNCTIONS
# ajax for search.js
@app.route('/search_show', methods=['GET', 'POST'])
def search_show():
    global searchkey 
    global data
    searchkey=[]

    searchinput = request.get_json()      
    for key in data:
        if searchinput.lower() in data[key]["title"].lower():
            searchkey.append(str(key))  

    for key in data:
        for name in data[key]["stars"]:
            if searchinput.lower() in name.lower():
                searchkey.append(str(key))

    for key in data:
        for tag in data[key]["genres"]:
            if searchinput.lower() in tag.lower():
                searchkey.append(str(key))              

    return jsonify(data = data,searchkey = searchkey)
 

@app.route('/add')
def add():
    return render_template('add_data.html', current_id = current_id) 

# AJAX FUNCTIONS
# ajax for add.js
@app.route('/save_show', methods=['GET', 'POST'])
def save_show():
    global data 
    global current_id 

    json_data = request.get_json()   
    title = json_data["title"]
    image = json_data["image"] 
    summary = json_data["summary"] 
    director = json_data["director"]
    episodes = json_data["episodes"] 
    stars = json_data["stars"]
    score = json_data["score"]
    genres = json_data["genres"]

    # add new entry to array with 
    # a new id and the name the user sent in JSON
    current_id += 1
    new_id = current_id 
    new_show_entry = {
        "id":  new_id,
        "title": title,
        "image": image,
        "summary": summary,
        "director": director,
        "episodes": episodes,
        "stars": stars,
        "score": score,
        "genres": genres
    }
    data[str(new_id)]=new_show_entry

    #send back the WHOLE array of data, so the client can redisplay it
    return jsonify(current_id = current_id)


# AJAX FUNCTIONS
# ajax for edit.js
@app.route('/save_edit', methods=['GET', 'POST'])
def save_edit():
    global data  

    json_data = request.get_json()
    editkey = json_data["key"]  
    title = json_data["title"]
    image = json_data["image"] 
    summary = json_data["summary"] 
    director = json_data["director"]
    episodes = json_data["episodes"] 
    stars = json_data["stars"]
    score = json_data["score"]
    genres = json_data["genres"]

    # add new entry to array with 
    # a new id and the name the user sent in JSON

    new_show_entry = {
        "id":  editkey,
        "title": title,
        "image": image,
        "summary": summary,
        "director": director,
        "episodes": episodes,
        "stars": stars,
        "score": score,
        "genres": genres
    }
    data[str(editkey)]=new_show_entry

    #send back the WHOLE array of data, so the client can redisplay it
    return jsonify(data = data,key=editkey)


if __name__ == '__main__':
   app.run(debug = True)




