const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const axios = require('axios');


const app = express();
const port = 5000;


app.use(cors());
app.use(bodyParser.json());
app.set("view engine","ejs");
app.use(express.static("public"));
app.get("/",(req,res)=>{
    res.render("index",{hello:"hello"});
})

app.post('/api/chat', async (req, res) => {
  const userMessage = req.body.message;
  console.log(userMessage);
  try {
    const response = await axios.post(
      'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent',
      {
        contents: [
          { role: 'user', parts: [{ text: userMessage }] }
        ]
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'x-goog-api-key': 'AIzaSyBx_erx8IfiDpzBzKInmoRW_Xu1BWng7Iw' // your API key here
        }
      }
    );
    

    const botReply = response.data.candidates[0].content.parts[0].text;
    res.json({ reply: botReply });
  } catch (error) {
    console.error("Full error object:", error.toJSON?.() || error);
    console.error('Gemini API error:', error.response?.data || error.message);
    res.status(500).json({ error: 'Failed to get response from Gemini API' });
  }
  
});
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
app.listen(3000,function(){
    console.log("okkh Done")});
