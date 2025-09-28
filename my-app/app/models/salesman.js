import Model from '@ember-data/model';
import { attr, hasMany } from '@ember-data/model';

export default class SalesmanModel extends Model {
  @attr('string') name;
  @hasMany('client', {
    inverse: 'salesman',
    async: true, defaultValue() { return []}}) clients;
  @hasMany('client', {async: true}) backup_clients;
}
