import { Link } from "@remix-run/react";

export default function Navbar() {
  return (
    <nav className="inline-flex justify-center bg-white p-3 rounded-full mt-4"> 
      <ul className="flex space-x-2 items-center h-16">
        <li className="mr-2">
          <Link
            to="/"
            className="text-black font-bold hover:text-black hover:bg-gray-400 transition duration-300 px-1 py-2 rounded-md"
          >
            Accueil
          </Link>
        </li>
        <li>
          <Link
            to="/musicians"
            className="text-black font-bold hover:text-black hover:bg-gray-400 transition duration-300 px-1 py-2 rounded-md"
          >
            Musiciens
          </Link>
        </li>
        <li className="mr-2">
          <Link
            to="/concerts"
            className="text-black font-bold hover:text-black hover:bg-gray-400 transition duration-300 px-1 py-2 rounded-md"
          >
            Concerts
          </Link>
        </li>
     
      </ul>
    </nav>
  );
}
