import Link from "next/link";
import SearchInput from "./SearchInput";

const Navbar = ({ activeItem, clearTripInfo }) => {
  return (
    <nav className="block w-full max-w-full bg-transparent text-white shadow-none rounded-xl transition-all px-0 py-1">
      <div className="container mx-auto">
        <div className="flex justify-between items-center">
          <div className="capitalize">
            <nav aria-label="breadcrumb">
              <ol className="flex flex-wrap items-center bg-opacity-60 rounded-md bg-transparent p-0">
                <li className={`flex items-center text-blue-gray-900 antialiased font-sans text-sm font-normal leading-normal cursor-pointer transition-colors duration-300 ${activeItem === "dashboard" ? 'hover:text-light-blue-500' : 'hover:text-blue-500'}`}>
                  <Link href="/" onClick={() => clearTripInfo()}>
                    <p className={`block antialiased font-sans text-sm leading-normal text-blue-900 font-normal opacity-50 transition-all ${activeItem === "dashboard" ? 'hover:text-blue-500 hover:opacity-100' : ''}`} >
                      {activeItem}
                    </p>
                  </Link>
                  <span className="text-gray-500 text-sm antialiased font-sans font-normal leading-normal mx-2 pointer-events-none select-none">
                    /
                  </span>
                </li>
                <li className={`flex items-center text-blue-900 antialiased font-sans text-sm font-normal leading-normal cursor-pointer transition-colors duration-300 ${activeItem === "home" ? 'hover:text-blue-500' : ''}`}>
                  <p className="block antialiased font-sans text-sm leading-normal text-blue-gray-900 font-normal">
                    home
                  </p>
                </li>
              </ol>
            </nav>
            <h6 className="block antialiased tracking-normal font-sans text-base font-semibold leading-relaxed text-gray-900">
              {activeItem}
            </h6>
          </div>
          <div className="flex items-center">
            <SearchInput />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;