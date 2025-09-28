# Component Basics

## 1. Extracting Markup into Components 

```html

<div class="jumbo">
  <div class="right tomster"></div>
  <!-- page specific content -->
</div>
```

In its most basic form, a component is just a piece of template that can be referred to by name. 
Let's start by creating a new file at `app/components/jumbo.hbs` with markup for the "jumbo" header:

app/components/jumbo.hbs
```html

<div class="jumbo">
  <div class="right tomster"></div>
  {{yield}}
</div>
```

The `jumbo.hbs` template corresponds to the `<Jumbo>` tag, just like super-awesome.hbs corresponds to `<SuperAwesome>`.

When invoking a component, Ember will replace the component tag with the content found in the component's template. 
Just like regular HTML tags, it is common to pass content to components, like `<Jumbo>some content</Jumbo>`. 
We can enable this using the `{{yield}}` keyword, which will be replaced with the content that was passed to the component.

app/templates/index.hbs
```html

<Jumbo>
        <h2>Welcome to Super Rentals!</h2>
        <p>We hope you find exactly what you're looking for in a place to stay.</p>
        <LinkTo @route="about" class="button">About Us</LinkTo>
</Jumbo>
```

app/templates/about.hbs
```html

<Jumbo>
  <h2>About Super Rentals</h2>
  <p>
    The Super Rentals website is a delightful project created to explore Ember.
    By building a property rental site, we can simultaneously imagine traveling
    AND building Ember applications.
  </p>
  <LinkTo @route="contact" class="button">Contact Us</LinkTo>
</Jumbo>
```
app/templates/contact.hbs
```html
<Jumbo>
  <h2>Contact Us</h2>
  <p>
    Super Rentals Representatives would love to help you<br>
    choose a destination or answer any questions you may have.
  </p>
  <address>
    Super Rentals HQ
    <p>
      1212 Test Address Avenue<br>
      Testington, OR 97233
    </p>
    <a href="tel:503.555.1212">+1 (503) 555-1212</a><br>
    <a href="mailto:superrentalsrep@emberjs.com">superrentalsrep@emberjs.com</a>
  </address>
  <LinkTo @route="about" class="button">About</LinkTo>
</Jumbo>
```

## Writing Component Tests 
Run this command in your terminal:

```shell

ember generate component-test jumbo
```

      create tests/integration/components/jumbo-test.js

This is in contrast to the acceptance tests that we wrote earlier, which have to navigate and render entire pages worth of content.

tests/integration/components/jumbo-test.js
```ts

import { module, test } from 'qunit';
import { setupRenderingTest } from 'tutorial-app/tests/helpers';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | jumbo', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders the content inside a jumbo header with a tomster', async function (assert) {
    await render(hbs`<Jumbo />`);

    assert.dom().hasText('');

    // Template block usage:
    await render(hbs`
      <Jumbo>
        template block text
      </Jumbo>
    `);

    assert.dom().hasText('template block text');
    assert.dom('.jumbo').exists();
    assert.dom('.jumbo .tomster').exists();
  });
});
```

## create a `<NavBar>` component at app/components/nav-bar.hbs:

app/components/nav-bar.hbs
```html

<nav class="menu">
  <LinkTo @route="index" class="menu-index">
    <h1>SuperRentals</h1>
  </LinkTo>
  <div class="links">
    <LinkTo @route="about" class="menu-about">
      About
    </LinkTo>
    <LinkTo @route="contact" class="menu-contact">
      Contact
    </LinkTo>
  </div>
</nav>
```
Next, we will add our `<NavBar>` component to the top of each page:

app/templates/about.hbs
```html

<NavBar />
<Jumbo>
  <h2>About Super Rentals</h2>
  <p>
    The Super Rentals website is a delightful project created to explore Ember.
    By building a property rental site, we can simultaneously imagine traveling
    AND building Ember applications.
  </p>
  <LinkTo @route="contact" class="button">Contact Us</LinkTo>
</Jumbo>
```
app/templates/contact.hbs
```html

<NavBar />
<Jumbo>
  <h2>Contact Us</h2>
  <p>
    Super Rentals Representatives would love to help you<br>
    choose a destination or answer any questions you may have.
  </p>
  <address>
    Super Rentals HQ
    <p>
      1212 Test Address Avenue<br>
      Testington, OR 97233
    </p>
    <a href="tel:503.555.1212">+1 (503) 555-1212</a><br>
    <a href="mailto:superrentalsrep@emberjs.com">superrentalsrep@emberjs.com</a>
  </address>
  <LinkTo @route="about" class="button">About</LinkTo>
</Jumbo>
```
app/templates/index.hbs
```html

<NavBar />
<Jumbo>
  <h2>Welcome to Super Rentals!</h2>
  <p>We hope you find exactly what you're looking for in a place to stay.</p>
  <LinkTo @route="about" class="button">About Us</LinkTo>
</Jumbo>
```


