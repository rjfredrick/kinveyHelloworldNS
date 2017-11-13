import { Observable } from 'data/observable';
import { Kinvey } from 'kinvey-nativescript-sdk';
import { User } from './shared/user.model';
import { Grocery } from './shared/grocery.model';

export class HelloWorldModel extends Observable {

  private _allItems: Array<Grocery> = [];
  private _counter: number;
  private _message: string;
  private _user: User;

  constructor() {
    super();

    // Initialize default values.
    this._counter = 42;
    this.updateMessage();

    let user: Kinvey.User = Kinvey.User.getActiveUser();
    if (!user) {
      this._user = new User();
      this._user.password = 'demo2';
      this._user.username = 'demo2';
      Kinvey.User.login(this._user.username, this._user.password).then((user) => {
        console.log('######################## login successful ################################');
        let datastore = Kinvey.DataStore.collection<Grocery>('groceries');
        const subscription = datastore.find().subscribe((entities: {}[]) => {
          // ...
          entities.forEach((grocery: any) => {
            this._allItems.push(
              new Grocery(
                grocery._id,
                grocery.name,
                grocery.done || false,
                grocery.deleted || false
              ))
          });
          this._allItems.forEach((grocery: Grocery) => {
            console.log(`grocery name: ${grocery.name}`);
          });
        }, (error: Kinvey.BaseError) => {
          // ...
          console.log(error.message);
        }, () => {
          // ...
          console.log('here');
        });
      }).catch(error => {
        console.log(`#################### ${error.message} ####################`);
      });
    }
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
    this._counter--;
    this.updateMessage();
  }

  private updateMessage() {
    if (this._counter <= 0) {
      this.message = 'Hoorraaay! You unlocked the NativeScript clicker achievement!';
    } else {
      this.message = `${this._counter} taps left`;
    }
  }
}