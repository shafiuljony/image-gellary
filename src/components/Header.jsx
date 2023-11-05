import React from "react";

const Header = ({ selectedCount, handleDeleteSelected }) => {
  return (
    <header className="header">
      {selectedCount > 0 ? (
        <div className="select_wrap">
          <div className="select">
            <input
              checked
              type="checkbox"
              name=""
              id=""
              readOnly
              style={{ height: "18px", width: "18px" }}
            />
            <span>
              {selectedCount} {selectedCount !== 1 ? "files" : "file"} Selected
            </span>
          </div>
          <div className="">
            <span className="delete" onClick={handleDeleteSelected}>
              Delete files
            </span>
          </div>
        </div>
      ) : (
        <div className="gallery">
          <span>Gallery</span>
        </div>
      )}
    </header>
  );
};

export default Header;
