import { ArrowLongLeftIcon } from "@heroicons/react/20/solid";
import { useNavigate } from "react-router-dom";
import { ICountries } from "../interface";

interface Props {
  element: string;
  text: string;
  theme: string;
  selectedCountry: any;
  countries: ICountries[];
}

const CountryDetails = ({
  countries,
  text,
  element,
  theme,
  selectedCountry
}: Props) => {
  const navigate = useNavigate();

  console.log({ selectedCountry });

  if (!selectedCountry) {
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
  const languages: string[] = Object.values(selectedCountry.languages);
  const currency: string[] = Object.values(selectedCountry.currencies).map(
    (currencyObj: any) => currencyObj.name
  );

  const bordersAcry: string[] = selectedCountry.borders;
  const nativeNames: any = Object.values(selectedCountry.name.nativeName).pop();

  const borderCountries: string[] = countries
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
            key={selectedCountry.flags.png}
            src={selectedCountry.flags.png}
            alt=""
            className="w-full rounded-sm "
          />
        </div>
        <div className={`${text}`}>
          <div className="md:mt-2">
            <p
              key={selectedCountry.name.common}
              className="font-extrabold mb-5 md:text-2xl"
            >
              {selectedCountry.name.common}
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
                key={selectedCountry.population}
              >
                Population:{" "}
                <span className="text-inputs-light">
                  {selectedCountry.population.toLocaleString()}
                </span>
              </p>
              <p key={selectedCountry.region} className="min-w-max">
                Region:{" "}
                <span className="text-inputs-light">
                  {selectedCountry.region}
                </span>
              </p>
              <p key={selectedCountry.subregion} className="min-w-max">
                Sub Region:{" "}
                <span className="text-inputs-light">
                  {selectedCountry.subregion}
                </span>
              </p>
              <p key={selectedCountry.capital}>
                Capital:{" "}
                <span className="text-inputs-light">
                  {selectedCountry.capital}
                </span>
              </p>
            </div>
            <div className="mt-6 space-y-1 md:space-y-[0.2rem]">
              <p key={selectedCountry.tld} className="min-w-max">
                Top Level Domain:{" "}
                <span className="text-inputs-light">{selectedCountry.tld}</span>
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
                    key={border}
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
