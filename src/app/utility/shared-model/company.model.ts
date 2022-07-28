import { RoleEnum } from "../shared-constants";

export class CompanyModel {
    address: string;
    company: string;
    country: string;
    vat_number: string;
    city: string;
    dial_code: string;
    createdAt: string;
    email: string;
    fullName: string;
    members: string;
    name: string;
    phone: string;
    regNo: string;
    status: string;
    companyType: string;
    isCompany: boolean;
    isActive: boolean;
    isDeleted: boolean;
    role: RoleEnum | string;
    updatedAt: string;
    __v: number;
    _id: string;
}