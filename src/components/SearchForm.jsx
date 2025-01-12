import React, { useState } from "react";
import Select from "react-select";
import { FaExchangeAlt, FaMapMarkerAlt, FaSearch } from "react-icons/fa";
import { FaCircleDot } from "react-icons/fa6";
import "../styles/app.css";
import { useTheme } from "../ThemeContext";

const FlightSearchForm = ({ setFlightsList }) => {
  const { theme } = useTheme();
  const [isSwitched, setIsSwitched] = useState(false);
  const [formData, setFormData] = useState({
    from: "",
    to: "",
    departure: "",
    return: "",
  });

  const [airportSuggestions, setAirportSuggestions] = useState([]);
  const [loadingFrom, setLoadingFrom] = useState(false);
  const [loadingTo, setLoadingTo] = useState(false);
  const [loadingSearch, setLoadingSearch] = useState(false);

  const fetchAirports = async (query, field) => {
    if (!query) {
      setAirportSuggestions([]);
      return;
    }

    const setLoading = field === "from" ? setLoadingFrom : setLoadingTo;
    setLoading(true);

    try {
      const response = await fetch(
        `https://${process.env.REACT_APP_RAPIDAPI_HOST}/api/v1/flights/searchAirport?query=${query}&locale=en-US`,
        {
          headers: {
            "x-rapidapi-host": process.env.REACT_APP_RAPIDAPI_HOST,
            "x-rapidapi-key": process.env.REACT_APP_RAPIDAPI_KEY,
          },
        }
      );
      const data = await response.json();
      if (data.status) {
        const formattedSuggestions = data.data.map((airport) => ({
          label: airport.presentation.suggestionTitle,
          value: airport.skyId,
          entityId: airport.entityId,
        }));
        setAirportSuggestions(formattedSuggestions);
      }
    } catch (error) {
      console.error("Error fetching airports:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSelectChange = (selectedOption, field) => {
    setFormData({ ...formData, [field]: selectedOption ? selectedOption : "" });
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    const { from, to, departure, return: returnDate } = formData;

    if (!from || !to || !departure) {
      alert("Please fill in all required fields.");
      return;
    }

    const apiUrl = `https://${process.env.REACT_APP_RAPIDAPI_HOST}/api/v2/flights/searchFlightsWebComplete?originSkyId=${from.value}&destinationSkyId=${to.value}&originEntityId=${from.entityId}&destinationEntityId=${to.entityId}&date=${departure}&returnDate=${returnDate}&cabinClass=economy&adults=1&sortBy=best&limit=10&currency=USD&market=en-US&countryCode=US`;

    setLoadingSearch(true);

    try {
      const response = await fetch(apiUrl, {
        headers: {
          "x-rapidapi-host": process.env.REACT_APP_RAPIDAPI_HOST,
          "x-rapidapi-key": process.env.REACT_APP_RAPIDAPI_KEY,
        },
      });
      const data = await response.json();
      setFlightsList(data.data || []);
    } catch (error) {
      console.error("Error fetching flights:", error);
    } finally {
      setLoadingSearch(false);
    }
  };

  const handleSwitch = () => {
    setIsSwitched(!isSwitched);
    setFormData((prevFormData) => ({
      ...prevFormData,
      from: prevFormData.to,
      to: prevFormData.from,
    }));
  };

  return (
    <div className="w-full max-w-4xl mx-auto mt-10 mb-5">
      <form
        onSubmit={handleSearch}
        className="flex flex-col items-start border rounded-lg shadow-md p-2 md:p-5 pb-8 md:pb-12 relative"
      >
        {/* Round Trip */}
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
          <div className="flex items-center space-x-4 ml-4">
            <span className="flex items-center font-medium">
              <span>1</span>
              <span className="ml-1">Passenger</span>
            </span>
            <select
              name="classType"
              className="bg-transparent font-medium focus:outline-none"
            >
              <option value="economy">Economy</option>
              <option value="business">Business</option>
            </select>
          </div>
        </div>
        <div className="flex flex-wrap md:flex-nowrap justify-between gap-4 rounded-md">
          {/* From */}
          <div className="flex items-center flex-wrap md:flex-nowrap w-full">
            <div className="flex items-center w-full md:w-auto flex-1 border border-gray-300 rounded-md p-3 px-5 relative">
              <span className=" mr-2">
                <FaCircleDot />
              </span>
              <Select
                className="md:w-44 w-full bg-transparent"
                placeholder="From"
                isLoading={loadingFrom}
                options={airportSuggestions}
                onInputChange={(value) => {
                  if (value.trim()) fetchAirports(value, "from");
                }}
                value={formData.from}
                onChange={(option) => handleSelectChange(option, "from")}
              />
            </div>
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
                  if (value.trim()) fetchAirports(value, "to");
                }}
                value={formData.to}
                onChange={(option) => handleSelectChange(option, "to")}
              />
            </div>
          </div>
          {/* Departure and Return */}
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
