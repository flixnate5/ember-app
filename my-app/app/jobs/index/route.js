import Route from '@ember/routing/route';
import { service } from '@ember/service';

export default class JobsIndexRoute extends Route {
  @service store;

  model(params, transition) {
    return this.store.findAll('salesman');
  }
}
