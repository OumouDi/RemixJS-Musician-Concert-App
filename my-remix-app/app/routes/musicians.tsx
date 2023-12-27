import { useState } from 'react';
import Navbar from '../components/Navbar';
import { json } from '@remix-run/node';
import { useLoaderData , Link } from '@remix-run/react';
import { getMusicians, Musicien } from '../models/musicien.server';
import MusicienCard from '../components/MusicianCard';
import musicienBackgrundImage from '../../public/images/background.jpg';


export const loader = async () => {
  return json({ musiciens: await getMusicians() });
};

export default function MusicianList() {
  const { musiciens } = useLoaderData<{ musiciens: Musicien[] }>();
  const [instrumentFilters, setInstrumentFilters] = useState<string[]>([]);
  const [styleFilters, setStyleFilters] = useState<string[]>([]);
  const [showFilters, setShowFilters] = useState(false);



  const toggleFilters = () => {
    setShowFilters(!showFilters);
  };

  const handleFilterChange = (filter: string, setFilters: React.Dispatch<React.SetStateAction<string[]>>) => {
    setFilters((prevFilters) =>
      prevFilters.includes(filter)
        ? prevFilters.filter((item) => item !== filter)
        : [...prevFilters, filter]
    );
  };

  const handleResetFilters = () => {
    setInstrumentFilters([]);
    setStyleFilters([]);
  };

  const filteredMusiciens = musiciens.filter((music) => {
    const instrumentMatch =
      instrumentFilters.length === 0 ||
      (Array.isArray(music.instrument) &&
        music.instrument.some((instrument) => instrumentFilters.includes(instrument as string)));

    const styleMatch =
      styleFilters.length === 0 ||
      (Array.isArray(music.style) && music.style.some((style) => styleFilters.includes(style as string)));

    return instrumentMatch && styleMatch;
  });

  return (
    <div className="flex flex-col items-center min-h-screen bg-cover bg-center bg-no-repeat" style={{ backgroundImage: `url(${musicienBackgrundImage})` }}>
      <Navbar />
      <h1 className="text-3xl font-bold mt-8 mb-8 text-white">Profils de musiciens</h1>
      <Link to="/new-musician">
        <button  className="text-white bg-green-500 px-4 py-2 rounded-md mt-4 mb-6">
         + Créer un nouveau profil musicien
        </button>
      </Link>
      <button onClick={toggleFilters} className="text-white bg-blue-500 px-4 py-2 rounded-md">
        {showFilters ? 'Masquer les filtres' : 'Filtrer les musiciens'}
      </button>

      <div className="mt-4" />

      {showFilters && (
        <div className="flex justify-center space-x-8 mb-4 bg-gray-800 p-4 rounded-md">
          <div>
            <h3 className="text-white font-semibold mb-2">Instruments</h3>
            {['Guitare', 'Batterie', 'Basse', 'Clavier', 'Piano', 'Flute','Saxophone', 'Trombone','Guitare', 'Violon'].map((instrument) => (
              <label key={instrument} className="flex items-center text-white">
                <input
                  type="checkbox"
                  value={instrument}
                  checked={instrumentFilters.includes(instrument)}
                  onChange={() => handleFilterChange(instrument, setInstrumentFilters)}
                  className="mr-2"
                />
                {instrument}
              </label>
            ))}
          </div>

          <div>
            <h3 className="text-white font-semibold mb-2">Styles</h3>
            {['Rock', 'Jazz', 'Blues', 'Pop','Funk', 'Classique','Rap','RnB','Blues'].map((style) => (
              <label key={style} className="flex items-center text-white">
                <input
                  type="checkbox"
                  value={style}
                  checked={styleFilters.includes(style)}
                  onChange={() => handleFilterChange(style, setStyleFilters)}
                  className="mr-2"
                />
                {style}
              </label>
            ))}
          </div>

          <button
            onClick={handleResetFilters}
            className="text-white px-4 py-2 rounded-md ml-4 border border-white" 
          >
            Tout afficher
          </button>
        </div>
      )}

      <div className="mb-8" />

      {filteredMusiciens.length === 0 ? (
        <p className="text-white text-center">Aucun musicien trouvé.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredMusiciens.map((music) => (
            <MusicienCard key={music.id} music={music} />
          ))}
        </div>
      )}
    </div>
  );
}
