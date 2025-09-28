import EmberRouter from '@ember/routing/router';
import config from 'my-app/config/environment';

export default class Router extends EmberRouter {
  location = config.locationType;
  rootURL = config.rootURL;
}

Router.map(function () {
  this.route('about');
  this.route('clients', function () {
    this.route('view', { path: '/:client_id' });
  });

  this.route('login');

  this.route('sales', function() {
    this.route('view', { path: '/:salesman_id' });
  });
  this.route('jobs', function() {});
});
