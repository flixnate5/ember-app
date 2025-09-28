# Service Injection


    Splattributes and the class attribute
    The router service
    Ember services vs. global variables
    Mocking services in tests
    Scoping the Feature 

share on Twitter, use of the Twitter Web Intent API.
link to https://twitter.com/intent/tweet
link will prompt the user to compose a new tweet. 
The API also supports us pre-populating the tweet with some text, hashtag suggestions, or even a link, all through the use of special query params.

For instance, let's say we would like to suggest a tweet with the following content:
```
Check out Grand Old Mansion on Super Rentals! https://super-rentals.example/rentals/grand-old-mansion
#vacation #travel #authentic #blessed #superrentals via @emberjs
```

We could open a new page to the following URL:
```
https://twitter.com/intent/tweet?
  url=https%3A%2F%2Fsuper-rentals.example%2Frentals%2Fgrand-old-mansion&
  text=Check+out+Grand+Old+Mansion+on+Super+Rentals%21&
  hashtags=vacation%2Ctravel%2Cauthentic%2Cblessed%2Csuperrentals&
  via=emberjs
```  

## Splattributes and the class Attribute 
let's get to work and generate a share-button component.

```shell

ember generate component share-button -gc
```
      create app/components/share-button.gjs
      create tests/integration/components/share-button-test.gjs



app/components/share-button.gjs
```gjs

import Component from '@glimmer/component';
const TWEET_INTENT = 'https://twitter.com/intent/tweet';

export default class ShareButton extends Component {
  get currentURL() {
    return window.location.href;
  }

  get shareURL() {
    let url = new URL(TWEET_INTENT);

    url.searchParams.set('url', this.currentURL);

    if (this.args.text) {
      url.searchParams.set('text', this.args.text);
    }

    if (this.args.hashtags) {
      url.searchParams.set('hashtags', this.args.hashtags);
    }

    if (this.args.via) {
      url.searchParams.set('via', this.args.via);
    }

    return url;
  }

  <template>
    <a
      ...attributes
      href={{this.shareURL}}
      target="_blank"
      rel="external nofollow noopener noreferrer"
      class="share button"
    >
      {{yield}}
    </a>
  </template>
}
```

we added ...attributes to our a tag here. 
the order of ...attributes relative to other attributes is significant. 
We don't want to allow href, target, or rel to be overridden by the invoker, so we specified those attributes after ...attributes.

the class attribute is the one exception to how these component attributes are overridden! 
While all other HTML attributes follow the "last-write wins" rule, the values for the class attribute are merged together (concatenated) instead. 
There is a good reason for this: it allows the component to specify whatever classes that it needs, while allowing the invokers of the component to freely add any extra classes that they need for styling purposes.

We also have a {{yield}} inside of our <a> tag so that we can customize the text for the link later when invoking the ShareButton component.

The key functionality of this class is to build the appropriate URL for the Twitter Web Intent API, which is exposed to the template via the this.shareURL getter. 
It mainly involves "gluing together" the component's arguments and setting the appropriate query params on the resulting URL. 
Conveniently, the browser provides a handy URL class that handles escaping and joining of query params for us.

The other notable functionality of this class has to do with getting the current page's URL and automatically adding it to the Twitter Intent URL. 
To accomplish this, we defined a currentURL getter that simply used the browser's global Location object, which we could access at window.location. 

