import Route from '@ember/routing/route';
import { service } from '@ember/service';

export default class ClientsIndexRoute extends Route {
  @service store;

  setupController(controller, context, _transition) {
    this.controllerFor('clients').set('clientModuleTitle', 'Clients List');
  }

  model(params) {
    return this.store.findAll('client');
  }
}
