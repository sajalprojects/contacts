import { ILocation } from 'app/shared/model//location.model';

export const enum Language {
    FRENCH = 'FRENCH',
    ENGLISH = 'ENGLISH',
    SPANISH = 'SPANISH'
}

export interface IClient {
    id?: number;
    language?: Language;
    firstName?: string;
    lastName?: string;
    email?: string;
    phoneNumber?: string;
    company?: string;
    location?: ILocation;
}

export class Client implements IClient {
    constructor(
        public id?: number,
        public language?: Language,
        public firstName?: string,
        public lastName?: string,
        public email?: string,
        public phoneNumber?: string,
        public company?: string,
        public location?: ILocation
    ) {}
}
