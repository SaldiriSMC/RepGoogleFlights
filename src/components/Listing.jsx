import React, { useState } from "react";
import ReactPaginate from "react-paginate";
import { FaStar } from "react-icons/fa";
const ITEMS_PER_PAGE = 10;

const ListingPage = ({ flightsList }) => {
  const itineraries = flightsList?.itineraries || [];
  const [currentPage, setCurrentPage] = useState(0);
  if ((!Array.isArray(itineraries) || itineraries.length === 0)&&  flightsList?.context?.status) {
    return (
      <div className="text-center mt-10">
        <p>No flights found or something went wrong. Please try again later.</p>
      </div>
    );
  }
  // Calculate the current items to display
  const offset = currentPage * ITEMS_PER_PAGE;
  const currentItems = itineraries.slice(offset, offset + ITEMS_PER_PAGE);
  const pageCount = Math.ceil(itineraries.length / ITEMS_PER_PAGE);

  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected);
  };
  return (
    <div className="flights-list max-w-4xl mx-auto pb-4">
      {currentItems.map((itinerary, index) => (
        <div
          key={index}
          className="itinerary-card border p-4 mb-4 rounded shadow"
        >
          {/* Price */}
          
          {index ===0 &&(
             <div className="price text-lg font-bold text-blue-600">
             {itinerary.price.formatted} <span className="text-yellow-600">Best Deal</span> 
             <div className="flex space-x-1 items-center justify-center">
              <FaStar className="text-yellow-500" />
              <FaStar className="text-yellow-500" />
              <FaStar className="text-yellow-500" />
              <FaStar className="text-yellow-500" />
              <FaStar className="text-yellow-500" />
             </div>
           </div>
          )}

          {index>0 &&(
            <div className="price text-lg font-bold text-blue-600">
             {itinerary.price.formatted}
             </div>
          )}
         

          {/* Leg Details */}
          <div className="flex justify-between md:px-6 px-3">
            {itinerary.legs.map((leg, legIndex) => (
              <div key={legIndex} className="leg-details mt-4">
                {/* Airline Information */}
                <div className="flex md:flex-row flex-col">
                  <div className="airline flex flex-col items-center mr-2">
                    <img
                      src={leg.carriers.marketing[0]?.logoUrl}
                      alt={leg.carriers.marketing[0]?.name}
                      className="md:h-8 md:w-8 h-6 w-6 mr-2 mb-3"
                    />
                    <span className="text-sm">
                      {leg.carriers.marketing[0]?.name}
                    </span>
                  </div>
                  <div>
                    {/* Origin and Destination */}
                    <div className="route text-sm">
                      <strong>{leg.origin.name}</strong> ({leg.origin.displayCode})
                      → <strong>{leg.destination.name}</strong> (
                      {leg.destination.displayCode})
                    </div>

                    {/* Departure and Arrival */}
                    <div className="times text-sm">
                      <span>
                        Departure: {new Date(leg.departure).toLocaleString()}
                      </span>
                      <br />
                      <span>
                        Arrival: {new Date(leg.arrival).toLocaleString()}
                      </span>
                    </div>

                    {/* Duration */}
                    <div className="duration text-sm">
                      Duration: {Math.floor(leg.durationInMinutes / 60)}h{" "}
                      {leg.durationInMinutes % 60}m
                    </div>

                    {/* Stops */}
                    <div className="stops text-sm">
                      Stops: {leg.stopCount > 0 ? `${leg.stopCount}` : "Direct"}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}

{
currentItems.length > 0 &&
      <ReactPaginate
      previousLabel={"← Previous"}
        nextLabel={"Next →"}
        pageCount={pageCount}
        onPageChange={handlePageChange}
        containerClassName={"pagination flex justify-center mt-4 space-x-2"}
        activeClassName={"active text-blue-600 font-bold"}
        pageClassName={"page-item"}
        pageLinkClassName={"page-link px-2 py-1 border rounded"}
        previousClassName={"prev-page"}
        nextClassName={"next-page"}
        disabledClassName={"disabled text-gray-400"}
        />
    }
    </div>
  );
};

export default ListingPage;
