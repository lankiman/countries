import { useState, useEffect } from "react";

interface Props {
  element: string;
  text: string;
  regions: string;
  search: string;
}

function Countries({ regions, element, text, search }: Props) {
  const [countries, setCountries] = useState<any[]>([]);

  async function fetchData() {
    try {
      const response = await fetch("https://restcountries.com/v3.1/all");
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setCountries(data);
    } catch (error) {
      console.error("Error fetching data from the API:", error);

      try {
        const localDataResponse = await fetch("../assets/data.json"); // Update the URL to the local JSON file path
        if (!localDataResponse.ok) {
          throw new Error("Local data response was not ok");
        }
        const localData = await localDataResponse.json();
        setCountries(localData);
      } catch (localError) {
        console.error("Error fetching local data:", localError);
        // Handle this case based on your app's requirements
      }
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  // const filteredCountries = countries.filter((country) => {
  //   const isMatch = country.name.common
  //     .toLowerCase()
  //     .includes(search.toLowerCase());
  //   if (!isMatch) {
  //     rgSet(1);
  //     return false;
  //   } else if (country.region == regions) {
  //     return true;
  //   } else if (regions == "Filter by Region") {
  //     return true;
  //   } else if (regions != "Filter by Region" && isMatch) {
  //     rgSet(2);
  //     return false;
  //   }
  // });
  const filteredCountries = countries.filter((country) => {
    const isMatch = country.name.common
      .toLowerCase()
      .includes(search.toLowerCase());
    if (isMatch) {
      return true;
    }
  });
  const regionCountries = countries.filter((country) => {
    const isMatch = country.name.common
      .toLowerCase()
      .includes(search.toLowerCase());
    if (country.region == regions && !search) {
      return true;
    }
    if (country.region == regions && search) {
      if (isMatch) {
        return true;
      }
    }
  });

  const [renderingData, setRenderingData] = useState(filteredCountries);

  useEffect(() => {
    if (regions === "Filter by Region") {
      setRenderingData(filteredCountries);
    } else {
      setRenderingData(regionCountries);
    }
  }, [filteredCountries, regionCountries, regions]);

  if (renderingData.length > 0) {
    return (
      <div className="lg:grid-cols-4 md:grid-cols-2 md:grid md:pl-16 md:pr-2 md:gap-x-6 md:gap-y-16">
        {renderingData.map((country) => (
          <div
            key={country.name.common}
            className={`${element} ${text} hover:animate-pulse cursor-pointer rounded-md shadow-md flex flex-col gap-6 md:w-[19rem] md:h-[25rem]`}
          >
            <div className="h-[50%]">
              <img className="w-full h-full" src={country.flags.png} />
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
  if (filteredCountries.length > 0 && regionCountries.length == 0) {
    return <div>country does not exist in region</div>;
  }
  if (filteredCountries.length == 0 && regionCountries.length == 0) {
    return <div>country does not exist</div>;
  }
}

export default Countries;
