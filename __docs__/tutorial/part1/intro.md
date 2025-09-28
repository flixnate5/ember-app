Chapter 1 - Installing Ember CLI
    Creating a new Ember app with Ember CLI
    Starting and stopping the development server
    Editing files and live reload
    Working with HTML, CSS and assets in an Ember app

Chapter 2 Defining routes
    Using route templates
    Customizing URLs
    Linking pages with the <LinkTo> component
    Passing arguments and attributes to components

Chapter 3 The purpose of automated testing
    Writing acceptance tests
    Using generators in Ember CLI
    Testing with the QUnit test framework
    Working with Ember's test helpers
    Practicing the testing workflow

Chapter 4 Extracting markup into components
    Invoking components
    Passing content to components
    Yielding content with the {{yield}} keyword
    Refactoring existing code
    Writing component tests
    Using the application template and {{outlet}}s

Chapter 5 Generating components
    Organizing code with namespaced components
    Forwarding HTML attributes with ...attributes
    Determining the appropriate amount of test coverage

Chapter 6 Adding behavior to components with classes
    Accessing instance states from templates
    Managing state with tracked properties
    Using conditionals syntaxes in templates
    Responding to user interaction with actions
    Invoking element modifiers
    Testing user interactions

Chapter 7 Managing application-level configurations
    Parameterizing components with arguments
    Accessing component arguments
    Interpolating values in templates
    Overriding HTML attributes in ...attributes
    Refactoring with getters and auto-track
    Getting JavaScript values into the test context

