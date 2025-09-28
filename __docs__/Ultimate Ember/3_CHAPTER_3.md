# 3 CHAPTER 3 Ember.js Routing

**Router** is the gateway to an Ember application. 
router decides and loads the appropriate **Route Handler** based on the URL.
**Route Handler** is loaded by the router and it takes care of fetching the model for the route, rendering the template for the route and setting up the controller and passing the model data to the controller.

file `app/router.js` contains the list of all routes present in the Ember application. 

```ts

import EmberRouter from '@ember/routing/router';
import config from 'my-ember-project/config/environment';

export default class Router extends EmberRouter {
    location = config.locationType;
    rootURL = config.rootURL;
}

Router.map(function () {});
```

`Router.map` is the function where all the routes will be defined.

When creating the new project, `ember serve` automatically generates the Application Route for you. 
The application route is the default route loaded by the Ember application. 
It can contain functions/actions that need to be executed in common for all the routes. 

template application route (`app/templates/application.hbs`). 

By default, routes load controllers and templates of the same name specified in the same relative path as the route. 
For example, a route named `application` will load the template in `app/templates/application.hbs`.
- A route file present in `app/routes/output-folder/my-route.js` will load the controllers and templates present in the respective controllers and templates folder, in the same  sub path, like `app/controllers/output-folder/my-route.js`
and `app/templates/output-folder/my-route.hbs`. 

## Setting Up Ember Routes
application route usually contains the menu layout, navbar, and more, which is common to the entire application. 

The **index route** is a special case, where there is no entry added to the `router.js`. 
Index means the landing page. 
Let's run `ember generate route index` 

note that generating the index route does not update the router file. 
It only creates the route and template file for the index route.

Let's remove the sample code in the `application.hbs` file by removing the `<WelcomePage />` component. 
 
Let's add our app's name to the `application.hbs` file through the following code:
```handlebars
<h1 class="page-title text-center">My Ember Application</h1>
```

CSS to the app.scss file app.scss will center the title.

```scss

.text-center {
  text-align: center;
}
```

`app/templates/index.hbs` file:

```hbs
<p class="text-center">index page</p>
```

```shell

 ember generate route about
```

```html

<p class="text-center">about page</p>
```



The application route is the base route and the template from that will be visible in all the pages. 
 `{{outlet}}` used to render sub-templates in Ember.

# Linking Between Routes
use the `<LinkTo>` tag to link to another route. 
```html

<div class="text-center">
    <LinkTo @route="index">Home</LinkTo>
    <LinkTo @route="about">About</LinkTo>
</div>
```

## Nested Routes
Similarly, we will have cases in your application where you might want to render a template inside another template. 

build a simple CRUD (Create, Read, Update, Delete) operation for managing a list of our clients. 
Now all these actions can be categorized to be part of the clients module. 

- All URLs of the clients module should start with /clients.
- The routes can be as follows:
      /clients : Shows the list of clients
      /clients/new : Shows the form to create a new client
      /clients/:client-id is a dynamic route that shows details of a particular client
      /clients/:client-id/edit to edit a particular client
  
For each nested route, we have to first create an _index route_.
An index route is the default fallback route to load when there is no sub-route specified. 
For example, in the clients module, /clients/ is the base URL for the block, and just specifying this URL in the browser will load the index route of the nested block. 

`ember generate route clients/index`

sub-routes will be listed inside the function that's passed as the parameter.

templates/clients and routes/clients folders
 
`app/templates/application.hbs` file:
```html
<LinkTo @route="clients.index">Clients</LinkTo>
```

