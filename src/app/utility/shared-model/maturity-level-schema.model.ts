
export interface Levels {
    _id: string;
    level: number,
    description: string;
}

export interface MaturityLevelSchemaModel {
    description: string;
    levels: number
    schema_name: string;
    _id: string;
}

export interface MaturityLevelSchemaDetailModel {
    _id: string;
    company_id: string;
    schema_name: string;
    description: string;
    levels: Levels[],
    createdAt: string;
    updatedAt: string;
    __v: number;
}

