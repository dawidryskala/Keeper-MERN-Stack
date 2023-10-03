import React, { useState } from "react";
import { useNavigate } from "react-router";

export default function Create() {
    const [form, setForm] = useState({
        title: "",
        content: ""
    });
    const navigate = useNavigate();

    // These methods will update the state properties.
    function updateForm(value) {
        return setForm((prev) => {
            return { ...prev, ...value };
        });
    }

    // This function will handle the submission.
    async function onSubmit(e) {
        e.preventDefault();

        // When a post request is sent to the create url, we'll add a new record to the database.
        const newPerson = { ...form };
        console.log(JSON.stringify(newPerson))

        await fetch("http://localhost:5050/record", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newPerson),

        })
            .catch(error => {
                window.alert(error);
                return;
            });

        setForm({ title: "", content: "" });
        navigate("/");
    }

    // This following section will display the form that takes the input from the user.
    return (
        <div>
            <h3 className="h1-edit">Create New Note</h3>
            <form onSubmit={onSubmit}>
                <div className="edit-div">
                    <label className="edit-label" htmlFor="name">Title</label>
                    <input
                        type="text"
                        className="edit-input"
                        id="name"
                        value={form.title}
                        onChange={(e) => updateForm({ title: e.target.value })}
                    />
                </div>
                <div className="edit-div">
                    <label className="edit-label" htmlFor="position">Content</label>
                    <input
                        type="text"
                        className="edit-input"
                        id="position"
                        value={form.content}
                        onChange={(e) => updateForm({ content: e.target.value })}
                    />
                </div>
                <div className="edit-div">
                    <input
                        type="submit"
                        value="Create Note"
                        className="edit-submit-button"
                    />
                </div>
            </form>
        </div>
    );
}