We could write a component test for the `<NavBar>` by itself, like we just did for the `<Jumbo>` component. 
However, since the job of `<NavBar>` is to navigate us around the app, it would not make a lot of sense to test this particular component in isolation. 
So, let's go back to writing some acceptance tests!

tests/acceptance/super-rentals-test.js
```ts

import { module, test } from 'qunit';
import { click, visit, currentURL } from '@ember/test-helpers';
import { setupApplicationTest } from 'tutorial-app/tests/helpers';

module('Acceptance | super rentals', function (hooks) {
  setupApplicationTest(hooks);

  test('visiting /', async function (assert) {
    await visit('/');

    assert.strictEqual(currentURL(), '/');
    assert.dom('nav').exists();
    assert.dom('h1').hasText('SuperRentals');
    assert.dom('h2').hasText('Welcome to Super Rentals!');

    assert.dom('.jumbo a.button').hasText('About Us');
    await click('.jumbo a.button');

    assert.strictEqual(currentURL(), '/about');
  });

  test('visiting /about', async function (assert) {
    await visit('/about');

    assert.strictEqual(currentURL(), '/about');
    assert.dom('nav').exists();
    assert.dom('h1').hasText('SuperRentals');
    assert.dom('h2').hasText('About Super Rentals');

    assert.dom('.jumbo a.button').hasText('Contact Us');
    await click('.jumbo a.button');

    assert.strictEqual(currentURL(), '/getting-in-touch');
  });

  test('visiting /getting-in-touch', async function (assert) {
    await visit('/getting-in-touch');

    assert.strictEqual(currentURL(), '/getting-in-touch');
    assert.dom('nav').exists();
    assert.dom('h1').hasText('SuperRentals');
    assert.dom('h2').hasText('Contact Us');

    assert.dom('.jumbo a.button').hasText('About');
    await click('.jumbo a.button');

    assert.strictEqual(currentURL(), '/about');
  });

  test('navigating using the nav-bar', async function (assert) {
    await visit('/');

    assert.dom('nav').exists();
    assert.dom('nav a.menu-index').hasText('SuperRentals');
    assert.dom('nav a.menu-about').hasText('About');
    assert.dom('nav a.menu-contact').hasText('Contact');

    await click('nav a.menu-about');
    assert.strictEqual(currentURL(), '/about');

    await click('nav a.menu-contact');
    assert.strictEqual(currentURL(), '/getting-in-touch');

    await click('nav a.menu-index');
    assert.strictEqual(currentURL(), '/');
  });
});
```

We updated the existing tests to assert that a `<nav>` element exists on each page. 
This is important for accessibility since screen readers will use that element to provide navigation. 
Then, we added a new test that verifies the behavior of the `<NavBar>` links.

## Using the Application Template and {{outlet}}s 
This template is special in that it does not have its own URL and cannot be navigated to on its own. 
Rather, it is used to specify a common layout that is shared by every page in your app. 
This is a great place to put site-wide UI elements, like a nav-bar and a site footer.

app/templates/application.hbs
```html

<div class="container">
  <NavBar />
  <div class="body">
    {{outlet}}
  </div>
</div>
```

app/templates/index.hbs
```html

<Jumbo>
  <h2>Welcome to Super Rentals!</h2>
  <p>We hope you find exactly what you're looking for in a place to stay.</p>
  <LinkTo @route="about" class="button">About Us</LinkTo>
</Jumbo>
```
app/templates/contact.hbs
```html

<Jumbo>
  <h2>Contact Us</h2>
  <p>
    Super Rentals Representatives would love to help you<br>
    choose a destination or answer any questions you may have.
  </p>
  <address>
    Super Rentals HQ
    <p>
      1212 Test Address Avenue<br>
      Testington, OR 97233
    </p>
    <a href="tel:503.555.1212">+1 (503) 555-1212</a><br>
    <a href="mailto:superrentalsrep@emberjs.com">superrentalsrep@emberjs.com</a>
  </address>
  <LinkTo @route="about" class="button">About</LinkTo>
</Jumbo>
```
app/templates/about.hbs
```html

<Jumbo>
  <h2>About Super Rentals</h2>
  <p>
    The Super Rentals website is a delightful project created to explore Ember.
    By building a property rental site, we can simultaneously imagine traveling
    AND building Ember applications.
  </p>
  <LinkTo @route="contact" class="button">Contact Us</LinkTo>
</Jumbo>
```

The `{{outlet}}` keyword denotes the place where our site's pages should be rendered into, 
similar to the `{{yield}}` keyword we saw earlier.

## Generating Components 

```shell

ember generate component rental
```

      create app/components/rental.hbs
      tip to add a class, run `ember generate component-class rental`
      create tests/integration/components/rental-test.js

