export interface OrganisationModel {
    _id: string;
    ischild_org: boolean;
    parent: OrganisationModel;
    parent_org_id?: string;
    is_active: boolean;
    created_at: string;
    org_name: string;
    description: string;
    company_id: string;
    createdAt: string;
    updatedAt: string;
    expanded?: boolean;
    __v: number;
}