import React, { useState } from "react";

function App() {
  const [input, setInput] = useState("");
  const [response, setResponse] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:3000/api/chat", {   // 👈 Backend endpoint
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: input }),
      });

      const data = await res.json();
      setResponse(data.reply);   // 👈 Backend must send { reply: "text" }
    } catch (error) {
      console.error("Error:", error);
      setResponse("Something went wrong");
    }
  };

  return (
    <div>
      <h1>Gemini Chatbot 🤖</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask something..."
        />
        <button type="submit">Send</button>
      </form>
      <div>
        <strong>Response:</strong> {response}
      </div>
    </div>
  );
}

export default App;