`app/components/rental.hbs`
```html

<article class="rental">
  <div class="details">
    <h3>Grand Old Mansion</h3>
    <div class="detail owner">
      <span>Owner:</span> Veruca Salt
    </div>
    <div class="detail type">
      <span>Type:</span> Standalone
    </div>
    <div class="detail location">
      <span>Location:</span> San Francisco
    </div>
    <div class="detail bedrooms">
      <span>Number of bedrooms:</span> 15
    </div>
  </div>
</article>
```        

tests/integration/components/rental-test.js
```ts

import { module, test } from 'qunit';
import { setupRenderingTest } from 'tutorial-app/tests/helpers';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | rental', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders information about a rental property', async function (assert) {
    await render(hbs`<Rental />`);

    assert.dom().hasText('');

    // Template block usage:
    await render(hbs`
      <Rental>
        template block text
      </Rental>
    `);

    assert.dom().hasText('template block text');
    assert.dom('article').hasClass('rental');
    assert.dom('article h3').hasText('Grand Old Mansion');
    assert.dom('article .detail.owner').includesText('Veruca Salt');
    assert.dom('article .detail.type').includesText('Standalone');
    assert.dom('article .detail.location').includesText('San Francisco');
    assert.dom('article .detail.bedrooms').includesText('15');
  });
});
```

Finally, let's invoke this a couple of times from our index template to populate the page.

app/templates/index.hbs
```html

<Jumbo>
  <h2>Welcome to Super Rentals!</h2>
  <p>We hope you find exactly what you're looking for in a place to stay.</p>
  <LinkTo @route="about" class="button">About Us</LinkTo>
</Jumbo>

<div class="rentals">
  <ul class="results">
    <li><Rental /></li>
    <li><Rental /></li>
    <li><Rental /></li>
  </ul>
</div>
```

## Organizing Code with Namespaced Components 
We will use the component generator for this again:

```shell

$ ember generate component rental/image
```
    installing component
      create app/components/rental/image.hbs
    to add a class, run `ember generate component-class rental/image`
      create tests/integration/components/rental/image-test.js


which can be invoked as `<Rental::Image>`.
Namespacing allows us to organize our components by folders according to their purpose. 

## Forwarding HTML Attributes with ...attributes 
app/components/rental/image.hbs
```html

<div class="image">
  <img ...attributes>
</div>
```

This allows arbitrary HTML attributes to be passed in when invoking this component, like so:

app/components/rental.hbs
```html

<article class="rental">
  <Rental::Image
    src="https://upload.wikimedia.org/wikipedia/commons/c/cb/Crane_estate_(5).jpg"
    alt="A picture of Grand Old Mansion"
  />
  <div class="details">
    <h3>Grand Old Mansion</h3>
    <div class="detail owner">
      <span>Owner:</span> Veruca Salt
    </div>
    <div class="detail type">
      <span>Type:</span> Standalone
    </div>
    <div class="detail location">
      <span>Location:</span> San Francisco
    </div>
    <div class="detail bedrooms">
      <span>Number of bedrooms:</span> 15
    </div>
  </div>
</article>
```



This way, our `<Rental::Image>` component is not coupled to any specific rental property on the site. 
In general, it is a good idea to add `...attributes` to the primary element in your component. 
This will allow for maximum flexibility, as the invoker may need to pass along classes for styling or ARIA attributes to improve accessibility.

tests/integration/components/rental/image-test.js
```ts

import { module, test } from 'qunit';
import { setupRenderingTest } from 'tutorial-app/tests/helpers';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | rental/image', function (hooks) {
  setupRenderingTest(hooks);

    // Template block usage:
  test('it renders the given image', async function (assert) {
    await render(hbs`
      <Rental::Image>
        template block text
      </Rental::Image>
      <Rental::Image
        src="/assets/images/teaching-tomster.png"
        alt="Teaching Tomster"
      />
    `);

    assert.dom().hasText('template block text');
    assert
      .dom('.image img')
      .exists()
      .hasAttribute('src', '/assets/images/teaching-tomster.png')
      .hasAttribute('alt', 'Teaching Tomster');
  });
});
```

## Determining the Appropriate Amount of Test Coverage 
Finally, we should also update the tests for the `<Rental>` component to confirm that we successfully invoked `<Rental::Image>`.

tests/integration/components/rental-test.js
```ts

import { module, test } from 'qunit';
import { setupRenderingTest } from 'tutorial-app/tests/helpers';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | rental', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders information about a rental property', async function (assert) {
    await render(hbs`<Rental />`);

    assert.dom('article').hasClass('rental');
    assert.dom('article h3').hasText('Grand Old Mansion');
    assert.dom('article .detail.owner').includesText('Veruca Salt');
    assert.dom('article .detail.type').includesText('Standalone');
    assert.dom('article .detail.location').includesText('San Francisco');
    assert.dom('article .detail.bedrooms').includesText('15');

    assert.dom('article .image').exists();
  });
});
```

Because we already tested `<Rental::Image>` extensively on its own, we can omit the details here and keep our assertion to the bare minimum.

