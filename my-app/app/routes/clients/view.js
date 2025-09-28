import Route from '@ember/routing/route';
import { service } from '@ember/service';
import { later } from '@ember/runloop';

export default class ClientsViewRoute extends Route {
  @service router;

  @service store;

  // queryParams = {
  //   sortBy: {
  //     refreshModel: false,
  //   },
  //   order: {
  //     refreshModel: true,
  //   },
  // };

  beforeModel(transition) {
    let clientId = transition.to.params.client_id;
    clientId = parseInt(clientId);
    if (isNaN(clientId)) {
      this.router.transitionTo('clients');
    }
  }

  async afterModel(model) {
    if (!model.active) {
      this.router.transitionTo('clients');
      return;
    }

    // Ensure the salesman relationship is loaded so we can render its name in the template
    try {
      await model.belongsTo('salesman').load();
    } catch (e) {
      // If loading the relationship fails, still allow the page to render other fields
      // Optionally, you could log this error or show a notification.
    }
  }

  setupController(controller, model) {
    controller.set('testVar', 'Testing Var');
    this.controllerFor('clients').set('clientModuleTitle', model.name);
  }

  model(params) {
    // console.log(params);

    return this.store.findRecord('client', params.client_id);

    // return new Promise((resolve, reject) => {
    //   later(() => {
    //     console.log('Completing promise');
    //     let clientId = params.client_id;
    //     if (clientId === '1') {
    //       resolve({
    //         id: 1,
    //         name: 'John',
    //         company_name: "John's Furniture",
    //         email: 'john@example.com',
    //         phone_number: '+91 98765 43210',
    //         active: true,
    //       });
    //     } else if (clientId === '2') {
    //       resolve({
    //         id: 2,
    //         name: 'Robert',
    //         company_name: 'Smart Boutique',
    //         email: 'robert@example.com',
    //         phone_number: '+91 98764 53210',
    //         active: false,
    //       });
    //     } else {
    //       reject({ status: 404, detail: 'Client not found' });
    //     }
    //   }, 1500);
    // });
  }

  // model(params) {
  //   let clientId = params.client_id;
  //   if (clientId === '1') {
  //     return {
  //       id: 1,
  //       name: 'John',
  //       company_name: "John's Furniture",
  //       email: 'john@example.com',
  //       phone_number: '+91 98765 43210',
  //       active: true,
  //     };
  //   } else if (clientId === '2') {
  //     return {
  //       id: 2,
  //       name: 'Robert',
  //       company_name: 'Smart Boutique',
  //       email: 'robert@example.com',
  //       phone_number: '+91 98764 53210',
  //       active: false,
  //     };
  //   }
  // }
}
