export interface BiomRow {
    Name: string;
    TaxID: number;
    AbundanceScore: number;
    RelativeAbundance: string;
    UniqueMatchesFrequency: number;
    Metadata: {
        Title: string;
        Lineage: {
            Rank: string;
            Name: string;
            TaxID: number;
        }[];
        ID: string;
        Assembly?: string;
    };
}
export interface ParsedData {
    AbundanceScore: number;
    RelativeAbundance: number;
    UniqueMatchesFrequency: number;
}
