import { Link } from "@remix-run/react";
import backgroundImage from "../../public/images/background.jpg";
import Navbar from "../components/Navbar";

export default function Index() {
  return (
    <div
      className="flex flex-col items-center h-screen bg-cover bg-no-repeat bg-center"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <Navbar />
      <div className="flex items-center justify-center h-screen">
        <div className="text-white text-center mt-4">
          <h1 className="text-4xl font-bold mb-8">Bienvenue !</h1>
          <p className="text-lg mb-12">
            Découvrez le profil de talentueux musiciens et accédez aux dates des
            prochains concerts à venir.
          </p>
          <p className="text-lg mb-12">
            Créez vous aussi votre profil musicien ou ajoutez des concerts pour
            améliorer votre visibilité !
          </p>
          <div className="flex space-x-4 justify-center">
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-md border-b-2 border-blue-800">
              <Link to="/musicians">Profils de musiciens</Link>
            </button>
            <button className="bg-green-600 hover.bg-green-700 text-white px-6 py-3 rounded-md border-b-2 border-green-800">
              <Link to="/concerts">Concerts</Link>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
