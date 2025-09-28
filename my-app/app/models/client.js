import Model from '@ember-data/model';
import { attr, belongsTo } from '@ember-data/model';

export default class ClientModel extends Model {
  @attr('string') name;
  @attr('string') company_name;
  @attr('string') email;
  @attr('string') phone_number;
  @attr('boolean') active;
  @attr('date', { defaultValue: () => new Date() }) date;
  @attr('gender') gender;

  get displayTag() {
    return `${this.name} <${this.email}>`;
  }

  @belongsTo('salesman', { async: true, inverse: 'clients' }) salesman;
  @belongsTo('salesman', { async: true, inverse: 'backup_clients' }) backup_salesman;

}
