import React, { useEffect, useState } from "react";
import Sidebar from "../../components/custom/DashBoard/Sidebar";
import axios from "axios";
import ShowQuestions from "./ShowQuestions";

function ViewTopics() {
  // Single state object for videoId and questionType
  const [formData, setFormData] = useState({
    videoId: "",
    questionType: "",
  });
  
  const [topic, setTopic] = useState("");
  const [questions, setQuestions] = useState([]);
  const [showQuestions, setShowQuestions] = useState(false);

  // Handle changes for both videoId and questionType
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    const { videoId, questionType } = formData;

    if (!videoId.trim() || !questionType.trim()) {
      alert("Please enter Video ID and select a Question Type.");
      return;
    }
    console.log(formData);
    

    try {
      const response = await axios.post(
        "https://backend.gameyoutube.com/questions/custom",
        formData,
        {
          headers: {
            "x-api-key": import.meta.env.VITE_API_AUTH_SECRET,
          },
        }
      );
      // Process the response here if needed
      console.log(response);
      // For example, you could set the topic and questions based on the response
      // setTopic(response.data.topic);
      // setQuestions(response.data.questions);
    } catch (error) {
      console.log(error);
    }
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

          {/* Form for getting videoId and questionType */}
          <div className="mb-6 grid grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Video ID
              </label>
              <input
                type="text"
                name="videoId"
                value={formData.videoId}
                onChange={handleInputChange}
                className="w-full p-2 border rounded"
                placeholder="Enter Video ID"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-2">Type</label>
              <select
                name="questionType"
                value={formData.questionType}
                onChange={handleInputChange}
                className="w-full p-2 border rounded"
              >
                <option value="">Select Question Type</option>
                <option value="mcqs">MCQs</option>
                {/* Add more types as needed */}
              </select>
            </div>
          </div>

          <button
            onClick={handleSearch}
            className="bg-blue-500 text-white py-2 px-6 rounded hover:bg-blue-700"
          >
            Search Questions
          </button>

          {/* Display the topics received here */}
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
