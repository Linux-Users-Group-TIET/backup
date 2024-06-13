import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firebase";

function Profile() {
  const fileRef = useRef(null);
  const { currentUser } = useSelector((state) => state.user);
  const [file, setFile] = useState(undefined);
  const [fileperc, setFileperc] = useState(0);
  const [fileUploadError, setFileUploadError] = useState(false);
  const [formdata, setFormData] = useState({});

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
      <form className="flex  flex-col gap-4">
        <img
          onClick={() => fileRef.current.click()}
          className="rounded-full h-24 w-24 object-cover cursor-pointer self-center mx-auto mt-9"
          src={formdata.avatar || currentUser.avatar}
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
          placeholder="username"
          className="border p-3 rounded-lg"
        />
        <input
          type="email"
          id="email"
          placeholder="email"
          className="border p-3 rounded-lg"
        />
        <input
          type="text"
          id="password"
          placeholder="password"
          className="border p-3 rounded-lg"
        />
        <button className="bg-slate-700 text-white rounded-lg p-3 uppercase hover:opacity-95 disabled:opacity:80">
          Update
        </button>
      </form>
      <div className="flex justify-between mt-5">
        <span className="text-red-700 cursor-pointer">Delete Account</span>
        <span className="text-red-700 cursor-pointer">Sign out</span>
      </div>
    </div>
  );
}

export default Profile;
