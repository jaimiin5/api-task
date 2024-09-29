/* eslint-disable react/prop-types */
import { useState } from "react";

const carTypes = ["AUTOMATIC", "MANUAL", "SEMI-AUTO"];

const DriverDetailModal = ({ driver, onClose, refreshDrivers }) => {
  const [formData, setFormData] = useState(driver);

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

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`/api/enquiry/drivers/${driver.id}/`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        refreshDrivers();
        onClose();
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="bg-gray-900 p-6 rounded-lg shadow-lg max-w-md w-full">
      <h2 className="text-white text-lg mb-4">Update Driver</h2>
      <div className="flex items-center justify-start text-white m-4">
        ID: &nbsp;
        <h4 className="text-white bg-slate-700 w-10 p-2">{driver.id}</h4>
      </div>
      <form onSubmit={handleUpdate}>
        <input
          type="text"
          name="first_name"
          value={formData.first_name}
          onChange={handleChange}
          className="border border-gray-600 p-2 rounded w-full mb-4 bg-gray-800 text-white"
          required
        />
        <input
          type="text"
          name="last_name"
          value={formData.last_name}
          onChange={handleChange}
          className="border border-gray-600 p-2 rounded w-full mb-4 bg-gray-800 text-white"
        />
        <input
          type="text"
          name="mobile"
          value={formData.mobile}
          onChange={handleChange}
          className="border border-gray-600 p-2 rounded w-full mb-4 bg-gray-800 text-white"
          required
        />
        <input
          type="text"
          name="address"
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
                checked={formData.car_type.includes(type)}
                onChange={handleCarTypeChange}
                className="mr-2"
              />
              <label className="text-white">{type}</label>
            </div>
          ))}
        </div>

        <div className="flex justify-between">
          <button type="submit" className="bg-blue-500 text-white p-2 rounded">
            Update Driver
          </button>
          <button
            onClick={onClose}
            className="bg-red-500 text-white p-2 rounded"
          >
            Close
          </button>
        </div>
      </form>
    </div>
  );
};

export default DriverDetailModal;
