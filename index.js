import express from 'express';

import dotenv from "dotenv";
import cors from "cors";
import OpenAI from "openai";

dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());

const client = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
})

app.post("/chat", async (req, res) => {
  try {
    const { message } = req.body;

    // const response = await client.chat.completions.create({
    //   model: "gpt-4o-mini",
    //   messages: [{ role: "user", content: message }],
    // });

    const response = await client.responses.create({
        model: "gpt-4o-mini",
        input: [
            { role: "user", content: message }
        ]
    });
    console.log(response);

    res.json({
      reply: response.output_text,
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Something went wrong!" });
  }
});

app.listen(process.env.PORT, (()=>{ console.log(`Server is runing on PORT ${process.env.PORT}`)}))