# Interactive Components
allowing the user to click an image to enlarge or shrink it:

    Adding behavior to components with classes
    Accessing instance states from templates
    Managing state with tracked properties
    Using conditionals syntaxes in templates
    Responding to user interaction with actions
    Invoking element modifiers
    Testing user interactions

## Adding Behavior to Components with Classes 
We are going to implement the "View Larger" and "View Smaller" functionality, which will allow our users to click on a property's image to view a larger version, 
and click on it again to return to the smaller version.

Ember optionally allows us to associate JavaScript code with a component for exactly this purpose. 
We can add JavaScript to our `<RentalImage>` component by "wrapping" the component in a class definition.

`app/components/rental/image.gjs`
```html
<template>
  <div class="image">
    <img ...attributes />
  </div>
</template>
```

```ts

import Component from '@glimmer/component';

export default class RentalImage extends Component {
  <template>
    <div class="image">
      <img ...attributes />
    </div>
  </template>
}
```

Now our component contains a JavaScript class, inheriting from `@glimmer/component`. 
The template is now nested inside the class definition.

Ember will create an instance of the class whenever our component is invoked. 

app/components/rental/image.gjs
```ts

import Component from '@glimmer/component';

export default class RentalImage extends Component {
  constructor(...args) {
    super(...args);
    this.isLarge = false;
  }

  <template>
    <div class="image">
      <img ...attributes />
    </div>
  </template>
}
```

Here, in the component's constructor, we initialized the instance variable this.isLarge with the value false, since this is the default state that we want for our component.

## Accessing Instance States from Templates 

app/components/rental/image.gjs
```gjs
import Component from '@glimmer/component';

export default class RentalImage extends Component {
  constructor(...args) {
    super(...args);
    this.isLarge = false;
  }

  <template>
    {{#if this.isLarge}}
      <div class="image large">
        <img ...attributes>
        <small>View Smaller</small>
      </div>
    {{else}}
      <div class="image">
        <img ...attributes>
        <small>View Larger</small>
      </div>
    {{/if}}
  </template>
}
```

The `{{#if ...}}...{{else}}...{{/if}}` conditionals syntax allows us to render different content based on a condition (in this case, the value of the instance variable this.isLarge). 

If we change `app/components/rental/image.js` to initialize `this.isLarge = true;` 
in the constructor, we should see the large version of the property image in the browser. Cool!

`<Rental::Image>` with this.isLarge set to true



app/components/rental/image.gjs
```gjs

import Component from '@glimmer/component';

export default class RentalImage extends Component {
  isLarge = false;

  <template>
    {{#if this.isLarge}}
      <div class="image large">
        <img ...attributes>
        <small>View Smaller</small>
      </div>
    {{else}}
      <div class="image">
        <img ...attributes>
        <small>View Larger</small>
      </div>
    {{/if}}
  </template>
}
```

we want to toggle the value of this.isLarge whenever the user clicks on our component.

## Managing State with Tracked Properties 
Let's modify our class to add a method for toggling the size:

app/components/rental/image.gjs
```ts

import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

export default class RentalImage extends Component {
  @tracked isLarge = false;

  @action toggleSize() {
    this.isLarge = !this.isLarge;
  }

  <template>
    {{#if this.isLarge}}
      <div class="image large">
        <img ...attributes>
        <small>View Smaller</small>
      </div>
    {{else}}
      <div class="image">
        <img ...attributes>
        <small>View Larger</small>
      </div>
    {{/if}}
  </template>
}
```

`@tracked` decorator tells Ember to monitor this variable for updates. Whenever this variable's value changes, Ember will automatically re-render any templates that depend on its value.
the @tracked annotation will cause Ember to re-evaluate the `{{#if this.isLarge}}` conditional in our template, and will switch between the two blocks accordingly.

## Responding to User Interaction with Actions 
Next, we added a `toggleSize` method to our class that switches this.isLarge to the opposite of its current state


`@action` decorator indicates to Ember that we intend to use this method from our template. 
Without this, the method will not function properly as a callback function (in this case, a click handler).

With that, it's time to wire this up in the template section:

app/components/rental/image.gjs
```gjs
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { on } from '@ember/modifier';

export default class RentalImage extends Component {
  @tracked isLarge = false;

  @action toggleSize() {
    this.isLarge = !this.isLarge;
  }

  <template>
    {{#if this.isLarge}}
      
      <button type="button" class="image large" {{on "click" this.toggleSize}}>
        <img ...attributes>
        <small>View Smaller</small>
      
      </button>
    {{else}}
      
      <button type="button" class="image" {{on "click" this.toggleSize}}>
        <img ...attributes>
        <small>View Larger</small>      
      </button>
    {{/if}}
  </template>
}
```

