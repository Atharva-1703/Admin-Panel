// AIQuestionGenerator.jsx
import React, { useState } from "react";
import QuestionForm from "../../components/custom/AiQuestions/QuestionsForm";
import QuestionList from "../../components/custom/AiQuestions/QuestionsList";
import { generateQuestionsFromAPI } from "../../operations/AiQuestionsAPI/index";

function AIQuestionGenerator() {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleGenerateQuestions = async (formData) => {
    setError("");
    setLoading(true);
    setQuestions([]);
    try {
      const generatedQuestions = await generateQuestionsFromAPI(formData);
      setQuestions(generatedQuestions);
    } catch (err) {
      setError(err.message || "Failed to generate questions. Please try again.");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-yellow-200 text-gray-800 p-6">
      <div className="max-w-3xl w-full bg-gray-200 rounded-lg shadow-lg p-6">
        <h1 className="text-3xl font-bold text-center text-gray-900 mb-6">AI Question Generator</h1>
        <QuestionForm onGenerateQuestions={handleGenerateQuestions} loading={loading} />
        {error && <p className="text-red-600 mb-4">{error}</p>}
        <QuestionList questions={questions} />
      </div>
    </div>
  );
}

export default AIQuestionGenerator;
