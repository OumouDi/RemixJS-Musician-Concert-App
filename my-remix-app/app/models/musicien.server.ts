import fs from 'fs/promises';
import path from 'path';

const DB_FILE_PATH = path.join(process.cwd(), 'dbmusician.json');

// Définition du type Musicien
export type Musicien = {
  id: number;
  name: string;
  instrument: string | string[];
  style: string | string[];
};

// pour récupérer la liste des musiciens depuis le fichier JSON
export async function getMusicians(filePath: string = DB_FILE_PATH): Promise<Musicien[]> {
  try {
    console.log('Loading musicians from the JSON file...');
    const data = await fs.readFile(filePath, 'utf-8');
    const jsonData = JSON.parse(data);

    return jsonData.musiciens || []; 
  } catch (error) {
    console.error('Error reading musicians from the JSON file.', error);
    return []; 
  }
}

// Fonction pour récupérer un musicien par son id
export async function getMusicianById(id: string): Promise<Musicien | null> {
  console.log('Loading musician from the JSON file...');
  const musicians = await getMusicians();
  return musicians.find((musicien) => musicien.id === parseInt(id, 10)) || null; 
}

//  pour ajouter un nouveau musicien au fichier JSON
export async function addMusician(newMusicians: Musicien[], filePath: string = DB_FILE_PATH): Promise<void> {
  try {
    console.log('Adding musician to the JSON file...');
    await fs.writeFile(filePath, JSON.stringify({ musiciens: newMusicians }, null, 2), 'utf-8');
    console.log('Musician added successfully to the JSON file.');
  } catch (error) {
    console.error('Error adding musician.', error);
  }
}
