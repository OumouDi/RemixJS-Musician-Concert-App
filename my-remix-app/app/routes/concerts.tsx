import { useState } from "react";
import Navbar from "../components/Navbar";
import { json } from "@remix-run/node";
import { useLoaderData , Link} from "@remix-run/react";
import { getConcerts, Concert } from "../models/concert.server";
import ConcertCard from "../components/ConcertCard";
import concertBackgrundImage from "../../public/images/background.jpg";


export const loader = async () => {
  return json({ concerts: await getConcerts() });
};

export default function ConcertList() {
  const { concerts } = useLoaderData<{ concerts: Concert[] }>();
  const [concertStyleFilters, setConcertStyleFilters] = useState<string[]>([]);
  const [showFilters, setShowFilters] = useState(false);

  const toggleFilters = () => {
    setShowFilters(!showFilters);
  };

  const handleConcertStyleFilterChange = (filter: string) => {
    setConcertStyleFilters((prevFilters) =>
      prevFilters.includes(filter)
        ? prevFilters.filter((item) => item !== filter)
        : [...prevFilters, filter]
    );
  };

  const handleResetFilters = () => {
    setConcertStyleFilters([]);
  };

  const filteredConcerts = concerts
    .filter((concert) => new Date(concert.date) > new Date())
    .filter(
      (concert) =>
        concertStyleFilters.length === 0 ||
        concertStyleFilters.includes(concert.style)
    )
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return (
    <div
      className="flex flex-col items-center min-h-screen bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${concertBackgrundImage})` }}
    >
      <Navbar />
      <h1 className="text-3xl font-bold mt-8 mb-8 text-white">
        Liste des concerts à venir
      </h1>
      <Link to="/new-concert">
        <button  className="text-white bg-green-500 px-4 py-2 rounded-md mt-4 mb-6">
         + Créer un nouveau concert
        </button>
      </Link>
      <div className="flex items-center justify-between mb-8">
        <button
          onClick={toggleFilters}
          className="text-white bg-blue-500 px-4 py-2 rounded-md ml-4 mr-4"
        >
          {showFilters ? "Masquer les filtres" : "Filtrer les concerts"}
        </button>

        {showFilters && (
          <div className="flex items-center space-x-8 bg-gray-800 p-4 rounded-md">
            <h3 className="text-white font-semibold mb-2">Styles de concert</h3>
            {[
              "Rock",
              "Jazz",
              "Blues",
              "Pop",
              "Funk",
              "Classique",
              "Rap",
              "RnB",
              "Autre",
            ].map((style) => (
              <label key={style} className="flex items-center text-white">
                <input
                  type="checkbox"
                  value={style}
                  checked={concertStyleFilters.includes(style)}
                  onChange={() => handleConcertStyleFilterChange(style)}
                  className="mr-2"
                />
                {style}
              </label>
            ))}
            <button
              onClick={handleResetFilters}
              className="text-white px-4 py-2 rounded-md border border-white mr-4"
            >
              Tout afficher
            </button>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredConcerts.length === 0 ? (
          <p className="text-white text-center">Aucun concert trouvé.</p>
        ) : (
          filteredConcerts.map((concert) => (
            <ConcertCard key={concert.id} concert={concert}   />
          ))
        )}
      </div>
    </div>
  );
}