app/components/rental/detailed.gjs
```gjs

import Jumbo from 'tutorial-app/components/jumbo';
import RentalImage from 'tutorial-app/components/rental/image';
import Map from 'tutorial-app/components/map';
import ShareButton from 'tutorial-app/components/share-button';

<template>
  <Jumbo>
    <h2>{{@rental.title}}</h2>
    <p>Nice find! This looks like a nice place to stay near {{@rental.city}}.</p>

    <ShareButton
      @text="Check out {{@rental.title}} on Super Rentals!"
      @hashtags="vacation,travel,authentic,blessed,superrentals"
      @via="emberjs"
    >
      Share on Twitter
    </ShareButton>
  </Jumbo>

  <article class="rental detailed">
    <RentalImage
      src={{@rental.image}}
      alt="A picture of {{@rental.title}}"
    />

    <div class="details">
      <h3>About {{@rental.title}}</h3>

      <div class="detail owner">
        <span>Owner:</span> {{@rental.owner}}
      </div>
      <div class="detail type">
        <span>Type:</span> {{@rental.type}} – {{@rental.category}}
      </div>
      <div class="detail location">
        <span>Location:</span> {{@rental.city}}
      </div>
      <div class="detail bedrooms">
        <span>Number of bedrooms:</span> {{@rental.bedrooms}}
      </div>
      <div class="detail description">
        <p>{{@rental.description}}</p>
      </div>
    </div>

    <Map
      @lat={{@rental.location.lat}}
      @lng={{@rental.location.lng}}
      @zoom="12"
      @width="894"
      @height="600"
      alt="A map of {{@rental.title}}"
      class="large"
    />
  </article>
</template>
```

## Why We Can't Test `window.location.href` 
Let's start with an acceptance test:


tests/acceptance/super-rentals-test.js
```js

import { module, test } from 'qunit';
import { click, find, visit, currentURL } from '@ember/test-helpers';
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

  test('viewing the details of a rental property', async function (assert) {
    await visit('/');
    assert.dom('.rental').exists({ count: 3 });

    await click('.rental:first-of-type a');
    assert.strictEqual(currentURL(), '/rentals/grand-old-mansion');
  });

  test('visiting /rentals/grand-old-mansion', async function (assert) {
    await visit('/rentals/grand-old-mansion');

    assert.strictEqual(currentURL(), '/rentals/grand-old-mansion');
    assert.dom('nav').exists();
    assert.dom('h1').containsText('SuperRentals');
    assert.dom('h2').containsText('Grand Old Mansion');
    assert.dom('.rental.detailed').exists();
    assert.dom('.share.button').hasText('Share on Twitter');

    let button = find('.share.button');

    let tweetURL = new URL(button.href);
    assert.strictEqual(tweetURL.host, 'twitter.com');

    assert.strictEqual(
      tweetURL.searchParams.get('url'),
      `${window.location.origin}/rentals/grand-old-mansion`,
    );
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

The main thing we want to confirm here, from an acceptance test level, is that 
1. there is a share button on the page, 
2. it correctly captures the current page's URL. 
3. Ideally, we would simulate clicking on the button to confirm that it actually works. However, that would navigate us away from the test page and stop the test!

Therefore, the best we could do is to look at the href attribute of the link, and check that it has roughly the things we expect in there. 
To do that, we used the find test helper to find the element, and used the browser's URL API to parse its href attribute into an object that is easier to work with.

The href attribute contains the Twitter Intent URL, which we confirmed by checking that the host portion of the URL matches twitter.com. 
 

The main event here is that we wanted to confirm the Twitter Intent URL includes a link to our current page's URL. 
We checked that by comparing its url query param to the expected URL, using `window.location.origin` to get the current protocol, 
hostname and port, which should be http://localhost:4200.

the problem seems to be that the component had captured http://localhost:4200/tests as the "current page's URL". 
The issue here is that the ShareButton component uses window.location.href to capture the current URL. 
Because we are running our tests at http://localhost:4200/tests, that's what we got. 
Technically it's not wrong, but this is certainly not what we meant. 

### why does the currentURL() test helper not have the same problem? 
In our test, we have been writing assertions like `assert.strictEqual(currentURL(), '/about');`, and those assertions did not fail.

It turns out that this is something Ember's router handled for us. 
In an Ember app, the router is responsible for handling navigation and maintaining the URL. 
For example, when you click on a LinkTo component, it will ask the router to execute a route transition. 
Normally, the router is set up to update the browser's address bar whenever it transitions into a new route. 
That way, your users will be able to use the browser's back button and bookmark functionality just like any other webpage.

However, during tests, the router is configured to maintain the "logical" URL internally, without updating the browser's address bar and history entries. This way, the router won't confuse the browser and its back button with hundreds of history entries as you run through your tests. The currentURL() taps into this piece of internal state in the router, instead of checking directly against the actual URL in the address bar using window.location.href.

# The Router Service 
To fix our problem, we would need to do the same. 
Ember exposes this internal state through the router service, which we can inject into our component:

app/components/share-button.gjs
```gjs

