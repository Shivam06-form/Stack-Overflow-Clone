import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AUTH } from "../../Reducer/Reducer";
import { UserUrl } from "../../UPI";

const EditUser = ({ currentUser, setSwitch }) => {
  const auth = useSelector((state) => state.auth);
  const [name, setName] = useState(auth.name ? auth.name : "");
  const [about, setAbout] = useState(auth.about ? auth.about : "");
  const [tags, setTags] = useState(auth.tags ? auth.tags : []);
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch(`${UserUrl}edit/${auth.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: name,
        about: about,
        tags: tags,
      }),
    });
    dispatch(AUTH.updateProfile({ name: name, about: about, tags: tags }));
    setSwitch(false);
  };

  return (
    <div>
      <h1 className="edit-profile-title">Edit Your Profile</h1>
      <h2 className="edit-profile-title-2">Public information</h2>
      <form className="edit-profile-form" onSubmit={handleSubmit}>
        <label htmlFor="name">
          <h3>Display name</h3>
          <input
            type="text"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </label>
        <label htmlFor="about">
          <h3>About me</h3>
          <textarea
            id="about"
            cols="30"
            rows="10"
            name="summery"
            value={about}
            onChange={(e) => setAbout(e.target.value)}
          ></textarea>
        </label>
        <label htmlFor="tags">
          <h3>Watched tags</h3>
          <p>Add tags separated by 1 space</p>
          <input
            type="text"
            id="tags"
            value={tags.join(" ")}
            onChange={(e) => setTags(e.target.value.split(" "))}
          />
        </label>
        <br />
        <input type="submit" value="Save profile" className="user-submit-btn" />
        <button
          type="button"
          className="user-cancel-btn"
          onClick={() => setSwitch(false)}
        >
          Cancel
        </button>
      </form>
    </div>
  );
};

export default EditUser;