Let's add some dummy content inside the `templates/clients/index.hbs` file:
```html

<table class="table">
      <thead>
      <tr>
            <th>Name</th>
            <th>Company Name</th>
            <th>Email</th>
            <th>Phone Number</th>
            <th></th>
      </tr>
      </thead>
      <tbody>
      <tr>
            <td>John</td>
            <td>John's Furniture</td>
            <td>+91 98765 43210</td>
            <td>john@example.com</td>
            <td>
                  View | Edit | Delete
            </td>
      </tr>
      <tr>
            <td>Robert</td>
            <td>Smart Boutique</td>
            <td>+91 98764 53210</td>
            <td>robert@example.com</td>
            <td>
                  View | Edit | Delete
            </td>
      </tr>
      </tbody>
</table>
```

For styling purposes, let's add the following to the styles/app.scss file:
```css

.table {
width: 90%;
margin: auto;
border: 1px solid #ddd;
margin-top: 30px;
}
.table th,
.table td {
border: 1px solid #ddd;
text-align: center;
padding: 5px;
}
```

Now, if we want to add some HTML that is shown in all the sub-routes of clients, we have to create a new file at app/templates/clients.hbs. This file will have the same name as the nested block, but will be placed outside the folder of the nested route. Let's add the following contents to the app/templates/clients.hbs file:

```handlebars

<h1 class="text-center">Clients</h1>
<div class="text-center">Manage all your client details in this page</div>
{{outlet}}
```

You can go back to the browser to see the content from clients.hbs reflected on the page. 
The content added will reflect in all the sub-routes of clients.


In the same HTML content we added, you can see the last column had the text View | Edit | Delete without any links.


We are going to add these routes now. First, let's create the view route.


`ember generate route clients/view`
You can view the newly created route in the router.js file. 
You can see that the view route is present inside the clients route, indicating that it is a sub route. 
However, one issue is that the route doesn't indicate which client is selected. This means that the view route needs to know which client is
selected in order to show the details about that particular client.

# Dynamic Segments
For identifying which client the user has selected, we will need to add a dynamic segment to the route. 
A dynamic segment is a part of the URL that is not constant and can change based on the item the app has to load. 
Dynamic segments start with a `:` and go on to define a variable name. 

For the client view route, we need the client id as a parameter, in order to load the client details accordingly. 
We can specify the path for a route using the path parameter to the route. 
You can modify the line for the view route to look like this:
```ts

this.route('view', {path: '/:client_id'});
```

As per Ember conventions, the view route will have the default path as `/clients/view`. 
Even though it creates the route based on its convention, we can configure the route to have a different path using the path parameter in the route. 

Next, let's see how we can link to this route from the clients list page. 
We need to surround the text View with the LinkTo tag and call the view route with the id as a parameter. 
Here is how you can do it for the first row:

`<LinkTo @route="clients.view" @model=1>View</LinkTo>`

For the second row, we can make the same View text look like this:
`<LinkTo @route="clients.view" @model=2>View</LinkTo>`

The model attribute specifies the dynamic part, which will be passed as the `client_id` parameter. 
Now when you visit the clients list page, you can see that the View buttons are hyperlinked. You can click on the link to visit the client view page. However, when clicking on the link, you can see there is no change in the page. That's because you can see an error in the browser console:

Ember says you've configured a route with a dynamic segment, but there is no code included in your route handler to handle the dynamic parameter. And it is asking for you to implement a model hook to handle the dynamic parameter.

# Route Model
Model is a hook in a route handler that loads the data required for the particular route. 
The data returned by the model is directly accessible from the template. 
The model hook will have access to the params passed in the URL, with which we can load the data into the page dynamically. Model typically uses the Ember store to connect with a backend data source through API. 

For now, we will dynamically return the data based on the client_id parameter in the URL.

Let's add the following code to the `app/routes/clients/view.js`

```ts

model(params)
{
      let clientId = params.client_id;
      if (clientId === '1') {
            return {
                  id: 1,
                  name: 'John',
                  company_name: "John's Furniture",
                  email: "john@example.com",
                  phone_number: "+91 98765 43210",
                  active: true
            }
      } else if (clientId === '2') {
            return {
                  id: 2,
                  name: 'Robert',
                  company_name: "Smart Boutique",
                  email: "robert@example.com",
                  phone_number: "+91 98764 53210",
                  active: false
            }
      }
}
```

