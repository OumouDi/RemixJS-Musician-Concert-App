import Navbar from '../components/Navbar';
import { json } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import { getConcerts, Concert } from '../models/concert.server';
import ConcertCard from '../components/ConcertCard';
import concertBackgrundImage  from '../../public/images/background.jpg';

export const loader = async () => {
  return json({ concerts: await getConcerts() });
};

function ConcertList() {
  const { concerts } = useLoaderData<{ concerts: Concert[] }>();

 
  const filteredConcerts = concerts
    .filter(concert => new Date(concert.date) > new Date()) 
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return (
    <div className="flex flex-col items-center min-h-screen bg-cover bg-center bg-no-repeat" style={{ backgroundImage: `url(${concertBackgrundImage})` }}>
      <Navbar />
      <h1 className="text-3xl font-bold mt-8 mb-8 text-white">Liste des concerts à venir</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredConcerts.map((concert) => <ConcertCard key={concert.id} concert={concert} />)}
      </div>
    </div>
  );
}

export default ConcertList;

