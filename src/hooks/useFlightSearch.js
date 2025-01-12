import { useState } from "react";

const useFlightSearch = () => {
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

  const searchFlights = async (formData, setFlightsList) => {
    const { from, to, departure, return: returnDate, classType, passengers } = formData;
    
    if (!from || !to || !departure) {
      alert("Please fill in all required fields.");
      return;
    }
    const apiUrl = `https://${process.env.REACT_APP_RAPIDAPI_HOST}/api/v2/flights/searchFlightsWebComplete?originSkyId=${from.value}&destinationSkyId=${to.value}&originEntityId=${from.entityId}&destinationEntityId=${to.entityId}&date=${departure}&returnDate=${returnDate}&cabinClass=${classType}&adults=${passengers.adults}&childrens=${passengers.children}&infants=${passengers.infants}&sortBy=fastest&limit=10&currency=USD&market=en-US&countryCode=US`;
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

  return {
    airportSuggestions,
    loadingFrom,
    loadingTo,
    loadingSearch,
    fetchAirports,
    searchFlights,
  };
};

export default useFlightSearch;