Even though we don't load the data from a backend source yet, the model hook dynamically returns the hardcoded data
based on the client_id passed as the parameter. To access the returned data from the template, let's add the following code in the app/templates/clients/view.hbs file:

```hbs
<div class="text-center">
<table class="table">
<tr>
<th>Name</th>
<td>{{@model.name}}</td>
</tr>
<tr>
<th>Company Name</th>
<td>{{@model.company_name}}</td>
</tr>
<tr>
<th>Email</th>
<td>{{@model.email}}</td>
</tr>
<tr>
<th>Phone Number</th>
<td>{{@model.phone_number}}</td>
</tr>
</table>
</div>
```

You can see that we don't hard code the data, and access the data returned by the model using the `@model` notation. In this example, we have directly returned an object from the model hook. 
However, the general use case is to make an API call to fetch the data for the model. 
So, the model hook will return a promise object, which will be resolved by Ember automatically.

# Route Hooks
Aside from the model, the route handler provides certain hooks. 
Hooks are functions that are called at specific points of time in the route lifecycle. 
They can be used to make checks based on params provided in the URL, based on the response from the model, or pass additional data to the template. 
Let's look at a few major lifecycle hooks in Ember.js

### activate
The activate hook is fired when the router enters the route from another route. 
It does not fire when just the model changes within the same route. 
This can be used to track some analytics based on the different routes a user visits.

### deactivate
The deactivate hook is fired when the router leaves the route.
This also does not fire when just the model of the route changes.

### beforeModel
beforeModel is called as soon as the route is created. 
As the name suggests, it is called before the model is executed.

This can be used to redirect the user to another route based on permissions or data. 
For example, in our client view route, we will want the dynamic client_id parameter to be a number. 
Hence, in the beforeModel, we can add a check to see if the client_id is a number. 
If it is not a number, we know that the id is not valid and can redirect the user to the client list page.

We saw that the model hook is called with the list of URL parameters. 
Since beforeModel is executed as soon as the route is created, it receives a `transition` object as a parameter. The transition object contains details of the route, which was previously loaded (if the user was transitioning
from one route to another). If the user directly entered the URL in the browser, the "from" route will be null. 
Similarly, it contains a `to` object, which contains the details of the route it is being transitioned to. 
Inside this object, we will find the parameters passed in the URL. 
Let's add a beforeModel to our clients/view route to check if client_id is a number.

For transitioning a user to another route, we will be using the `transitionTo` function in the router service. 
> As discussed earlier, services are Ember objects that live across the duration of the application and can be injected into any route or component. 
> The router is an inbuilt service that handles functionalities like transitioning from one route to another.

Let's add the following code into our `routes/clients/view.js` to inject the router and make the redirection in our beforeModel.

```ts

import { service } from '@ember/service';

export default class ClientsViewRoute extends Route {

      @service router;

      beforeModel(transition) {
            let clientId = transition.to.params.client_id;
            clientId = parseInt(clientId)
            if (isNaN(clientId)) {
                  this.router.transitionTo('clients');
            }
      }

…
}
```

you can see that we've injected the `router` service using the `@service` syntax, and referenced the service using `this.router` notation to redirect the user to the client list if the id is not a number. Now, when you
visit some random  URL like http://localhost:4200/clients/asdsdf, and  you will be redirected to the clients list page automatically. 
When you click on the view link of any of the clients in the list, you will be redirected to the client detail page, since the parameter is a proper number.

One advantage of beforeModel is, it contains the transition object as the parameter. It allows us to identify from where the user visited this page. So, if the user visited the client detail page from somewhere else in the app, we can use this transition object to identify the source route and redirect the user to that specific route, instead of the clients list. 
This will be needed when you don't want the user to lose context of where they arrived from.

