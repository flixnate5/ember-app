# Provider Components

adding a new search feature, and refactor our index.hbs template into a new component along the way. 

    Using forms
    The provider component pattern
    Using block parameters when invoking components
    Yielding data to caller components
    Add input 

search functionality. 
type a word into a search box and our app could just respond with matching and relevant rentals. 

The first step is to add a form with an <input> tag to our index page, and make it look pretty with a class.

app/templates/index.gjs
```gjs

import { LinkTo } from '@ember/routing';
import Jumbo from 'tutorial-app/components/jumbo';
import Rental from 'tutorial-app/components/rental';

<template>
  <Jumbo>
    <h2>Welcome to Super Rentals!</h2>
    <p>We hope you find exactly what you're looking for in a place to stay.</p>
    <LinkTo @route="about" class="button">About Us</LinkTo>
  </Jumbo>

  <div class="rentals">
    <form>
      <label>
        <span>Where would you like to stay?</span>
        <input class="light">
      </label>
    </form>

    <ul class="results">
      {{#each @model as |rental|}}
        <li><Rental @rental={{rental}} /></li>
      {{/each}}
    </ul>
  </div>
</template>
```

## Refactoring the index template into a component 
retain and store the text that the user types in when they use the search box. 
we need a place to store the search query. 

our search box lives on the index.hbs route template, which doesn't have a good place to store this search query state. 



app/components/rentals.gjs
```gjs

import Component from '@glimmer/component';
import Rental from 'tutorial-app/components/rental';

export default class Rentals extends Component {
  <template>
    <div class="rentals">
      <form>
        <label>
          <span>Where would you like to stay?</span>
          <input class="light">
        </label>
      </form>

      <ul class="results">
        {{#each @rentals as |rental|}}
          <li><Rental @rental={{rental}} /></li>
        {{/each}}
      </ul>
    </div>
  </template>
}
```

while extracting our markup into a component, we also renamed the @model argument to be @rentals instead. 


app/templates/index.gjs
```gjs

import { LinkTo } from '@ember/routing';
import Jumbo from 'tutorial-app/components/jumbo';

import Rentals from 'tutorial-app/components/rentals';

<template>
  <Jumbo>
    <h2>Welcome to Super Rentals!</h2>
    <p>We hope you find exactly what you're looking for in a place to stay.</p>
    <LinkTo @route="about" class="button">About Us</LinkTo>
  </Jumbo>

  <Rentals @rentals={{@model}} />
</template>
```



tests/integration/components/rentals-test.gjs
```gjs

import { module, test } from 'qunit';
import { setupRenderingTest } from 'tutorial-app/tests/helpers';
import { render } from '@ember/test-helpers';
import { tracked } from '@glimmer/tracking';
import Rentals from 'tutorial-app/components/rentals';

class State {
  @tracked rentals = {};
}

const state = new State();

module('Integration | Component | rentals', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders all given rental properties by default', async function (assert) {
    state.rentals = [
      {
        id: 'grand-old-mansion',
        title: 'Grand Old Mansion',
        owner: 'Veruca Salt',
        city: 'San Francisco',
        location: {
          lat: 37.7749,
          lng: -122.4194,
        },
        category: 'Estate',
        type: 'Standalone',
        bedrooms: 15,
        image:
          'https://upload.wikimedia.org/wikipedia/commons/c/cb/Crane_estate_(5).jpg',
        description:
          'This grand old mansion sits on over 100 acres of rolling hills and dense redwood forests.',
      },
      {
        id: 'urban-living',
        title: 'Urban Living',
        owner: 'Mike Teavee',
        city: 'Seattle',
        location: {
          lat: 47.6062,
          lng: -122.3321,
        },
        category: 'Condo',
        type: 'Community',
        bedrooms: 1,
        image:
          'https://upload.wikimedia.org/wikipedia/commons/2/20/Seattle_-_Barnes_and_Bell_Buildings.jpg',
        description:
          'A commuters dream. This rental is within walking distance of 2 bus stops and the Metro.',
      },
      {
        id: 'downtown-charm',
        title: 'Downtown Charm',
        owner: 'Violet Beauregarde',
        city: 'Portland',
        location: {
          lat: 45.5175,
          lng: -122.6801,
        },
        category: 'Apartment',
        type: 'Community',
        bedrooms: 3,
        image:
          'https://upload.wikimedia.org/wikipedia/commons/f/f7/Wheeldon_Apartment_Building_-_Portland_Oregon.jpg',
        description:
          'Convenience is at your doorstep with this charming downtown rental. Great restaurants and active night life are within a few feet.',
      },
    ];

    await render(<template><Rentals @rentals={{state.rentals}} /></template>);

    assert.dom('.rentals').exists();
    assert.dom('.rentals input').exists();

    assert.dom('.rentals .results').exists();
    assert.dom('.rentals .results li').exists({ count: 3 });

    assert
      .dom('.rentals .results li:nth-of-type(1)')
      .containsText('Grand Old Mansion');

    assert
      .dom('.rentals .results li:nth-of-type(2)')
      .containsText('Urban Living');

    assert
      .dom('.rentals .results li:nth-of-type(3)')
      .containsText('Downtown Charm');
  });
});
```

