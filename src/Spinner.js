import React from "react";

const Spinner = () => {
  return (
    <div style={{ textAlign: "center", margin: "20px" }}>
      <div className="spinner-border" role="status">
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  );
};

export default Spinner;
