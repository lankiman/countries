import { useEffect, useState } from "react";
import { ArrowLongLeftIcon } from "@heroicons/react/20/solid";
import { useNavigate } from "react-router-dom";

interface Props {
  element: string;
  text: string;
  theme: string;
}

const CountryDetails = ({ text, element, theme }: Props) => {
  const [dynamicCountry, setDynamicCountry] = useState<any | null>(null);
  const [couns, setCouns] = useState<any[]>([]);

  const navigate = useNavigate();

  useEffect(() => {
    const countryData = localStorage.getItem("country");
    const counsData = localStorage.getItem("couns");

    if (countryData) {
      const parsedCountryData = JSON.parse(countryData);
      setDynamicCountry(parsedCountryData);
    }

    if (counsData) {
      const parsedCounsData = JSON.parse(counsData);
      setCouns(parsedCounsData);
    }
  }, []);

  // Type assertion for dynamicCountry
  const dynamicCountryTyped = dynamicCountry as {
    flags: {
      png: string;
    };
    name: {
      common: string;
      nativeName: {};
    };
    region: string;
    capital: string;
    population: number;
    subregion: string;
    languages: {};

    tld: string;
    borders: [];
    cca3: string;
    currencies: {};
  };

  if (!dynamicCountryTyped) {
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
  const languages: string[] = Object.values(dynamicCountryTyped.languages);
  const currency: string[] = Object.values(dynamicCountryTyped.currencies).map(
    (currencyObj: any) => currencyObj.name
  );

  const bordersAcry: string[] = dynamicCountryTyped.borders;
  const nativeNames: any = Object.values(
    dynamicCountryTyped.name.nativeName
  ).pop();

  const borderCountries: any = couns
    .filter((borderCountry) => {
      if (bordersAcry != undefined)
        return bordersAcry.includes(borderCountry.cca3);
    })
    .map((borderCountry) => borderCountry.name.common);

  return (
    <div className="p-10 md:p-16">
      <div className="mb-10 md:mb-14">
        <button
          onClick={() => {
            navigate("/");
          }}
          className={`${element} ${text} flex w-[6rem]  shadow-md px-2 h-6 text-sm items-center justify-center hover:opacity-75`}
        >
          <ArrowLongLeftIcon className="w-5 mr-2" />{" "}
          <span className="text-inputs-light">Back</span>
        </button>
      </div>
      <div className="flex flex-col lg:flex-row md:flex  md:w-full md:gap-20">
        <div className="mb-8 md:min-w-[28rem]  max-w-[28rem]">
          <img
            key={dynamicCountryTyped.flags.png}
            src={dynamicCountryTyped.flags.png}
            alt=""
            className="w-full rounded-sm "
          />
        </div>
        <div className={`${text}`}>
          <div className="md:mt-2">
            <p
              key={dynamicCountryTyped.name.common}
              className="font-extrabold mb-5 md:text-2xl"
            >
              {dynamicCountryTyped.name.common}
            </p>
          </div>
          <div className="md:flex md:gap-32">
            <div className="space-y-1 md:space-y-[0.2rem]">
              <p className="font-bold ">
                Native Name:{" "}
                <span className="text-inputs-light">{nativeNames.common}</span>
              </p>

              <p
                className="font-bold min-w-max"
                key={dynamicCountryTyped.population}
              >
                Population:{" "}
                <span className="text-inputs-light">
                  {dynamicCountryTyped.population.toLocaleString()}
                </span>
              </p>
              <p key={dynamicCountryTyped.region} className="min-w-max">
                Region:{" "}
                <span className="text-inputs-light">
                  {dynamicCountryTyped.region}
                </span>
              </p>
              <p key={dynamicCountryTyped.subregion} className="min-w-max">
                Sub Region:{" "}
                <span className="text-inputs-light">
                  {dynamicCountryTyped.subregion}
                </span>
              </p>
              <p key={dynamicCountryTyped.capital}>
                Capital:{" "}
                <span className="text-inputs-light">
                  {dynamicCountryTyped.capital}
                </span>
              </p>
            </div>
            <div className="mt-6 space-y-1 md:space-y-[0.2rem]">
              <p key={dynamicCountryTyped.tld} className="min-w-max">
                Top Level Domain:{" "}
                <span className="text-inputs-light">
                  {dynamicCountryTyped.tld}
                </span>
              </p>
              <p className="min-w-max">
                Currencies:{" "}
                <span className="text-inputs-light">{currency}</span>
              </p>
              <p>
                Languages:{" "}
                {languages.map((language: any, index: number) => (
                  <span key={index} className="text-inputs-light">
                    {language}
                    {index < languages.length - 1 && ", "}
                  </span>
                ))}
              </p>
            </div>
          </div>
          <div className="mt-6 md:flex md:items-baseline md:gap-2">
            <p className="md:min-w-fit">Border Countries:</p>
            <div className="flex flex-wrap justify-center gap-2 mt-4">
              {borderCountries.length != 0 ? (
                borderCountries.map((border: string) => (
                  <p
                    className={`${element} text-sm text-inputs-light text-center w-fit px-4 py-1 shadow-md`}
                  >
                    {border}
                  </p>
                ))
              ) : (
                <p
                  className={`${element} text-sm text-inputs-light text-center w-fit px-4 py-1 shadow-md`}
                >
                  none
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CountryDetails;
