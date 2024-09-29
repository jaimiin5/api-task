/* eslint-disable react/prop-types */
import { useState } from "react";

const carTypes = ["AUTOMATIC", "MANUAL","SEMI-AUTO"];
const AddDriverForm = ({  setIsOpen, refreshDrivers }) => {
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    mobile: "",
    address: "",
    car_type: [],
    image_upload: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleCarTypeChange = (e) => {
    const { value, checked } = e.target;
    setFormData((prevData) => {
      const carTypeList = checked
        ? [...prevData.car_type, value]
        : prevData.car_type.filter((type) => type !== value);
      return { ...prevData, car_type: carTypeList };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/enquiry/drivers/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        refreshDrivers();
        setIsOpen(false);
      } 
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="bg-gray-900 p-6 rounded-lg shadow-lg max-w-md w-full">
      <h2 className="text-white text-lg mb-4">Add Driver</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="first_name"
          placeholder="First Name"
          value={formData.first_name}
          onChange={handleChange}
          className="border border-gray-600 p-2 rounded w-full mb-4 bg-gray-800 text-white"
          required
        />
        <input
          type="text"
          name="last_name"
          placeholder="Last Name"
          value={formData.last_name}
          onChange={handleChange}
          className="border border-gray-600 p-2 rounded w-full mb-4 bg-gray-800 text-white"
        />
        <input
          type="text"
          name="mobile"
          placeholder="Mobile Number"
          value={formData.mobile}
          onChange={handleChange}
          className="border border-gray-600 p-2 rounded w-full mb-4 bg-gray-800 text-white"
          required
        />
        <input
          type="text"
          name="address"
          placeholder="Address"
          value={formData.address}
          onChange={handleChange}
          className="border border-gray-600 p-2 rounded w-full mb-4 bg-gray-800 text-white"
          required
        />

        <div className="mb-4">
          <span className="text-white">Car Types:</span>
          {carTypes.map((type) => (
            <div key={type} className="flex items-center">
              <input
                type="checkbox"
                value={type}
                onChange={handleCarTypeChange}
                className="mr-2"
              />
              <label className="text-white">{type}</label>
            </div>
          ))}
        </div>

        <div className="flex justify-between">
          <button type="submit" className="bg-green-500 text-white p-2 rounded">
            Add Driver
          </button>
          <button onClick={() => setIsOpen(false)} className="bg-red-500 text-white p-2 rounded">
            Close
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddDriverForm;
