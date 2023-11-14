import path from 'path';
import {promises as fs} from 'fs';
import {BiomRow} from "@/app/Interfaces/BioRow";
import {parseBiomJson} from "@/app/Utils/parserJson";

export default async function handler(req: any, res: any) {
    try {
        const jsonDirectory = path.join(process.cwd(), 'lib');
        const fileContents = await fs.readFile(jsonDirectory + '/biom.json', 'utf8');
        const jsonData = JSON.parse(fileContents);
        const parsedBiomRow: BiomRow[] = parseBiomJson(jsonData);

        res.status(200).json(parsedBiomRow);
    } catch (error) {
        console.error('Error reading or parsing JSON:', error);
        res.status(500).json({error: 'Failed to read or parse JSON'});
    }

}