# Using a form 
we can finally wire up our search box and store our search query! 

Let's create a component class to store our query state and handle events from the form element and wire up our query state in the component template:

app/components/rentals.gjs
```gjs

import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { on } from '@ember/modifier';
import Rental from 'tutorial-app/components/rental';

export default class Rentals extends Component {
  @tracked query = '';

  @action
  updateQuery(event) {
    let formData = new FormData(event.currentTarget);
    this.query = formData.get('rental-search-term');
  }

  @action
  handleSubmit(event) {
    event.preventDefault();
    this.updateQuery(event);
  }

  <template>
    <div class="rentals">
      <form {{on "input" this.updateQuery}} {{on "submit" this.handleSubmit}}>
        <label>
          <span>Where would you like to stay?</span>
          <input name="rental-search-term" class="light">
        </label>
        <p>The results below will update as you type.</p>
      </form>

      <ul class="results">
        {{#each @rentals as |rental|}}
          <li><Rental @rental={{rental}} /></li>
        {{/each}}
      </ul>
    </div>
  </template>
}
```

FormData is a built-in JavaScript object for handling forms. 
It requires the name attribute on the input. 
We handle both submit and input events for the form so that the query updates both when the user types into the input and when they submit the form.

try adding `<p>{{this.query}}</p>` to the component template and watch it update live as you type!


## Adding the <RentalsFilter> Provider Component 
Now that our search query is wired up to our <Rentals> component, we can get into the really fun stuff! 
Namely, we can make our component filter results based on our search query. 
In order to encapsulate this functionality, we'll create another component called <RentalsFilter>.

app/components/rentals/filter.gjs
```gjs

import Component from '@glimmer/component';

export default class RentalsFilter extends Component {
  get results() {
    let { rentals, query } = this.args;

    if (query) {
      rentals = rentals.filter((rental) => rental.title.includes(query));
    }

    return rentals;
  }

  <template>
    {{yield this.results}}
  </template>
}
```

In the <RentalsFilter> component class, we have created a getter to do the work of filtering through our rentals based on two arguments: `@rentals` and `@query`. 
Inside of our getter function, we have these arguments accessible to us from `this.args`.

we're yielding to something, using the {{yield}} keyword, a syntax that we have seen before. 
As we might recall, the purpose of {{yield}} is to render the block that is passed in by the component's caller, which is the thing that is invoking the current component (a template or another component, for example). 
But in this specific case, we don't just have a {{yield}} keyword. 
Instead, we have `this.results` inside of our {{yield}} keyword. What is that doing, exactly?

