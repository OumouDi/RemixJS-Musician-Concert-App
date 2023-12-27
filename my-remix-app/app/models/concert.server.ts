import fs from 'fs/promises';
import path from 'path';

// Chemin du fichier JSON utilisé comme BDD
const DB_FILE_PATH = path.resolve(process.cwd(), 'dbconcert.json');

// Définition du type Concert
export type Concert = {
  id: number;
  style: string | string[];
  address: {
    street: string;
    city: string;
  };
  date: string;
};

//  pour récupérer la liste des concerts depuis le fichier JSON
export async function getConcerts(): Promise<Concert[]> {
  try {
    const data = await fs.readFile(DB_FILE_PATH, 'utf-8');
    const jsonData = JSON.parse(data);
    return jsonData.concerts || [];
  } catch (error) {
    console.error('Erreur lors de la lecture des concerts depuis le fichier JSON.', error);
    return [];
  }
}

//  récupérer le détail d'un concert 

export async function getConcertById(id: string): Promise<Concert | null> {
  try {

    const concerts = await getConcerts();
    // Recherche du concert par son id
    return concerts.find((concert) => concert.id === parseInt(id, 10)) || null;
  } catch (error) {
    console.error('Erreur lors de la récupération des concerts pour getConcertById.', error);
    throw error;
  }
}


// pour ajouter un concert à la liste existante et l'inclute  dans le fichier JSON
export async function addConcert(newConcerts: Concert[], filePath: string = DB_FILE_PATH): Promise<void> {
  try {
    console.log('Ajout du concert dans le fichier JSON...');
    await fs.writeFile(filePath, JSON.stringify({ concerts: newConcerts }, null, 2), 'utf-8');
    console.log('Concert ajouté avec succès dans le fichier JSON.');
  } catch (error) {
    console.error('Erreur lors de l\'ajout du concert.', error);
    throw error;
  }
}
