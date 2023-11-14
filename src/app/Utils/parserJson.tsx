import {BiomRow,  ParsedData} from "@/app/Interfaces/BioRow";

export const parseBiomJson = (jsonContent: any): BiomRow[] => {
    const { rows, data } = jsonContent;
    const parsedRows: BiomRow[] = [];
    const resultArray: ParsedData[] = data.reduce((acc: ParsedData[], item: number[], index: number) => {
        const groupIndex = Math.floor(index / 3);

        if (!acc[groupIndex]) {
            acc[groupIndex] = {
                AbundanceScore: 0,
                RelativeAbundance: 0,
                UniqueMatchesFrequency: 0,
            };
        }

        const group = acc[groupIndex];

        switch (index % 3) {
            case 0:
                group.RelativeAbundance = item[2];
                break;
            case 1:
                group.AbundanceScore = item[2];
                break;
            case 2:
                group.UniqueMatchesFrequency = item[2];
                break;
        }

        return acc;
    }, []);

// Iterate through each row
    for (let i = 0; i < rows.length; i++) {
        const row = rows[i];
        // Extract metadata information
        const metadata = row.metadata;

        // Extract information for the strain level (level === 7)
        const strainInfo = metadata.lineage[7];

        // Extract data information for the current row
        const rowData = resultArray[i];


        // Format abundance score and relative abundance
        const abundanceScore = rowData.AbundanceScore;
        const ra = Number((rowData.RelativeAbundance));
        const relativeAbundance = (ra * 100).toFixed(2) + "%";

        // Create a BiomRow object for the current row
        const biomRow: BiomRow = {
            Name: strainInfo.name,
            TaxID: strainInfo.tax_id,
            AbundanceScore: parseFloat(abundanceScore.toFixed(2)),
            RelativeAbundance: ra < 0.01 ? "< 0.01%" : relativeAbundance,
            UniqueMatchesFrequency: rowData.UniqueMatchesFrequency,
            Metadata: {
                Title: metadata.title,
                Lineage: metadata.lineage.map((item: any) => ({
                    Rank: item.rank,
                    Name: item.name,
                    TaxID: item.tax_id,
                })),
                ID: metadata.id,
                Assembly: metadata.assembly,
            },
        };

        // Add the current row to the parsedRows array
        parsedRows.push(biomRow);
    }

    return parsedRows;
};


