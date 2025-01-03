import React, { useEffect, useState } from "react";
import QuestionList from "../../components/custom/displayQuestions";

function AddQuizData() {
  const [isLocked, setIsLocked] = useState(false);
  const [isFirstQuestionAdded, setIsFirstQuestionAdded] = useState(false);
  const [quizData, setQuizData] = useState({
    videoId: "",
    type: "", // This will now be selected from a dropdown
    topic: "",
    questions: [],
  });

  const optionSizes = {
    mcqs: 4,
    trueFalse: 2,
    fillInTheBlanks: 4,
  };

  const [currentData, setCurrentData] = useState({
    question: "",
    options: ["", "", "", ""],
    correctOption: "", // Now this will hold the correct option (A, B, C, D)
  });

  const handleQuizChange = (e) => {
    const { name, value } = e.target;

    // Only change the options size if it's the first question 
    if (name === "type" && !isFirstQuestionAdded) {
      const newSize = optionSizes[value] || 4; // Default to 4 if type not found
      setCurrentData((prev) => ({
        ...prev,
        options: Array(newSize).fill(""),
      }));
    }

    setQuizData((prev) => ({ ...prev, [name]: value }));
  };

  const handleQuestionChange = (e) => {
    const { name, value } = e.target;
    setCurrentData((prev) => ({ ...prev, [name]: value }));
  };

  const handleOptionChange = (index, value) => {
    const updatedOptions = [...currentData.options];
    updatedOptions[index] = value;
    setCurrentData((prev) => ({ ...prev, options: updatedOptions }));
  };

  const handleAddQuestion = (e) => {
    e.preventDefault();

    const { videoId, type, topic } = quizData;
    const { question, options, correctOption } = currentData;

    // Validate all inputs
    if (!videoId.trim() || !type.trim() || !topic.trim()) {
      alert("Please provide a video ID, type, and topic!");
      return;
    }
    if (!question.trim()) {
      alert("Please provide a question!");
      return;
    }
    if (options.some((opt) => !opt.trim())) {
      alert("Please provide all options!");
      return;
    }
    if (!correctOption.trim()) {
      alert("Please provide the correct answer!");
      return;
    }

    // handle the locking of quiz info after first question is added
    if (!isFirstQuestionAdded) {
      setIsLocked(true);
      setIsFirstQuestionAdded(true);
    }

    // Add question to quizData
    setQuizData((prev) => ({
      ...prev,
      questions: [
        ...prev.questions,
        {
          question: currentData.question,
          options: currentData.options,
          correctOption,
        },
      ],
    }));

    // Reset currentData
    const newSize = optionSizes[quizData.type] || 4;
    setCurrentData((prev) => ({
      question: "",
      options: Array(newSize).fill(""), 
      correctOption: "",
    }));

    alert("Question added successfully!");
    console.log("Quiz Data:", quizData);
  };

  const handleSubmitQuiz = (e) => {
    e.preventDefault();

    // Validate quiz data before submitting
    if (quizData.questions.length === 0) {
      alert("Please add at least one question before submitting the quiz.");
      return;
    }

    // Submit quiz api call here
    console.log("Submitting quiz data:", quizData);
    alert("Quiz submitted successfully!");

    // reset the form after submission
    setQuizData({
      videoId: "",
      type: "",
      topic: "",
      questions: [],
    });
    setIsLocked(false);
    setIsFirstQuestionAdded(false);
  };

  return (
    <div className="flex w-full bg-yellow-200">
      <div className="w-1/2 p-5 mt-10">
        <h2 className="text-2xl font-bold mb-4">Add Quiz Data</h2>
        <form
          className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
        >
          {/* Video ID */}
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Video ID / URL
            </label>
            <input
              type="text"
              name="videoId"
              value={quizData.videoId}
              onChange={handleQuizChange}
              disabled={isLocked}
              className={`w-full p-2 border rounded ${isLocked ? "bg-gray-200" : ""}`}
              placeholder="Enter video ID or URL"
            />
          </div>

          {/* Topic */}
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Topic
            </label>
            <input
              type="text"
              name="topic"
              value={quizData.topic}
              onChange={handleQuizChange}
              disabled={isLocked}
              className={`w-full p-2 border rounded ${isLocked ? "bg-gray-200" : ""}`}
              placeholder="Enter topic (e.g., JavaScript)"
            />
          </div>

          {/* Type (Dropdown) */}
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Type
            </label>
            <select
              name="type"
              value={quizData.type}
              onChange={handleQuizChange}
              disabled={isLocked}
              className={`w-full p-2 border rounded ${isLocked ? "bg-gray-200" : ""}`}
            >
              <option value="">Select Type</option>
              <option value="mcqs">MCQs</option>
              <option value="trueFalse">True/False</option>
              <option value="fillInTheBlanks">Fill in the Blanks</option>
              {/* Add more types as needed */}
            </select>
          </div>

          {/* Question */}
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Question
            </label>
            <textarea
              name="question"
              value={currentData.question}
              onChange={handleQuestionChange}
              className="w-full p-2 border rounded"
              placeholder="Enter the question text"
            />
          </div>

          {/* Options */}
          {currentData.options.map((option, index) => (
            <div className="mb-4" key={index}>
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Option {index + 1}
              </label>
              <input
                type="text"
                value={option}
                onChange={(e) => handleOptionChange(index, e.target.value)}
                className="w-full p-2 border rounded"
                placeholder={`Enter option ${index + 1}`}
              />
            </div>
          ))}

          {/* Correct Option (Dropdown A, B, C, D) */}
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Correct Answer
            </label>
            <select
              name="correctOption"
              value={currentData.correctOption}
              onChange={handleQuestionChange}
              className="w-full p-2 border rounded"
            >
              <option value="">Select Correct Answer</option>
              {currentData.options.map((_, index) => {
                const optionLabel = String.fromCharCode(65 + index); // A, B, C, D...
                return (
                  <option key={index} value={optionLabel}>
                    {optionLabel}
                  </option>
                );
              })}
            </select>
          </div>

          
          <button
            onClick={handleAddQuestion}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 mr-2 mt-2"
          >
            Add Question
          </button>
          <button
              onClick={handleSubmitQuiz}
              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-700 mt-2"
            >
              Submit Quiz
            </button>
        </form>
      </div>
      <QuestionList questions={quizData.questions} videoId={quizData.videoId} topic={quizData.topic} type={quizData.type} />
    </div>
  );
}

export default AddQuizData;
