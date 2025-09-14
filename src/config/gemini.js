import { GoogleGenAI } from '@google/genai';

const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

const ai = new GoogleGenAI({ apiKey });

export async function runGemini(prompt) {
    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.0-flash-001',
            contents: [
                {
                    role: 'user',
                    parts: [{ text: prompt }],
                },
            ],
        });

        let responseText = response.candidates[0].content.parts[0].text;

        // Replace **text** with <strong>text</strong> for bold
        responseText = responseText.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');

        // Remove remaining *
        responseText = responseText.replace(/\*/g, '');

        return responseText;
    } catch (error) {
        console.error('Error generating content:', error);
        return null;
    }
}
