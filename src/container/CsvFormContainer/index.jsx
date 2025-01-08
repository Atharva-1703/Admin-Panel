import React, { useState } from 'react';
import Sidebar from "../../components/custom/DashBoard/Sidebar";
import axios from 'axios';

const CsvUploader = () => {
    const [quizData, setQuizData] = useState({
        videoUrl: "",
        topic: "",
        questionType: "",
        file: null,
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setQuizData((prev) => ({ ...prev, [name]: value }));
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setQuizData((prev) => ({ ...prev, file }));
        } else {
            alert("No file selected.");
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { videoUrl, topic, questionType, file } = quizData;

        // Validation
        if (!videoUrl.trim() || !questionType.trim() || !topic.trim()) {
            alert("Please provide a video URL, question type, and topic!");
            return;
        }
        if (!file) {
            alert("Please upload a file.");
            return;
        }

        // Construct FormData
        const formData = new FormData();
        formData.append("videoUrl", videoUrl);
        formData.append("topic", topic);
        formData.append("questionType", questionType);
        formData.append("file", file);

        // Debug FormData
        for (let [key, value] of formData.entries()) {
            console.log(`${key}: ${value}`);
        }

        try {
            const response = await axios.post(
                "https://backend.gameyoutube.com/questions/bulk-upload",
                formData,
                {
                    headers: {
                        "x-api-key": import.meta.env.VITE_API_AUTH_SECRET,
                    },
                }
            );
            console.log("Upload successful:", response.data);
            alert("Quiz uploaded successfully!");
        } catch (error) {
            console.error("Error:", error.response ? error.response.data : error.message);
            alert("Failed to upload quiz.");
        }

        // Reset Form
        setQuizData({
            videoUrl: "",
            topic: "",
            questionType: "",
            file: null,
        });
    };

    return (
        <div className="flex h-screen overflow-hidden bg-yellow-200 text-gray-800">
            {/* Sidebar */}
            <Sidebar />
            
            {/* Form Section */}
            <div className="flex-1 h-screen p-8 justify-center bg-yellow-200">
                <div className="bg-white shadow-md rounded-lg p-8 mx-auto w-full max-w-2xl">
                    <h1 className="text-2xl font-semibold text-pink-600 mb-6">
                        Import Questions (CSV Upload)
                    </h1>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Video URL */}
                        <div>
                            <label className="block text-gray-700 font-medium mb-2">
                                Video URL
                            </label>
                            <input
                                type="text"
                                name="videoUrl"
                                value={quizData.videoUrl}
                                onChange={handleInputChange}
                                className="w-full p-2 border rounded"
                                placeholder="Enter Video URL"
                            />
                        </div>

                        {/* Topic */}
                        <div>
                            <label className="block text-gray-700 font-medium mb-2">
                                Topic
                            </label>
                            <input
                                type="text"
                                name="topic"
                                value={quizData.topic}
                                onChange={handleInputChange}
                                className="w-full p-2 border rounded"
                                placeholder="Enter Topic"
                            />
                        </div>

                        {/* Question Type */}
                        <div>
                            <label className="block text-gray-700 font-medium mb-2">
                                Question Type
                            </label>
                            <select
                                name="questionType"
                                value={quizData.questionType}
                                onChange={handleInputChange}
                                className="w-full p-2 border rounded"
                            >
                                <option value="">Select Type</option>
                                <option value="mcqs">MCQs</option>
                            </select>
                        </div>

                        {/* File Upload */}
                        <div>
                            <label className="block text-gray-700 font-medium mb-2">
                                Upload CSV File
                            </label>
                            <input
                                type="file"
                                accept=".csv"
                                onChange={handleFileChange}
                                className="w-full p-2 border rounded"
                            />
                        </div>
                        
                        {/* Download Sample File */}
                        <a href="/sample_quiz.csv" download>
                            <button
                                type="button"
                                className="bg-pink-500 text-white py-2 px-6 rounded hover:bg-pink-700 mr-4"
                            >
                                Download Sample CSV
                            </button>
                        </a>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            className="bg-blue-500 text-white py-2 px-6 rounded hover:bg-blue-700"
                        >
                            Upload Questions
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default CsvUploader;
