import axios from "axios";

export const generateQuestionsFromAPI = async ({ query, categoryId, questionType }) => {
  const apiUrl = `https://backend.gameyoutube.com/questions/generate`;

  // Generate the prompt based on categoryId, query, and questionType
  const prompt = `
    Generate ${questionType} questions based on the query "${query}" in the category with ID "${categoryId}".
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
      videoId: "any",
      query,
      questionType,
    });

    // Validate and parse the response
    if (!response.data || !Array.isArray(response.data)) {
      throw new Error("Invalid format in the generated response.");
    }

    return response.data;
  } catch (error) {
    console.error("Error generating questions:", error.message);
    throw new Error("Failed to generate questions. Please try again.");
  }
};
