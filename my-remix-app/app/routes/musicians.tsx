import Navbar from '../components/Navbar';
import { json } from '@remix-run/node';
import { useLoaderData , Link } from '@remix-run/react';
import { getMusicians } from '../models/musicien.server';


export const loader = async () => {
  console.log('loader')
  return json({ musiciens: await getMusicians() });
};


function MusicianList() {
    const { musiciens } = useLoaderData<typeof loader>();
    console.log('Musiciens dans le composant:', musiciens);
  
    
    return (
      <div>
        <Navbar />
        <h1>Profil de musiciens</h1>
        <ul>
          {musiciens.map((music) => (
            <li key={music.id}>
              <Link to={`/musicians/${music.id}`}>
                {music.name} - {music.style} - {music.instrument}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    );
  }

    export default MusicianList;
