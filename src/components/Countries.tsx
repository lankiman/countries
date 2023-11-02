import { useState, useEffect, Dispatch, SetStateAction } from "react";
import { useNavigate } from "react-router-dom";
import { ICountries } from "../interface";

interface Props {
  element: string;
  text: string;
  regions: string;
  search: string;
  countries: any[];
  loading: boolean;
  theme: string;
  setSelectedCountry: Dispatch<SetStateAction<ICountries | undefined>>;
}

function Countries({
  regions,
  element,
  text,
  search,
  countries,
  loading,
  setSelectedCountry,
  theme
}: Props) {
  const [renderingData, setRenderingData] = useState<ICountries[]>([]);

  useEffect(() => {
    setRenderingData(countries);
  }, [countries]);

  const navigate = useNavigate();

  const [notInRegion, setNotInRegion] = useState(false);

  useEffect(() => {
    if (regions != "Filter by Region") {
      let countryValid = false;
      const regionCountries = countries.filter((country) => {
        const isMatch = country.name.common
          .toLowerCase()
          .includes(search.toLowerCase().trim());
        isMatch ? (countryValid = true) : null;
        if (country.region == regions) {
          if (!search) {
            return true;
          } else if (isMatch) {
            return true;
          }
        }
        return false;
      });
      setNotInRegion(countryValid);
      setRenderingData(regionCountries);
    } else {
      const filteredCountries = countries.filter((country) => {
        const isMatch = country.name.common
          .toLowerCase()
          .includes(search.toLowerCase().trim());
        if (isMatch) {
          return true;
        }
      });
      setRenderingData(filteredCountries);
    }
  }, [search, regions]);

  const handleCountryClick = (value: ICountries) => {
    setSelectedCountry(value);
    localStorage.setItem("selectedCountry", JSON.stringify(value));
    navigate("/CountryDetails");
  };
  if (loading) {
    return (
      <div
        className={`${text} text-4xl animate__animated animate__pulse animate__infinite md:text-6xl flex items-center h-full w-full justify-center `}
      >
        {" "}
        <div
          className={`w-16 h-16 border-t-4 ${
            theme == "light" ? "border-black" : "border-white"
          }  border-solid rounded-full animate-spin`}
        ></div>
      </div>
    );
  }

  if (renderingData.length > 0) {
    return (
      <div className="flex flex-col gap-10 items-center p-4  md:pr-8 md:pl-16 md:gap-y-14 md:gap-x-8 md:p-0 lg:grid-cols-4 md:grid-cols-2 md:grid">
        {renderingData.map((country) => (
          <div
            key={country.name.common}
            onClick={() => handleCountryClick(country)}
            className={`${element} ${text} hover:animate-pulse cursor-pointer rounded-md shadow-md flex flex-col gap-6 w-[18rem] h-[23rem]  md:w-[95%] md:h-[25rem]`}
          >
            <div className="h-[50%]">
              <img
                className="w-full h-full rounded-t-md"
                src={country.flags.png}
              />
            </div>

            <div className="h-[40%] px-6">
              <p key={country.name.common} className="font-extrabold">
                {country.name.common}
              </p>
              <div className="mt-4">
                <p className="font-bold" key={country.population}>
                  Population:{" "}
                  <span className="text-inputs-light">
                    {country.population.toLocaleString()}
                  </span>
                </p>
                <p className="font-bold" key={country.region}>
                  Region:{" "}
                  <span className="text-inputs-light">{country.region}</span>
                </p>
                <p className="font-bold" key={country.capital}>
                  Capital:{" "}
                  <span className="text-inputs-light">{country.capital}</span>
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }
  if (notInRegion && regions != "Filter by Region") {
    return (
      <div
        className={`${text} text-3xl text-center animate__animated animate-pulse animate__infinite md:text-6xl mt-[12rem] md:mt-0 flex md:items-center h-full w-full justify-center `}
      >
        Country does not exist in Region
      </div>
    );
  } else if (search && !notInRegion) {
    return (
      <div
        className={`${text} text-3xl animate__animated animate-pulse animate__infinite md:text-6xl mt-[12rem] md:mt-0 flex md:items-center h-full w-full justify-center `}
      >
        Country does not exist
      </div>
    );
  }
}

export default Countries;