1. we switched the containing tag from <div> to <button> (this is important for accessibility reasons). 
By using the correct semantic tag, we will also get focusability and keyboard interaction handling "for free".
2.  we used the `{{on}}` modifier to attach this.toggleSize as a click handler on the button. The {{on}} modifier is imported from the @ember/modifier package, which is part of Ember.

With that, we have created our first interactive component. Go ahead and try it in the browser!

## Testing User Interactions 
Finally, let's write a test for this new behavior:

tests/integration/components/rental/image-test.gjs
```ts

import { module, test } from 'qunit';
import { setupRenderingTest } from 'tutorial-app/tests/helpers';
import { render } from '@ember/test-helpers';
import { render, click } from '@ember/test-helpers';
import RentalImage from 'tutorial-app/components/rental/image';

module('Integration | Component | rental/image', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders the given image', async function (assert) {
    await render(<template>
      <RentalImage
        src="/assets/images/teaching-tomster.png"
        alt="Teaching Tomster"
      />
    </template>);

    assert
      .dom('.image img')
      .exists()
      .hasAttribute('src', '/assets/images/teaching-tomster.png')
      .hasAttribute('alt', 'Teaching Tomster');
   });

  test('clicking on the component toggles its size', async function (assert) {
    await render(<template>
      <RentalImage
        src="/assets/images/teaching-tomster.png"
        alt="Teaching Tomster"
      />
    </template>);

    assert.dom('button.image').exists();

    assert.dom('.image').doesNotHaveClass('large');
    assert.dom('.image small').hasText('View Larger');

    await click('button.image');

    assert.dom('.image').hasClass('large');
    assert.dom('.image small').hasText('View Smaller');

    await click('button.image');

    assert.dom('.image').doesNotHaveClass('large');
    assert.dom('.image small').hasText('View Larger');
  });
});
```

If we look closely, the only things that are different between the two blocks are:
- The presence of the "large" CSS class on the <button> tag.
- The "View Larger" and "View Smaller" text.

We can reduce the duplication by using an {{if}} expression instead:

app/components/rental/image.gjs
```gjs
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { on } from '@ember/modifier';

export default class RentalImage extends Component {
  @tracked isLarge = false;

  @action toggleSize() {
    this.isLarge = !this.isLarge;
  }

  <template>
    <button type="button" class="image {{if this.isLarge "large"}}" {{on "click" this.toggleSize}}>
      <img ...attributes>
      {{#if this.isLarge}}
        <small>View Smaller</small>
      {{else}}
        <small>View Larger</small>
      {{/if}}
    </button>
  </template>
}
```

> Optionally, {{if}} can take a third argument for what the expression should evaluate into if the condition is false. 
> This means we could rewrite the button label like so:

app/components/rental/image.gjs
```ts

import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { on } from '@ember/modifier';

export default class RentalImage extends Component {
  @tracked isLarge = false;

  @action toggleSize() {
    this.isLarge = !this.isLarge;
  }

  <template>
    <button type="button" class="image {{if this.isLarge "large"}}" {{on "click" this.toggleSize}}>
      <img ...attributes>
      <small>View {{if this.isLarge "Smaller" "Larger"}}</small>
    </button>
  </template>
}
```


---------

# Reusable Components
The last missing feature for the `<Rental>` component is a map to show the location of the rental, 


    Managing application-level configurations
    Parameterizing components with arguments
    Accessing component arguments
    Interpolating values in templates
    Overriding HTML attributes in ...attributes
    Refactoring with getters and auto-track
    Getting JavaScript values into the test context

## Managing Application-level Configurations 
We will use the **Mapbox API** to generate maps for our rental properties. 
You can sign up for free and without a credit card.

Mapbox provides a static map images API, which serves map images in PNG format. 
This means that we can generate the appropriate URL for the parameters we want and render the map using a standard `<img>` tag. Pretty neat!

grab your default public token and paste it into `config/environment.js`:

config/environment.js
```ts

'use strict';

module.exports = function (environment) {
  const ENV = {
    modulePrefix: 'super-rentals',
    environment,
    rootURL: '/',
    locationType: 'history',
    EmberENV: {
      RAISE_ON_DEPRECATION: true,
      EXTEND_PROTOTYPES: false,
      FEATURES: {
        // Here you can enable experimental features on an ember canary build
        // e.g. EMBER_NATIVE_DECORATOR_SUPPORT: true
      },
    },

    APP: {
      // Here you can pass flags/options to your application instance
      // when it is created
    },
  };

  if (environment === 'development') {
    // ENV.APP.LOG_RESOLVER = true;
    // ENV.APP.LOG_ACTIVE_GENERATION = true;
    // ENV.APP.LOG_TRANSITIONS = true;
    // ENV.APP.LOG_TRANSITIONS_INTERNAL = true;
    // ENV.APP.LOG_VIEW_LOOKUPS = true;
  }

  if (environment === 'test') {
    // Testem prefers this...
    ENV.locationType = 'none';

    // keep test console output quieter
    ENV.APP.LOG_ACTIVE_GENERATION = false;
    ENV.APP.LOG_VIEW_LOOKUPS = false;

    ENV.APP.rootElement = '#ember-testing';
    ENV.APP.autoboot = false;
  }

  if (environment === 'production') {
    // here you can enable a production-specific feature
  }

  ENV.MAPBOX_ACCESS_TOKEN = 'paste your Mapbox access token here';

  return ENV;
};
```

