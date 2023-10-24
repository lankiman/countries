import { useState, useEffect } from "react";

interface Props {
  element: string;
  text: string;
  regions: string;
  search: string;
  countryClicked: (value: []) => void;
}

function Countries({ regions, element, text, search, countryClicked }: Props) {
  const [countries, setCountries] = useState<any[]>([]);
  const [renderingData, setRenderingData] = useState<any[]>([]);

  async function fetchData() {
    try {
      const response = await fetch("https://restcountries.com/v3.1/all");
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setCountries(data);
      setRenderingData(data);
    } catch (error) {
      console.error("Error fetching data from the API:", error);

      try {
        const localDataResponse = await fetch("../assets/data.json");
        if (!localDataResponse.ok) {
          throw new Error("Local data response was not ok");
        }
        const localData = await localDataResponse.json();
        setCountries(localData);
        setRenderingData(localData);
      } catch (localError) {
        console.error("Error fetching local data:", localError);
      }
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  const errorChecker = countries.filter((country) => {
    const isMatch = country.name.common
      .toLowerCase()
      .includes(search.toLowerCase().trim());
    if (isMatch) {
      return true;
    }
  });

  useEffect(() => {
    if (regions != "Filter by Region") {
      const regionCountries = countries.filter((country) => {
        const isMatch = country.name.common
          .toLowerCase()
          .includes(search.toLowerCase().trim());
        if (country.region == regions && !search) {
          return true;
        }
        if (country.region == regions && search) {
          if (isMatch) {
            return true;
          }
        }
      });
      setRenderingData(regionCountries);
    } else if (regions == "Filter by Region") {
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

  const handleCountryClick = (value: []) => {
    countryClicked(value);
  };

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
                    {country.population}
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
  if (errorChecker.length > 0 && regions != "Filter by Region") {
    return <div>country does not exist in region</div>;
  } else if (search && errorChecker.length < 1) {
    return <div>country does not exist</div>;
  }
}

export default Countries;
