import React from "react";
import { addMusician } from "../models/musicien.server";

export default function NewMusicianForm({ onMusicianAdded }) {
  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = new FormData(e.target);
    const name = form.get("name");
    const styles = form.getAll("style");
    const instruments = form.getAll("instrument");

    if (styles.length === 0 || instruments.length === 0) {
      console.error("Please select at least one style and one instrument.");
      return;
    }

    try {
      const newMusician = {
        name,
        style: styles,
        instrument: instruments,
      };

      await addMusician(newMusician);

      onMusicianAdded(newMusician);

    } catch (error) {
      console.error("Error adding musician:", error);
    }
  };

  return (
    <div>
      <p>Add musician</p>
      <form method="post" onSubmit={handleSubmit}>
        <div>
          <label>
            Name: <input type="text" name="name" required />
          </label>
        </div>
        <fieldset>
          <legend>Style:</legend>
          <div>
            <label>
              <input type="checkbox" name="style" value="Rock" /> Rock
            </label>
          </div>
          <div>
            <label>
              <input type="checkbox" name="style" value="Pop" /> Pop
            </label>
            {/* Add more checkboxes for other styles */}
          </div>
        </fieldset>
        <fieldset>
          <legend>Instruments:</legend>
          <div>
            <label>
              <input type="checkbox" name="instrument" value="Guitar" /> Guitar
            </label>
          </div>
          <div>
            <label>
              <input type="checkbox" name="instrument" value="Piano" /> Piano
            </label>
            {/* Add more checkboxes for other instruments */}
          </div>
        </fieldset>
        <div>
          <button type="submit" className="button">
            Add
          </button>
        </div>
      </form>
    </div>
  );
}
