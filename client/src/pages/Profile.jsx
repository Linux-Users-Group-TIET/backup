import { useEffect, useRef, useState } from "react";
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
function Profile() {
  const fileRef = useRef(null);
  const { currentUser, loading, error } = useSelector((state) => state.user);
  const [file, setFile] = useState(undefined);
  const [fileperc, setFileperc] = useState(0);
  const [fileUploadError, setFileUploadError] = useState(false);
  const [formdata, setFormData] = useState({});
  const [updateSuccess, setUpdateSuccess] = useState(false);
  console.log(updateSuccess);
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
  console.log(formdata);
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(updateUserStart());
      console.log(currentUser._id);
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
    <div className="p-3 max-w-lg mx-auto">
      <input
        onChange={(e) => setFile(e.target.files[0])}
        type="file"
        ref={fileRef}
        hidden
        accept="image/*"
      />
      <h1 className="text-3xl font-semibold text-center my-8">Profile</h1>
      <form onSubmit={handleSubmit} className="flex  flex-col gap-4">
        <img
          onClick={() => fileRef.current.click()}
          className="rounded-full h-24 w-24 object-cover cursor-pointer self-center mx-auto mt-9"
          src={formdata?.avatar || currentUser.avatar}
          alt="profile"
        />
        <p className="text-sm self-center mb-6">
          {
            // <span className="text-red-700">
            //   Error Image Uploading (image must be less than 2mb😠)
            // </span>
            fileperc > 0 && fileperc < 100 ? (
              <span className="text-slate-700">{`Uploading ${fileperc}%`}</span>
            ) : fileperc === 100 ? (
              <span className="text-green-700">
                Image successfully uploaded!
              </span>
            ) : (
              ""
            )
          }
        </p>

        <input
          type="text"
          id="username"
          defaultValue={currentUser.username}
          placeholder="username"
          className="border p-3 rounded-lg"
          onChange={handleChange}
        />
        <input
          type="email"
          id="email"
          defaultValue={currentUser.email}
          placeholder="email"
          className="border p-3 rounded-lg"
          onChange={handleChange}
        />
        <input
          type="password"
          id="password"
          placeholder="password"
          onChange={handleChange}
          className="border p-3 rounded-lg"
        />
        <button
          disabled={loading}
          className="bg-slate-700 text-white rounded-lg p-3 uppercase hover:opacity-95 disabled:opacity:80"
        >
          {loading ? "Loading..." : "Update"}
        </button>
        <Link
          to="../addproduct"
          className="bg-green-700 text-white p-3 rounded-lg uppercase text-center hover:opacity-90"
        >
          Add product
        </Link>
      </form>
      <div className="flex justify-between mt-5">
        <span className="text-red-700 cursor-pointer">Delete Account</span>
        <span onClick={handleSignOut} className="text-red-700 cursor-pointer">
          Sign out
        </span>
      </div>
      <p className="text-green-700 mt-5">
        {updateSuccess ? "User Updated Successfully!" : ""}
      </p>
    </div>
  );
}

export default Profile;
