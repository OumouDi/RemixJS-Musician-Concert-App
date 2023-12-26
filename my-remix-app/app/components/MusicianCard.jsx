// MusicienCard.js

import PropTypes from 'prop-types'; 
import { Link } from '@remix-run/react';

function MusicianCard({ music }) {
  return (
    <div
      className="bg-white p-6 rounded-lg shadow-md text-center transform transition-transform hover:scale-105 focus:outline-none focus:ring focus:border-blue-300 mb-4"
    >
      <h2 className="text-xl font-bold mb-4">{music.name}</h2>
      <div className="mb-2">
        {Array.isArray(music.style) ? (
          music.style.map((style, index) => (
            <span
              key={index}
              className="bg-black text-white px-2 py-1 rounded-md inline-block mr-2 mb-2"
            >
              {style}
            </span>
          ))
        ) : (
          <span className="bg-black text-white px-2 py-1 rounded-md">
            {music.style}
          </span>
        )}
      </div>
      <p className="text-gray-700">
        <strong>Instruments:</strong>{' '}
        {Array.isArray(music.instrument) ? music.instrument.join(', ') : music.instrument}
      </p>
      <Link to={`/musician/${music.id}`} className="text-white bg-blue-500 mt-4 block p-2 rounded-md hover:bg-blue-600">
        Voir le profil
      </Link>
    </div>
  );
}

MusicianCard.propTypes = {
  music: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    style: PropTypes.oneOfType([PropTypes.string, PropTypes.arrayOf(PropTypes.string)]).isRequired,
    instrument: PropTypes.oneOfType([PropTypes.string, PropTypes.arrayOf(PropTypes.string)]).isRequired,
  }).isRequired,
};

export default MusicianCard;
