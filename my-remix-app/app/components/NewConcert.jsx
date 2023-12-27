import  { useState } from "react";
import { useNavigate } from "@remix-run/react";

export default function NewConcert() {
  const [dateError, setDateError] = useState("");
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    style: [],
    address: {
      street: "",
      city: "",
    },
    date: "",
  });
  const [formError, setFormError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

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

    const currentDate = new Date().toISOString().split('T')[0];

    if (!formData.address.street || !formData.address.city || formData.style.length === 0 || !formData.date || formData.date < currentDate) {
      setFormError("Veuillez remplir tous les champs");
      setDateError("La date du concert doit être ultérieure à la date du jour.");
      return;
    }

    try {
      const response = await fetch("/new-concert", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSuccessMessage("Le concert a bien été créé");
      } else {
        console.error("Erreur lors de la création du concert.");
      }
    } catch (error) {
      console.error("Erreur lors de la création du concert.", error);
    }
  };

  return (
    <div className="p-4">
      <form
        onSubmit={handleSubmit}
        id="concert-form"
        className="max-w-md mx-auto bg-white rounded-md p-6 shadow-md"
      >
        <div className="mb-4">
          <label
            className="block text-gray-700 font-bold mb-2"
            htmlFor="street"
          >
            Rue :
          </label>
          <input
            type="text"
            id="street"
            className="mt-1 p-2 border rounded-md w-full"
            name="street"
            value={formData.address.street}
            onChange={(e) =>
              setFormData({
                ...formData,
                address: {
                  ...formData.address,
                  street: e.target.value,
                },
              })
            }
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2" htmlFor="city">
            Ville et code postal :
          </label>
          <input
            type="text"
            id="city"
            className="mt-1 p-2 border rounded-md w-full"
            name="city"
            value={formData.address.city}
            onChange={(e) =>
              setFormData({
                ...formData,
                address: {
                  ...formData.address,
                  city: e.target.value,
                },
              })
            }
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2" htmlFor="date">
            Date :
          </label>
          <input
            type="date"
            id="date"
            className="mt-1 p-2 border rounded-md w-full"
            name="date"
            value={formData.date}
            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
          />
           {dateError && <p className="text-red-500">{dateError}</p>}
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">Styles :</label>
          <div className="flex flex-wrap">
            {[
              "Rock",
              "Jazz",
              "Blues",
              "Pop",
              "Funk",
              "Classique",
              "Rap",
              "RnB",
            ].map((style) => (
              <label key={style} className="mr-4 mb-2 inline-flex items-center">
                <input
                  type="checkbox"
                  value={style}
                  className="form-checkbox text-indigo-600"
                  checked={formData.style.includes(style)}
                  onChange={() => handleCheckboxChange("style", style)}
                />
                <span className="ml-2">{style}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="text-center">
          {formError && <p className="text-red-500">{formError}</p>}
          {successMessage && (
            <p className="text-black font-bold mb-4">{successMessage}</p>
          )}
          <button
            type="submit"
            className="bg-indigo-500 text-white p-2 rounded-md hover:bg-indigo-700"
          >
            Créer le concert
          </button>
        </div>
      </form>

      <div className="mt-4 text-center">
        <button
          onClick={() => navigate("/concerts")}
          className="bg-black text-white p-2 rounded-md hover:bg-gray-800"
        >
          Retourner vers la page Concerts
        </button>
      </div>
    </div>
  );
}
