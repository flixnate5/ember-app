# EmberData
    EmberData models
    Testing models
    Loading models in routes
    The EmberData Store and RequestManager
    Working with Request builders and handlers

## What is EmberData? 

EmberData is a library that helps manage data and application state in Ember applications.


RequestManager is available starting with the EmberData 4.12 LTS release. 
EmberData works with multiple versions of Ember, please refer to the Compatibility section of the EmberData README while doing your application upgrade.

## EmberData Models 
organizing your app's data into model objects. 
These objects represent units of information that our application presents to the user. 

app/models/rental.js
```js

import Model, { attr } from '@ember-data/model';

const COMMUNITY_CATEGORIES = ['Condo', 'Townhouse', 'Apartment'];

export default class RentalModel extends Model {
  @attr title;
  @attr owner;
  @attr city;
  @attr location;
  @attr category;
  @attr image;
  @attr bedrooms;
  @attr description;

  get type() {
    if (COMMUNITY_CATEGORIES.includes(this.category)) {
      return 'Community';
    } else {
      return 'Standalone';
    }
  }
}
```

public/api/rentals/grand-old-mansion.json
```json

{
  "data": {
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
  }
}
```

there will always be an implicit id attribute as well, which is used to uniquely identify the model object and can be accessed using model.id.

move our type logic into a getter on our model class. 


Attributes declared with the @attr decorator work with the auto-track feature 

## Testing Models 

```shell

ember generate model-test rental
```

      create tests/unit/models/rental-test.js

We could also have used the `ember generate model rental` command in the first place, which would have created both the model and test file for us.

tests/unit/models/rental-test.js
```js

import { setupTest } from 'super-rentals/tests/helpers';
import { module, test } from 'qunit';

module('Unit | Model | rental', function (hooks) {
  setupTest(hooks);

  test('it has the right type', function (assert) {
    const store = this.owner.lookup('service:store');

    let rental = store.createRecord('rental', {
      id: 'grand-old-mansion',
      title: 'Grand Old Mansion',
      owner: 'Veruca Salt',
      city: 'San Francisco',
      location: {
        lat: 37.7749,
        lng: -122.4194,
      },
      category: 'Estate',
      bedrooms: 15,
      image:
        'https://upload.wikimedia.org/wikipedia/commons/c/cb/Crane_estate_(5).jpg',
      description:
        'This grand old mansion sits on over 100 acres of rolling hills and dense redwood forests.',
    });

    assert.strictEqual(rental.type, 'Standalone');

    rental.category = 'Condo';
    assert.strictEqual(rental.type, 'Community');

    rental.category = 'Townhouse';
    assert.strictEqual(rental.type, 'Community');

    rental.category = 'Apartment';
    assert.strictEqual(rental.type, 'Community');

    rental.category = 'Estate';
    assert.strictEqual(rental.type, 'Standalone');
  });
});
```

unit test instantiates the rental model object and tests the model object directly, manipulating its attributes and asserting their value.

It is worth pointing out that EmberData provides a store service, also known as the EmberData store. 
In our test, we used the `this.owner.lookup('service:store')` API to get access to the EmberData store. 


app/services/store.js
```js

export { default } from 'ember-data/store';
```


## Loading Models in Routes 


app/routes/index.js
```js

import Route from '@ember/routing/route';

import { service } from '@ember/service';
import { query } from '@ember-data/json-api/request';

export default class IndexRoute extends Route {

  @service store;

  async model() {
    const { content } = await this.store.request(query('rental'));
    return content.data;
  }
}
```
app/routes/rental.js
```js

import Route from '@ember/routing/route';

import { service } from '@ember/service';
import { findRecord } from '@ember-data/json-api/request';

export default class RentalRoute extends Route {
  @service store;

  async model(params) {
    const { content } = await this.store.request(
      findRecord('rental', params.rental_id),
    );
    return content.data;
  }
}
```

