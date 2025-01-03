import React, { useState } from "react";
import GenerateButton from "../../Base/GenerateButton/GenerateQuestions";

function QuestionForm({ onGenerateQuestions, loading }) {
  const [topic, setTopic] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [questionType, setQuestionType] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!topic.trim() || !categoryId.trim() || !questionType.trim()) {
      alert("Please provide topic, category ID, and question type.");
      return;
    }
    onGenerateQuestions({ topic, categoryId, questionType });
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6 bg-gray-200 p-4 rounded-lg shadow">
      <div className="mb-4">
        <label className="block text-gray-700 font-semibold mb-2">Topic</label>
        <input
          type="text"
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          placeholder="Enter a topic (e.g., Python Programming)"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 font-semibold mb-2">Video URL</label>
        <input
          type="text"
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
          value={categoryId}
          onChange={(e) => setCategoryId(e.target.value)}
          placeholder="Enter Video URL"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 font-semibold mb-2">
          Question Type
        </label>
        <select
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
          value={questionType}
          onChange={(e) => setQuestionType(e.target.value)}
        >
          <option value="">Select Question Type</option>
          <option value="MCQ">MCQ</option>
          <option value="True/False">True/False</option>
          <option value="Fill in the Blank">Fill in the Blank</option>
          <option value="Normal Questions">Normal Questions</option>
        </select>
      </div>
      <GenerateButton
        disabled={loading}
        className="w-full p-3 bg-yellow-500 text-gray-800 font-semibold rounded-lg shadow-md hover:bg-yellow-600 transition-all focus:ring-4 focus:ring-yellow-300"
      >
        {loading ? "Generating..." : "Generate Questions"}
      </GenerateButton>
    </form>
  );
}

export default QuestionForm;
