const express = require("express");
const path = require("path");
const fs = require("fs");
// added to create unique id
const { v4: uuidv4 } = require("uuid");
// get data from db
const notesData = require("./db/db.json");

const PORT = 3001;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static("public"));

app.get("/", (req, res) =>
  res.sendFile(path.join(__dirname, "/public/index.html"))
);

app.get("/notes", (req, res) =>
  res.sendFile(path.join(__dirname, "/public/notes.html"))
);

// GET request to pull in data for cards displayed on left hand side.
app.get("/api/notes", (req, res) => res.json(notesData));

//POST new note
//http://localhost:3001/api/notes
app.post("/api/notes", (req, res) => {
  //console.log(req.body);
  // create newNotes OBJ adding in uuid4
  const newNotes = {
    title: req.body.title,
    text: req.body.text,
    id: uuidv4(),
  };

  notesData.push(newNotes);
  //console.log(notesData);
  //This writes the file to the database, and stringfy
  fs.writeFile("./db/db.json", JSON.stringify(notesData), (err) => {
    // if statement that will return err, or...
    if (err) throw err;
    //return notesData to the front end
    return res.json(notesData);
  });
});

//for delele functionality
// req.params.id
// look up javascript filter

app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} 🚀`)
);
