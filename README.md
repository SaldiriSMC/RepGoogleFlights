# RepGoogleFlights

## Overview
RepGoogleFlights is a project designed to replicate or simulate functionalities of Google Flights, providing users with tools to search, compare, and book flights in an intuitive and efficient manner. This repository includes the source code, configuration files, and other resources necessary to deploy and extend the application.

## Features
- **Flight Search:** Search for flights based on origin, destination, and dates.
- **Filter and Sort:** Apply filters (e.g., price, airlines, stops) and sort results.
- **Booking Integration:** Simulate or integrate with booking systems.
- **Responsive Design:** Mobile-first design for optimal usability across devices.
- **Extensibility:** Modular architecture for easy feature addition.

## Tech Stack
- **Frontend:** ReactJS
- **API Integration:** Uses external flight APIs (sky-scrapper.p.rapidapi.com)
- **Please use rapid API key and add it in .env file REACT_APP_RAPIDAPI_KEY variable


## Prerequisites
To run this project locally, ensure you have the following installed:
- Node.js (v16 or higher)
- npm or yarn
- Git

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/SaldiriSMC/RepGoogleFlights.git
   cd RepGoogleFlights
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   - Create a `.env` file in the root directory.
   - Add the following variables:
     ```env
     DB_URI=<your_database_connection_string>
     API_KEY=<your_flight_api_key>
     PORT=3000
     ```

4. Start the development server:
   ```bash
   npm start
   ```

5. Open your browser and navigate to:
   ```
   http://localhost:3000
   ```

## Usage
- **Search for Flights:** Enter the departure and destination cities, select travel dates, and click `Search`.
- **Apply Filters:** Refine your results using filters for stops, price range, airlines, etc.
- **Book a Flight:** Click `Book Now` to proceed to the simulated booking process or integration page.

## Testing
Run the test suite to ensure everything is working correctly:
```bash
npm test
```

## Contributing
Contributions are welcome! Follow these steps:
1. Fork the repository.
2. Create a new branch for your feature/bugfix.
   ```bash
   git checkout -b feature-name
   ```
3. Commit your changes.
   ```bash
   git commit -m "Add your message here"
   ```
4. Push to your branch.
   ```bash
   git push origin feature-name
   ```
5. Open a pull request.

## License
This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Contact
For questions or feedback, please reach out to:
- **Author:** Hassan Javed
- **Email:** flancerguyhj@gmail.com
- **GitHub:** [SaldiriSMC](https://github.com/SaldiriSMC)

---
Thank you for using RepGoogleFlights! Happy traveling!

