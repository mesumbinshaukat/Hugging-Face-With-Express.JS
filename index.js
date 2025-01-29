require('dotenv').config();
const express = require('express');
const { PythonShell } = require('python-shell');

const app = express();
const port = 3000;

app.use(express.json());

app.post('/prompt', async (req, res) => {
    console.log(req.body);
  const prompt = req.body.prompt;
  const modelName = req.body.model || 'gpt2'; // default model
  if (!prompt) {
    console.log("No prompt provided");
    return res.status(400).send({ error: "Please provide a prompt." });
  }
  console.log("Prompt:", prompt);

  const options = {
    mode: 'text',
    pythonOptions: ['-u'],
    args: [prompt, modelName],
  };

  console.log("Running Python script...");

  PythonShell.run('generate.py', options, (err, results) => {
    console.log("Python script finished running");
    if (err) {
        console.error("Error generating text:", err);
        return res.status(500).send({ error: "Failed to generate text." });
    }
    
    console.log("Python script output:", results); // Debugging log

    if (!results || results.length === 0) {
        return res.status(500).send({ error: "No response from Python script." });
    }
    
    res.send({ response: results[0] });
});

});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});