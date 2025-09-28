import Route from '@ember/routing/route';
import { service } from '@ember/service';

export default class SalesViewRoute extends Route {
  @service store;

  model(params, transition) {
    return this.store.findRecord('salesman', params.salesman_id);
  }

}
