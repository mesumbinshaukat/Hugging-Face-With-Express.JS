require('dotenv').config();
const express = require('express');
const { PythonShell } = require('python-shell');

const app = express();
const port = 3000;

app.use(express.json());

app.post('/prompt', async (req, res) => {
  const prompt = req.body.prompt;
  const modelName = req.body.model || 'gpt2'; // default model
  if (!prompt) {
    return res.status(400).send({ error: "Please provide a prompt." });
  }

  const options = {
    mode: 'text',
    pythonOptions: ['-u'],
    args: [prompt, modelName],
  };

  PythonShell.run('generate.py', options, (err, results) => {
    if (err) {
        console.error("Error generating text:", err);
      return res.status(500).send({ error: "Failed to generate text." });
    }
    res.send({ response: results[0] });
  });
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});