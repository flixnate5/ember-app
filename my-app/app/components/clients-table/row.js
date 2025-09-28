import Component from '@glimmer/component';

export default class ClientsTableRow extends Component {
  getDisplayName = (client) => {
    return `${client.name} <${client.email}>`;
  };
}