### `afterModel`
fired after the model is loaded. This hook can be used to add checks or make redirections based on the data returned by the model. For example, in the model, we have a flag called `active`, which is true for one record and false for the other. Let's say that we do not want the user to view the client detail page for a client that is not active. So, we will use afterModel to check if the client is active and redirect otherwise. 
Let's add the following code to the routes/clients/view.js file:
```ts

afterModel(model){
      if (!model.active) {
            this.router.transitionTo('clients');
      }
}
```
This function will redirect the user back to the clients list if the particular client is not active. afterModel also receives the transition object as the second parameter, which can also be used to redirect the user back to where they came from.

### setupController
The setupController hook is fired after the afterModel hook, once the controller is initialized. 
we can see how we can manipulate/pass additional data to the template via the setupController method. We can pass any information through this function. This function is called with the controller for the current route as the first parameter. Let's add some dummy variables by adding this function to app/routes/clients/view.js:
```ts

setupController(controller, model)
{
      controller.set('testVar', 'Testing Var');
}
```

By doing this, the variable testVar is accessible from the template as `{{this.testVar}}`. You can add the same inside app/templates/clients/view.js to see the value displayed on the web page.

An advantage of `setupController` is that you can use this function to pass data to any of the controllers of the parent routes. If we are in the `clients/view` route, the parent routes are `clients/index` and `application` routes. We can manipulate data for any of the routes inside setupController. Let's say instead
of hardcoding "Clients" in the app/templates/clients.hbs file, we want to show the name of the selected client when visiting the client detail page. We can do that inside setupController like this:
```ts

setupController(controller, model) {
controller.set('testVar', 'Testing Var');
this.controllerFor('clients').set('clientModuleTitle', model.name);
}
```

We have referenced the base controller for clients, by using the `controllerFor()` function and set a variable called `clientModuleTitle` to the name of the selected client received from the model. 
Next, we can replace the hard-coded word Clients in app/templates/clients.hbs
to {{this.clientModuleTitle}}, and you can see the name of the client in place of the title.

### `willTransition`
willTransition is triggered when the router initiates a transition (within the same route or between different  routes). This function receives the transition object as a parameter, and based on the destination of the transition or based on the current state of the controller, you can decide if you want to add more data to the transition or redirect the user to another route altogether. For example, let's say we have a form on our page and we don't want the user to transition away from the page without filling out the form, the following function will help us do that: 
```ts

@action
willTransition(transition) {
    if (!self.controller.get('hasCompletedForm')) {
        transition.abort();
    } else if (self.controller.get('someOtherFlag')) {
        this.router.transitionTo('/some-other-route');
    }
}
```