As its name implies, `config/environment.js` is used to configure our app and store API keys like these. 
These values can be accessed from other parts of our app, and they can have different values depending on the current environment (which might be development, test, or production).

At a minimum, the tokens will each need to have the "styles:tiles" scope in order to use Mapbox's static images API.

After saving the changes to our configuration file, we will need to restart our development server to pick up these file changes. Unlike the files we have edited so far, `config/environment.js` is not automatically reloaded.

# Generating a Component with a Component Class 
With the Mapbox API key in place, let's generate a new component for our map.

```shell

ember generate component map --component-class=@glimmer/component
```
        installing component
          create app/components/map.gjs
        installing component-test
          create tests/integration/components/map-test.gjs
        

`--component-class=@glimmer/component` flag to the component generator so that we have everything we need from the get-go.

`ember g component map -gc` instead. 

Parameterizing Components with Arguments 

`app/components/map.gjs`
```gjs
import Component from '@glimmer/component';
import ENV from 'tutorial-app/config/environment';

export default class Map extends Component {
  get token() {
    return encodeURIComponent(ENV.MAPBOX_ACCESS_TOKEN);
  }

  <template>
    <div class="map">
      <img
        alt="Map image at coordinates {{@lat}},{{@lng}}"
        ...attributes
        src="https://api.mapbox.com/styles/v1/mapbox/streets-v11/static/{{@lng}},{{@lat}},{{@zoom}}/{{@width}}x{{@height}}@2x?access_token={{this.token}}"
        width={{@width}} height={{@height}}
      >
    </div>
  </template>
}
```


It is also important to URL-encode the token, just in case it contains any special characters that are not URL-safe.

First, we have a container element for styling purposes.

Then we have an `<img>` tag to request and render the static map image from Mapbox.

Our component's template contains several values that don't yet exist—`@lat`, `@lng`, `@zoom` `@width`, and `@height`. These are arguments to the `<Map>` component that we will supply when invoking it.

By parameterizing our component using arguments, we made a reusable component that can be invoked from different parts of the app and customized to meet the needs for those specific contexts. 


We supplied a reasonable default value for the alt attribute based on the values of the `@lat` and `@lng` arguments. 
You may notice that we are directly interpolating values into the alt attribute's value. Ember will automatically concatenate these interpolated values into a final string value for us, including doing any necessary HTML-escaping.

## Overriding HTML Attributes in ...attributes 
Next, we used ...attributes to allow the invoker to further customize the `<img>` tag, such as passing extra attributes such as class, as well as overriding our default alt attribute with a more specific or human-friendly one.

The ordering is important here! Ember applies the attributes in the order that they appear. 
By assigning the default alt attribute first (before ...attributes is applied), we are explicitly providing the invoker the option to provide a more tailored alt attribute according to their use case.

Since the passed-in alt attribute (if any exists) will appear after ours, it will override the value we specified. On the other hand, it is important that we assign src, width, and height after ...attributes, so that they don't get accidentally overwritten by the invoker.

The src attribute interpolates all the required parameters into the URL format for Mapbox's static map image API, including the URL-escaped access token from this.token.

Finally, since we are using the @2x "retina" image, we should specify the width and height attributes. Otherwise, the `<img>` will be rendered at twice the size than what we expected!

We just added a lot of behavior into a single component, so let's write some tests! In particular, we should make sure to have some test coverage for the overriding-HTML-attributes behavior we discussed above.

