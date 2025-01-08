import React from "react";

function QuestionList({ questions, videoId, topic, type }) {
  return (
    <div className="w-1/2 p-5 ">
      <h3 className="text-2xl font-bold mb-6">Quiz Overview</h3>

      {/* Quiz Details Section */}
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-6">
        <h4 className="text-lg font-semibold mb-4">Quiz Information</h4>
        <p className="break-words"><strong>Video ID / URL:</strong> {videoId }</p>
        <p className="break-words"><strong>Topic:</strong> {topic }</p>
        <p className="break-words"><strong>Type:</strong> {formatType(type)}</p>
      </div>

      {/* Questions List Section */}
      <h4 className="text-xl font-semibold mb-4">Questions Added:</h4>
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8">
        {questions.length === 0 ? (
          <p className="text-gray-500">No questions added yet.</p>
        ) : (
          <ul className="max-h-80 overflow-y-auto">
            {questions.map((q, i) => (
              <li key={i} className="mb-5 p-4 border-b last:border-b-0">
                <strong className="block break-words">{i + 1}. {q.question}</strong>
                <ul className="mt-2">
                  {q.options.map((opt, index) => (
                    <li key={index} className="ml-4">
                      {String.fromCharCode(65 + index)}. {opt}
                    </li>
                  ))}
                </ul>
                <p className="text-green-600 mt-2">
                  Correct Answer: {String.fromCharCode(65 + parseInt(q.correctOptionsIndex))}
                </p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

// Helper function to format type
function formatType(type) {
  const types = {
    mcqs: "Multiple Choice Questions",
    // trueFalse: "True/False",
    // fibs: "Fill in the Blanks",
  };
  return types[type] || type;
}

export default QuestionList;
