import { MoonIcon, SunIcon } from "@heroicons/react/24/outline";

interface Props {
  theme: string;
  toggleTheme: () => void;
  element: string;
  text: string;
}

const Nav = ({ theme, toggleTheme, element, text }: Props) => {
  const mode = theme === "light" ? "Light Mode" : "Dark Mode";

  return (
    <div className={`w-screen px-8 md:px-16 p-4 ${element}`}>
      <div className="flex justify-between items-center">
        <div>
          <h3 className={`text-xs md:text-xl font-extrabold ${text}`}>
            Where in the world?
          </h3>
        </div>
        <div
          onClick={toggleTheme}
          className="flex gap-2 cursor-pointer items-center"
        >
          {theme == "dark" ? (
            <MoonIcon className="w-5 fill-white text-transparent" />
          ) : (
            <SunIcon className="w-5 fill-white " />
          )}
          <p className={`text-xs md:text-sm ${text}`}>{mode}</p>
        </div>
      </div>
    </div>
  );
};

export default Nav;
