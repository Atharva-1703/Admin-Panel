import axios from "axios";

export const generateQuestionsFromAPI = async ({ topic, categoryId, questionType }) => {
  const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=AIzaSyBU-_LBFtHtx59rb_N7Uaj2ZVvApxyBlrQ`;

  // Generate the prompt based on topic, categoryId, and questionType
  const prompt = `
    Generate ${questionType} questions about "${topic}" in the category with ID "${categoryId}".
    Each question should have:
    - One question text
    - Four options labeled as A, B, C, D
    - The correct option explicitly mentioned at the end (e.g., "Correct Option: B").
    Provide the output in JSON format like this:
    [
      {
        "question": "What is 2 + 2?",
        "options": ["A. 3", "B. 4", "C. 5", "D. 6"],
        "correctOption": "B"
      }
    ].
  `;

  try {
    // Send a POST request to the API
    const response = await axios.post(apiUrl, {
      contents: [
        {
          parts: [
            {
              text: prompt,
            },
          ],
        },
      ],
    });

    // Extract the response data
    const candidates = response.data?.candidates || [];
    if (candidates.length === 0 || !candidates[0]?.content?.parts?.[0]?.text) {
      throw new Error("No valid content found in the response.");
    }

    // Parse the raw text into JSON format
    const rawText = candidates[0].content.parts[0].text.trim();
    const jsonText = rawText.replace(/```json|```/g, "").trim();
    const parsedQuestions = JSON.parse(jsonText);

    // Validate the parsed response
    if (!Array.isArray(parsedQuestions) || parsedQuestions.some(q => !q.question || !q.options || !q.correctOption)) {
      throw new Error("Invalid format in the generated response.");
    }

    return parsedQuestions;
  } catch (error) {
    console.error("Error generating questions:", error.message);
    throw new Error("Failed to generate questions. Please try again.");
  }
};
