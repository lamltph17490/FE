export interface Tuser {
    _id?: string,
    password: string,
    email: string
    phone?: string
    name?: string
    role?: string
    avatar?: string
    createdAt: string
}
export interface userErr {
    error: "string"
}
export type UserChangePass = {
    _id?: string;
    name: string;
    email: string;
    phone: string;
    avatar?: string;
    role?: number;
    oldPassword: string;
    newPassword: string;
    createdAt?: Date;
  };