tests/integration/components/map-test.gjs
```gjs

import { module, test } from 'qunit';
import { setupRenderingTest } from 'tutorial-app/tests/helpers';
import { render } from '@ember/test-helpers';
import { render, find } from '@ember/test-helpers';
import ENV from 'tutorial-app/config/environment';
import Map from 'tutorial-app/components/map';

module('Integration | Component | map', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders a map image for the specified parameters', async function (assert) {
    await render(<template>
      <Map
        @lat="37.7797"
        @lng="-122.4184"
        @zoom="10"
        @width="150"
        @height="120"
      />
    </template>);

    assert
      .dom('.map img')
      .exists()
      .hasAttribute('alt', 'Map image at coordinates 37.7797,-122.4184')
      .hasAttribute('src')
      .hasAttribute('width', '150')
      .hasAttribute('height', '120');

    let { src } = find('.map img');
    let token = encodeURIComponent(ENV.MAPBOX_ACCESS_TOKEN);

    assert.ok(
      src.startsWith('https://api.mapbox.com/'),
      'the src starts with "https://api.mapbox.com/"',
    );

    assert.ok(
      src.includes('-122.4184,37.7797,10'),
      'the src should include the lng,lat,zoom parameter',
    );

    await render(<template><Map /></template>);
    assert.ok(
      src.includes('150x120@2x'),
      'the src should include the width,height and @2x parameter',
    );

    assert.dom().hasText('');
    assert.ok(
      src.includes(`access_token=${token}`),
      'the src should include the escaped access token',
    );
  });

  test('the default alt attribute can be overridden', async function (assert) {
    await render(<template>
      <Map
        @lat="37.7797"
        @lng="-122.4184"
        @zoom="10"
        @width="150"
        @height="120"
        alt="A map of San Francisco"
      />
    </template>);

    assert.dom('.map img').hasAttribute('alt', 'A map of San Francisco');
  });

    // Template block usage:
  test('the src, width and height attributes cannot be overridden', async function (assert) {
    await render(<template>
      <Map>
        template block text
      </Map>
      <Map
        @lat="37.7797"
        @lng="-122.4184"
        @zoom="10"
        @width="150"
        @height="120"
        src="/assets/images/teaching-tomster.png"
        width="200"
        height="300"
      />
    </template>);

    assert.dom().hasText('template block text');
    assert
      .dom('.map img')
      .hasAttribute('src', /^https:\/\/api\.mapbox\.com\//)
      .hasAttribute('width', '150')
      .hasAttribute('height', '120');
  });
});
```

Note that the `hasAttribute` test helper from qunit-dom supports using regular expressions. 
We used this feature to confirm that the src attribute starts with `https://api.mapbox.com/`, as opposed to requiring it to be an exact match against a string. This allows us to be reasonably confident that the code is working correctly, without being overly-detailed in our tests.




app/components/rental.gjs
```gjs

import RentalImage from 'tutorial-app/components/rental/image';
import Map from 'tutorial-app/components/map';

<template>
  <article class="rental">
    <RentalImage
      src="https://upload.wikimedia.org/wikipedia/commons/c/cb/Crane_estate_(5).jpg"
      alt="A picture of Grand Old Mansion"
    />
    <div class="details">
      <h3>Grand Old Mansion</h3>
      <div class="detail owner">
        <span>Owner:</span> Veruca Salt
      </div>
      <div class="detail type">
        <span>Type:</span> Standalone
      </div>
      <div class="detail location">
        <span>Location:</span> San Francisco
      </div>
      <div class="detail bedrooms">
        <span>Number of bedrooms:</span> 15
      </div>
    </div>
    <Map
      @lat="37.7749"
      @lng="-122.4194"
      @zoom="9"
      @width="150"
      @height="150"
      alt="A map of Grand Old Mansion"
    />
  </article>
</template>
```



tests/integration/components/rental-test.gjs
```gjs

import { module, test } from 'qunit';
import { setupRenderingTest } from 'tutorial-app/tests/helpers';
import { render } from '@ember/test-helpers';
import Rental from 'tutorial-app/components/rental';

module('Integration | Component | rental', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders information about a rental property', async function (assert) {
    await render(<template><Rental /></template>);

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

# Refactoring with Getters and Auto-track 
One alternative is to move this computation into the JavaScript class instead.

From within our JavaScript class, we have access to our component's arguments using the `this.args.*` API. 
Using that, we can move the URL logic up from the template into a new getter.

`this.args` is an API provided by the Glimmer component superclass. 
You may come across other component superclasses, such as "classic" components in legacy codebases, that provide different APIs for accessing component arguments from JavaScript code.

app/components/map.gjs
```gjs

import Component from '@glimmer/component';
import ENV from 'tutorial-app/config/environment';

const MAPBOX_API = 'https://api.mapbox.com/styles/v1/mapbox/streets-v11/static';

export default class Map extends Component {
  get src() {
    let { lng, lat, width, height, zoom } = this.args;

    let coordinates = `${lng},${lat},${zoom}`;
    let dimensions = `${width}x${height}`;
    let accessToken = `access_token=${this.token}`;

    return `${MAPBOX_API}/${coordinates}/${dimensions}@2x?${accessToken}`;
  }

  get token() {
    return encodeURIComponent(ENV.MAPBOX_ACCESS_TOKEN);
  }

  <template>
    <div class="map">
      <img
        alt="Map image at coordinates {{@lat}},{{@lng}}"
        ...attributes
        src={{this.src}}
        width={{@width}} height={{@height}}
      >
    </div>
  </template>
}
```




Note that we did not mark our getter as @tracked. Unlike instance variables, getters cannot be "assigned" a new value directly, so it does not make sense for Ember to monitor them for changes.

In our case, the value produced by our src getter depends on the values of lat, lng, width, height and zoom from this.args. 
Whenever these dependencies get updated, we would expect {{this.src}} from our template to be updated accordingly.

Ember does this by automatically tracking any variables that were accessed while computing a getter's value. 
As long as the dependencies themselves are marked as @tracked, Ember knows exactly when to invalidate and re-render any templates that may potentially contain any "stale" and outdated getter values. 
This feature is also known as auto-track. 
All arguments that can be accessed from this.args (in other words, this.args.*) are implicitly marked as @tracked by the Glimmer component superclass. 
Since we inherited from that superclass, everything Just Works™.

## Getting JavaScript Values into the Test Context 
we can add a test for this behavior:

tests/integration/components/map-test.gjs
```gjs

