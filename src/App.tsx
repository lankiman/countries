import { useState, useEffect } from "react";
import Nav from "./components/Nav";
import Filters from "./components/Filters";
import Countries from "./components/Countries";

function App() {
  const savedTheme = localStorage.getItem("theme");
  const initialTheme = savedTheme || "light";

  const [theme, setTheme] = useState(initialTheme);
  const [regions, setRegions] = useState("Filter by Region");
  const [search, setSearch] = useState("");
  const [country, setCountry] = useState([]);

  const regionFiltered = (value: string) => {
    setRegions(value);
  };

  const countrySearched = (value: string) => {
    setSearch(value);
  };
  const countryClicked = (value: []) => {
    setCountry(value);
  };

  useEffect(() => {
    // When the component mounts, check if there's a theme in local storage
    if (savedTheme) {
      setTheme(savedTheme); // Set the theme from local storage
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme); // Save the new theme to local storage
  };

  console.log(country);

  const element = theme == "light" ? "bg-elements-light" : "bg-elements-dark";
  const text = theme == "light" ? "text-texts-light" : "text-texts-dark";

  return (
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
        <Filters
          onFilter={regionFiltered}
          theme={theme}
          element={element}
          text={text}
          countrySearched={countrySearched}
        />
      </div>
      <div>
        <Countries
          search={search}
          regions={regions}
          element={element}
          text={text}
          countryClicked={countryClicked}
        />
      </div>
    </div>
  );
}

export default App;
