
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import brokerService from "../../services/brokerService";
const initialForm = {
  name: "",
  phone: "",
  city: "",
  office: "",
  isVerified: false,
  rating: 0,
  propertyTypes: [],
  image: null,
};

const propertyOptions = [
  "Residential Plot",
  "Commercial Plot",
  "House",
  "Apartment",
  "Commercial Property",
];

const BrokerDetails = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState(initialForm);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;

    if (type === "file") {
      const file = files?.[0];
      if (!file) return;

      setFormData((prev) => ({ ...prev, image: file }));
      setPreview(URL.createObjectURL(file));
      return;
    }

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handlePropertyType = (type) => {
    setFormData((prev) => ({
      ...prev,
      propertyTypes: prev.propertyTypes.includes(type)
        ? prev.propertyTypes.filter((item) => item !== type)
        : [...prev.propertyTypes, type],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (formData.propertyTypes.length === 0) {
      setError("Please select at least one property type.");
      return;
    }

    try {
      setLoading(true);

      console.log(formData)

      const broker=await brokerService.createBroker(formData);

      console.log(broker)

      setSuccess("Broker profile created successfully!");
      setFormData(initialForm);
      setPreview(null);
    } catch (err) {
      setError(
        err.response?.data?.message || "Failed to create broker profile."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-10">
      <div className="mx-auto max-w-3xl">

        {/* Header */}
        <div className="mb-8">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="mb-4 text-sm text-gray-500 hover:text-emerald-700"
          >
            ← Back
          </button>

          <h1 className="text-2xl font-bold text-gray-800 sm:text-3xl">
            Create Broker Profile
          </h1>

          <p className="mt-2 text-sm text-gray-500">
            Add your professional details to connect with potential buyers.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-6 rounded-xl border border-gray-200 bg-white p-5 shadow-sm sm:p-8"
        >
          {/* Profile Image */}
          <section>
            <h2 className="mb-4 text-lg font-semibold text-gray-800">
              Profile Photo
            </h2>

            <div className="flex flex-col items-start gap-5 sm:flex-row sm:items-center">
              <div className="flex h-24 w-24 shrink-0 items-center justify-center overflow-hidden rounded-full border border-gray-200 bg-gray-100">
                {preview ? (
                  <img
                    src={preview}
                    alt="Broker preview"
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <span className="text-3xl text-gray-400">👤</span>
                )}
              </div>

              <div>
                <label
                  htmlFor="image"
                  className="inline-block cursor-pointer rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                  Upload Photo
                </label>

                <input
                  id="image"
                  name="image"
                  type="file"
                  accept="image/*"
                  onChange={handleChange}
                  className="hidden"
                />

                <p className="mt-2 text-xs text-gray-400">
                  Choose a clear profile photo.
                </p>
              </div>
            </div>
          </section>

          <div className="border-t border-gray-100" />

          {/* Personal Details */}
          <section>
            <h2 className="mb-5 text-lg font-semibold text-gray-800">
              Personal Information
            </h2>

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">

              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Full Name *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                  required
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Enter phone number"
                  required
                  pattern="[0-9+() -]{7,20}"
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  City *
                </label>
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  placeholder="e.g. Noida"
                  required
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Office Address *
                </label>
                <input
                  type="text"
                  name="office"
                  value={formData.office}
                  onChange={handleChange}
                  placeholder="Enter office address"
                  required
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600"
                />
              </div>

            </div>
          </section>

          <div className="border-t border-gray-100" />

          {/* Property Types */}
          <section>
            <h2 className="mb-2 text-lg font-semibold text-gray-800">
              Property Expertise
            </h2>

            <p className="mb-4 text-sm text-gray-500">
              Select the property types you deal in.
            </p>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {propertyOptions.map((type) => (
                <label
                  key={type}
                  className={`flex cursor-pointer items-center gap-3 rounded-lg border p-4 text-sm transition ${
                    formData.propertyTypes.includes(type)
                      ? "border-emerald-600 bg-emerald-50 text-emerald-800"
                      : "border-gray-200 hover:bg-gray-50"
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={formData.propertyTypes.includes(type)}
                    onChange={() => handlePropertyType(type)}
                    className="h-4 w-4 accent-emerald-700"
                  />
                  {type}
                </label>
              ))}
            </div>
          </section>

          <div className="border-t border-gray-100" />

          {/* Professional Details */}
          <section>
            <h2 className="mb-5 text-lg font-semibold text-gray-800">
              Professional Details
            </h2>

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">

              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Rating
                </label>

                <select
                  name="rating"
                  value={formData.rating}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm outline-none focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600"
                >
                  <option value={0}>No rating</option>
                  <option value={1}>1 Star</option>
                  <option value={2}>2 Stars</option>
                  <option value={3}>3 Stars</option>
                  <option value={4}>4 Stars</option>
                  <option value={5}>5 Stars</option>
                </select>

                <p className="mt-2 text-xs text-gray-400">
                  Set an initial rating only if your backend permits it.
                </p>
              </div>

              <div className="flex items-center gap-3 rounded-lg border border-gray-200 p-4">
                <input
                  id="isVerified"
                  name="isVerified"
                  type="checkbox"
                  checked={formData.isVerified}
                  onChange={handleChange}
                  className="h-4 w-4 accent-emerald-700"
                />

                <label htmlFor="isVerified" className="cursor-pointer">
                  <span className="block text-sm font-medium text-gray-800">
                    Verified Broker
                  </span>
                  <span className="mt-1 block text-xs text-gray-500">
                    Mark profile as verified
                  </span>
                </label>
              </div>

            </div>
          </section>

          {/* Feedback */}
          {error && (
            <p className="rounded-lg bg-red-50 p-3 text-sm text-red-700">
              {error}
            </p>
          )}

          {success && (
            <p className="rounded-lg bg-emerald-50 p-3 text-sm text-emerald-700">
              {success}
            </p>
          )}

          {/* Actions */}
          <div className="flex flex-col-reverse gap-3 border-t border-gray-100 pt-5 sm:flex-row sm:justify-end">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="rounded-lg border border-gray-300 px-6 py-3 text-sm font-semibold text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              className="rounded-lg bg-emerald-700 px-6 py-3 text-sm font-semibold text-white transition hover:bg-emerald-800 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? "Creating Profile..." : "Create Broker Profile"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BrokerDetails;