import { module, test } from 'qunit';
import { setupRenderingTest } from 'tutorial-app/tests/helpers';
import { render, find } from '@ember/test-helpers';
import { render, find, rerender } from '@ember/test-helpers';
import ENV from 'tutorial-app/config/environment';
import Map from 'tutorial-app/components/map';
import { tracked } from '@glimmer/tracking';

module('Integration | Component | map', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders a map image for the specified parameters', async function (assert) {
    await render(<template>
      <Map
        @lat="37.7797"
        @lng="-122.4184"
        @zoom="10"
        @width="150"
        @height="120"
      />
    </template>);

    assert
      .dom('.map img')
      .exists()
      .hasAttribute('alt', 'Map image at coordinates 37.7797,-122.4184')
      .hasAttribute('src')
      .hasAttribute('width', '150')
      .hasAttribute('height', '120');

    let { src } = find('.map img');
    let token = encodeURIComponent(ENV.MAPBOX_ACCESS_TOKEN);

    assert.ok(
      src.startsWith('https://api.mapbox.com/'),
      'the src starts with "https://api.mapbox.com/"',
    );

    assert.ok(
      src.includes('-122.4184,37.7797,10'),
      'the src should include the lng,lat,zoom parameter',
    );

    assert.ok(
      src.includes('150x120@2x'),
      'the src should include the width,height and @2x parameter',
    );

    assert.ok(
      src.includes(`access_token=${token}`),
      'the src should include the escaped access token',
    );
  });

  test('it updates the `src` attribute when the arguments change', async function (assert) {
    class State { 
      @tracked lat = 37.7749;
      @tracked lng = -122.4194;
      @tracked zoom = 10;
      @tracked width = 150;
      @tracked height = 120;
    };

    const state = new State();

    await render(<template>
      <Map
        @lat={{state.lat}}
        @lng={{state.lng}}
        @zoom={{state.zoom}}
        @width={{state.width}}
        @height={{state.height}}
      />
    </template>);

    let img = find('.map img');

    assert.ok(
      img.src.includes('-122.4194,37.7749,10'),
      'the src should include the lng,lat,zoom parameter',
    );

    assert.ok(
      img.src.includes('150x120@2x'),
      'the src should include the width,height and @2x parameter',
    );

    state.width = 300;
    state.height = 200;
    state.zoom = 12;

    await rerender();

    assert.ok(
      img.src.includes('-122.4194,37.7749,12'),
      'the src should include the lng,lat,zoom parameter',
    );

    assert.ok(
      img.src.includes('300x200@2x'),
      'the src should include the width,height and @2x parameter',
    );

    state.lat = 47.6062;
    state.lng = -122.3321;

    await rerender();

    assert.ok(
      img.src.includes('-122.3321,47.6062,12'),
      'the src should include the lng,lat,zoom parameter',
    );

    assert.ok(
      img.src.includes('300x200@2x'),
      'the src should include the width,height and @2x parameter',
    );
  });

  test('the default alt attribute can be overridden', async function (assert) {
    await render(<template>
      <Map
        @lat="37.7797"
        @lng="-122.4184"
        @zoom="10"
        @width="150"
        @height="120"
        alt="A map of San Francisco"
      />
    </template>);

    assert.dom('.map img').hasAttribute('alt', 'A map of San Francisco');
  });

  test('the src, width and height attributes cannot be overridden', async function (assert) {
    await render(<template>
      <Map
        @lat="37.7797"
        @lng="-122.4184"
        @zoom="10"
        @width="150"
        @height="120"
        src="/assets/images/teaching-tomster.png"
        width="200"
        height="300"
      />
    </template>);

    assert
      .dom('.map img')
      .hasAttribute('src', /^https:\/\/api\.mapbox\.com\//)
      .hasAttribute('width', '150')
      .hasAttribute('height', '120');
  });
});
```

In this test, we create a local class called `State` and an instance of that class called `state`. 
There is nothing special about the name State—it's just a regular JavaScript class we use to keep track of data we might want to pass into our component. 
We use the `@tracked` decorator just like in the application code so whenever we make a change, Ember will update the page automatically.

In tests like this, whenever we make changes to state that is rendered, we call `await rerender()`. 
This gives Ember a chance to update the display before continuing with the queries and assertions that follow. 
Following this pattern allows us to update these values as needed from the test function.

