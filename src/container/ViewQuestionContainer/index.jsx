import React, { useState } from "react";
import response from  '../../sample.json';
import ShowQuestions from "./ShowQuestions";

function ViewQuestions() {
  const [videoId, setVideoId] = useState("");
  const [type, setType] = useState("");
  const [topic,setTopic]=useState("");

  const handleVideoIdChange = (e) => setVideoId(e.target.value);
  const handleTypeChange = (e) => setType(e.target.value);  // Updated for type

  const handleSearch = async () => {
    // if (!videoId.trim() || !type) {  // Check for selectedType instead of selectedTopic
    //   alert("Please enter video ID and select a question type.");
    //   return;
    // }
    
    // ? Api Call here
    const {data}=response;
    console.log(data.topic);
    
    setTopic(data.topic);

    // Simulated API fetch
   
    
  };


  return (
    <div className="min-h-screen flex items-center justify-center bg-yellow-200">
      <div className="bg-white shadow-md rounded-lg p-8 w-full max-w-4xl">
        <h1 className="text-2xl font-semibold text-pink-600 mb-6">
          View Question Topics by Video ID
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
          {topic ? (
            <div>
              <h2 className="text-xl font-semibold mb-4">Topics</h2>
              <h3 onClick={ShowQuestions({questions})}>
                {topic}
              </h3>
            </div>
          ) : (
            <p>No topics found for this Video ID and type.</p>
          )}
        </div>

      
      </div>
    </div>
  );
}

export default ViewQuestions;
