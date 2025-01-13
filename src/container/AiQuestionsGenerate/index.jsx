import React, { useState } from "react";
import Sidebar from "../../components/custom/DashBoard/Sidebar";
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
    <div className="flex h-screen overflow-hidden bg-yellow-200 text-gray-800">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 p-6 pt-10 overflow-y-auto">
        <div className="max-w-3xl mx-auto bg-gray-100 rounded-lg shadow-lg p-6">
          <h1 className="text-3xl font-bold text-center text-gray-900 mb-6 uppercase">
            AI Question Generator
          </h1>
          <QuestionForm onGenerateQuestions={handleGenerateQuestions} loading={loading} />
          {error && <p className="text-red-600 mb-4">{error}</p>}
          <QuestionList questions={questions} />
        </div>
      </div>
    </div>
  );
}

export default AIQuestionGenerator;
