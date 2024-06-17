import React, { useState } from "react";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
  deleteObject,
} from "firebase/storage";
import { app } from "../firebase";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function AddProduct() {
  const navigate = useNavigate();
  const { currentUser } = useSelector((state) => state.user);
  const [uploadProgress, setUploadProgress] = useState(null);
  const [files, setFiles] = useState([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formdata, setFormData] = useState({
    imageUrls: [],
    name: "",
    description: "",
    series: "",
    price: "",
    storageRefs: [], // To store storage references for deletion
  });

  const handleImageSubmit = (e) => {
    if (files.length > 0 && files.length + formdata.imageUrls.length < 7) {
      const promises = [];

      for (let i = 0; i < files.length; i++) {
        promises.push(storeImage(files[i]));
      }

      Promise.all(promises).then((results) => {
        setFormData((prevData) => ({
          ...prevData,
          imageUrls: prevData.imageUrls.concat(results),
          storageRefs: prevData.storageRefs.concat(
            results.map((_, index) => prevData.storageRefs[index])
          ),
        }));
        console.log("All images stored successfully:", results);
        setUploadProgress(null); // Reset progress after completion
      });
    }
  };

  const storeImage = async (file) => {
    return new Promise((resolve, reject) => {
      const storage = getStorage(app);
      const fileName = new Date().getTime() + file.name;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          // Handle state changes if necessary (e.g., progress updates)
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setUploadProgress(progress);
          console.log("Upload is " + progress + "% done");
          if (progress === 100) {
            setTimeout(() => {
              setUploadProgress(null);
            }, 2000);
          }
        },

        (error) => {
          // Handle unsuccessful uploads
          reject(error);
        },
        () => {
          // Handle successful uploads on complete
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            resolve(downloadURL);
            // Save storage reference for deletion
            setFormData((prevData) => ({
              ...prevData,
              storageRefs: [...prevData.storageRefs, storageRef],
            }));
          });
        }
      );
    });
  };

  const handleDeleteImage = (index) => {
    // Create a copy of the imageUrls and storageRefs arrays
    const updatedImageUrls = [...formdata.imageUrls];
    const updatedStorageRefs = [...formdata.storageRefs];

    // Remove the image URL and corresponding storage reference at the specified index
    updatedImageUrls.splice(index, 1);
    const storageRefToDelete = updatedStorageRefs.splice(index, 1)[0];

    // Update the formdata state with the updated imageUrls and storageRefs arrays
    setFormData({
      ...formdata,
      imageUrls: updatedImageUrls,
      storageRefs: updatedStorageRefs,
    });

    // Delete the image file from Firebase Storage
    deleteObject(storageRefToDelete)
      .then(() => {
        console.log("Image deleted successfully from Firebase Storage");
      })
      .catch((error) => {
        console.error("Error deleting image from Firebase Storage:", error);
        // Handle error (e.g., show error message to user)
      });
  };
  console.log(formdata);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (formdata.imageUrls.length < 1)
        return setError("At least 1 image daaldo!!");
      setLoading(true);
      setError(false);
      const res = await fetch("/api/listing/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formdata,
          userRef: currentUser._id,
        }),
      });
      const data = await res.json();
      setLoading(false);
      if (data.sucess === false) {
        setError(data.message);
      }

      navigate(`/listing/${data._id}`);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };
  return (
    <main className="p-3 max-w-5xl mx-auto">
      <h1 className="text-3xl font-semibold text-center my-9">Add Product</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 sm:flex-row">
        <div className="flex flex-col gap-5 flex-1">
          <p className="text-gray-600">Product Name</p>
          <input
            type="text"
            placeholder="Enter Product Name"
            name="name"
            className="border p-3 rounded-lg"
            maxLength="62"
            minLength="2"
            required
            onChange={handleChange}
            value={formdata.name}
          />
          <p className="text-gray-600">Product Description</p>
          <input
            type="text"
            placeholder="Enter Product Description"
            name="description"
            className="border p-3 rounded-lg h-40 text-left align-top"
            maxLength="200"
            minLength="2"
            required
            onChange={handleChange}
            value={formdata.description}
          />
          <p className="text-gray-600">Series Name</p>
          <input
            type="text"
            placeholder="Enter Series Name"
            name="series"
            className="border p-3 rounded-lg"
            maxLength="62"
            minLength="2"
            required
            onChange={handleChange}
            value={formdata.series}
          />

          <div className="flex flex-col gap-4">
            <p className="text-gray-600">Product price</p>
            <input
              placeholder="Enter product cost (in Rs)"
              type="text"
              name="price"
              required
              className="p-3 border border-gray-300 rounded-lg"
              onChange={handleChange}
              value={formdata.price}
            />
          </div>
        </div>
        <div className="flex-col flex gap-4 flex-1">
          <p className="font-semibold">
            Images:
            <span className="font-normal text-gray-600 ml-2">
              The first image will be the cover (max 6)
            </span>
          </p>
          <div className="flex gap-4">
            <input
              onChange={(e) => setFiles(Array.from(e.target.files))}
              className="p-3 border border-gray-300 rounded w-full"
              type="file"
              id="images"
              accept="image/*"
              multiple
            />
            <button
              type="button"
              onClick={handleImageSubmit}
              className="p-3 text-green-700 border border-green-700 rounded uppercase hover:shadow-lg disabled:opacity-65"
            >
              {uploadProgress !== null
                ? `Uploading... ${Math.round(uploadProgress)}%`
                : "Upload"}
            </button>
          </div>
          <p className="text-red-700 text-sm"></p>
          {formdata.imageUrls.length > 0 &&
            formdata.imageUrls.map((url, index) => (
              <div
                key={index}
                className="relative overflow-hidden group rounded-lg shadow-md border border-gray-200"
              >
                <div className="flex items-center justify-between">
                  <img
                    src={url}
                    alt={`Product Image ${index + 1}`}
                    className="w-40 h-40 object-cover rounded-lg transition-transform transform-gpu group-hover:scale-105"
                  />
                  {/* Classy Context */}
                  <div className="flex flex-col justify-center bg-slate-500 text-white p-2">
                    <p className="text-lg font-semibold">
                      Product Image {index + 1}
                    </p>
                    <p className="text-sm">Uploaded Successfully!</p>
                  </div>
                </div>

                {/* Delete Button */}
                <button
                  className="absolute top-2 right-2 text-red-500 group-hover:text-red-700 focus:outline-none transition-opacity opacity-0 group-hover:opacity-100"
                  onClick={() => handleDeleteImage(index)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
            ))}
          <button className="bg-slate-500 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80">
            {loading ? "Adding Product" : "Add Product"}
          </button>
        </div>
      </form>
    </main>
  );
}

export default AddProduct;