let's look at how the data that we're yielding is being used in the <Rentals> component.

app/components/rentals.gjs
```gjs

import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { on } from '@ember/modifier';
import Rental from 'tutorial-app/components/rental';
import RentalsFilter from 'tutorial-app/components/rentals/filter';

export default class Rentals extends Component {
  @tracked query = '';

  @action
  updateQuery(event) {
    let formData = new FormData(event.currentTarget);
    this.query = formData.get('rental-search-term');
  }

  @action
  handleSubmit(event) {
    event.preventDefault();
    this.updateQuery(event);
  }

  <template>
    <div class="rentals">
      <form {{on "input" this.updateQuery}} {{on "submit" this.handleSubmit}}>
        <label>
          <span>Where would you like to stay?</span>
          <input name="rental-search-term" class="light">
        </label>
        <p>The results below will update as you type.</p>
      </form>

      <ul class="results">
        <RentalsFilter @rentals={{@rentals}} @query={{this.query}} as |results|>
          {{#each results as |rental|}}
            <li><Rental @rental={{rental}} /></li>
          {{/each}}
        </RentalsFilter>
      </ul>
    </div>
  </template>
}
```

Here, we're invoking <RentalsFilter> similar to how we've invoked other components. 
We're passing in @rentals and @query as arguments, and we're also passing in a block. 
The block is the content that is enclosed in between the component's opening and closing tags (<RentalsFilter>...</RentalsFilter>). 
We have seen both of these before.

However, the main difference here is the use of as `|results|` when we are invoking our <RentalsFilter> component. 
Incidentally, this new syntax goes hand-in-hand with the `{{yield this.results}}` syntax we were introduced to in the component template.

The `as |results|` syntax might look a little new to us, but it isn't the first time that we've seen this feature in action. 
Back when we first learned about the `{{#each}}` syntax, which we use to loop over a collection, we wrote something like this: `{{#each @items as |item|}}...some content here...{{/each}}`.

