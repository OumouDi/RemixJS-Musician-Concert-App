import fs from 'fs/promises';
import path from 'path';

const DB_FILE_PATH = path.join(process.cwd(), 'db.json');

export type Musicien = {
  id: number;
  name: string;
  instrument: Array<string> | string;
  style: Array<string> | string;
};


export async function getMusicians(): Promise<Musicien[]> {
  try {
    console.log('Chargement des musiciens depuis le fichier JSON...');
    const data = await fs.readFile(DB_FILE_PATH, 'utf-8');
    const jsonData = JSON.parse(data);

    return jsonData.musiciens || [];
  } catch (error) {
    console.error('Erreur lors de la lecture des musiciens depuis le fichier JSON.', error);
    return [];
  }
}

export async function getMusicienById(id: string): Promise<Musicien | null> {
  const musiciens = await getMusicians();
  return musiciens.find((musicien) => musicien.id === parseInt(id, 10)) || null;
}
