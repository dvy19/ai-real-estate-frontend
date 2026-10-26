
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import plotService from "../../services/plotService";

const PlotDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const[plotData,setPlotData]=useState({})

  const[broker,setBroker]=useState({})

  const getPlot=async()=>{

    try{

        const response=await plotService.getSinglePlot(id)

        console.log(response.plot)

        setPlotData(response.plot)
    }
    catch(err){
        console.log
    }
  }

  useEffect(()=>{
    getPlot(id)
  },  [id])

  // Sample data; replace with API data
  const plot = plotData ||{
    title: "Premium Residential Plot",
    description:
      "A well-located residential plot in a developing neighbourhood with convenient access to roads, schools, markets, and essential facilities.",
    plotType: "Residential",
    status: "available",
    area: { value: 1000, unit: "Sq.Ft" },
    price: 8500000,
    pricePerSqFt: 8500,
    address: "Sector 150",
    city: "Noida",
    state: "Uttar Pradesh",
    pincode: "201310",
    latitude: "",
    longitude: "",
    length: 40,
    width: 25,
    dimensionUnit: "ft",
    facing: "North",
    roadWidth: 30,
    legalStatus: "Approved",
    ownershipType: "Freehold",
    image: '',
  };

  const getBroker=async(plotId)=>{

    try{

      const data=await plotService.getPlotBroker(plotData._id)

      console.log(data.broker)

      setBroker(data.broker)
    }
    catch(err){
      console.log(err)
    }
  }

  useEffect(()=>{
    getBroker(plotData._id)
  } , [plotData._id])

  const areaValue =
    typeof plot.area === "object" ? plot.area?.value : plot.areaValue;

  const areaUnit =
    typeof plot.area === "object" ? plot.area?.unit : plot.areaUnit;

  const formatPrice = (price) =>
    price != null && price !== ""
      ? `₹${Number(price).toLocaleString("en-IN")}`
      : "Price on request";

  const status = plot.status || "available";

  const mapUrl =
    plot.latitude && plot.longitude
      ? `https://www.google.com/maps?q=${plot.latitude},${plot.longitude}`
      : `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
          [plot.address, plot.city, plot.state, plot.pincode]
            .filter(Boolean)
            .join(", ")
        )}`;

  const handleBookVisit = () => {
    if (onBookVisit) {
      onBookVisit(plot);
    } else {
      navigate(`/plots/${id || plot._id}/book-visit`);
    }
  };

  const handleChat = () => {
    if (onChat) {
      onChat(broker, plot);
    } else {
      navigate(`/chat/${broker._id}`);
    }
  };

  const details = [
    ["Plot Type", plot.plotType],
    ["Plot Area", `${areaValue ?? "—"} ${areaUnit || ""}`],
    ["Facing", plot.facing],
    ["Length", plot.dimensions?.length ? `${plot.dimensions?.length} ${plot.dimensionUnit || "ft"}` : "—"],
    ["Width", plot.dimensions?.width ? `${plot.dimensions?.width} ${plot.dimensionUnit || "ft"}` : "—"],
    ["Road Width", plot.roadWidth ? `${plot.roadWidth} ft` : "—"],
  ];

  const locations = [
    ["Full Address", plot.location?.address],
    ["City", plot.location?.city],
    ["State", plot.location?.state],
    ["Pincode", plot.location?.pincode],
  ];

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">
      {/* Navbar */}
      <nav className="border-b border-gray-200 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4">
          <h1 className="text-xl font-bold text-emerald-700">
            RealEstate AI
          </h1>

          <button
            onClick={() => navigate(-1)}
            className="text-sm text-gray-600 hover:text-emerald-700"
          >
            ← Back to Listings
          </button>
        </div>
      </nav>

      <main className="mx-auto max-w-7xl px-5 py-8">
        {/* Heading */}
        <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-start">
          <div>
            <span
              className={`mb-3 inline-block rounded-full px-3 py-1 text-xs font-semibold capitalize ${
                status === "available"
                  ? "bg-emerald-100 text-emerald-700"
                  : "bg-gray-200 text-gray-700"
              }`}
            >
              {status}
            </span>

            <h2 className="text-2xl font-bold md:text-3xl">
              {plot.title}
            </h2>

            <p className="mt-2 text-sm text-gray-500">
              📍{" "}
              {[plot.address, plot.city, plot.state, plot.pincode]
                .filter(Boolean)
                .join(", ")}
            </p>
          </div>

          <div className="sm:text-right">
            <p className="text-sm text-gray-500">Total Price</p>
            <h3 className="text-3xl font-bold text-emerald-700">
              {formatPrice(plot.price)}
            </h3>
            {plot.pricePerSqFt != null && (
              <p className="mt-1 text-sm text-gray-500">
                {formatPrice(plot.pricePerSqFt)} per sq. ft.
              </p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {/* Main content */}
          <div className="space-y-6 lg:col-span-2">
            {/* Plot Image */}
            <div className="overflow-hidden rounded-xl border border-gray-200 bg-white">
              {plot.image?.length > 0 ? (
                <img
                  src={
                    plot.image
                  }
                  alt={plot.title}
                  className="h-64 w-full object-cover md:h-96"
                />
              ) : (
                <div className="flex h-64 items-center justify-center bg-gray-100 text-gray-400 md:h-96">
                  <div className="text-center">
                    <span className="text-5xl">🏡</span>
                    <p className="mt-3 text-sm">No plot image available</p>
                  </div>
                </div>
              )}
            </div>

            {/* Overview */}
            <section className="rounded-xl border border-gray-200 bg-white p-6">
              <h3 className="mb-5 text-lg font-semibold">Plot Overview</h3>

              <div className="grid grid-cols-2 gap-x-4 gap-y-6 sm:grid-cols-3">
                {details.map(([label, value]) => (
                  <div key={label}>
                    <p className="text-sm text-gray-500">{label}</p>
                    <p className="mt-1 font-medium">{value || "—"}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Description */}
            <section className="rounded-xl border border-gray-200 bg-white p-6">
              <h3 className="mb-3 text-lg font-semibold">Description</h3>
              <p className="whitespace-pre-line text-sm leading-7 text-gray-600">
                {plot.description || "No description provided."}
              </p>
            </section>

            {/* Location */}
            <section className="rounded-xl border border-gray-200 bg-white p-6">
              <h3 className="mb-5 text-lg font-semibold">Location Details</h3>

              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                {locations.map(([label, value]) => (
                  <div key={label}>
                    <p className="text-sm text-gray-500">{label}</p>
                    <p className="mt-1 font-medium">{value || "—"}</p>
                  </div>
                ))}
              </div>

              <div className="mt-5 border-t border-gray-100 pt-5">
                <a
                  href={mapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-medium text-emerald-700 hover:underline"
                >
                  View on Google Maps →
                </a>
              </div>
            </section>

            {/* Legal Details */}
            <section className="rounded-xl border border-gray-200 bg-white p-6">
              <h3 className="mb-5 text-lg font-semibold">
                Legal & Ownership
              </h3>

              <div className="grid grid-cols-2 gap-5">
                <div>
                  <p className="text-sm text-gray-500">Legal Status</p>
                  <p className="mt-1 font-medium">
                    {plot.legalStatus || "—"}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-gray-500">Ownership Type</p>
                  <p className="mt-1 font-medium">
                    {plot.ownershipType || "—"}
                  </p>
                </div>
              </div>

              <p className="mt-5 text-xs text-gray-400">
                Verify property documents and approvals independently before
                completing a transaction.
              </p>
            </section>
          </div>

          {/* Broker Sidebar */}
          <aside className="space-y-6">
            <section className="rounded-xl border border-gray-200 bg-white p-6  lg:top-6">
              <h3 className="mb-5 text-lg font-semibold">Contact Broker</h3>

              <div className="mb-5 flex items-center gap-4">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-xl font-bold text-emerald-700">
                  {broker.name
                    ? broker.name
                        .split(" ")
                        .map((word) => word[0])
                        .join("")
                        .slice(0, 2)
                        .toUpperCase()
                    : "BR"}
                </div>

                <div className="min-w-0">
                  <h4 className="font-semibold">
                    {broker.name || "Broker"}
                  </h4>
                  <p className="mt-1 text-sm text-gray-500">
                    Property Broker
                  </p>
                </div>
              </div>

              <div className="mb-5 border-t border-gray-100 pt-4">
                <p className="mb-1 text-sm text-gray-500">Phone Number</p>
                {broker.phoneNumber ? (
                  <a
                    href={`tel:${broker.phoneNumber}`}
                    className="font-semibold hover:text-emerald-700"
                  >
                    {broker.phoneNumber}
                  </a>
                ) : (
                  <p className="font-medium">Not provided</p>
                )}
              </div>

              <button
                onClick={()=>{navigate(`/broker-profile/${broker._id}`)}}
                disabled={status !== "available"}
                className="mb-3 w-full rounded-lg bg-emerald-700 py-3 font-semibold text-white transition hover:bg-emerald-800 disabled:cursor-not-allowed disabled:bg-gray-400"
              >
                Book a Visit
              </button>

              <button
                onClick={handleChat}
                className="mb-3 w-full rounded-lg border border-emerald-700 py-3 font-semibold text-emerald-700 transition hover:bg-emerald-50"
              >
                Chat with Broker
              </button>

              {broker.phoneNumber ? (
                <a
                  href={`tel:${broker.phoneNumber}`}
                  className="block w-full rounded-lg border border-gray-200 py-3 text-center font-semibold text-gray-700 transition hover:bg-gray-50"
                >
                  Call Broker
                </a>
              ) : (
                <button
                  disabled
                  className="w-full rounded-lg border border-gray-200 py-3 font-semibold text-gray-400"
                >
                  Call Broker
                </button>
              )}

              <p className="mt-4 text-center text-xs text-gray-400">
                Contact the broker to confirm availability and arrange a visit.
              </p>
            </section>

            {/* Price Summary */}
            <section className="rounded-xl border border-gray-200 bg-white p-6">
              <h3 className="mb-4 font-semibold">Price Summary</h3>

              <div className="mb-4 flex justify-between gap-3 text-sm">
                <span className="text-gray-500">Plot Price</span>
                <span className="font-medium">{formatPrice(plot.price)}</span>
              </div>

              <div className="mb-4 flex justify-between gap-3 text-sm">
                <span className="text-gray-500">Area</span>
                <span className="font-medium">
                  {areaValue ?? "—"} {areaUnit || ""}
                </span>
              </div>

              <div className="mb-4 flex justify-between gap-3 text-sm">
                <span className="text-gray-500">Price / Sq.Ft</span>
                <span className="font-medium">
                  {formatPrice(plot.pricePerSqFt)}
                </span>
              </div>

              <div className="flex items-center justify-between gap-3 border-t border-gray-200 pt-4">
                <span className="font-semibold">Total</span>
                <span className="text-lg font-bold text-emerald-700">
                  {formatPrice(plot.price)}
                </span>
              </div>
            </section>
          </aside>
        </div>
      </main>
    </div>
  );
};

export default PlotDetails;