Chapter 8 Working with route files
    Returning local data from the model hook
    Accessing route models from templates
    Mocking server data with static JSON files
    Fetching remote data from the model hook
    Adapting server data
    Loops and local variables in templates with {{#each}}



When you come back, we build upon what we learned in Part 1 and take things to the next level!

# Introduction
browsing interesting places to stay during your next vacation. 

download https://github.com/ember-learn/super-rentals/tree/super-rentals-tutorial-output 

Part 1 of the Ember.js Tutorial:
    Using Ember CLI
    Navigating the file and folder structure of an Ember app
    Building and linking between pages
    Templates and components
    Automated testing
    Working with server data

Part 2: 
builds upon these concepts and takes things to the next level.

---------

install Ember CLI, use it to generate a new Ember project, 
add some basic templates and styles to your new app. 

```shell

npm install -g ember-cli

ember --version
```


new project using Ember CLI
include a `--lang en` option primary language to English

```shell

ember new super-rentals --lang en
```


```shell

cd super-rentals
npm start
```

```

super-rentals
├── .github
│   └── workflows
│       └── ci.yml
├── app
│   ├── components
│   │   └── .gitkeep
│   ├── controllers
│   │   └── .gitkeep
│   ├── helpers
│   │   └── .gitkeep
│   ├── models
│   │   └── .gitkeep
│   ├── routes
│   │   └── .gitkeep
│   ├── styles
│   │   └── app.css
│   ├── templates
│   │   └── application.hbs
│   ├── app.js
│   ├── deprecation-workflow.js
│   ├── index.html
│   └── router.js
├── config
│   ├── ember-cli-update.json
│   ├── environment.js
│   ├── optional-features.json
│   └── targets.js
├── public
│   └── robots.txt
├── tests
│   ├── helpers
│   │   └── index.js
│   ├── integration
│   │   └── .gitkeep
│   ├── unit
│   │   └── .gitkeep
│   ├── index.html
│   └── test-helper.js
├── .editorconfig
├── .ember-cli
├── .eslintcache
├── .gitignore
├── .prettierignore
├── .prettierrc.js
├── .stylelintignore
├── .stylelintrc.js
├── .template-lintrc.js
├── .watchmanconfig
├── README.md
├── ember-cli-build.js
├── eslint.config.mjs
├── package.json
├── package-lock.json
└── testem.js
```

It also comes with a development server, which we can launch within the project with the npm start command:

```shell

npm start
```

If you would like to share your work with the world, you will have to deploy your app to the public Internet. 

Editing Files and Live Reload 
 `app/templates/application.hbs` edit that file and replace it with our own content:

```html

{{page-title "SuperRentals"}}

{{outlet}}
{{! The following component displays Ember's default welcome message. }}
<WelcomePage />
{{! Feel free to remove this! }}
```

When you are done experimenting, go ahead and delete the app/templates/application.hbs file. 
We won't be needing this for a while, so let's start afresh. 

Working with HTML, CSS and Assets in an Ember App 
Create a `app/templates/index.hbs` file and paste the following markup.

```html

<div class="jumbo">
  <div class="right tomster"></div>
  <h2>Welcome to Super Rentals!</h2>
  <p>We hope you find exactly what you're looking for in a place to stay.</p>
</div>
```

`app/styles/app.css`

```scss

@import url(https://fonts.googleapis.com/css?family=Lato:300,300italic,400,700,700italic);

/**
 * Base Elements
 */

* {
  margin: 0;
  padding: 0;
}

body,
h1,
h2,
h3,
h4,
h5,
h6,
p,
div,
span,
a,
button {
  font-family: 'Lato', 'Open Sans', 'Helvetica Neue', 'Segoe UI', Helvetica, Arial, sans-serif;
  line-height: 1.5;
}

body {
  background: #f3f3f3;
}

/* ...snip... */

.tomster {
  background: url(../assets/images/teaching-tomster.png);
  /* ...snip... */
}
```

Ember convention is to place your source code in the app folder. 
For other assets like images and fonts, the convention is to put them in the public/ folder. 
We will follow this convention by downloading the image file and saving it into public/assets/images/teaching-tomster.png.

http://localhost:4200/assets/images/teaching-tomster.png

# Building Pages
    
    
    Defining routes
    Using route templates
    Customizing URLs
    Linking pages with the <LinkTo> component
    Passing arguments and attributes to components

## 1. Defining Routes 
Go ahead and open `app/router.js` and make the following change:

```ts

import EmberRouter from '@ember/routing/router';
import config from 'super-rentals/config/environment';

export default class Router extends EmberRouter {
  location = config.locationType;
  rootURL = config.rootURL;
}

Router.map(function () {});
Router.map(function () {
  this.route('about');
});
```

# Using Route Templates 
we can create a new `app/templates/about.hbs` template with the following content:

```html

<div class="jumbo">
  <div class="right tomster"></div>
  <h2>About Super Rentals</h2>
  <p>
    The Super Rentals website is a delightful project created to explore Ember.
    By building a property rental site, we can simultaneously imagine traveling
    AND building Ember applications.
  </p>
</div>
```

# Defining Routes with Custom Paths 
which is served at the legacy URL `/getting-in-touch`.

`app/router.js`
```ts

import EmberRouter from '@ember/routing/router';
import config from 'super-rentals/config/environment';

export default class Router extends EmberRouter {
  location = config.locationType;
  rootURL = config.rootURL;
}

Router.map(function () {
  this.route('about');
  this.route('contact', { path: '/getting-in-touch' });
});
```

We'll add a app/templates/contact.hbs file:

app/templates/contact.hbs
```html

<div class="jumbo">
  <div class="right tomster"></div>
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
</div>
```



app/templates/index.hbs
```html

<div class="jumbo">
  <div class="right tomster"></div>
  <h2>Welcome to Super Rentals!</h2>
  <p>We hope you find exactly what you're looking for in a place to stay.</p>
  <LinkTo @route="about" class="button">About Us</LinkTo>
</div>
```
app/templates/about.hbs
```html
<div class="jumbo">
  <div class="right tomster"></div>
  <h2>About Super Rentals</h2>
  <p>
    The Super Rentals website is a delightful project created to explore Ember.
    By building a property rental site, we can simultaneously imagine traveling
    AND building Ember applications.
  </p>
  <LinkTo @route="contact" class="button">Contact Us</LinkTo>
</div>
```
app/templates/contact.hbs
```html

<div class="jumbo">
  <div class="right tomster"></div>
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
</div>
```

`<LinkTo>` is an example of a component in Ember—you can tell them apart from regular HTML tags because they start with an uppercase letter. 
Along with regular HTML tags, components are a key building block that we can use to build up an app's user interface.

The `@route=...` part is how we pass arguments into the component. 
components can also take the usual HTML attributes as well. 

# Automated Testing

    The purpose of automated testing
    Writing acceptance tests
    Using generators in Ember CLI
    Testing with the QUnit test framework
    Working with Ember's test helpers
    Practicing the testing workflow

But surely, this will get out of hand as we add more features to our app. 
It is also going to get old really quickly—repetitive tasks like that are best left to robots.

## Adding Acceptance Tests with Generators 

```shell

ember generate acceptance-test super-rentals
```

In this case, we generated an acceptance test located at tests/acceptance/super-rentals-test.js.

Acceptance tests, also known as application tests, are one of a few types of automated testing at our disposal in Ember. 
test our app from the user's perspective


tests/acceptance/super-rentals-test.js
```ts

import { module, test } from 'qunit';
import { visit, currentURL } from '@ember/test-helpers';
import { click, visit, currentURL } from '@ember/test-helpers';
import { setupApplicationTest } from 'super-rentals/tests/helpers';

module('Acceptance | super rentals', function (hooks) {
  setupApplicationTest(hooks);

  test('visiting /', async function (assert) {
    await visit('/');

    assert.strictEqual(currentURL(), '/');
    assert.dom('h2').hasText('Welcome to Super Rentals!');

    assert.dom('.jumbo a.button').hasText('About Us');
    await click('.jumbo a.button');

    assert.strictEqual(currentURL(), '/about');
  });
});
```

1. navigate to the `/` URL of our app by using the visit test helper provided by Ember.
Because the page is going to take some time to load, this is known as an async step, so we will need to tell the test robot to wait by using JavaScript's await keyword. 
That way, it will wait until the page completely finishes loading before moving on to the next step.

we check that the current URL matches the URL that we expect (/). 
We can use the currentURL test helper here, as well as equal assertion. 

Finally, we asserted that clicking on the link should bring us to the /about URL.

Here, we are writing the tests in a framework called **QUnit**, which is where the functions module, test and assert come from. 
We also have additional helpers like click, visit, and currentURL provided by the @ember/test-helpers package. 

```shell
ember test --server
```
This server behaves much like the development server, but it is explicitly running for our tests. 
It may automatically open a browser window and take you to the test UI, or you can open http://localhost:7357/ yourself.

If you watch really carefully, you can see our test robot roaming around our app and clicking links:

# Practicing the Testing Workflow 

tests/acceptance/super-rentals-test.js
```ts

import { module, test } from 'qunit';
import { click, visit, currentURL } from '@ember/test-helpers';
import { setupApplicationTest } from 'super-rentals/tests/helpers';

module('Acceptance | super rentals', function (hooks) {
  setupApplicationTest(hooks);

  test('visiting /', async function (assert) {
    await visit('/');

    assert.strictEqual(currentURL(), '/');
    assert.dom('h2').hasText('Welcome to Super Rentals!');

    assert.dom('.jumbo a.button').hasText('About Us');
    await click('.jumbo a.button');

    assert.strictEqual(currentURL(), '/about');
  });

  test('visiting /about', async function (assert) {
    await visit('/about');

    assert.strictEqual(currentURL(), '/about');
    assert.dom('h2').hasText('About Super Rentals');

    assert.dom('.jumbo a.button').hasText('Contact Us');
    await click('.jumbo a.button');

    assert.strictEqual(currentURL(), '/getting-in-touch');
  });

  test('visiting /getting-in-touch', async function (assert) {
    await visit('/getting-in-touch');

    assert.strictEqual(currentURL(), '/getting-in-touch');
    assert.dom('h2').hasText('Contact Us');

    assert.dom('.jumbo a.button').hasText('About');
    await click('.jumbo a.button');

    assert.strictEqual(currentURL(), '/about');
  });
});
```

test UI should automatically reload and rerun the entire test suite as you save the files. 


