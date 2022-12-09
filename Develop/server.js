const express = require("express");
const path = require("path");
const fs = require("fs");
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
app.post("/api/notes", (req, res) => {
  // Destructuring assignment for the items in req.body
  const { title, noteText } = req.body;

  // If all the required properties are present
  if (title && review) {
    // Variable for the object we will save
    const newNotes = {
      title,
      noteText,
      note_id: uuid(),
    };
 
    // Obtain existing reviews
    fs.readFile("./db/db.json", "utf8", (err, data) => {
      if (err) {
        console.error(err);
      } else {
        // Convert string into JSON object
        const parsedNotes = JSON.parse(data);

        // Add a new Note
        parsedNotes.push(newNotes);

        // Write updated notes back to the file
        fs.writeFile(
          "./db/db.json",
          JSON.stringify(parsedNotes, null, 4),
          (writeErr) =>
            writeErr
        );
      }
    });


  } 
});


//   // Destructuring assignment for the items in req.body
//   const { product, review, username } = req.body;

//   // If all the required properties are present
//   if (product && review && username) {
//     // Variable for the object we will save
//     const newReview = {
//       product,
//       review,
//       username,
//       upvotes: Math.floor(Math.random() * 100),
//       review_id: uuid(),
//     };

//     // Convert the data to a string so we can save it
//     const reviewString = JSON.stringify(newReview);

//     // Write the string to a file
//     fs.writeFile(`./db/${newReview.product}.json`, reviewString, (err) =>
//       err
//         ? console.error(err)
//         : console.log(
//             `Review for ${newReview.product} has been written to JSON file`
//           )
//     );

//     const response = {
//       status: 'success',
//       body: newReview,
//     };

//     console.log(response);
//     res.status(201).json(response);
//   } else {
//     res.status(500).json('Error in posting review');
//   }
// });

app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} 🚀`)
);
