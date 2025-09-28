import Route from '@ember/routing/route';
import { action } from '@ember/object';

export default class LoginRoute extends Route {


  @action submit(user) {
    // Implement login logic here
    console.log(`Logging in user: ${user.email}`);
  }
}