import Component from '@glimmer/component';
import { service } from '@ember/service';
const TWEET_INTENT = 'https://twitter.com/intent/tweet';

export default class ShareButton extends Component {
  @service router;

  get currentURL() {
    return new URL(this.router.currentURL, window.location.origin);
  }

  get shareURL() {
    let url = new URL(TWEET_INTENT);

    url.searchParams.set('url', this.currentURL);

    if (this.args.text) {
      url.searchParams.set('text', this.args.text);
    }

    if (this.args.hashtags) {
      url.searchParams.set('hashtags', this.args.hashtags);
    }

    if (this.args.via) {
      url.searchParams.set('via', this.args.via);
    }

    return url;
  }

  <template>
    <a
      ...attributes
      href={{this.shareURL}}
      target="_blank"
      rel="external nofollow noopener noreferrer"
      class="share button"
    >
      {{yield}}
    </a>
  </template>
}
```

Here, we added the `@service router;` declaration to our component class. 
This injects the router service into the component, making it available to us as this.router. 
The router service has a currentURL property, providing the current "logical" URL as seen by Ember's router. 
Similar to the test helper with the same name, this is a relative URL, so we would have to join it with window.location.origin to get an absolute URL that we can share.

With this change, everything is now working the way we intended.

# Ember Services vs. Global Variables 
In Ember, services serve a similar role to global variables, in that they can be easily accessed by any part of your app. 
For example, we can inject any available service into components, as opposed to having them passed in as an argument. 
This allows deeply nested components to "skip through" the layers and access things that are logically global to the entire app, such as routing, authentication, user sessions, user preferences, etc. 
Without services, every component would have to pass through a lot of the same arguments into every component it invokes.

A major difference between services and global variables is that services are scoped to your app, instead of all the JavaScript code that is running on the same page. This allows you to have multiple scripts running on the same page without interfering with each other.

More importantly, services are designed to be easily swappable. In our component class, all we did was request that Ember inject the service named router, without specifying where that service comes from. This allows us to replace Ember's router service with a different object at runtime.

By default, Ember infers the name of an injected service from the name of the property. If you would like the router service to be available at, say, this.emberRouter, you can specify @service('router') emberRouter; instead. @service router; is simply a shorthand for @service('router') router;.


## Mocking Services in Tests 
We will take advantage of this capability in our component test:

tests/integration/components/share-button-test.gjs
```gjs

import { module, test } from 'qunit';
import { setupRenderingTest } from 'tutorial-app/tests/helpers';
import Service from '@ember/service';
import { render } from '@ember/test-helpers';
import ShareButton from 'tutorial-app/components/share-button';

const MOCK_URL = new URL(
  '/foo/bar?baz=true#some-section',
  window.location.origin,
);

class MockRouterService extends Service {
  get currentURL() {
    return '/foo/bar?baz=true#some-section';
  }
}

module('Integration | Component | share-button', function (hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(function () {
    this.owner.register('service:router', MockRouterService);
  });

  test('basic usage', async function (assert) {
    await render(<template>
      <ShareButton>Tweet this!</ShareButton>
    </template>);

    assert
      .dom('a')
      .hasAttribute('target', '_blank')
      .hasAttribute('rel', 'external nofollow noopener noreferrer')
      .hasAttribute(
        'href',
        `https://twitter.com/intent/tweet?url=${encodeURIComponent(MOCK_URL.href)}`
      )
      .hasClass('share')
      .hasClass('button')
      .containsText('Tweet this!');
  });
});
```

In this component test, we registered our own router service with Ember in the beforeEach hook. 
When our component is rendered and requests the router service to be injected, it will get an instance of our MockRouterService instead of the built-in router service.

This is a pretty common testing technique called mocking or stubbing. 
Our MockRouterService implements the same interface as the built-in router service – the part that we care about anyway; which is that it has a currentURL property that reports the current "logical" URL. 
This allows us to fix the URL at a pre-determined value, making it possible to easily test our component without having to navigate to a different page. 
As far as our component can tell, we are currently on the page `/foo/bar/baz?some=page#anchor`, because that's the result it would get when querying the router service.

