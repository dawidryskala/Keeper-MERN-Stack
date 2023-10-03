import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";

export default function Edit() {
  const [form, setForm] = useState({
    title: "",
    content: "",
    records: [],
  });
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      const id = params.id.toString();
      const response = await fetch(`http://localhost:5050/record/${params.id.toString()}`);

      if (!response.ok) {
        const message = `An error has occurred: ${response.statusText}`;
        window.alert(message);
        return;
      }

      const record = await response.json();
      if (!record) {
        window.alert(`Record with id ${id} not found`);
        navigate("/");
        return;
      }

      setForm(record);
    }

    fetchData();

    return;
  }, [params.id, navigate]);

  // These methods will update the state properties.
  function updateForm(value) {
    return setForm((prev) => {
      return { ...prev, ...value };
    });
  }

  async function onSubmit(e) {
    e.preventDefault();
    const editedPerson = {
      title: form.title,
      content: form.content
    };

    // This will send a post request to update the data in the database.
    await fetch(`http://localhost:5050/record/${params.id}`, {
      method: "PATCH",
      body: JSON.stringify(editedPerson),
      headers: {
        'Content-Type': 'application/json'
      },
    });

    navigate("/");
  }

  // This following section will display the form that takes input from the user to update the data.
  return (
    <div>
      <h3 className="h1-edit">Update Note</h3>
      <form onSubmit={onSubmit}>
        <div className="edit-div">
          <label className="edit-label" htmlFor="name">Title: </label><br />
          <input
            type="text"
            className="edit-input"
            id="name"
            value={form.title}
            onChange={(e) => updateForm({ title: e.target.value })}
          />
        </div>
        <div className="edit-div">
          <label className="edit-label" htmlFor="position">Content: </label><br />
          <input
            type="text"
            className="edit-input"
            id="position"
            value={form.content}
            onChange={(e) => updateForm({ content: e.target.value })}
          />
        </div>

        <br />

        <div className="edit-div-button">
          <input
            type="submit"
            value="Update Note"
            className="edit-submit-button"
          />
        </div>
      </form>
    </div>
  );
}