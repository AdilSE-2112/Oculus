import React from "react";

const Filters = () => {
  return (
    <div
      style={{
        background: "rgba(4, 4, 15, 0.7)", // semi-transparent white background
        backdropFilter: 'blur(10px)', // apply blur effect
        padding: "20px",
        width: "1180px",
        height: "705px",
        marginBottom: "236px",
        paddingTop: "100px",
        marginRight: "50px",
        border: '1px solid white', 
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
      {/* Add more filter elements as needed */}
    </div>
  );
};

export default Filters;
