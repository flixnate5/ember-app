import Component from '@glimmer/component';

export default class RentalsFilter extends Component {
  get results() {
    let { rentals, query } = this.args;

    if (query) {
      rentals = rentals.filter(({title, city, category, description}) => [title, city, category, description].join('^').toLowerCase().includes(query.toLowerCase()));
    }

    return rentals;
  }

  <template>
    {{yield this.results}}
  </template>
}
