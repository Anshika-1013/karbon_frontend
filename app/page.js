"use client";
import { useState } from 'react';

export default function UploadFile() {
  const [file, setFile] = useState(null);
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!file) {
      setError('Please select a file to upload.');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await fetch('https://karbon-intern-project.vercel.app/upload', {
        method: 'POST',
        body: formData,
      });
      
      if (res.ok) {
        const data = await res.json();
        setResponse(data);
        setError(null);
      } else {
        setError('Failed to upload file.');
        setResponse(null);
      }
    } catch (err) {
      setError('Error during file upload.');
      setResponse(null);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 to-blue-300 p-4">
      <div className="bg-white shadow-lg rounded-lg p-10 max-w-md w-full transition-transform transform hover:scale-105">
        <h2 className="text-4xl font-bold text-center text-gray-800 mb-6">Upload Your File</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex items-center justify-center">
            <label className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-blue-500 transition duration-200">
              <span className="text-gray-500">Drag and drop your file here or click to select</span>
              <input 
                type="file" 
                onChange={handleFileChange} 
                className="hidden"
              />
            </label>
          </div>
          <button 
            type="submit" 
            className="w-full bg-blue-600 text-white font-semibold py-3 rounded-lg 
                       shadow-md hover:bg-blue-700 transition duration-200 transform hover:scale-105"
          >
            Upload
          </button>
        </form>

        {response && (
          <pre className="mt-4 text-sm text-green-700 bg-green-100 border-l-4 border-green-500 p-4 rounded-md shadow">
            {JSON.stringify(response, null, 2)}
          </pre>
        )}
        {error && (
          <p className="mt-4 text-red-600 bg-red-100 border-l-4 border-red-500 p-4 rounded-md shadow">
            {error}
          </p>
        )}
      </div>
    </div>
  );
}
