import { Moment } from 'moment';
import { IUser } from 'app/core/user/user.model';

export interface IUserExtra {
    id?: number;
    passwordResetDate?: Moment;
    otp?: string;
    loginDate?: Moment;
    lockDate?: Moment;
    invalidTry?: number;
    user?: IUser;
}

export class UserExtra implements IUserExtra {
    constructor(
        public id?: number,
        public passwordResetDate?: Moment,
        public otp?: string,
        public loginDate?: Moment,
        public lockDate?: Moment,
        public invalidTry?: number,
        public user?: IUser
    ) {}
}
