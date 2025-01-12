import React, { useState, useRef, useEffect } from "react";
import Select from "react-select";
import { FaExchangeAlt, FaMapMarkerAlt, FaSearch } from "react-icons/fa";
import { FaCircleDot } from "react-icons/fa6";
import "../styles/app.css";
import { useTheme } from "../ThemeContext";
import useFlightSearch from "../hooks/useFlightSearch";
import { dropdownStyles } from "../styles/customStyles";

const FlightSearchForm = ({ setFlightsList }) => {
  const { theme } = useTheme();
  const {
    airportSuggestions,
    loadingFrom,
    loadingTo,
    loadingSearch,
    fetchAirports,
    searchFlights,
  } = useFlightSearch();

  const [isSwitched, setIsSwitched] = useState(false);
  const [showPassengerMenu, setShowPassengerMenu] = useState(false);
  const [formData, setFormData] = useState({
    from: "lahore",
    to: "karachi",
    departure: "",
    return: "",
    classType: "economy",
    passengers: {
      adults: 1, 
      children: 0, 
      infants:0,
    },
  });
  const passengerMenuRef = useRef(null);
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        passengerMenuRef.current &&
        !passengerMenuRef.current.contains(event.target)
      ) {
        setShowPassengerMenu(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelectChange = (selectedOption, field) => {
    setFormData({ ...formData, [field]: selectedOption || "" });
  };

  const handlePassengerChange = (type, operation) => {
    setFormData((prevState) => ({
      ...prevState,
      passengers: {
        ...prevState.passengers,
        [type]:
          operation === "increment"
            ? prevState.passengers[type] + 1
            : Math.max(prevState.passengers[type] - 1, 0),
      },
    }));
  };

  const handleSearch = (e) => {
    e.preventDefault();
    searchFlights(formData, setFlightsList);
  };

  const handleSwitch = () => {
    setIsSwitched(!isSwitched);
    setFormData((prevFormData) => ({
      ...prevFormData,
      from: prevFormData.to,
      to: prevFormData.from,
    }));
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <div className="w-full max-w-4xl mx-auto mt-10 mb-5">
    <form
      onSubmit={handleSearch}
      className="flex flex-col items-start border rounded-lg shadow-md p-2 md:p-5 pb-8 md:pb-12 relative"
    >
      {/* Trip Type */}
      <div className="flex md:mb-6 mb-3">
        <div className="flex items-center space-x-2">
          <select
            name="tripType"
            className="bg-transparent font-medium focus:outline-none"
          >
            <option value="round-trip">Round trip</option>
            <option value="one-way">One way</option>
          </select>
        </div>

        {/* Passenger Dropdown */}
        <div
          className="relative ml-4 z-50"
          ref={passengerMenuRef}
          onClick={() => setShowPassengerMenu(!showPassengerMenu)}
        >
          <div className="bg-transparent font-medium cursor-pointer">
            <span>
              {formData.passengers.adults + formData.passengers.children + formData.passengers.infants}{" "}
              Passengers
            </span>
          </div>
          {showPassengerMenu && (
            <div className="absolute mt-2 w-72 border border-gray-300 rounded-md shadow-lg bg-white z-10">
              <div className="p-2">
                {/* Adults */}
                <div className="flex items-center justify-between mb-2">
                  <span>Adults</span> <span className="text-xs">(12 Years)</span>
                  <div className="flex items-center">
                    <button
                      type="button"
                      className="px-3 py-1 bg-gray-200 rounded-md"
                      onClick={(e) => {
                        e.stopPropagation();
                        handlePassengerChange("adults", "decrement");
                      }}
                    >
                      -
                    </button>
                    <span className="mx-3">{formData.passengers.adults}</span>
                    <button
                      type="button"
                      className="px-3 py-1 bg-gray-200 rounded-md"
                      onClick={(e) => {
                        e.stopPropagation();
                        handlePassengerChange("adults", "increment");
                      }}
                    >
                      +
                    </button>
                  </div>
                </div>
                {/* Children */}
                <div className="flex items-center justify-between">
                  <span>Children </span> <span className="text-xs">(2-12 Years)</span>
                  <div className="flex items-center">
                    <button
                      type="button"
                      className="px-3 py-1 bg-gray-200 rounded-md"
                      onClick={(e) => {
                        e.stopPropagation();
                        handlePassengerChange("children", "decrement");
                      }}
                    >
                      -
                    </button>
                    <span className="mx-3">{formData.passengers.children}</span>
                    <button
                      type="button"
                      className="px-3 py-1 bg-gray-200 rounded-md"
                      onClick={(e) => {
                        e.stopPropagation();
                        handlePassengerChange("children", "increment");
                      }}
                    >
                      +
                    </button>
                  </div>
                </div>
                {/* infants */}
                <div className="flex items-center justify-between mt-2">
                  <span >Infants </span> <span className="text-xs">(under 2 Years)</span>
                  <div className="flex items-center">
                    <button
                      type="button"
                      className="px-3 py-1 bg-gray-200 rounded-md"
                      onClick={(e) => {
                        e.stopPropagation();
                        handlePassengerChange("infants", "decrement");
                      }}
                    >
                      -
                    </button>
                    <span className="mx-3">{formData.passengers.infants}</span>
                    <button
                      type="button"
                      className="px-3 py-1 bg-gray-200 rounded-md"
                      onClick={(e) => {
                        e.stopPropagation();
                        handlePassengerChange("infants", "increment");
                      }}
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Class Dropdown */}
        <div className="flex items-center space-x-4 ml-4">
          <select
            name="classType"
            value={formData.classType}
            onChange={handleInputChange}
            className="bg-transparent font-medium focus:outline-none"
          >
            <option value="economy">Economy</option>
            <option value="business">Business</option>
          </select>
        </div>
      </div>

      {/* From, To, and Dates */}
      <div className="flex flex-wrap md:flex-nowrap justify-between gap-4 rounded-md">
        {/* From */}
        <div className="flex items-center flex-wrap md:flex-nowrap w-full">
          <div className="flex items-center w-full md:w-auto flex-1 border border-gray-300 rounded-md p-3 px-5 relative">
            <span className="mr-2">
              <FaCircleDot />
            </span>
            <Select
              className="md:w-44 w-full bg-transparent"
              placeholder="From"
              isLoading={loadingFrom}
              options={airportSuggestions}
              onInputChange={(value) => {
                if (value.trim() && value.length >= 3)
                  fetchAirports(value, "from");
              }}
              value={formData.from}
              onChange={(option) => handleSelectChange(option, "from")}
              styles={dropdownStyles(theme)}
            />
          </div>

          {/* Switch */}
          <div
            className={`flex justify-center mx-[-14px] items-center p-3 border z-10 border-gray-300 rounded-full cursor-pointer ${
              theme === "dark" ? "bg-black text-white" : "bg-white"
            }`}
            onClick={handleSwitch}
          >
            <FaExchangeAlt />
          </div>

          {/* To */}
          <div className="flex items-center w-full md:w-auto flex-1 border border-gray-300 rounded-md p-3 px-5 relative">
            <span className="mr-2">
              <FaMapMarkerAlt />
            </span>
            <Select
              className="md:w-44 w-full"
              placeholder="To"
              isLoading={loadingTo}
              options={airportSuggestions}
              onInputChange={(value) => {
                if (value.trim() && value.length >= 3)
                  fetchAirports(value, "to");
              }}
              value={formData.to}
              onChange={(option) => handleSelectChange(option, "to")}
              styles={dropdownStyles(theme)}
            />
          </div>
        </div>

        {/* Departure and Return Dates */}
        <div className="flex items-center w-full md:w-auto flex-1 border border-gray-300 rounded-md px-4 py-4 space-x-4">
          <div className="flex items-center space-x-2">
            <input
              type="date"
              name="departure"
              value={formData.departure}
              onChange={(e) =>
                setFormData({ ...formData, departure: e.target.value })
              }
              className="bg-transparent focus:outline-none"
            />
          </div>
          <div className="w-px"></div>
          <div className="flex items-center space-x-2">
            <input
              type="date"
              name="return"
              value={formData.return}
              onChange={(e) =>
                setFormData({ ...formData, return: e.target.value })
              }
              className="bg-transparent focus:outline-none"
            />
          </div>
        </div>
      </div>

      {/* Search Button */}
      <button
        type="submit"
        disabled={loadingSearch}
        className={`bg-blue-600 flex items-center text-white absolute bottom-[-15px] left-1/2 transform -translate-x-1/2 font-medium px-6 py-2 rounded-full ${
          loadingSearch ? "opacity-50" : "hover:bg-blue-700"
        } transition`}
      >
        {loadingSearch ? (
          <span>Loading...</span>
        ) : (
          <>
            <FaSearch className="me-2" />
            Explore
          </>
        )}
      </button>
    </form>
  </div>
  );
};

export default FlightSearchForm;
