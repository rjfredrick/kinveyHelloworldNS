import { Observable } from 'data/observable';
import { Kinvey } from 'kinvey-nativescript-sdk';
import { User } from './shared/user.model';
import { Tap } from './shared/tap.model';
import { BackendService } from './shared/backend.service';
import { LoginService } from './shared/login.service';

export class HelloWorldModel extends Observable {

  private _allItems: Array<Tap> = [];
  private _tap: Tap;
  private _message: string;
  private _user: User;
  private _taps: any;
  private _loginPromise: Promise<any>;

  constructor() {
    super();
    this._loginPromise = Promise.resolve();
    
    if (!BackendService.isLoggedIn()) {
      this._user = new User();
      this._user.password = 'demo';
      this._user.username = 'demo';

      this._loginPromise = LoginService.login(this._user).then((user) => {
        return user;
      });
    }

    this._loginPromise.then((user) => {
      this._taps = Kinvey.DataStore.collection<Tap>('Taps');
      const subscription = this._taps.find().subscribe((entities: {}[]) => {
        // ...
        entities.forEach((backendTap: any) => {
          this._allItems.push(
            new Tap(
              backendTap._id,
              backendTap.counter
            ))
        });
        // Initialize default values.
        if (this._allItems.length > 0) {
          this._tap = this._allItems[0];
          this.updateMessage();
        }
      }, (error: Kinvey.BaseError) => {
        // ...
        console.log(error.message);
        this._tap = new Tap(undefined, 0)
      }, () => {
        // ...
        console.log('here');
      });
    }).catch(error => {
      console.log(`error occurred: ${error.message}`);
    });
  }

  get message(): string {
    return this._message;
  }

  set message(value: string) {
    if (this._message !== value) {
      this._message = value;
      this.notifyPropertyChange('message', value)
    }
  }

  public onTap() {
    this._tap.counter--;
    this._taps.save(this._tap).then((entity: {}) => {
      // ...
      this.updateMessage();
    }).catch(function (error: Kinvey.BaseError) {
      // ...
      console.log(error.message);
      this._tap = new Tap(undefined, 0)
    });
  }

  private updateMessage() {
    if (this._tap.counter <= 0) {
      this.message = 'Hoorraaay! You unlocked the NativeScript clicker achievement!';
    } else {
      this.message = `${this._tap.counter} taps left`;
    }
  }
}