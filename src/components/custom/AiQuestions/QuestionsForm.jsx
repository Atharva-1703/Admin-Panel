import React, { useState } from "react";
import GenerateButton from "../../Base/GenerateButton/GenerateQuestions";

function QuestionForm({ onGenerateQuestions, loading }) {
  const [videoUrl, setVideoUrl] = useState("");
  const [questionType, setQuestionType] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!videoUrl.trim() || !questionType.trim()) {
      alert("Please provide a Video URL and select a Question Type.");
      return;
    }
    onGenerateQuestions({ videoUrl, questionType });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mb-6 bg-gray-50 p-4 rounded-lg shadow-lg shadow-gray-700"
    >
      {/* Video URL Field */}
      <div className="mb-4">
        <label
          htmlFor="videoUrl"
          className="block text-gray-700 font-semibold mb-2"
        >
          Video URL
        </label>
        <input
          type="text"
          id="videoUrl"
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
          value={videoUrl}
          onChange={(e) => setVideoUrl(e.target.value)}
          placeholder="Enter Video URL"
        />
      </div>

      {/* Question Type Dropdown */}
      <div className="mb-4">
        <label
          htmlFor="questionType"
          className="block text-gray-700 font-semibold mb-2"
        >
          Question Type
        </label>
        <select
          id="questionType"
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

      {/* Generate Button */}
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
