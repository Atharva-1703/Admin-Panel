import React, { useEffect, useState } from "react";
import response from '../../sample.json';
import ShowQuestions from "./ShowQuestions";
import Sidebar from "../../components/custom/DashBoard/Sidebar";

function ViewTopics() {
  const [videoId, setVideoId] = useState("");
  const [type, setType] = useState("");
  const [topic, setTopic] = useState("");
  const [questions, setQuestions] = useState([]);
  const [showQuestions, setShowQuestions] = useState(false);

  const handleVideoIdChange = (e) => setVideoId(e.target.value);
  const handleTypeChange = (e) => setType(e.target.value);

  const handleSearch = () => {
    if (!videoId.trim() || !type) {
      alert("Please enter Video ID and select a Question Type.");
      return;
    }

    const { data } = response;
    setTopic(data.topic);
    setQuestions(data.questions);
  };

  const handleSaveQuestions = (updatedQuestions) => {
    setQuestions(updatedQuestions);
    setShowQuestions(true);
  };

  useEffect(() => {
    console.log(questions);
  }, [questions]);

  const toggleAccordion = () => {
    setShowQuestions(!showQuestions);
  };

  return (
    <div className="flex h-screen overflow-hidden  bg-yellow-200">
      {/* Sidebar Section */}
      <Sidebar />
      
      {/* Content Section */}
      <div className=" flex-1  justify-center  p-8 overflow-y-auto">
        <div className="bg-white mx-auto shadow-md rounded-lg w-full  max-w-4xl p-8 h-auto">
          <h1 className="text-2xl font-semibold text-pink-600 mb-6">
            View and Edit Questions
          </h1>

          <div className="mb-6 grid grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Video ID
              </label>
              <input
                type="text"
                value={videoId}
                onChange={handleVideoIdChange}
                className="w-full p-2 border rounded"
                placeholder="Enter Video ID"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-2">Type</label>
              <select
                value={type}
                onChange={handleTypeChange}
                className="w-full p-2 border rounded"
              >
                <option value="">Select Question Type</option>
                <option value="mcqs">MCQs</option>
                <option value="trueFalse">True/False</option>
                <option value="fillInTheBlanks">Fill in the Blanks</option>
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
            {topic && (
              <div>
                <h2
                  onClick={toggleAccordion}
                  className="text-xl font-semibold cursor-pointer mb-4"
                >
                  {topic} {showQuestions ? "▲" : "▼"}
                </h2>

                {showQuestions && questions.length > 0 ? (
                  <ShowQuestions
                    questions={questions}
                    onSave={handleSaveQuestions}
                  />
                ) : (
                  showQuestions && <p>No questions available for this topic.</p>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ViewTopics;
