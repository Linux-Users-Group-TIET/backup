import React from "react";

function AddProduct() {
  return (
    <main className="p-3 max-w-5xl mx-auto">
      <h1 className="text-3xl font-semibold text-center my-9">Add Product</h1>
      <form className="flex flex-col  gap-4 sm:flex-row">
        <div className="flex flex-col gap-5 flex-1">
          <p className=" text-gray-600 ">Product Name</p>
          <input
            type="text"
            placeholder="Enter Product Name"
            id="name"
            className="border p-3 rounded-lg"
            maxLength="62"
            minLength="18"
            required
          />
          <p className=" text-gray-600 ">Product Description</p>
          <input
            type="text"
            placeholder="Enter Product Description"
            id="description"
            className="border p-3 rounded-lg h-40 text-left align-top"
            maxLength="62"
            minLength="18"
            required
          />
          <p className=" text-gray-600 ">Series Name</p>
          <input
            type="text"
            placeholder="Enter Series Name"
            id="Series"
            className="border p-3 rounded-lg"
            maxLength="62"
            minLength="18"
            required
          />

          <div className="flex flex-col  gap-4">
            <p className=" text-gray-600 ">Product price</p>
            <input
              placeholder="Enter product cost (in Rs)"
              type="text"
              id="price"
              required
              className="p-3 border border-gray-300 rounded-lg"
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
              className="p-3 border border-gray-300 rounded w-full"
              type="file"
              id="images"
              accept="image/*"
              multiple
            />
            <button className="p-3 text-green-700 border border-green-700 rounded uppercase hover:shadow=lg disabled:opacity-65">
              Upload
            </button>
          </div>
          <button className="bg-slate-500 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80">
            Add Product
          </button>
        </div>
      </form>
    </main>
  );
}

export default AddProduct;
