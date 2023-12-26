
import PropTypes from 'prop-types';
import { Link } from '@remix-run/react';

function ConcertCard({ concert }) {
  return (
    <div
      className="bg-white p-6 rounded-lg shadow-md text-center transform transition-transform hover:scale-105 focus:outline-none focus:ring focus:border-blue-300 mb-4"
    >
      <h2 className="text-xl font-bold  mb-4">Style {concert.style}</h2>
      <p className="text-gray-700">
        <strong>Date:</strong> {new Date(concert.date).toLocaleString()}
      </p>
      <p className="text-gray-700">
        <strong>Adresse:</strong> {`${concert.address.street}, ${concert.address.city}`}
      </p>
      <Link to={`/concert/${concert.id}`} className="text-white bg-blue-500 mt-4 block p-2 rounded-md hover:bg-blue-600">
        Voir les détails
      </Link>
    </div>
  );
}

ConcertCard.propTypes = {
  concert: PropTypes.shape({
    id: PropTypes.number.isRequired,
    style: PropTypes.string.isRequired,
    address: PropTypes.shape({
      street: PropTypes.string.isRequired,
      city: PropTypes.string.isRequired,
    }).isRequired,
    date: PropTypes.string.isRequired,
  }).isRequired,
};

export default ConcertCard;
