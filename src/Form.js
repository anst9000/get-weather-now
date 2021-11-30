import { useState } from "react";

const Form = ({ getLocation }) => {
  const [text, setText] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    event.target.reset();
    getLocation(text);
    setText("")
  }

  return (
    <div className="form-section">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={text}
          placeholder="Name of city..."
          onChange={(e) => setText(e.target.value)}
        />
        <button>Get Weather</button>
      </form>
    </div>
  );
}

export default Form
