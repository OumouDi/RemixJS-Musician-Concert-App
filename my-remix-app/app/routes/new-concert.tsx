import path from 'path';
import {addConcert, getConcerts } from '../models/concert.server';
import Navbar from '../components/Navbar';
import NewConcert from '../components/NewConcert';
import musicienBackgrundImage from '../../public/images/background.jpg';

export default function NewMusicianPage() {
  return (
    <div className="flex flex-col items-center min-h-screen bg-cover bg-center bg-no-repeat" style={{ backgroundImage: `url(${musicienBackgrundImage})` }}>
      <Navbar />
      <NewConcert />
    </div>
  );
}

export async function action({ request }) {
  try {
    const rawData = await request.text();
    const concertData = JSON.parse(rawData);

    const dbFilePath = path.join(process.cwd(), 'dbconcert.json');
    const existingConcerts = await getConcerts(dbFilePath);
    const newConcertId = existingConcerts.length + 1;

    const newConcert = {
      id: newConcertId ,
      style: concertData.style,
      date: concertData.date,
      address: {
        street: concertData.street,
        city: concertData.city,
      },
    };

    console.log('New Musician Data:', newConcert);

    const newConcerts = [...existingConcerts, newConcert];
    console.log('New concerts:', newConcerts); 
    await addConcert(newConcerts, dbFilePath);
  
    console.log('Concert added successfully.');

    return {
      redirect: '/concerts',
    };
  } catch (error) {
    console.error('Error in action:', error);
    return {
      status: 500,
      body: 'Internal Server Error',
    };
  }
}
