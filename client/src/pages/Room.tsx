import { useParams } from "react-router-dom";
import Editor from "@monaco-editor/react";
import { useState, useEffect } from "react";

const Room = () => {
  const { roomId } = useParams();
  const [code, setCode] = useState("// Start coding here...");
  const [fontSize, setFontSize] = useState(14); // Default font size
  const [theme, setTheme] = useState("vs-dark"); // Default theme is dark
  const [language, setLanguage] = useState("javascript"); // Default language is JavaScript

  // Handle editor changes (auto-save feature)
  const handleCodeChange = (newCode: string | undefined) => {
    if (newCode) setCode(newCode);
  };

  // Toggle theme
  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "vs-dark" ? "vs-light" : "vs-dark"));
  };

  // Handle font size change
  const increaseFontSize = () => setFontSize((prevSize) => prevSize + 2);
  const decreaseFontSize = () => setFontSize((prevSize) => prevSize - 2);

  // Handle language change (for syntax highlighting)
  const changeLanguage = (newLanguage: string) => {
    setLanguage(newLanguage);
  };

  return (
    <div className="h-screen flex flex-col bg-gray-800 pt-16">
      {/* Add pt-16 to push content below the header */}
      <div className="p-4 bg-gray-900 flex justify-between items-center">
        <h2 className="text-white">Room ID: {roomId}</h2>
        <div className="flex space-x-4">
          <button
            className="bg-blue-500 text-white p-2 rounded"
            onClick={toggleTheme}
          >
            Toggle Theme
          </button>
          <button
            className="bg-green-500 text-white p-2 rounded"
            onClick={increaseFontSize}
          >
            Increase Font
          </button>
          <button
            className="bg-red-500 text-white p-2 rounded"
            onClick={decreaseFontSize}
          >
            Decrease Font
          </button>
          <select
            className="bg-gray-700 text-white p-2 rounded"
            value={language}
            onChange={(e) => changeLanguage(e.target.value)}
          >
            <option value="javascript">JavaScript</option>
            <option value="python">Python</option>
            <option value="java">Java</option>
            <option value="html">HTML</option>
            <option value="css">CSS</option>
            <option value="c++">C++</option>
          </select>
        </div>
      </div>

      <Editor
        height="calc(100vh - 140px)" // Adjust the height for the remaining space (header + toolbar height)
        defaultLanguage={language}
        value={code}
        onChange={handleCodeChange}
        theme={theme}
        options={{
          fontSize,
          wordWrap: "on",
          minimap: { enabled: false },
          automaticLayout: true,
          quickSuggestions: true, // Enable auto-completion
        }}
      />
    </div>
  );
};

export default Room;
