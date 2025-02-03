import { Request, Response } from "express";
import axios from "axios";

export const getAICompletion = async (req: Request, res: Response) => {
  try {
    const { code } = req.body;
    const response = await axios.post(
      "https://api.openai.com/v1/completions",
      {
        model: "code-davinci-002",
        prompt: `Optimize this code:\n${code}`,
        max_tokens: 100
      },
      {
        headers: { Authorization: `Bearer ${process.env.GEMINI_API_KEY}` }
      }
    );
    res.json({ suggestion: response.data.choices[0].text });
  } catch (error) {
    res.status(500).json({ error: "AI Error" });
  }
};
