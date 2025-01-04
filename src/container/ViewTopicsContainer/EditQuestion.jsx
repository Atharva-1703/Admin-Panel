import React, { useState } from "react";

const EditMultipleQuestionsForm = ({ questions, onSave, onCancel }) => {
  const [editedQuestions, setEditedQuestions] = useState([...questions]);

  const handleQuestionChange = (index, value) => {
    const updatedQuestions = [...editedQuestions];
    updatedQuestions[index].question = value;
    setEditedQuestions(updatedQuestions);
  };

  const handleOptionChange = (qIndex, oIndex, value) => {
    const updatedQuestions = [...editedQuestions];
    updatedQuestions[qIndex].options[oIndex] = value;
    setEditedQuestions(updatedQuestions);
  };

  const handleCorrectOptionChange = (qIndex, oIndex) => {
    const updatedQuestions = [...editedQuestions];
    updatedQuestions[qIndex].correctOptionIndex = oIndex;
    setEditedQuestions(updatedQuestions);
  };

  const handleSave = () => {
    onSave(editedQuestions);
  };

  return (
    <div className="p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-semibold mb-6 text-blue-600">Edit Questions</h2>

      {editedQuestions.map((question, qIndex) => (
        <div key={qIndex} className="mb-6 border-b pb-4">
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Question {qIndex + 1}:</label>
            <input
              type="text"
              value={question.question}
              onChange={(e) => handleQuestionChange(qIndex, e.target.value)}
              className="w-full p-2 border rounded"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Options:</label>
            {question.options.map((option, oIndex) => (
              <div key={oIndex} className="flex items-center mb-2">
                <input
                  type="text"
                  value={option}
                  onChange={(e) =>
                    handleOptionChange(qIndex, oIndex, e.target.value)
                  }
                  className="w-full p-2 border rounded"
                />
                <input
                  type="radio"
                  name={`correctOption-${qIndex}`}
                  checked={question.correctOptionsIndex === oIndex}
                  onChange={() => handleCorrectOptionChange(qIndex, oIndex)}
                  className="ml-4"
                />
                <span className="ml-2">Correct</span>
              </div>
            ))}
          </div>
        </div>
      ))}

      <div className="flex justify-end space-x-4 mt-6">
        <button
          onClick={onCancel}
          className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
        >
          Cancel
        </button>
        <button
          onClick={handleSave}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Save All
        </button>
      </div>
    </div>
  );
};

export default EditMultipleQuestionsForm;
