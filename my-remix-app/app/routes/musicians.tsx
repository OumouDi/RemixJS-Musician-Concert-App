import Navbar from '../components/Navbar';
import { json } from '@remix-run/node';
import { useLoaderData, Link } from '@remix-run/react';
import { getMusicians } from '../models/musicien.server';
import musicienBackgrundImage from '../../public/images/background.jpg';

export const loader = async () => {
  return json({ musiciens: await getMusicians() });
};

function MusicianList() {
   const { musiciens } = useLoaderData<typeof loader>();

  return (
    <div className="flex flex-col items-center min-h-screen bg-cover bg-center bg-no-repeat" style={{ backgroundImage: `url(${musicienBackgrundImage })` }}>
      <Navbar />
      <h1 className="text-3xl font-bold mt-8 mb-8 text-white">Liste des musiciens</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {musiciens.map((music) => (
          <div
            key={music.id}
            className="bg-gradient-to-r from-blue-200 to-blue-300 p-6 rounded-lg shadow-md text-center transform transition-transform hover:scale-105 focus:outline-none focus:ring focus:border-blue-300"
          >
            <h2 className="text-xl font-bold mb-2">{music.name}</h2>
            <p className="text-gray-700 mb-2">
              <strong>Styles:</strong> {Array.isArray(music.style) ? music.style.join(', ') : music.style}
            </p>
            <p className="text-gray-700">
              <strong>Instruments:</strong>{' '}
              {Array.isArray(music.instrument) ? music.instrument.join(', ') : music.instrument}
            </p>
            <Link
              to={`/musicien/${music.id}`}
              className="text-white bg-blue-500 mt-4 block p-2 rounded-md hover:bg-blue-600"
            >
              Voir le profil
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MusicianList;
