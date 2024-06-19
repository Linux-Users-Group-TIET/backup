import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  signOutUserFailure,
  signOutUserStart,
  signOutUserSuccess,
  updateUserFailure,
  updateUserStart,
  updateUserSuccess,
} from "../redux/user/userSlice";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firebase";
import { Link } from "react-router-dom";
import "./Profile.css";
function Profile() {
  const fileRef = useRef(null);
  const { currentUser, loading, error } = useSelector((state) => state.user);
  const [file, setFile] = useState(undefined);
  const [fileperc, setFileperc] = useState(0);
  const [fileUploadError, setFileUploadError] = useState(false);
  const [formdata, setFormData] = useState({});
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    if (file) {
      handleFileUpload(file); // When 'file' changes, trigger the file upload process
    }
  }, [file]);

  const handleFileUpload = (file) => {
    const storage = getStorage(app);
    const filename = new Date().getTime() + file.name;
    const storageRef = ref(storage, filename);
    const uploadTask = uploadBytesResumable(storageRef, file);

    // Track upload progress, error, and completion
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // Progress tracking
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setFileperc(Math.round(progress));
      },
      (error) => {
        // Error handling
        setFileUploadError(true);
      },
      () => {
        // Completion handling
        // Once uploaded, get the download URL and update the form data
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) =>
          setFormData({ ...formdata, avatar: downloadURL })
        );
      }
    );
  };

  const handleSignOut = async () => {
    try {
      dispatch(signOutUserStart());
      const res = await fetch("/api/auth/signout");
      const data = await res.json();
      if (data.success === false) {
        dispatch(signOutUserFailure(data.message));
        return;
      }
      dispatch(signOutUserSuccess(data));
    } catch (error) {
      dispatch(signOutUserFailure(error.message));
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formdata,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(updateUserStart());
      const res = await fetch(`/api/user/update/${currentUser._id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formdata),
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(updateUserFailure(data.message));
      }
      dispatch(updateUserSuccess(data));
      setUpdateSuccess(true);
    } catch (error) {
      updateUserFailure(error.message);
    }
  };

  return (
    <div className="profile-container">
      <input
        onChange={(e) => setFile(e.target.files[0])}
        type="file"
        ref={fileRef}
        hidden
        accept="image/*"
      />
      <h1 className="profile-title">Profile</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <p className="file-upload-info">
          {fileperc > 0 && fileperc < 100 ? (
            <span>{`Uploading ${fileperc}%`}</span>
          ) : fileperc === 100 ? (
            <span>Image successfully uploaded!</span>
          ) : (
            ""
          )}
        </p>

        <input
          type="text"
          id="username"
          defaultValue={currentUser.username}
          placeholder="Username"
          className="form-input"
          onChange={handleChange}
        />
        <input
          type="email"
          id="email"
          defaultValue={currentUser.email}
          placeholder="Email"
          className="form-input"
          onChange={handleChange}
        />
        <input
          type="password"
          id="password"
          placeholder="Password"
          className="form-input"
          onChange={handleChange}
        />
        <button disabled={loading} className="button-primary">
          {loading ? "Loading..." : "Update"}
        </button>
        {(currentUser.email === "devangpathak752001@gmail.com" ||
          currentUser.email === "pathaksprings@gmail.com") && (
          <Link to="../addproduct" className="button-secondary">
            Add Product
          </Link>
        )}
      </form>
      <div className="flex justify-between mt-5">
        <span className="delete-account">Delete Account</span>
        <span onClick={handleSignOut} className="delete-account">
          Sign Out
        </span>
      </div>
      <p className="success-message mt-5">
        {updateSuccess ? "User Updated Successfully!" : ""}
      </p>
      <div className="animation-line"></div>
    </div>
  );
}

export default Profile;
