import { useState } from 'react';
import { useNavigate } from "@remix-run/react";


export default function NewMusician() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    instrument: [],
    style: [],
  });
  const [formError, setFormError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleCheckboxChange = (type, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [type]: prevData[type].includes(value)
        ? prevData[type].filter((item) => item !== value)
        : [...prevData[type], value],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || formData.instrument.length === 0 || formData.style.length === 0) {
      setFormError('Tous les champs doivent être remplis.');
      return;
    }

    try {
      const response = await fetch('/new-musician', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSuccessMessage('Le profil a bien été créé');
      } else {
        console.error('Erreur lors de la création du musicien.');
      }
    } catch (error) {
      console.error('Erreur lors de la création du musicien.', error);
    }
  };

  return (
    <div className="p-4">
      <form onSubmit={handleSubmit} id="musician-form" className="max-w-md mx-auto bg-white rounded-md p-6 shadow-md">
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2" htmlFor="name">
            Nom :
          </label>
          <input
            type="text"
            id="name"
            className="mt-1 p-2 border rounded-md w-full"
            name="name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2" htmlFor="street">
            Instruments :
          </label>
          <div className="flex flex-wrap">
            {['Batterie', 'Basse', 'Clavier', 'Piano', 'Flute', 'Saxophone', 'Trombone', 'Guitare', 'Violon'].map((instrument) => (
              <label key={instrument} className="mr-4 mb-2 inline-flex items-center">
                <input
                  type="checkbox"
                  value={instrument}
                  className="form-checkbox text-indigo-600"
                  checked={formData.instrument.includes(instrument)}
                  onChange={() => handleCheckboxChange('instrument', instrument)}
                />
                <span className="ml-2">{instrument}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2" htmlFor="style">
            Styles :
          </label>
          <div className="flex flex-wrap">
            {['Rock', 'Jazz', 'Blues', 'Pop', 'Funk', 'Classique', 'Rap', 'RnB'].map((style) => (
              <label key={style} className="mr-4 mb-2 inline-flex items-center">
                <input
                  type="checkbox"
                  value={style}
                  className="form-checkbox text-indigo-600"
                  checked={formData.style.includes(style)}
                  onChange={() => handleCheckboxChange('style', style)}
                />
                <span className="ml-2">{style}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="text-center">
          {formError && <p className="text-red-500">{formError}</p>}
          {successMessage && <p className="text-black font-bold mb-4">{successMessage}</p>}
          <button type="submit" className="bg-indigo-500 text-white p-2 rounded-md hover:bg-indigo-700">
            Créer le profil
          </button>
        </div>
      </form>

      <div className="mt-4 text-center">
        <button onClick={() => navigate('/musicians')} className="bg-black text-white p-2 rounded-md hover:bg-gray-800">
          Retourner vers la page Musiciens
        </button>
      </div>
    </div>
  );
}