import JSONAPIAdapter from '@ember-data/adapter/json-api';
import config from 'my-app/config/environment';
import { pluralize } from 'ember-inflector';

export default class ApplicationAdapter extends JSONAPIAdapter {
  // In development and test, use same-origin so Mirage can intercept.
  // In production, point to the real API.
  host = config.environment === 'production' ? 'https://exampleapi.com' : '';
  namespace = config.environment === 'production' ? 'api/v1' : '';

  pathForType(type) {
    if (type === 'salesman') {
      return 'salesmen';
    }
    // Fallback to ember-inflector pluralization
    return pluralize(type);
  }

  get headers() {
    const accessToken = localStorage.getItem('accessToken');
    return {
      'Authorization': accessToken ? `Token ${accessToken}` : undefined,
      'Content-Type': 'application/json',
    };
  }
}
