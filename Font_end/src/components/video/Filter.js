import React from "react";
import "./Filter.css";

function Filter() {
  return (
    <div className="filter d-flex align-items-center">
      <div className="single-filter">
        <span className="filter-items pointer active">All</span>
      </div>
      <div className="single-filter">
        <span className="filter-items pointer">Mixes</span>
      </div>
      <div className="single-filter">
        <span className="filter-items pointer">Music</span>
      </div>
    </div>
  );
}
export default Filter;
