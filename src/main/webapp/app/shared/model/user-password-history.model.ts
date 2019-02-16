import { IUser } from 'app/core/user/user.model';

export interface IUserPasswordHistory {
    id?: number;
    password?: string;
    user?: IUser;
}

export class UserPasswordHistory implements IUserPasswordHistory {
    constructor(public id?: number, public password?: string, public user?: IUser) {}
}