## The EmberData Store 
EmberData provides a store service, which we can inject into our route using the `@service store;` 
It provides the request method for making fetch requests using **RequestManager**. 
Instead of answering questions about specific records or types of records, we ask it about the status of a specific request. 
To initiate a request, we use the request method on the store, passing in a request object. 
The request object is created using builders from `@ember-data/json-api/request`. 
Specifically, the `findRecord` builder takes a model type (rental) and a model ID (params.rental_id) as arguments 
and builds fetch options for a single record. 
On the other hand, the query builder takes the model type as an argument and builds fetch options to query for all records of that type.

EmberData can do many things, and in default setup it provides caching. 
EmberData's store caches server responses, allowing instant access to previously fetched data. 
If the data is already cached, you don't need to wait for the server to respond again. 
If not, the store fetches it for you.

the problem appears to be that the store went to the wrong URLs when fetching data from the server, resulting in some 404 errors. 
Specifically:
- query('rental') request, ==> /rentals, instead of /api/rentals.json.
- findRecord('rental', 'grand-old-mansion') ==> /rentals/grand-old-mansion, instead of /api/rentals/grand-old-mansion.json.

Fix;
- Our resource URLs have an extra /api namespace prefix.
- Our resource URLs have a .json extension at the end.

EmberData provides a global config mechanism for host and namespace. 
Typically you will want to do this either in your store file or app file.

app/app.js
```js

import Application from '@ember/application';
import Resolver from 'ember-resolver';
import loadInitializers from 'ember-load-initializers';
import config from 'super-rentals/config/environment';
import { importSync, isDevelopingApp, macroCondition } from '@embroider/macros';
import { setBuildURLConfig } from '@ember-data/request-utils';

setBuildURLConfig({
  namespace: 'api',
});

/* This is to account for a deprecation that shipped in ember-cli 6.4
   with ember-data v5.6 which needs a blueprint update to avoid the
   deprecation that is otherwise irrelevant for tutorial purposes.
*/
import { registerDeprecationHandler } from '@ember/debug';
registerDeprecationHandler((message, options, next) => {
  if (message.includes('Using WarpDrive with EmberJS requires')) {
    return;
  } else {
    next(message, options);
  }
});

if (macroCondition(isDevelopingApp())) {
  importSync('./deprecation-workflow');
}

export default class App extends Application {
  modulePrefix = config.modulePrefix;
  podModulePrefix = config.podModulePrefix;
  Resolver = Resolver;
}

loadInitializers(App, config.modulePrefix);
```

Adding the .json extension is a bit less common, and doesn't have a declarative configuration API of its own. 
We could just modify request options directly in place of use, but that would be a bit messy. 
Instead, let's create a handler to do this for us.

app/utils/handlers.js
```js

export const JsonSuffixHandler = {
  request(context, next) {
    const { request } = context;
    const updatedRequest = Object.assign({}, request, {
      url: request.url + '.json',
    });

    return next(updatedRequest);
  },
};
```

This is how we can chain multiple handlers together to build up a request.

configure RequestManager to use this handler. 


app/services/request-manager.js
```js

import BaseRequestManager from '@ember-data/request';
import Fetch from '@ember-data/request/fetch';
import { JsonSuffixHandler } from 'super-rentals/utils/handlers';

export default class RequestManager extends BaseRequestManager {
  constructor(args) {
    super(args);

    this.use([JsonSuffixHandler, Fetch]);
  }
}
```

Notice that we are using the `JsonSuffixHandler` we created earlier. 
We also use the Fetch handler, which is a built-in handler that makes the actual fetch request. 
The use method is used to add handlers to the request manager. 
The order in which handlers are added is important, as they will be executed in the order they were added.

Lastly, let's update our store service to use the new RequestManager we created.

app/services/store.js
```js

export { default } from 'ember-data/store';
import BaseStore from 'ember-data/store';
import { service } from '@ember/service';

export default class Store extends BaseStore {
  @service requestManager;
}
```

With our new EmberData configuration in place, all our tests should pass again.

EmberData offers many, many features (like managing the relationships between different models) and there's a lot more we can learn about it. 
For example, if your backend's have some inconsistencies across different endpoints, EmberData allows you to define request specific handlers and builders! 

more about EmberData, https://guides.emberjs.com/release/models/


