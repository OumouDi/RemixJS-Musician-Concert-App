import Navbar from '../components/Navbar';
import { json } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import { getMusicians } from '../models/musicien.server';
import MusicianCard from '../components/MusicianCard';
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
        {musiciens.map((music) => <MusicianCard key={music.id} music={music} />)}
      </div>
    </div>
  );
}

export default MusicianList;
