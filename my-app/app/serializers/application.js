import JSONAPISerializer from '@ember-data/serializer/json-api';
import { singularize } from 'ember-inflector';

export default class ApplicationSerializer extends JSONAPISerializer {
  // Some backends (or mock data) may send types in plural form, e.g. "clients".
  // Ember Data expects model names (singular) as the resource type.
  // Map incoming plural types to the correct singular model name to avoid
  // "Missing Resource Type" errors.
  modelNameFromPayloadType(type) {
    return singularize(type);
  }
}
