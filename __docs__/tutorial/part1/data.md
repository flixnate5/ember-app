# Working With Data


        Working with route files
        Returning local data from the model hook
        Accessing route models from templates
        Mocking server data with static JSON files
        Fetching remote data from the model hook
        Adapting server data
        Loops and local variables in templates with {{#each}}

## Working with Route Files 
In Ember, route files are the place to do that. 

creating a route file for the index route. 
We will create a new file at `app/routes/index.js` with the following content:

app/routes/index.js
```ts

import Route from '@ember/routing/route';

export default class IndexRoute extends Route {
  async model() {
    return {
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
      image: 'https://upload.wikimedia.org/wikipedia/commons/c/cb/Crane_estate_(5).jpg',
      description: 'This grand old mansion sits on over 100 acres of rolling hills and dense redwood forests.',
    };
  }
}
```

1. importing the Route class into the file. This class is used as a starting point for adding functionality to a route, such as loading data.
2. extending the Route class into our own IndexRoute, which we also export so that the rest of the application can use it.

## Returning Local Data from the Model Hook 
We implemented an async method called model(). 
 model hook is responsible for fetching and preparing any data that you need for your route. 
Ember will automatically call this hook when entering a route, so that you can have an opportunity to run your own code to get the data you need. 
The object returned from this hook is known as the model for the route (surprise!).

## Accessing Route Models from Templates 
So, now that we've prepared some model data for our route, let's use it in our template. 
In route templates, we can access the model for the route as @model. 
In our case, that would contain the POJO returned from our model hook.

To test that this is working, let's modify our template and try to render the title property from our model:

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

  <h1>{{@model.title}}</h1>

  <div class="rentals">
    <ul class="results">
      <li><Rental /></li>
      <li><Rental /></li>
      <li><Rental /></li>
    </ul>
  </div>
</template>
```

we should see our model data reflected as a new header.

Instead of explicitly hard-coding the rental information into our Rental component, 
we can pass the model object to our component instead.

First, let's pass in our model to our Rental component as the @rental argument. 


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
    <ul class="results">
      <li><Rental @rental={{@model}} /></li>
      <li><Rental @rental={{@model}} /></li>
      <li><Rental @rental={{@model}} /></li>
    </ul>
  </div>
</template>
```

Now, we can replace our hard-coded values in this component by using the values that live on our @rental model.

app/components/rental.gjs
```gjs

import RentalImage from 'tutorial-app/components/rental/image';
import Map from 'tutorial-app/components/map';

<template>
  <article class="rental">
    <RentalImage
      src={{@rental.image}}
      alt="A picture of {{@rental.title}}"
    />
    <div class="details">
      <h3>{{@rental.title}}</h3>
      <div class="detail owner">
        <span>Owner:</span> {{@rental.owner}}
      </div>
      <div class="detail type">
        <span>Type:</span> {{@rental.type}}
      </div>
      <div class="detail location">
        <span>Location:</span> {{@rental.city}}
      </div>
      <div class="detail bedrooms">
        <span>Number of bedrooms:</span> {{@rental.bedrooms}}
      </div>
    </div>
    <Map
      @lat={{@rental.location.lat}}
      @lng={{@rental.location.lng}}
      @zoom="9"
      @width="150"
      @height="150"
      alt="A map of {{@rental.title}}"
    />
  </article>
</template>
```

Since the model object contains exactly the same data as the previously-hard-coded "Grand Old Mansion", 
the page should look exactly the same as before the change.

update the tests to reflect this change.

Because component tests are meant to render and test a single component in isolation from the rest of the app, 
they do not perform any routing, 
which means we won't have access to the same data returned from the model hook.

Therefore, in our Rental component's test, we will have to feed the data into it some other way. 
We can do this using the same `State` mechanism we learned about from the previous chapter.

tests/integration/components/rental-test.gjs
```gjs

import { module, test } from 'qunit';
import { setupRenderingTest } from 'tutorial-app/tests/helpers';
import { render } from '@ember/test-helpers';
import Rental from 'tutorial-app/components/rental';
import { tracked } from '@glimmer/tracking';

module('Integration | Component | rental', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders information about a rental property', async function (assert) {

    class State { 
      @tracked rental = {
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
      };
    };

    const state = new State();

    await render(<template><Rental @rental={{state.rental}} /></template>);

    assert.dom('article').hasClass('rental');
    assert.dom('article h3').hasText('Grand Old Mansion');
    assert.dom('article .detail.owner').includesText('Veruca Salt');
    assert.dom('article .detail.type').includesText('Standalone');
    assert.dom('article .detail.location').includesText('San Francisco');
    assert.dom('article .detail.bedrooms').includesText('15');
    assert.dom('article .image').exists();
    assert.dom('article .map').exists();
  });
});
```

Notice that we also need to update the invocation of the <Rental> component in the render function 
to also have a @rental argument passed into it. 
If we run our tests now, they should all pass!

## Mocking Server Data with Static JSON Files 
In a production app, the data that we'd fetch would most likely come from a remote API server.

To avoid setting up an API server just for this tutorial, put some JSON data into the public folder instead. 

```

public
├── api
│   ├── rentals
│   │   ├── downtown-charm.json
│   │   ├── grand-old-mansion.json
│   │   └── urban-living.json
│   └── rentals.json
├── assets
│   └── images
│       └── teaching-tomster.png
└── robots.txt
```

 to http://localhost:4200/api/rentals.json.

## Fetching Remote Data from the Model Hook 


app/routes/index.js
```gjs

import Route from '@ember/routing/route';

export default class IndexRoute extends Route {
  async model() {

    let response = await fetch('/api/rentals.json');
    let parsed = await response.json();
    return parsed;
  }
}
```



public/api/rentals.json
```json

{
  "data": [
    {
      "type": "rental",
      "id": "grand-old-mansion",
      "attributes": {
        "title": "Grand Old Mansion",
        "owner": "Veruca Salt",
        "city": "San Francisco",
        "location": {
          "lat": 37.7749,
          "lng": -122.4194
        },
        "category": "Estate",
        "bedrooms": 15,
        "image": "https://upload.wikimedia.org/wikipedia/commons/c/cb/Crane_estate_(5).jpg",
        "description": "This grand old mansion sits on over 100 acres of rolling hills and dense redwood forests."
      }
    },
    {
      "type": "rental",
      "id": "urban-living",
      "attributes": {
        "title": "Urban Living",
        "owner": "Mike Teavee",
        "city": "Seattle",
        "location": {
          "lat": 47.6062,
          "lng": -122.3321
        },
        "category": "Condo",
        "bedrooms": 1,
        "image": "https://upload.wikimedia.org/wikipedia/commons/2/20/Seattle_-_Barnes_and_Bell_Buildings.jpg",
        "description": "A commuters dream. This rental is within walking distance of 2 bus stops and the Metro."
      }
    },
    {
      "type": "rental",
      "id": "downtown-charm",
      "attributes": {
        "title": "Downtown Charm",
        "owner": "Violet Beauregarde",
        "city": "Portland",
        "location": {
          "lat": 45.5175,
          "lng": -122.6801
        },
        "category": "Apartment",
        "bedrooms": 3,
        "image": "https://upload.wikimedia.org/wikipedia/commons/f/f7/Wheeldon_Apartment_Building_-_Portland_Oregon.jpg",
        "description": "Convenience is at your doorstep with this charming downtown rental. Great restaurants and active night life are within a few feet."
      }
    }
  ]
}
```

Every data object has a type and id, which we don't intend to use in our template (yet!). For now, the only data we really need is nested within the attributes key.

There's one more key difference here, which perhaps only those with very sharp eyes will be able to catch: the data coming from the server is missing the type property, which previously existed on our hard-coded model object. The type property could either be "Standalone" or "Community", depending on the type of rental property, which is required by our <Rental> component.

In Part 2 of this tutorial, we will learn about a more convenient way to consume data in the JSON:API format. For now, we can just fix up the data and deal with these differences in formats ourselves.

We can handle it all in our model hook:

app/routes/index.js
```gjs

import Route from '@ember/routing/route';

const COMMUNITY_CATEGORIES = ['Condo', 'Townhouse', 'Apartment'];

export default class IndexRoute extends Route {
  async model() {
    let response = await fetch('/api/rentals.json');

    let { data } = await response.json();

    return data.map((model) => {
      let { attributes } = model;
      let type;

      if (COMMUNITY_CATEGORIES.includes(attributes.category)) {
        type = 'Community';
      } else {
        type = 'Standalone';
      }

      return { type, ...attributes };
    });
  }
}
```

## Loops and Local Variables in Templates with {{#each}} 
The last change we'll need to make is to our index.hbs route template, where we invoke our 
Rental components. 

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
    <ul class="results">
      {{#each @model as |rental|}}
        <li><Rental @rental={{rental}} /></li>
      {{/each}}
    </ul>
  </div>
</template>
```

We can use the `{{#each}}...{{/each}}` syntax to iterate and loop through the array returned by the model hook. 


