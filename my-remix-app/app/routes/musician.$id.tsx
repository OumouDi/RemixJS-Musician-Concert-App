import type { LoaderArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData , Link } from "@remix-run/react";
import { getMusicianById } from "../models/musicien.server";
import Navbar from "../components/Navbar";
import backgroundImage from "../../public/images/background.jpg";

import profilPicture from "../../public/images/profilPicture.png";

export const loader = async ({ params }: LoaderArgs) => {
  const musician = await getMusicianById(params.id);
  return json({ musician });
};

export default function MusicianDetail() {
  const { musician } = useLoaderData<typeof loader>();

  return (
    <div
      className="flex flex-col items-center min-h-screen bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <Navbar />
      <div className="mt-8 mb-16 p-8 bg-gray-100 rounded-xl">
        {musician ? (
          <div className="max-w-md mx-auto bg-white rounded-xl overflow-hidden shadow-lg mb-8">
            <img
              className="w-full h-48 object-contain mt-4 rounded-t-xl rounded-b-none"
              src={profilPicture}
              alt="profil"
            />
            <div className="p-6">
              <h1 className="text-3xl font-bold mb-8 text-center">
                {" "}
                {musician.name}{" "}
              </h1>
              <p className="text-lg mb-2">
                Instruments :{" "}
                {Array.isArray(musician.instrument) ? (
                  musician.instrument.map((inst, index) => (
                    <span
                      key={index}
                      className="bg-blue-500 text-white px-2 py-1 rounded-md inline-block ml-2 mb-2 text-right"
                    >
                      {inst}
                    </span>
                  ))
                ) : (
                  <span className="bg-blue-500 text-white px-2 py-1 rounded-md text-right">
                    {musician.instrument}
                  </span>
                )}
              </p>
              <p className="text-lg mb-4">
                Style :{" "}
                {Array.isArray(musician.style) ? (
                  musician.style.map((style, index) => (
                    <span
                      key={index}
                      className="bg-green-500 text-white px-2 py-1 rounded-md inline-block ml-2 mb-2 text-right"
                    >
                      {style}
                    </span>
                  ))
                ) : (
                  <span className="bg-green-500 text-white px-2 py-1 rounded-md text-right">
                    {musician.style}
                  </span>
                )}
              </p>
            </div>
          </div>
        ) : (
          <div className="text-center text-gray-600">
            <p className="text-2xl font-bold mb-4">Musicien non trouvé</p>
            <p>Le musicien que vous recherchez n'a pas été trouvé.</p>
          </div>
        )}
      </div>
      <button>
        <Link to="/musicien-new">Retour</Link>
      </button>
    </div>
  );
}
