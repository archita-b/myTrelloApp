import { useState } from "react";
import "./AddNewList.css";

export default function AddNewList({
  listTitle,
  setListTitle,
  handleCreateList,
}) {
  const [isFormOpen, setIsFormOpen] = useState(false);

  return (
    <div className="add-new-item">
      <button className="newitem-btn" onClick={() => setIsFormOpen(true)}>
        + Add another list
      </button>
      {isFormOpen && (
        <form className="addlist-form" onSubmit={(e) => e.preventDefault()}>
          <textarea
            value={listTitle}
            onChange={(e) => setListTitle(e.target.value)}
            placeholder="Enter list title..."
          ></textarea>
          <div>
            <button className="add-btn" onClick={handleCreateList}>
              Add List
            </button>
            <button className="cross-btn" onClick={() => setIsFormOpen(false)}>
              {"\u00d7"}
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
