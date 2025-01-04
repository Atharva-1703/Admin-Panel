import React, { useState } from 'react';
import Sidebar from "../../components/custom/DashBoard/Sidebar";

const CsvUploader = () => {
    const [quizData, setQuizData] = useState({
        videoUrl: "",
        topic: "",
        type: "",
        file: null,
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setQuizData((prev) => ({ ...prev, [name]: value }));
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setQuizData((prev) => ({ ...prev, file }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const { videoUrl, topic, type, file } = quizData;
        if (!videoUrl.trim() || !type.trim() || !topic.trim()) {
            alert("Please provide a video Url, type, and topic!");
            return;
        }
        if (!file) {
            alert("Please upload a file");
            return;
        }

        console.log(quizData);

        // Reset the form
        setQuizData({
            videoUrl: "",
            topic: "",
            type: "",
            file: null
        });
    };

    return (
        <div className="flex h-screen overflow-hidden bg-yellow-200 text-gray-800">
            {/* Sidebar */}
            <Sidebar />
            
            {/* Form Section */}
            <div className="flex-1 h-screen  p-8 justify-center bg-yellow-200">
                <div className="bg-white shadow-md rounded-lg p-8 mx-auto w-full max-w-2xl">
                    <h1 className="text-2xl font-semibold text-pink-600 mb-6">
                        Import Questions (CSV Upload)
                    </h1>

                    <form onSubmit={handleSubmit} className="space-y-6">
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

                        <div>
                            <label className="block text-gray-700 font-medium mb-2">Topic</label>
                            <input
                                type="text"
                                name="topic"
                                value={quizData.topic}
                                onChange={handleInputChange}
                                className="w-full p-2 border rounded"
                                placeholder="Enter Topic"
                            />
                        </div>

                        <div>
                            <label className="block text-gray-700 font-medium mb-2">
                                Question Type
                            </label>
                            <select
                                name="type"
                                value={quizData.type}
                                onChange={handleInputChange}
                                className="w-full p-2 border rounded"
                            >
                                <option value="">Select Type</option>
                                <option value="mcqs">MCQs</option>
                                <option value="trueFalse">True/False</option>
                                <option value="fillInTheBlanks">Fill in the Blanks</option>
                            </select>
                        </div>

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

                        <a href="/sample_quiz.csv">
                            <button
                                type="button"
                                className="bg-pink-500 text-white py-2 px-6 rounded hover:bg-pink-700 mr-4"
                            >
                                Download Sample CSV
                            </button>
                        </a>
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
