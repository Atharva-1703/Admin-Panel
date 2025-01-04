import React, { useState } from "react";

const ShowQuestions = ({ questions, onSave }) => {
  const [editingIndex, setEditingIndex] = useState(null);
  const [editedQuestions, setEditedQuestions] = useState([...questions]);

  const handleEditClick = (index) => {
    setEditingIndex(index);
  };

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
    updatedQuestions[qIndex].correctOptionsIndex = oIndex;  // Corrected to 'correctOptionsIndex'
    setEditedQuestions(updatedQuestions);
  };

  const handleSave = () => {
    onSave(editedQuestions);
    setEditingIndex(null);
  };

  const handleCancel = () => {
    setEditedQuestions([...questions]);
    setEditingIndex(null);
  };

  return (
    <div className="p-6 bg-white shadow-lg rounded-lg ">
      <h2 className="text-2xl font-semibold mb-6 text-blue-600">Questions</h2>
      <ul className="max-h-80 overflow-y-auto">
        {editedQuestions.map((question, qIndex) => (
          <li key={qIndex} className="mb-6 p-4 border rounded-lg">
            {editingIndex === qIndex ? (
              <div>
                <input
                  type="text"
                  value={question.question}
                  onChange={(e) =>
                    handleQuestionChange(qIndex, e.target.value)
                  }
                  className="w-full p-2 border rounded mb-4"
                />

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
                      checked={question.correctOptionsIndex === oIndex}  // Corrected to 'correctOptionsIndex'
                      onChange={() =>
                        handleCorrectOptionChange(qIndex, oIndex)
                      }
                      className="ml-4"
                    />
                    <span className="ml-2">Correct</span>
                  </div>
                ))}

                <div className="flex justify-end space-x-4 mt-4">
                  <button
                    onClick={handleCancel}
                    className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSave}
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
                  >
                    Save
                  </button>
                </div>
              </div>
            ) : (
              <div>
                <h3 className="text-lg font-semibold">{question.question}</h3>
                <ul>
                  {question.options.map((option, oIndex) => (
                    <li key={oIndex} className="ml-4">
                      {option}{" "}
                      {oIndex === question.correctOptionsIndex && (  // Corrected to 'correctOptionsIndex'
                        <span className="text-green-500">(Correct)</span>
                      )}
                    </li>
                  ))}
                </ul>

                <button
                  onClick={() => handleEditClick(qIndex)}
                  className="mt-4 bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600"
                >
                  Edit
                </button>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ShowQuestions;
