/** @format */

import React from "react";
const Tracks = ({ onClick }) => {
  return (
    <React.Fragment>
      <div>
        <h1 style={{ margin: "2rem auto", textAlign: "center" }}>Tracks</h1>
        <div
          style={{
            width: "34rem",
            height: "27rem",
            overflow: "auto",
            textAlign: "center",
            padding: "1rem",
            margin: "2rem auto",
          }}
        >
          {[...Array(47)].map((_, index) => {
            let id = index + 1;
            return (
              <p
                style={{
                  margin: "1rem auto",
                  textAlign: "center",
                  fontSize: "2rem",
                  cursor: "pointer",
                }}
                key={id}
                onClick={(e) => {
                  onClick(id);
                }}
              >{`Audio ${id}.mp3`}</p>
            );
          })}
        </div>
      </div>
    </React.Fragment>
  );
};

export default Tracks;
