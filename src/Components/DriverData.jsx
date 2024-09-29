import { useEffect, useState } from "react";
import DriverDetailModal from "./DriverDetail";
import AddDriverForm from "./AddDriverForm";

const DriverData = () => {
  const [drivers, setDrivers] = useState([]);
  const [searchId, setSearchId] = useState("");
  const [selectedDriver, setSelectedDriver] = useState(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);

  useEffect(() => {
    const fetchDrivers = async () => {
      const response = await fetch("/api/enquiry/drivers/");
      const data = await response.json();
      setDrivers(data);
    };

    fetchDrivers();
  }, []);

  const handleDelete = async (id) => {
    try {
      const res = await fetch(`/api/enquiry/drivers/${id}/`, {
        method: "DELETE",
      });

      if (res.ok) {
        setDrivers(drivers.filter((driver) => driver.id !== id));
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const filteredDrivers = searchId
    ? drivers.filter((driver) => driver.id === parseInt(searchId))
    : drivers;

  return (
    <div className="p-4 text-black">
      <div className="flex justify-end mb-4">
        <input
          type="text"
          placeholder="Search by ID"
          value={searchId}
          onChange={(e) => setSearchId(e.target.value)}
          className=" bg-slate-200 p-2 rounded text-black w-1/5"
        />
        <button
          onClick={() => setIsAddModalOpen(true)}
          className="ml-4 bg-blue-500 text-white p-2 rounded-lg"
        >
          Add Driver
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-slate-200 text-black rounded-lg overflow-hidden">
          <thead className="h-12 bg-slate-300">
            <tr>
              <th className="py-2 px-4 text-left">ID</th>
              <th className="py-2 px-4 text-left">Name</th>
              <th className="py-2 px-4 text-left">Phone Number</th>
              <th className="py-2 px-4 text-left">Address</th>
              <th className="py-2 px-4 text-left">Car Type</th>
              {/* <th className="py-2 px-4 text-left">Image</th> */}
              <th className="py-2 px-4 text-left">Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredDrivers.map((driver) => (
              <tr key={driver.id} className="hover:bg-slate-300">
                <td className="py-3 px-4 border-b border-gray-300">
                  {driver.id}
                </td>
                <td className="py-3 px-4 border-b border-gray-300">
                  {driver.first_name} {driver.last_name}
                </td>
                <td className="py-3 px-4 border-b border-gray-300">
                  {driver.mobile}
                </td>
                <td className="py-3 px-4 border-b border-gray-300">
                  {driver.address}
                </td>
                <td className="py-3 px-4 border-b border-gray-300">
                  {driver.car_type.join(", ")}
                </td>
                {/* <td className="py-3 px-4 border-b border-gray-300">
                  {driver.image_upload ? (
                    <img
                      src={driver.image_upload}
                      alt="Driver"
                      className="w-16 h-16 object-cover rounded"
                    />
                  ) : (
                    "No Image"
                  )}
                </td> */}
                <td className="py-4 px-4 border-b border-gray-300 ">
                  <button
                    className="bg-blue-500 text-white px-3 py-1 rounded"
                    onClick={() => {
                      setSelectedDriver(driver);
                      setIsUpdateModalOpen(true);
                    }}
                  >
                    View
                  </button>
                  <button
                    className="bg-slate-500 text-white px-3 py-1 ml-4 rounded"
                    onClick={() => handleDelete(driver.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isAddModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 z-50">
          <AddDriverForm
            isOpen={isAddModalOpen}
            setIsOpen={setIsAddModalOpen}
            refreshDrivers={() => setDrivers((prev) => [...prev])}
          />
        </div>
      )}

      {isUpdateModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 z-50">
          <DriverDetailModal
            driver={selectedDriver}
            onClose={() => setIsUpdateModalOpen(false)}
            refreshDrivers={() => setDrivers((prev) => [...prev])}
          />
        </div>
      )}
    </div>
  );
};

export default DriverData;
