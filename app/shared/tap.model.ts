import { Kinvey } from 'kinvey-nativescript-sdk';
export class Tap implements Kinvey.Entity {
  constructor(
    public _id: string,
    public counter: number,
  ) {}
}