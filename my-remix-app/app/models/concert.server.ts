import fs from 'fs/promises';
import path from 'path';

const DB_FILE_PATH = path.resolve(process.cwd(), 'db.json');

export type Concert = {
  id: number;
  style: string;
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
