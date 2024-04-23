import React from "react";
import "../Table/Tables.css";

const Filters = () => {
  return (
    <div className="container">
      <input
        type="text"
        placeholder="Search..."
        className="inputField"
      />
      <select className="selectField">
        <option value="">Filter by...</option>
        <option value="category1">Category 1</option>
        <option value="category2">Category 2</option>
        <option value="category3">Category 3</option>
      </select>
      {/* Add more filter elements as needed */}
    </div>
  );
};

export default Filters;
