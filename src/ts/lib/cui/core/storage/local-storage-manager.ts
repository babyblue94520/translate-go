import { AbstractStroage } from './abstract-storage';

export class LocalStorageManager extends AbstractStroage {
    protected static storage = localStorage;
}
