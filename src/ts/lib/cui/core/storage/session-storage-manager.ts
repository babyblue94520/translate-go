import { AbstractStroage } from './abstract-storage';


export class SessionStorageManager extends AbstractStroage {
    protected static storage = sessionStorage;
}