When we use this syntax, we are passing a block—the ...some content here... in our example—to {{#each}}. 
Ember will iterate through the array we provided (@items) and render our block once per item in the array.

Inside of our block, we need to be able to access the current item somehow. 
The {{#each}} syntax provides the item to our block via the as |item| declaration, which creates a local variable item, also known as a block parameter. 
In other words, as we iterate through @items, we will have access to the current item that we're looping over through the block parameter (item) The block parameter is only accessible from within inside of the block. 
Ember will fill in the block parameter with the current item of the iteration, and it will do this each time that it renders our block.

The need to provide some data to a block is not unique to the {{#each}} syntax. 
In this case, our `<Rentals::Filter>` component wants to take the unfiltered list of rental properties and match them against the user's query. 
Once the component has matched the rentals against the query, it will need to provide a filtered list of rental properties to its caller (the <Rentals> component).

As it turns out, this ability to provide block params is not a superpower that only built-in syntaxes like {{#each}} can use. 
We can do this with our own components as well. 
In fact, Ember allows us to pass arbitrary data to blocks in the form of passing in additional arguments to the {{yield}} keyword. 
Indeed, this is exactly what we did with {{yield this.results}} in the <RentalsFilter> component.

In our <Rentals> component, we used the `as |results|` syntax when invoking <RentalsFilter>. 
Just like with the {{#each}} syntax, this block parameter syntax allowed our block to access the yielded data using the local variable results. 
The yielded data came from {{yield this.results}}, where this.results is our filtered list of rental properties.

Interestingly, if we take a look at our <RentalsFilter> component template, we see that we don't actually render any content. Instead, this component's only responsibility is to set up some piece of state (this.results, the list of filtered rental properties), and then yield that state back up to its caller (<Rentals>) in the form of a block parameter (as |results|).

This is called the provider component pattern, which we see in action with one component providing data up to its caller.

Okay, now that we have a better sense of which component is rendering what and the theory behind why all of this is happening, let's answer the big unanswered question: does this even work? If we try out our search box in the UI, what happens?

Trying out the search box.

Hooray, it works! Awesome. Now that we've tried this out manually in the UI, let's write a test for this new behavior as well.

tests/integration/components/rentals-test.gjs
```gjs

import { module, test } from 'qunit';
import { setupRenderingTest } from 'tutorial-app/tests/helpers';
import { render } from '@ember/test-helpers';
import { render, fillIn } from '@ember/test-helpers';
import { tracked } from '@glimmer/tracking';
import Rentals from 'tutorial-app/components/rentals';

class State {
  @tracked rentals = {};
}

const state = new State();

module('Integration | Component | rentals', function (hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(function () {
    state.rentals = [
      {
        id: 'grand-old-mansion',
        title: 'Grand Old Mansion',
        owner: 'Veruca Salt',
        city: 'San Francisco',
        location: {
          lat: 37.7749,
          lng: -122.4194,
        },
        category: 'Estate',
        type: 'Standalone',
        bedrooms: 15,
        image:
          'https://upload.wikimedia.org/wikipedia/commons/c/cb/Crane_estate_(5).jpg',
        description:
          'This grand old mansion sits on over 100 acres of rolling hills and dense redwood forests.',
      },
      {
        id: 'urban-living',
        title: 'Urban Living',
        owner: 'Mike Teavee',
        city: 'Seattle',
        location: {
          lat: 47.6062,
          lng: -122.3321,
        },
        category: 'Condo',
        type: 'Community',
        bedrooms: 1,
        image:
          'https://upload.wikimedia.org/wikipedia/commons/2/20/Seattle_-_Barnes_and_Bell_Buildings.jpg',
        description:
          'A commuters dream. This rental is within walking distance of 2 bus stops and the Metro.',
      },
      {
        id: 'downtown-charm',
        title: 'Downtown Charm',
        owner: 'Violet Beauregarde',
        city: 'Portland',
        location: {
          lat: 45.5175,
          lng: -122.6801,
        },
        category: 'Apartment',
        type: 'Community',
        bedrooms: 3,
        image:
          'https://upload.wikimedia.org/wikipedia/commons/f/f7/Wheeldon_Apartment_Building_-_Portland_Oregon.jpg',
        description:
          'Convenience is at your doorstep with this charming downtown rental. Great restaurants and active night life are within a few feet.',
      },
    ];
  });

  test('it renders all given rental properties by default', async function (assert) {

    await render(<template><Rentals @rentals={{state.rentals}} /></template>);

    assert.dom('.rentals').exists();
    assert.dom('.rentals input').exists();

    assert.dom('.rentals .results').exists();
    assert.dom('.rentals .results li').exists({ count: 3 });

    assert
      .dom('.rentals .results li:nth-of-type(1)')
      .containsText('Grand Old Mansion');

    assert
      .dom('.rentals .results li:nth-of-type(2)')
      .containsText('Urban Living');

    assert
      .dom('.rentals .results li:nth-of-type(3)')
      .containsText('Downtown Charm');
  });

  test('it updates the results according to the search query', async function (assert) {
    await render(<template><Rentals @rentals={{state.rentals}} /></template>);

    assert.dom('.rentals').exists();
    assert.dom('.rentals input').exists();

    await fillIn('.rentals input', 'Downtown');

    assert.dom('.rentals .results').exists();
    assert.dom('.rentals .results li').exists({ count: 1 });
    assert.dom('.rentals .results li').containsText('Downtown Charm');

    await fillIn('.rentals input', 'Mansion');

    assert.dom('.rentals .results').exists();
    assert.dom('.rentals .results li').exists({ count: 1 });
    assert.dom('.rentals .results li').containsText('Grand Old Mansion');
  });
});
```


This search functionality is not perfect. 
Ideally, it would also be case-insensitive, and also allow you to search by city, category, type, or description. 

