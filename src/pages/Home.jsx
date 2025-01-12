import React, { useState } from "react";
import { useTheme } from "../ThemeContext";
import SearchForm from "../components/SearchForm";
import Listing from "../components/Listing";
const Home = () => {
  const { theme } = useTheme();
  const [flightsList,setFlightsList]=useState([])
  const [loadingSearch, setLoadingSearch] = useState(false);

  return (
    <section
      className={`home flex flex-col items-center min-h-screen ${
        theme === "dark" && "bg-black text-white"
      }`}
    >
      <div className="mx-auto text-center">
        <div className="relative mx-auto max-w-7xl h-24 w-screen md:h-32 md:w-80 lg:h-60 lg:w-screen">
          <div
            className="absolute inset-0 bg-no-repeat bg-center"
            style={{
              backgroundImage:
                "url('https://www.gstatic.com/travel-frontend/animation/hero/flights_nc_4.svg')",
            }}
          ></div>
          <div
            className={`absolute inset-0 bg-no-repeat bg-center ${
              theme === "dark" ? "opacity-100" : "opacity-0"
            }`}
            style={{
              backgroundImage:
                "url('https://www.gstatic.com/travel-frontend/animation/hero/flights_nc_dark_theme_4.svg')",
            }}
          ></div>
        </div>
        <h1 className={`mt-0 md:text-6xl text-4xl font-semibold ${theme === "dark" && "text-white"}`}>
          Flights
        </h1>
      </div>
      <div className="w-full max-w-6xl mx-auto px-4 mt-10">
        <SearchForm setFlightsList={setFlightsList}/>
        <Listing flightsList={flightsList}/>
      </div>
    </section>
  );
};

export default Home;
