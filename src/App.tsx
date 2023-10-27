import { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Nav from "./components/Nav";
import Filters from "./components/Filters";
import Countries from "./components/Countries";
import CountryDetails from "./components/CountryDetails";

function App() {
  const savedTheme = localStorage.getItem("theme");
  const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
  const initialTheme = savedTheme || systemTheme;

  const [theme, setTheme] = useState(initialTheme);
  const [regions, setRegions] = useState("Filter by Region");
  const [search, setSearch] = useState("");

  const regionFiltered = (value: string) => {
    setRegions(value);
  };

  const countrySearched = (value: string) => {
    setSearch(value);
  };

  const countryClicked = (value: []) => {
    localStorage.setItem("country", JSON.stringify(value));
  };

  const fetchCounData = (data: []) => {
    localStorage.setItem("couns", JSON.stringify(data));
  };

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
                  onFilter={regionFiltered}
                  theme={theme}
                  element={element}
                  text={text}
                  countrySearched={countrySearched}
                />

                <Countries
                  search={search}
                  regions={regions}
                  element={element}
                  text={text}
                  countryClicked={countryClicked}
                  fetchCounData={fetchCounData}
                  theme={theme}
                />
              </>
            }
          />
          <Route
            path="/CountryDetails"
            element={
              <CountryDetails element={element} text={text} theme={theme} />
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
