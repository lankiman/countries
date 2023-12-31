import { useState } from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { ChevronDownIcon } from "@heroicons/react/20/solid";

interface Props {
  theme: string;
  element: string;
  text: string;
  setRegions: React.Dispatch<React.SetStateAction<string>>;
  regions: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
}

const Filters = ({
  theme,
  element,
  text,
  setRegions,
  regions,
  setSearch
}: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const continents = ["Africa", "Americas", "Asia", "Europe", "Oceania"];

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (continent: string) => {
    setRegions(continent);
    if (regions == continent) {
      setRegions("Filter by Region");
    }
    setIsOpen(false);
  };

  return (
    <div className="w-screen px-8 md:px-16 p-4 mt-4">
      <div className="md:flex justify-between ite            ms-center">
        <div className={`md:w-[25rem] mb-6 ${element} md:mb-0 flex px-2`}>
          <MagnifyingGlassIcon
            className={`w-5 ${theme} stroke-2 ${
              theme == "light" ? "stroke-inputs-light" : "stroke-inputs-dark"
            }`}
          />
          <input
            className={`${
              theme == "light" ? "text-inputs-light" : "text-inputs-dark"
            } bg-transparent text-xs rounded w-full h-10 p-2 focus:outline-none`}
            type="text"
            placeholder="Search for a country ..."
            onChange={(e) => setSearch(e.target.value)}
          ></input>
        </div>
        <div>
          <div className={`relative w-1/2 md:w-[10rem] text-xs ${text}`}>
            <div
              className={`dropdown-toggle h-10  ${element} p-2 rounded  cursor-pointer flex items-center justify-around shadow `}
              onClick={toggleDropdown}
            >
              {regions}
              <ChevronDownIcon className={`w-5 ${text}`} />
            </div>
            {isOpen && (
              <div
                className={`dropdown-menu z-10 absolute mt-1 w-full ${element} rounded shadow`}
              >
                {continents.map((continent) => (
                  <div
                    key={continent}
                    className={`dropdown-item p-2 ${
                      theme == "light"
                        ? "hover:border-backgrounds-light "
                        : "hover:border-backgrounds-dark"
                    }  cursor-pointer hover:border`}
                    onClick={() => handleOptionClick(continent)}
                  >
                    {continent}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Filters;
