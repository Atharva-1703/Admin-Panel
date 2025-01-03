import React, { useState } from "react";


function ViewQuestions() {
  const [videoId, setVideoId] = useState("");
  const [selectedTopic, setSelectedTopic] = useState("");
  const [questions, setQuestions] = useState([]);
  const [topics, setTopics] = useState(["JavaScript", "React", "CSS"]);

  const handleVideoIdChange = (e) => setVideoId(e.target.value);
  const handleTopicChange = (e) => setSelectedTopic(e.target.value);

  const handleSearch = async () => {
    if (!videoId.trim() || !selectedTopic) {
      alert("Please enter video ID and select a topic.");
      return;
    }

    // Simulated API fetch
    const fetchedQuestions = [
      {
        id: 1,
        question: "What is React?",
        options: ["Library", "Framework", "Language", "None"],
        correctOption: "A",
      },
      {
        id: 2,
        question: "How do you declare a state in React?",
        options: ["useState", "useEffect", "useReducer", "setState"],
        correctOption: "A",
      },
    ];
    
    setQuestions(fetchedQuestions);
  };

  const handleQuestionEdit = (id, newQuestion) => {
    const updatedQuestions = questions.map((q) =>
      q.id === id ? { ...q, question: newQuestion } : q
    );
    setQuestions(updatedQuestions);
  };

  const handleSubmit = () => {
    alert("Questions updated successfully!");
    console.log("Updated Questions:", questions);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white shadow-md rounded-lg p-8 w-full max-w-4xl">
        <h1 className="text-2xl font-semibold text-pink-600 mb-6">
          Manage Questions by Video ID
        </h1>

        <div className="mb-6 grid grid-cols-2 gap-4">
          <div>
            <label className="block text-gray-700 font-medium mb-2">Video ID</label>
            <input
              type="text"
              value={videoId}
              onChange={handleVideoIdChange}
              className="w-full p-2 border rounded"
              placeholder="Enter Video ID"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-2">Topic</label>
            <select
              value={selectedTopic}
              onChange={handleTopicChange}
              className="w-full p-2 border rounded"
            >
              <option value="">Select Topic</option>
              {topics.map((topic, index) => (
                <option key={index} value={topic}>
                  {topic}
                </option>
              ))}
            </select>
          </div>
        </div>

        <button
          onClick={handleSearch}
          className="bg-blue-500 text-white py-2 px-6 rounded hover:bg-blue-700"
        >
          Search Questions
        </button>

        <div className="mt-8">
          {questions.length > 0 && (
            <>
              <h2 className="text-xl font-semibold mb-4">Questions</h2>
              {questions.map((q) => (
                <div key={q.id} className="mb-4 p-4 border rounded">
                  <input
                    type="text"
                    value={q.question}
                    onChange={(e) => handleQuestionEdit(q.id, e.target.value)}
                    className="w-full p-2 border rounded"
                  />
                  <p className="text-gray-500 text-sm mt-2">
                    Correct Option: {q.correctOption}
                  </p>
                </div>
              ))}

              <button
                onClick={handleSubmit}
                className="bg-green-500 text-white py-2 px-6 rounded hover:bg-green-700 mt-4"
              >
                Save Changes
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default ViewQuestions;
