import { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Nav from "./components/Nav";
import Filters from "./components/Filters";
import Countries from "./components/Countries";
import CountryDetails from "./components/CountryDetails";
import { ICountries } from "./interface";

function App() {
  const savedTheme = localStorage.getItem("theme");
  const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
  const initialTheme = savedTheme || systemTheme;

  const [theme, setTheme] = useState(initialTheme);
  const [regions, setRegions] = useState("Filter by Region");
  const [search, setSearch] = useState("");

  useEffect(() => {
    if (savedTheme) {
      setTheme(savedTheme);
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
  };

  const element = theme == "light" ? "bg-elements-light" : "bg-elements-dark";
  const text = theme == "light" ? "text-texts-light" : "text-texts-dark";

  const [countries, setCountries] = useState<ICountries[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState<ICountries>();

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const response = await fetch("https://restcountries.com/v3.1/all");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setCountries(data);
        setLoading(false);
        localStorage.setItem("countries", JSON.stringify(data));
      } catch (error) {
        console.error("Error fetching data from the API:", error);
        setLoading(false);
      }
    }
    const countries = JSON.parse(localStorage.getItem("countries") as string);
    if (!countries) {
      fetchData();
    } else {
      setCountries(countries);
    }

    const selectedCountry = JSON.parse(
      localStorage.getItem("selectedCountry") as string
    );
    selectedCountry ? setSelectedCountry(selectedCountry) : null;
  }, []);

  return (
    <Router>
      <div
        className={`w-screen h-screen overflow-auto ${
          theme == "light" ? "bg-backgrounds-light" : "bg-backgrounds-dark"
        }`}
      >
        <div className="">
          <Nav
            toggleTheme={toggleTheme}
            theme={theme}
            element={element}
            text={text}
          />
        </div>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Filters
                  setRegions={setRegions}
                  regions={regions}
                  theme={theme}
                  element={element}
                  text={text}
                  setSearch={setSearch}
                />
                <Countries
                  search={search}
                  countries={countries}
                  loading={loading}
                  regions={regions}
                  element={element}
                  text={text}
                  setSelectedCountry={setSelectedCountry}
                  theme={theme}
                />
              </>
            }
          />
          <Route
            path="/CountryDetails"
            element={
              <CountryDetails
                selectedCountry={selectedCountry}
                countries={countries}
                element={element}
                text={text}
                theme={theme}
              />
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
