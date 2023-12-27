import path from 'path';
import { addMusician, getMusicians } from '../models/musicien.server';
import Navbar from '../components/Navbar';
import NewMusician from '../components/NewMusician';
import musicienBackgrundImage from '../../public/images/background.jpg';

export default function NewMusicianPage() {
  return (
    <div className="flex flex-col items-center min-h-screen bg-cover bg-center bg-no-repeat" style={{ backgroundImage: `url(${musicienBackgrundImage})` }}>
      <Navbar />
      <NewMusician />
    </div>
  );
}

export async function action({ request }) {
  try {
    const rawData = await request.text();
    const musicianData = JSON.parse(rawData);

    const dbFilePath = path.join(process.cwd(), 'db.json');
    const existingMusicians = await getMusicians(dbFilePath);
    const newMusicianId = existingMusicians.length + 1;

    const newMusician = {
      id: newMusicianId,
      name: musicianData.name,
      instrument: musicianData.instrument,
      style: musicianData.style,
    };

    console.log('New Musician Data:', newMusician);

    const newMusicians = [...existingMusicians, newMusician];
    console.log('New Musicians:', newMusicians); 
    await addMusician(newMusicians, dbFilePath);
  
    console.log('Musician added successfully.');

    return {
      redirect: '/musicians',
    };
  } catch (error) {
    console.error('Error in action:', error);
    return {
      status: 500,
      body: 'Internal Server Error',
    };
  }
}
