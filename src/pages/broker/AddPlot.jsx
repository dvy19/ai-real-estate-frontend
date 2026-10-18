
import { useState } from "react";

import plotService from '../../services/plotService'
const initialForm = {
  title: "",
  description: "",
  plotType: "Residential",
  status: "available",
  areaValue: "",
  areaUnit: "Sq.Ft",
  price: "",
  pricePerSqFt: "",
  address: "",
  city: "",
  state: "",
  pincode: "",
  longitude: "",
  latitude: "",
  length: "",
  width: "",
  dimensionUnit: "ft",
  facing: "North",
  roadWidth: "",
  legalStatus: "Approved",
  ownershipType: "Freehold",
};

export default function AddPlot() {
  const [formData, setFormData] = useState(initialForm);
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState("");
  const [amenityInput, setAmenityInput] = useState("");
  const [amenities, setAmenities] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Add an amenity to the array
  const addAmenity = () => {
    const value = amenityInput.trim();

    if (value && !amenities.includes(value)) {
      setAmenities((prev) => [...prev, value]);
      setAmenityInput("");
    }
  };

  const removeAmenity = (item) => {
    setAmenities((prev) => prev.filter((a) => a !== item));
  };

  // Select and preview an image
  const handleImageChange = (e) => {
    const file = e.target.files?.[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setMessage("Please select a valid image.");
      e.target.value = "";
      return;
    }

    setImage(file);
    setPreview(URL.createObjectURL(file));
    setMessage("");
  };

  const removeImage = () => {
    if (preview) URL.revokeObjectURL(preview);

    setImage(null);
    setPreview("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const payload = {
        title: formData.title,
        description: formData.description,
        plotType: formData.plotType,
        status: formData.status,

        area: {
          value: Number(formData.areaValue),
          unit: formData.areaUnit,
        },

        price: Number(formData.price),
        pricePerSqFt: Number(formData.pricePerSqFt),

        location: {
          address: formData.address,
          city: formData.city,
          state: formData.state,
          pincode: formData.pincode,
          coordinates: {
            type: "Point",
            coordinates: [
              Number(formData.longitude),
              Number(formData.latitude),
            ],
          },
        },

        dimensions: {
          length: Number(formData.length),
          width: Number(formData.width),
          unit: formData.dimensionUnit,
        },

        facing: formData.facing,
        roadWidth: Number(formData.roadWidth),
        amenities,
        legalStatus: formData.legalStatus,
        ownershipType: formData.ownershipType,
        image,
      };

      console.log(payload)

      const response = await plotService.createPlot(payload);

      console.log(response)
      setMessage(
        response?.message || "Plot added successfully!"
      );

      setFormData(initialForm);
      setAmenities([]);
      removeImage();
      setAmenityInput("");
    } catch (error) {
      console.error("Error adding plot:", error);

      setMessage(
        error.response?.data?.message ||
          "Failed to add plot. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const inputClass =
    "w-full rounded-md border border-gray-300 px-3 py-2 text-sm outline-none focus:border-blue-500";

  const labelClass = "mb-1 block text-sm font-medium text-gray-700";

  const renderInput = (
    label,
    name,
    type = "text",
    required = false
  ) => (
    <div>
      <label className={labelClass} htmlFor={name}>
        {label}
      </label>

      <input
        id={name}
        name={name}
        type={type}
        value={formData[name]}
        onChange={handleChange}
        required={required}
        min={type === "number" ? "0" : undefined}
        step={type === "number" ? "any" : undefined}
        className={inputClass}
      />
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-8">
      <div className="mx-auto max-w-4xl rounded-xl border bg-white p-6 shadow-sm">
        <h1 className="text-2xl font-semibold text-gray-800">
          Add New Plot
        </h1>

        <p className="mb-6 mt-1 text-sm text-gray-500">
          Enter the plot details below.
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic details */}
          <section>
            <h2 className="mb-3 font-semibold text-gray-800">
              Basic Details
            </h2>

            <div className="grid gap-4 sm:grid-cols-2">
              {renderInput("Plot Title", "title", "text", true)}

              <div>
                <label className={labelClass}>Plot Type</label>
                <select
                  name="plotType"
                  value={formData.plotType}
                  onChange={handleChange}
                  className={inputClass}
                >
                  <option value="Residential">Residential</option>
                  <option value="Commercial">Commercial</option>
                  <option value="Agricultural">Agricultural</option>
                  <option value="Industrial">Industrial</option>
                </select>
              </div>

              <div className="sm:col-span-2">
                <label className={labelClass}>Description</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows={3}
                  required
                  className={inputClass}
                />
              </div>

              {renderInput("Area", "areaValue", "number", true)}

              <div>
                <label className={labelClass}>Area Unit</label>
                <select
                  name="areaUnit"
                  value={formData.areaUnit}
                  onChange={handleChange}
                  className={inputClass}
                >
                  <option value="Sq.Ft">Sq.Ft</option>
                  <option value="Sq.Yd">Sq.Yd</option>
                  <option value="Sq.M">Sq.M</option>
                  <option value="Acre">Acre</option>
                  <option value="Hectare">Hectare</option>
                </select>
              </div>

              {renderInput("Price (₹)", "price", "number", true)}
              {renderInput(
                "Price per Sq.Ft (₹)",
                "pricePerSqFt",
                "number",
                true
              )}
            </div>
          </section>

          {/* Location */}
          <section>
            <h2 className="mb-3 font-semibold text-gray-800">
              Location
            </h2>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="sm:col-span-2">
                {renderInput("Full Address", "address", "text", true)}
              </div>

              {renderInput("City", "city", "text", true)}
              {renderInput("State", "state", "text", true)}
              {renderInput("Pincode", "pincode", "text", true)}
              {renderInput("Longitude", "longitude", "number", true)}
              {renderInput("Latitude", "latitude", "number", true)}
            </div>

            <p className="mt-2 text-xs text-gray-500">
              Coordinates are stored as [longitude, latitude].
            </p>
          </section>

          {/* Dimensions */}
          <section>
            <h2 className="mb-3 font-semibold text-gray-800">
              Dimensions
            </h2>

            <div className="grid gap-4 sm:grid-cols-2">
              {renderInput("Length", "length", "number", true)}
              {renderInput("Width", "width", "number", true)}

              <div>
                <label className={labelClass}>Dimension Unit</label>
                <select
                  name="dimensionUnit"
                  value={formData.dimensionUnit}
                  onChange={handleChange}
                  className={inputClass}
                >
                  <option value="ft">Feet</option>
                  <option value="m">Meters</option>
                </select>
              </div>

              <div>
                <label className={labelClass}>Facing</label>
                <select
                  name="facing"
                  value={formData.facing}
                  onChange={handleChange}
                  className={inputClass}
                >
                  {[
                    "North",
                    "South",
                    "East",
                    "West",
                    "North-East",
                    "North-West",
                    "South-East",
                    "South-West",
                  ].map((direction) => (
                    <option key={direction} value={direction}>
                      {direction}
                    </option>
                  ))}
                </select>
              </div>

              {renderInput("Road Width (ft)", "roadWidth", "number")}
            </div>
          </section>

          {/* Amenities */}
          <section>
            <h2 className="mb-3 font-semibold text-gray-800">
              Amenities
            </h2>

            <div className="flex gap-2">
              <input
                type="text"
                value={amenityInput}
                onChange={(e) => setAmenityInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    addAmenity();
                  }
                }}
                placeholder="e.g. Parking, Water Supply"
                className={inputClass}
              />

              <button
                type="button"
                onClick={addAmenity}
                className="rounded-md bg-gray-800 px-4 py-2 text-sm text-white hover:bg-gray-700"
              >
                Add
              </button>
            </div>

            <div className="mt-3 flex flex-wrap gap-2">
              {amenities.map((item) => (
                <span
                  key={item}
                  className="flex items-center gap-2 rounded-full bg-blue-50 px-3 py-1 text-sm text-blue-700"
                >
                  {item}
                  <button
                    type="button"
                    onClick={() => removeAmenity(item)}
                    aria-label={`Remove ${item}`}
                    className="font-bold"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
          </section>

          {/* Legal details */}
          <section>
            <h2 className="mb-3 font-semibold text-gray-800">
              Legal Details
            </h2>

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className={labelClass}>Legal Status</label>
                <select
                  name="legalStatus"
                  value={formData.legalStatus}
                  onChange={handleChange}
                  className={inputClass}
                >
                  <option value="Approved">Approved</option>
                  <option value="Pending">Pending</option>
                  <option value="Not Approved">Not Approved</option>
                </select>
              </div>

              <div>
                <label className={labelClass}>Ownership Type</label>
                <select
                  name="ownershipType"
                  value={formData.ownershipType}
                  onChange={handleChange}
                  className={inputClass}
                >
                  <option value="Freehold">Freehold</option>
                  <option value="Leasehold">Leasehold</option>
                </select>
              </div>
            </div>
          </section>

          {/* Image */}
          <section>
            <h2 className="mb-3 font-semibold text-gray-800">
              Plot Image
            </h2>

            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="block w-full text-sm text-gray-600 file:mr-4 file:rounded-md file:border-0 file:bg-gray-100 file:px-4 file:py-2 file:text-sm file:font-medium"
            />

            {preview && (
              <div className="mt-4">
                <img
                  src={preview}
                  alt="Plot preview"
                  className="h-48 w-full rounded-lg border object-cover sm:w-72"
                />

                <button
                  type="button"
                  onClick={removeImage}
                  className="mt-2 text-sm text-red-600 hover:underline"
                >
                  Remove image
                </button>
              </div>
            )}
          </section>

          {/* Status */}
          <section>
            <label className={labelClass}>Listing Status</label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className={inputClass}
            >
              <option value="available">Available</option>
              <option value="sold">Sold</option>
              <option value="reserved">Reserved</option>
            </select>
          </section>

          {message && (
            <p className="rounded-md bg-gray-50 p-3 text-sm text-gray-700">
              {message}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-md bg-blue-600 px-5 py-3 font-medium text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? "Adding Plot..." : "Add Plot"}
          </button>
        </form>
      </div>
    </div>
  );
}
