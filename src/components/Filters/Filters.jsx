import React, { useState } from "react";

const Filters = () => {
  const [activeButton, setActiveButton] = useState("INITIATOR"); // Initialize state for active button

  const handleButtonClick = (button) => {
    setActiveButton(button); // Update active button when clicked
  };

  return (
    <div>
      <button
        style={{
          fontSize: "12px",
          width: "180.5px",
          border: activeButton === "INITIATOR" ? "1px solid white" : "1px solid gray",
          borderBottom: activeButton === "INITIATOR" ? "none" : "white",
          marginLeft: "50px",
          color: "white",
          padding: "10px 20px",
          background: "rgba(4, 4, 15, 0.7)",
          backdropFilter: "blur(10px)",
          cursor: "pointer",
          userSelect: "none",
          outline: "none",
        }}
        onClick={() => handleButtonClick("INITIATOR")}
      >
        ИНИЦИАТОР ЗАПРОСА
      </button>
      <button
        style={{
          fontSize: "12px",
          width: "180.5px",
          border: activeButton === "OBJECT" ? "1px solid white" : "1px solid gray",
          borderBottom: activeButton === "INITIATOR" ? "none" : "white",
          color: "white",
          padding: "10px 20px",
          background: "rgba(4, 4, 15, 0.7)",
          backdropFilter: "blur(10px)",
          cursor: "pointer",
          userSelect: "none",
        }}
        onClick={() => handleButtonClick("OBJECT")}
      >
        ОБЪЕКТ ЗАПРОСА
      </button>
      <button
        style={{
          fontSize: "12px",
          width: "180.5px",
          border: activeButton === "RISKS" ? "1px solid white" : "1px solid gray",
          borderBottom: activeButton === "INITIATOR" ? "none" : "white",
          color: "white",
          padding: "10px 20px",
          background: "rgba(4, 4, 15, 0.7)",
          backdropFilter: "blur(10px)",
          cursor: "pointer",
          userSelect: "none",
        }}
        onClick={() => handleButtonClick("RISKS")}
      >
        РИСКИ
      </button>
      <div
        style={{
          background: "rgba(4, 4, 15, 0.7)",
          backdropFilter: "blur(10px)",
          padding: "20px",
          width: "500px",
          height: "670px",
          marginBottom: "180px",
          marginLeft: "50px",
          border: "1px solid white",
          borderTop: "none",
        }}
      >
        <input
          type="text"
          placeholder="Search..."
          style={{ marginBottom: "10px" }}
        />
        <select style={{ marginBottom: "20px" }}>
          <option value="">Filter by...</option>
          <option value="category1">Category 1</option>
          <option value="category2">Category 2</option>
          <option value="category3">Category 3</option>
        </select>
      </div>
    </div>
  );
};

export default Filters;
