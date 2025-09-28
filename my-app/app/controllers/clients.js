import Controller from '@ember/controller';

export default class ClientsController extends Controller {
  clientModuleTitle = 'Clients';

  queryParams = ['sortBy', 'order'];
  sortBy = null;
  order = null;
}