By using service injections and mocks, Ember allows us to build loosely coupled components that can each be tested in isolation, while acceptance tests provide end-to-end coverage that ensures that these components do indeed work well together.

add some more tests for the various functionalities of the ShareButton component:

tests/integration/components/share-button-test.gjs
```gjs

import { module, test } from 'qunit';
import { setupRenderingTest } from 'tutorial-app/tests/helpers';
import Service from '@ember/service';
import { find, render } from '@ember/test-helpers';
import ShareButton from 'tutorial-app/components/share-button';

const MOCK_URL = new URL(
  '/foo/bar?baz=true#some-section',
  window.location.origin,
);

class MockRouterService extends Service {
  get currentURL() {
    return '/foo/bar?baz=true#some-section';
  }
}

function tweetParam(param) {
  let link = find('a');
  let url = new URL(link.href);
  return url.searchParams.get(param);
}

module('Integration | Component | share-button', function (hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(function () {
    this.owner.register('service:router', MockRouterService);

  });

  test('basic usage', async function (assert) {
    await render(<template>
      <ShareButton>Tweet this!</ShareButton>
    </template>);

    assert
      .dom('a')
      .hasAttribute('target', '_blank')
      .hasAttribute('rel', 'external nofollow noopener noreferrer')
      .hasAttribute('href', /^https:\/\/twitter\.com\/intent\/tweet/)
      .hasClass('share')
      .hasClass('button')
      .containsText('Tweet this!');

    assert.strictEqual(tweetParam('url'), MOCK_URL.href);
  });

  test('it supports passing @text', async function (assert) {
    await render(<template>
      <ShareButton @text="Hello Twitter!">Tweet this!</ShareButton>
    </template>);

    assert.strictEqual(tweetParam('text'), 'Hello Twitter!');
  });

  test('it supports passing @hashtags', async function (assert) {
    await render(<template>
      <ShareButton @hashtags="foo,bar,baz">Tweet this!</ShareButton>
    </template>);

    assert.strictEqual(tweetParam('hashtags'), 'foo,bar,baz');
  });

  test('it supports passing @via', async function (assert) {
    await render(<template>
      <ShareButton @via="emberjs">Tweet this!</ShareButton>
    </template>);

    assert.strictEqual(tweetParam('via'), 'emberjs');
  });

  test('it supports adding extra classes', async function (assert) {
    await render(<template>
      <ShareButton class="extra things">Tweet this!</ShareButton>
    </template>);

    assert
      .dom('a')
      .hasClass('share')
      .hasClass('button')
      .hasClass('extra')
      .hasClass('things');
  });

  test('the target, rel and href attributes cannot be overridden', async function (assert) {
    await render(<template>
      <ShareButton target="_self" rel="" href="/">Not a Tweet!</ShareButton>
    </template>);

    assert
      .dom('a')
      .hasAttribute('target', '_blank')
      .hasAttribute('rel', 'external nofollow noopener noreferrer')
      .hasAttribute('href', /^https:\/\/twitter\.com\/intent\/tweet/);
   });

});
```

The main goal here is to test the key functionalities of the component individually. 
That way, if any of these features regresses in the future, these tests can help pinpoint the source of the problem for us. 
Because a lot of these tests require parsing the URL and accessing its query params, we setup our own tweetParam utility test helper function. 

This pattern allows us to easily share functionality between tests. 
We were even able to refactor the previous test using this new helper!

With that, everything should be good to go, and our <ShareButton> component should now work everywhere!

