import React from "react";

function QuestionList({ questions }) {
  if (questions.length === 0) return null;

  const optionLabels = ["A", "B", "C", "D"];

  return (
    <div>
      <h2 className="text-2xl font-semibold text-yellow-600 mb-4">
        Generated Questions:
      </h2>
      <ul className="space-y-4">
        {questions.map((q, index) => (
          <li
            key={index}
            className="p-4 bg-gray-100 border border-gray-300 rounded-lg shadow"
          >
            <p className="text-lg font-bold mb-2 text-gray-800">{q.question}</p>
            {q.options && (
              <ul className="pl-6">
                {q.options.map((option, i) => (
                  <li
                    key={i}
                    className={`${
                      optionLabels[i] === q.correctOption
                        ? "text-yellow-600 font-bold"
                        : "text-gray-700"
                    }`}
                    style={{ listStyleType: "none" }} // Removes default dots
                  >
                    {option}
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default QuestionList;
