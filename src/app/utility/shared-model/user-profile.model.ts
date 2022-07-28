import { RoleEnum } from "../shared-constants";
export class UserProfileModel {
    address: string;
    company: string;
    companyId: string;
    country: string;
    createdAt: string;
    dial_code: string;
    email: string;
    fullName: string;
    isCompany: boolean;
    isActive: boolean;
    isDeleted: boolean;
    phone: string;
    profilePic: string;
    regNo: string;
    role: RoleEnum | string;
    status: string;
    updatedAt: string;
    __v: number;
    _id: string;
}