From the preceding example, you can see that we check the state of a variable in the controller, and if the variable is not set to true, we abort the transition. 
Or if we have some other flag in the controller and we want to redirect the user to some other page based on that (say if the user's subscription has expired, we have to redirect them to the pricing page always). Note that willTransition will be fired only when there is no existing transition in progress. 
So, when we redirect the user to `/some-other-route`, willTransition will not be fired again.

If you want willTransition to be fired even for this case, you will need to do `transition.abort()` to exit out of the current transition, and then call transitionTo.

### didTransition
didTransition is triggered when a transition is completed successfully. It occurs after the beforeModel, model and
afterModel hooks are completed and resolved. This action does not receive any parameters but can be used to track
page analytics or collect user activity data.

### resetController
We have discussed before that controllers are singleton instances and they are initiated only once when the route is first called, and the same instance is used again and again.

For each route, in the setupController function, we might set different values for the controller. 
Those values stay even after the router exits this route. 
Those values can be reset to default in the resetController function.

This function receives three parameters:
- controller: The controller object for the current route.
- isExiting: This denotes if the router is moving to a different route altogether. If only the model of the route
changes, this flag will be passed as false.
- transition: The transition object

Let's say we want to set some edit flag in the controller to false when the user moves out of the page. We can do that as follows:
```ts

resetController(controller, isExiting, transition) {
    if (isExiting) {
        controller.set('isEditing', false);
    }
}
```
### redirect
Sometimes in an application, you will want to redirect from a parent route to child routes, or between siblings. In those cases, when we use transitionTo to switch between routes, the current transition gets invalidated and all the hooks like beforeModel, model and afterModel are fired for the parent route again. 
This is a bit inefficient as they finished executing just now before we initiate the transition.

For this purpose, we use the redirect method. This is similar to the afterModel hook and is triggered almost at the same time as afterModel. The only difference is, if we do a transitionTo from inside the redirect function, those hooks are not called again and the router just transitions into the child route.

# Asynchronous Routing
Most of the time, in a real-time application we will load the data from a backend source using APIs. In those cases, the data is not immediately available as it might take a few seconds for the browser to make the network call, receive and parse the response. JavaScript supports asynchronous operations, which means that it can run tasks in parallel. So, when the API call is being made, the Ember application can perform other tasks like setting up the templates, showing the skeletal HTML on the screen, and so on.

JavaScript has a concept called Promise for handling asynchronous operations. A Promise is a proxy for data that
is not available yet. When making an API call to fetch data, the function will return a Promise instead. It indicates to the code that it is an asynchronous operation and the data will be loaded later. Once the data is received, the Promise resolves to return the data or rejects it if there is an error in the response. A Promise has the following states: 
- Pending: When the Promise is created and the data is not received yet
- Fulfilled: When the data is received and the operation is completed successfully
- Rejected: When the operation has some error or the data is corrupt.

A Promise has two functions, which are called based on its result. It has a .then() function that is called when the promise is fulfilled/resolved, and a .catch() called when the promise is rejected. A Promise also has a .finally() function, which will be called after the Promise is completed, irrespective of whether it is resolved/rejected.

The Ember route handler is Promise aware. This means that if any of the hooks (beforeModel, model, afterModel ) returns a Promise, it waits for the promise to complete before calling the next hook. 
So, irrespective of whether the model hook returns an object or a promise, the afterModel hook will always receive the actual data from the model. Let's try it out. We will update the model hook of the clients/view to
return a Promise instead of an object like it does now. The updated model hook will look like this:
```ts

import { later } from '@ember/runloop';

model(params) {
return new Promise((resolve, reject) => {
    later(() => {
        console.log("Completing promise");
        let clientId = params.client_id;
        if (clientId === '1') {
            resolve({
                id: 1,
                  name: 'John',
                  company_name: "John's Furniture",
                  email: 'john@example.com',
                  phone_number: '+91 98765 43210',
                  active: true,
                  });
        } else if (clientId === '2') {
            resolve({
            id: 2,
            name: 'Robert',
            company_name: 'Smart Boutique',
            email: 'robert@example.com',
            phone_number: '+91 98764 53210',
            active: false,
            });
      } else {
          reject({status: 404, detail: 'Client not found');
      }
    }, 1500);
});
}
```

In the updated code, we've wrapped the model logic inside the later function, which executes after 1.5 seconds. Later is the Ember equivalent of setTimeout, but internally it helps to use later when running Ember in a test environment, as

Ember identifies `later` calls instead of setTimeout calls better.

The later call is wrapped around a Promise so that the Ember application waits for the Promise to resolve before going further to call the `afterModel`. 
Just like how we've added a console.log inside later, let's add a console.log inside afterModel to see the sequence of events. 
Once the changes are done and saved, you can notice a slight delay before you can see the data. 
It is because of the 1.5 seconds delay we've introduced in the model.

# Loading and Error Substates
Ember route handler allows you to notify the template when the data is loading, or when the model fails with an error.

## Loading Substate
Initially, when the page was loading, we could see a small delay since the model took 1.5 seconds to resolve. In that timeframe, we do not want the user to see an empty screen as it will not be a good experience. 
Ember allows you to set a loading substate to visually inform the user that some data is being loaded. 
The loading substate is triggered only when the route contains a hook (`beforeModel`, `model`, or `afterModel`) that does not resolve immediately.

A loading substate can be provided by adding a loading file, whose name is `<templatename>-loading.hbs`
or `<templatename>.loading.hbs` It can be defined for each template. 

Ember looks for the loading substate file from the bottom up and looks for loading files till it finds one. 
For example, when we are loading the client detail route, here is the order of how Ember looks for the loading file:
`clients/view-loading` `clients.loading` or `clients-loading` `loading` or `application-loading` 
We can understand the following based on the order:
- Ember looks for the loading file in the bottommost route template and goes up each level to find the loading file.
- It looks for a `.loading` file in the upper levels (like clients or application), but not on the actual route.

The `.loading` notation can be used for parent routes, whereas the `-loading` notation is prioritized when the template is for the child route.

You can try adding model delays to other routes as well, and add loading files for each template to test their behavior.

# Loading Event
Similar to the loading templates, the route also provides an event that will trigger when any of the hooks (beforeModel, model, or afterModel) fails to resolve immediately. Similar to the substate, Ember looks for the loading event handler in the child route and bubbles up to look for the same function in parent routes. This function can be used to set variables in the controller to update the loading state. We can add the following
code to set a loading event for the `app/clients/view.js` route:
```ts

import { action } from '@ember/object';

@action
loading(transition) {
    let controller = this.controllerFor('clients.view');
    controller.set('isLoading', true);
    return true;
}
```

When a loading event is handled, the loading substate is shown only if the loading event returns true. 
Since the loading event receives the transition object as a parameter, we can use it to identify when the promise holding up the page load resolves. We can do that as follows:
```ts

@action
loading(transition) {
    let controller = this.controllerFor('clients.view');
    controller.set('isLoading', true);
    transition.promise.finally(() => {
        controller.set('isLoading', false);
    });
    
    return true;
}
```

Here, we use the finally function of the promise, which gets executed irrespective of whether the promise is fulfilled or rejected.

## Error Substate
Ember also supports an error substate, which is loaded when the promise is rejected or there is any other error during the transition process. 
The error substate file follows the same nomenclature as the loading substate, and it uses error instead of loading in the file name. 
From the model code we have written, you can see that the model is rejected if the client id is not 1 or 2.

That will trigger the error substate in the route.

Let's load the URL http://localhost:4200/clients/3. Since we don't have an error substate now, you can see that the
loading state still prevails after a few seconds, and an error in the console after the model promise resolves. 

`app/templates/clients/view-error.hbs` file with the following line:
`<h1 class="text-center">Error loading data</h1>`

Now when you refresh the page, you can see the error substate being loaded once the promise is rejected. 
The error substate also follows the same pattern, looking for the `-error.hbs` file of the child route, and then for the `.error.hbs` or `-error.hbs` file of each of the parent routes.

## Error Event
Similar to the Loading event, there is an error event fired when the promise is rejected. We can use this to redirect the user to another route or show an error message based on the error type. Let's add the error event to the clients/view.js route to handle this.

```ts

@action
error(error, transition) {
    if (error.status == 404) {
        console.log("404 error");
    }

    return true;
}
```

Note that we have returned true at the end because we want to show the error state template on the screen. 
Usually, an API server returns a 404 response status when trying to access a non-existent object. 
In those cases, we can have a generic page that is shown when a user tries to access a non-existing object or a non-existent route in the application. 

Let's generate a route named fourohfour (since route names cannot be numeric like 404) to handle this.

```shell

ember generate route fourohfour
```

This route will be the default fallback when the user enters a URL that doesn't match any route in the application. To denote that, let's edit the fourohfour record in the router.js file as follows:
```ts

this.route('fourohfour', { path: '/*' });
```

Here, we have specified the path as *. It means that this route catches any URL that doesn't match the routes
specified above this route. Make sure to place this route at the end of the router block, since all URLs will be caught by this route, and anything below this will become irrelevant.

Let's add some sample content to the `templates/fourohfour.hbs` file:
```html

<h1 class="text-center">You have reached a dead-end!! Go <LinkTo @route="index">Home</LinkTo></h1>
```

In this page, we are just informing the user they've reached the wrong URL, and showing a link for them to go back to the index route. You can now visit any random URL, like http://localhost:4200/some-random-url, and can see this
route in action.

With this route in place, we can easily redirect the user to the fourohfour page when the error status from the route is 404. The updated error event at routes/clients/view.js will look like this:
```ts

@action
error(error, transition) {
    if (error.status == 404) {
        this.router.transitionTo('/fourohfour');
    }
    return true;
}
```
Now when you visit the URL http://localhost:4200/clients/3, you will be redirected to the fourohfour page automatically. 

# Controllers
Controllers are objects that are bound to a route. Controllers are used for the following purposes:
- Maintain the state of variables in that route that are passed to templates
- Maintain a set of actions that can be passed to components in that route
- Handle query parameters for this route

Controllers are singleton instances that are initialized only once when the route is visited for the first time. After that, the same instance is used again even when the user leaves the route and comes back to the route after some time. You can use controllers mainly for handling/modifying data based on the model or query parameters passed in the URL.

We cannot perform these operations in the route handler because the data from the route handler is not directly
passed to the template, and it is passed only via the controllers. 
Controllers have a direct two-way binding with the templates. 
Any change to the data in the template is immediately reflected in the controller and vice-versa. 

## Generating a Controller
Let's generate a controller for the clients route.

```shell

ember generate controller clients
```

Once executed, you can see the controller file generated here: `app/controllers/clients.js`, and an empty controller
object created inside it.


http://localhost:4200/clients, you can see that the title is empty, because we have used the `clientsModuleTitle` variable for displaying the title, and the clientModuleTitle is not defined yet. 
But if you click on the View link and visit the client view page, the name of the client will appear as the title. And when you click on the Clients link to get back to the clients list page, you can see the client name still present as the title.

When the user loads the clients list page directly, we don't want the title to be empty. 
So, we can set the `clientModuleTitle` value in the controller as follows:
```ts

export default class ClientsController extends Controller {
      clientModuleTitle = 'Clients'
}
```
Now you can refresh the page and see the Clients title on the page. 
However, if you go to one of the client detail pages by clicking the View link, and then back to the list page using the Clients link on top, the client name will still be visible and not the title Clients.

This is evidence that controllers are singleton instances. 
We set the clientModuleTitle variable in the controller from the clients view page and since the controller does not
reinitialize when going back to the client list page, we still see the title that was set earlier. 
If the controller had reinitialized, the title would have been reset to Clients. To work around this, we will have to set the value of clientModuleTitle from the setupController of the `clients/index.js` route, and it will execute when the user goes back to the clients list page.

Controllers are recommended to be used only for cases where the `action/variable` is dependent on the model or its
query parameters. It is recommended to use Components for other cases, as controllers are bound to a particular route.

This restricts code reusability, as the same code cannot be used in another `route/controller`.

# Query Parameters
Query parameters are similar to dynamic segments in the URL, except that dynamic segments are mandatory, while query parameters are optional. 
The names of the elements in the dynamic segments are predefined in the route path, but query parameters are not predefined. Anything can be passed in the URL. Hence, query parameters contain both their name and value, separated by the = symbol. For example, if we want to add sorting options to the clients list page, the URL will look like this: http://localhost:4200/clients?sortBy=name&order=asc.

The query parameter part of the URL is denoted by the question mark (?). Each query parameter will have the format
<key>=<value>, separated by the ampersand (&) symbol. There can be any number of query parameters in the URL, and the ones that are not handled by the code are simply ignored.

The query parameters can be accessed in the router by specifying them beforehand on the router. 
Let's add the preceding query parameters in the clients/index.js route:
```ts

export default class ClientsViewRoute extends Route {
      queryParams = {
            sortBy: {
                  refreshModel: false
            },
            order: {
                  refreshModel: true
            }
      }

      model(params) {
            console.log(params);
      }
}
```
We are defining the list of supported parameters using the queryParams property in the route. 
If you visit the URL http://localhost:4200/clients?sortBy=name&order=asc, you can see the query parameters parsed and available in the params property in the model. This can be used to send the params to the backend for the server to filter or sort the data based on the parameter. You can also notice the `refreshModel` key added to each parameter. This key is used by the route handler to decide whether the model has to be refreshed when a particular query parameter changes.

For using the  same query parameters in the templates/controllers, you can define them in the controller file. Let's define both the query parameters in the clients/index.js controller:
```ts

export default class ClientsIndexController extends Controller {
      queryParams = ['sortBy', 'order']
      sortBy = null;
      order = null;
}
```
In the controller, we specify the list of parameters using the `queryParams` property as a list and create them as individual properties in the controller. 
Note that we cannot dynamically create properties from query parameters.

## Routing with Query Parameters 
We can  pass query parameters through all routing mechanisms in Ember. Let's look at some examples:
- LinkTo: LinkTo tag accepts a @query attribute to support query parameters:
```html
<LinkTo @route="clients.index" @query={{hash sortBy="name"}}>Clients</LinkTo>
```

We use the {{hash}} helper to generate the query parameters during redirection. Multiple parameters can be separated by space.

- `transitionTo` The router's transitionTo function also supports query parameters. We have used transitionTo by passing the route name as the parameter. You can pass the query parameters through the second parameter of this function:
```ts

this.router.transitionTo('clients.index', { queryParams: { sortBy: 'name' }})
```
If you want to redirect the user to the same route, but just update the query parameters, you can ignore the first
parameter in the transitionTo function and pass the second parameter alone:
```ts

this.router.transitionTo({ queryParams: { sortBy: 'name' }})
```

By doing this, we will only update the query parameters of the current route instead of going to another route.

# Conclusion
Router is the entry point to the Ember application. 
It decides which code should execute based on the URL specified.

URL can contain both static and dynamic parameters.

Routes can be nested. Parent and child routes can share functions and model data.

Ember uses dynamic parameters in the URL to load the appropriate data into the template.

You can specify templates to be shown when the data is being loaded, or when there is an error loading the data.

Router can modify variables in the controller.

Variables defined in the controller are directly accessible from the templates.

Controllers are singleton instances and they are bound to a specific route.


1. Which of the following parses the URL to decide the route?
a. Route handler
**b. Router**
c. Controller
d. None of the above

2. Which of the following tags/functions are used to move from one route to another?
a. transitionTo
b. LinkTo
c. <a>
**d. All of the above**

3. By the order of execution, which of the following is triggered at the end?
a. afterModel
b. model
**c. setupController**
d. beforeModel

4. When a Promise is rejected, which of the following are executed?
a. catch
b. finally
c. then
**d. (a) and (b)**

5. Which parameter is used to define the URL associated with a route?
a. pathname
**b. path**
c. route
d. url

6. Which function is used to reset the values of the controller when the router exits the route?
a. setupController
**b. resetController**
c. controllerFor
d. deactivate

Questions
1. What is the command to generate a nested route?
2. What is the difference between setupController and resetController?
3. What are the different ways to specify loading and error substates? How are they prioritized?
4. What is the difference between afterModel and redirect?
5. When should we use controllers over components?

- Route Handler: An object that contains details about a URL and loads data and template based on that.
- Controller: A singleton object associated with the route. It is used to maintain variables and logic related to the route.
- Route Model: Function that loads the data related to a route.
- Transition: A Promise like object that represents an attempt to move to another route.

