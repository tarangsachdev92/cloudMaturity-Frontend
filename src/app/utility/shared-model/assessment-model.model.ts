export interface AssessmentModelDataModel {
    calculation_method: string;
    company_id: string;
    createdAt: string;
    created_by: string;
    description: string;
    is_deleted: boolean;
    max_level: number;
    model_name: string;
    schema_id: SchemaModel;
    is_published: boolean;
    updatedAt: string;
    levels: LevelCriteria;
    criterias: number;
    elements: number;
    __v: number;
    _id: string;
}

export interface SchemaModel {
    description: string;
    schema_name: string;
    _id: string;
}
export interface LevelCriteria {
    criterias: number
    description: string
    level: number
    _id: string
}