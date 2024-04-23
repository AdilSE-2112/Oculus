import React, { useState } from "react";
import "../Filters/Filters.css";

const Filters = () => {
  const [activeButton, setActiveButton] = useState("INITIATOR");

  const handleButtonClick = (button) => {
    setActiveButton(button);
  };

  return (
    <div className="parentContainer"> {/* Add a parent container */}
    <div className="content">
      <div className="selector">
        <button
          className={`button ${activeButton === "INITIATOR" && "active"}`}
          onClick={() => handleButtonClick("INITIATOR")}
        >
          ИНИЦИАТОР ЗАПРОСА
        </button>
        <button
          className={`button ${activeButton === "OBJECT" && "active"}`}
          onClick={() => handleButtonClick("OBJECT")}
        >
          ОБЪЕКТ ЗАПРОСА
        </button>
        <button
          className={`button ${activeButton === "RISKS" && "active"}`}
          onClick={() => handleButtonClick("RISKS")}
        >
          РИСКИ
        </button>
      </div>
      <div className="containerInputs">
        <input type="text" placeholder="Search..." />
        <select className="select">
          <option value="">Filter by...</option>
          <option value="category1">Category 1</option>
          <option value="category2">Category 2</option>
          <option value="category3">Category 3</option>
        </select>
      </div>
      </div>
    </div>
  );
};

export default Filters;
