import type { LoaderArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { getConcertById } from '../models/concert.server';  
import Navbar from '../components/Navbar';
import backgroundImage from '../../public/images/background.jpg';
import concertPicture from '../../public/images/concertPicture.jpg';


export const loader = async ({ params }: LoaderArgs) => {
  const concert = await getConcertById(params.id);
  return json({ concert });
};

export default function ConcertDetail() {
  const { concert } = useLoaderData<typeof loader>();

  return (
    <div className="flex flex-col items-center min-h-screen bg-cover bg-center bg-no-repeat" style={{ backgroundImage: `url(${backgroundImage})` }}>
      <Navbar />
      <div className="mt-8 mb-16 p-8 bg-gray-100 rounded-xl">
        {concert ? (
          <div className="max-w-md mx-auto bg-white rounded-xl overflow-hidden shadow-lg mb-8">
            <img className="w-full h-48 object-contain mt-4 rounded-t-lg rounded-b-lg" src={concertPicture} alt='illustration du concert' />
            <div className="p-6">
              <h1 className="text-3xl font-bold mb-8 text-center"> Style {concert.style} </h1>
              <p className="text-lg mb-2">
                <span className="font-bold">Date :</span>  {new Date(concert.date).toLocaleString()}
              </p>
              <p className="text-lg mb-2">
                <span className="font-bold">Lieu :</span> {concert.address.street} {concert.address.city}
              </p>
            </div>
          </div>
        ) : (
          <div className="text-center text-gray-600">
            <p className="text-2xl font-bold mb-4">Concert non trouvé</p>
            <p>Le concert que vous recherchez n'a pas été trouvé.</p>
          </div>
        )}
      </div>
    </div>
  );
}
