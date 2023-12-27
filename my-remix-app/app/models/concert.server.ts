import fs from 'fs/promises';
import path from 'path';

const DB_FILE_PATH = path.resolve(process.cwd(), 'db.json');

export type Concert = {
  id: number;
  style: string | string[];
  address: {
    street: string;
    city: string;
  };
  date: string;
};

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


export async function getConcertById(id: string): Promise<Concert | null> {
  const concerts = await getConcerts();
  return concerts.find((concert) => concert.id === parseInt(id, 10)) || null;
}


export async function addConcert(newConcerts: Concert[], filePath: string = DB_FILE_PATH): Promise<void> {
  try {
    console.log('Adding concert to the JSON file...');
    await fs.writeFile(filePath, JSON.stringify({ concerts: newConcerts }, null, 2), 'utf-8');
    console.log('Concert added successfully to the JSON file.');
  } catch (error) {
    console.error('Error adding concert.', error);
    throw error; // Rethrow the error to be caught by the calling function
  }
}