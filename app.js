const express = require("express")
const https = require("https")
const bodyParser = require("body-parser")
const app = express()
const path=require("path")

app.set("view engine","ejs")
app.set("views",path.join(__dirname,"views"))

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
  extended: false
}))

app.use(express.static(path.join(__dirname,"public")))

app.post("/", function(req, res) {
  const query = req.body.title
  const apikey = "AIzaSyDMLC8_loigs-wt1Tco4QkBu4iWRm5TKFo"
  const url = "https://www.googleapis.com/youtube/v3/search?part=snippet&key=" + apikey + "&type=video&q=" + query + "&maxResults=2"

  https.get(url, (resp) => {
    let data = '';
    console.log(resp.statusCode);

    // A chunk of data has been recieved.
    resp.on('data', (chunk) => {
      data += chunk;
    });

    resp.on('end', () => {
      const ytData = JSON.parse(data);
      console.log(ytData);

      ytData.items.forEach(item => {
        
           video = `
               <iframe width="420" height="315" src="http://www.youtube.com/embed/${item.id.videoId}" frameborder="0" allowfullscreen></iframe>
                  `
            $("#videos").append(video)

       })

      })

    })

  });

app.get("/", function(req, res) {
    res.render("index")
})

  app.listen(3000, function() {
  console.log("Server started on port 3000");
})