import React from "react";
import "./EnvList.css";

const EnvList = () => {
  return (
    <div className="env-list">
      <h2>Golbal Environment Variables (process.env)</h2>
      <p>API Base URL: {process.env.API_BASE_URL}</p>
      <p>Feature Flag: {process.env.FEATURE_FLAG}</p>
      <p>Node Env: {process.env.NODE_ENV}</p>
    </div>
  );
};

export default EnvList;
