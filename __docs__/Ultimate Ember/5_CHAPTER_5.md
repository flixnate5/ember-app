# 5 CHAPTER 5 Ember Data and Services

**Models** connect with backend APIs to persist and store data. 
explore handling relationships, including foreign keys, many-to-many fields, and more.

handling the metadata returned by the API and using the information to paginate records or display details, such as the total count in the template. 

**Ember data** library to customize the requests sent to the API and modify the URLs associated with the model using **Adapters** and **Serializers**.

**Services** and the vital role they play in an Ember Application.


        Introduction to Ember Data
        Setting up Ember Data
        Ember Models
        Setting up a Backend API
        Ways to Make API Requests from Ember
        Ember Store
        Read and Filter Records
        Create, Update, and Delete Records
        Handle Relationships in Models
        Adapters
        Serializers
        Ember Services

## Introduction to Ember Data 

Ember Data also provides a default set of functionalities as follows:
- Create a Model that is an object-based representation of the underlying data.
- Interface with the API to create, read, and update data.
- Takes care of authenticating each request by sending the auth token in the header.
- Maps the API response and provides data in the form of a Model Object.
- Stores a local copy of the fetched data to prevent multiple API calls and fetch from the API only when required.
- Provides a seamless JavaScript integration, making the application-agnostic of the type of backend used.
- Allows configuring different Adapters to connect with different types of Backend APIs.

## Ember Models
Models are the object representation of the data sent and received via APIs. 
A model class will contain a list of attributes, along with the type of data associated with each attribute. 
helps Ember serialize and deserialize data when communicating with the API.

a date attribute, Ember will take care of sending the data in the form of an ISO string to the API. 
Similarly, data returned by API will also be serialized into a Date object. 


```
string
number
boolean
date
```

Associating a type is not mandatory for an attribute. If we do not specify any type, Ember Data will not do any custom processing/serializing on that data. 

```shell

ember generate model client
```

file created `app/models/client.js`

```ts

import Model, { attr } from '@ember-data/model';

export default class ClientModel extends Model {
    @attr('string') name;
    @attr('string') company_name;
    @attr('string') email;
    @attr('string') phone_number;
    @attr('boolean') active;
}
```

Only fields that are specified here will be available for use inside the application. 
Any extra data sent by the API will be ignored by Ember Data.

## Default Values
a default value will be used when there is no data sent by the API for that attribute or when you initialize a new object from within the application. 

```ts

@attr('date', {
    defaultValue() { return new Date(); }
}) date
```

Ember Data checks if there is a value for the date provided either by the API or the creating function. If there is no value provided, the defaultValue function is executed and the response of that function is assigned to that particular field of the object.

## getter functions
These are custom functions you create in a model, which can be accessed like any other variable from the template. 
For example, let us create a `displayTag` property for our client model, which will contain the name and email of the client. 

```ts

get displayTag() {
    return `${this.name} <${this.email}>`;
};
```

Now, this function will be automatically available for all users from now on, and need not be calculated separately.

We can replace the helper we created in the ClientRow component with this function. 

# Transforms
However, there will be cases where the data from the API will have to be transformed to a different format before being consumed in the frontend. 
The same data will have to be reformatted before being sent back to the API. 

For example, a gender field may be sending just single-letter references like M, F, or O from the API. 
The user will not be able to understand what M, F, or O means, so we need to show the expanded version, such as Male, Female, or Other. 

```shell

ember generate transform gender
```

`app/transforms/gender.js` file:
- `serialize`: converting the data to the format required by the API. when you save some data through the store.
- `deserialize`: formatting the data after fetching the base data from the API. 

```ts

const GENDER_MAPPINGS = {
    'M': 'Male',
    'F': 'Female',
    'O': 'Other'
}
export default class GenderTransform {
    deserialize(serialized) {
        return GENDER_MAPPINGS[serialized];
    }

    serialize(deserialized) {
        var gender = null;
        Object.keys(GENDER_MAPPINGS).map((gndr) => {
            if (GENDER_MAPPINGS[gndr] === deserialized)
                gender = gndr;
        });
        return gender;
    }
}
```

you can use any transform name and associate it with an attribute. 
```ts

@attr('gender') gender;
```

# Setting Up a Backend API
mock API requests to handle and manage data.

**Ember CLI Mirage**, an addon that runs a server to mock the responses of API requests from the Ember application. 

> Mirage is a generic JavaScript library, which was initially developed with the intention to mock backend APIs so that frontend developers do not need to rely on the backend APIs to build features until they are ready to integrate and test.

runs on the browser and uses a low-level HTTP interception library called **Pretender.js** to intercept AJAX requests made by the Ember application. 

This not only provides a transparent way for developers to mock and test the APIs from the frontend but also gives an independent way of developing the Ember application without waiting for the actual APIs to be provided by the backend application. 

Mirage also provides a mock database to store and retrieve data, simulating the storage and retrieval of data.

```shell

ember install ember-cli-mirage
```

Once installed, see `mirage/` inside your project. 
This is where we will add code related to our mock APIs.

## Structure of Ember CLI Mirage
- **Routes**: handle HTTP requests based on the URL provided.
- **Model**: a class-based representation of the API data.
- **Database**: A mock database for persisting data.
- **Fixtures**: predefined static data to be populated in the database when the application is loaded.
- **Factories**: a dynamic way to populate data into the database, which is executed when the application is loaded.
- **Serializers**: make transformations or add additional information before sending the object to the frontend.

## Creating Routes
When you open the `mirage/config.js` file, you will find a predefined routes function where all the API routes have to be defined. 
we can define the `clients` route to return the list of clients. 

```ts

function routes() {
    this.get('/clients', () => {
        return {
            data: [
                {
                    id: 1,
                    name: 'John',
                    company_name: "John's Furniture",
                    email: 'john@example.com',
                    phone_number: '+91 98765 43210',
                    active: true,
                },
                {
                    id: 2,
                    name: 'Robert',
                    company_name: 'Smart Boutique',
                    email: 'robert@example.com',
                    phone_number: '+91 98764 53210',
                    active: false,
                },
            ]
        }
    });
}
```

 Similar to this, we can define routes to return a specific client when accessed via the ID, just like the backend API. 
In order to do this efficiently, we need to create a model for the clients object and dynamically store and retrieve the data. 

Doing so will not only prevent redundancy but also help us dynamically test different cases to make sure that the frontend application is compatible to handle all kinds of use cases.

## Models and Database
By default, Mirage provides an in-memory database to store and retrieve information. 
The data is lost when the application is restarted, but you can use factories and fixtures to create default data when the application loads.

Similar to Ember, you can create multiple models and specify fields and their type for each model. 
However, since we have already created a model using Ember Data in our application, Mirage will automatically use the model from Ember Data, and we need not create them separately in our Mirage models folder. 
However, we can directly use them inside the route by updating our routes function as follows:
```ts

this.get('/clients', (schema, request) => {
    return schema.clients.all();
});
```

return all the client objects present in the database when an API call is made to the `/clients` API endpoint. 

define a route that returns the specific client based on the ID:
```ts

this.get('/clients/:id', (schema, request) => {
        return schema.clients.find(request.params.id);
    });
```

 
We have created routes that render data, but we have not populated any data to be rendered. 
So, let us create a fixture that populates the two records we have already displayed. 

You can generate a fixture with the following command: 
```shell

ember generate mirage-fixture clients
```

file mirage/fixtures/clients.js

```ts

export default [
    {
        id: 1,
        name: 'John',
        company_name: "John's Furniture",
        email: 'john@example.com',
        phone_number: '+91 98765 43210',
        active: true,
    },
    {
        id: 2,
        name: 'Robert',
        company_name: 'Smart Boutique',
        email: 'robert@example.com',
        phone_number: '+91 98764 53210',
        active: false,
    },
];
```

data that has to be loaded into its database when the application loads. Mirage to load the fixtures into the database. 
To do that, `mirage/scenarios/default.js` file. 

```ts

server.loadFixtures();
```

Now we have commanded Mirage to load the fixtures into the database. 
When the application is started, the data is automatically populated into the in-memory database of Mirage.

# Ways to Make API Requests from Ember
Fetch API: https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API
Jquery Ajax: https://api.jquery.com/jquery.ajax/
Axios: https://axios-http.com/docs/intro

```ts

const url = 'https://firestore.googleapis.com/v1/projects/ember-backend-cf576/databases/(default)/documents/users';
const response = await fetch(url);
console.log(response.json());
```

## Advantages of Ember Data
Ember Data is the official data persistence library for the Ember.js framework, and it is designed to work seamlessly with Ember applications. 

- Tight Integration: making it easier to work with models and data in an Ember application. 
- Data Modeling: powerful data modeling framework that allows you to define your data models using Ember's object-oriented class system. 
- Automatic Data Loading: "relationship loading" allows you to automatically fetch related data when accessing a model. This can reduce the need for custom API requests and simplifies the process of loading associated data.
- Adapter System: adapters and serializers to communicate with various backend APIs. Adapters provide a way to configure how Ember Data communicates with different server technologies, while serializers control how data is transformed between the client and server. This flexibility is useful for working with various backend systems.
- Data Store: Ember Data uses a centralized data store to manage the state of your application's data. This means that data is stored in a consistent and organized way, making it easier to work with and manage your application's data.
- Real-Time Data Handling: Ember Data includes support for real-time features like WebSockets through its adapters. This can be particularly useful for building real-time or collaborative applications.
- Ember Inspector: The Ember Inspector browser extension provides powerful debugging tools for Ember applications, and it is integrated with Ember Data. This makes it easier to inspect and debug the state of your application's data.
- Community and Ecosystem: Ember Data has a strong and active community of developers, which means there are many resources, add-ons, and extensions available to enhance and extend its functionality.

## Places to Make API Requests in Ember
- model hook of a route: most common place. load data for a particular route and pass it to different components loaded on that page. It is also connected to the error and loading substates to provide an aesthetic experience to the end-user.
- Components: there are certain cases where we might need to make a call from a component. For example, saving a form and updating data is an example of this.
- Service: handle across-the-app use cases, such as authentication or handling third-party requests like payment gateways, single sign-on, and more.

## Ember Store
- Adding proper headers for each request.
- Sending data to the API in proper format.
- Handling API responses of different types.
- Parsing and returning the data in a model-like format for use inside the application.

The Ember Store is our answer to these questions. 
The Ember Store is an Object-Relational mapping (ORM) interface for our
application to coordinate with the APIs. 
It takes care of making the application layer transparent of the type of backend used, the format of the response from the backend, and more, and returns the data in a specific format based on the model that we are querying. 

It also stores the queried data in local memory to prevent duplicate API calls for the same record.

The main concept of the Store is to remove the tight coupling between a component and fetching data for the component. 
According to the principles of good design, it is always better to give only a single responsibility to an object.

Following that, a Component is given the responsibility of presenting data to the user and not fetching that data. 
So, Ember provides a simple Store object that you can inject anywhere into your application: Components, Controllers, and even Routes. 

Thus, the job of fetching and formatting the data is handed over to a separate service, and we can access the same from anywhere with a single line of code.

# Injecting the Store
The store service can be injected into any Component, Controller, Route, or Service in your application. 


```ts

import { service } from '@ember/service';

export default class ClientsViewRoute extends Route {

    @service store;
}
```

## Read and Filter Records
With the data being available in the Mirage database and the store service injected into our route, we can replace the hard-coded list of clients in the clients/index route with a store query to load the data dynamically. 

There are three kinds of functions offered by Ember Data for reading data of a single type/model from the APIs:

#### 1. Fetch All Objects
model function of the clients/index route, to fetch all the clients from the API and send the list to the template:
```ts

model(params) {
    return this.store.findAll('client');
}
```
The findAll function returns a Promise object, which is handled by the Route as it is Promise-aware. 
This function makes a network request to fetch all the clients. 
This findAll query sends a request to the `/clients` URL of the API domain 

When calling the findAll request from outside the model function, such as in a Controller or inside a Component, we will have to handle the Promise to either store the response in a variable or to handle the error if there is any. 

The Promise can be handled as follows:
```ts

let that = this;

this.store.findAll('client').then(function(clients) {
    that.set('clientsList', clients);
}).catch(function(error) {
    console.log(error);
});
```

We use the that variable because inside the .then function, the context is changed, and the this inside that does not refer to the Controller/Component object. 
Whereas defining the context as a separate variable named that will help access the Controller object from within the Promise function as well.

Inside the then function, we set the clientsList variable of the Component/Controller with the list of clients fetched from the API. 
The findAll function returns a list of model objects of the queried type. Since it returns a Promise, you can also use catch to handle errors in the request. The error can then either be ignored or displayed to the user in some way.

Another function similar to findAll is the peekAll function.
The difference between find and peek in the Ember Store is that find makes a network request to fetch the data from the backend API, whereas peek does not make a network request to fetch data. 
It only returns the data that has already been fetched and cached in the Store. peek functions can be used when we do not want to make
duplicate API calls and want to optimize the application by loading data efficiently from the cache. This can be used when you are doing a findAll on a particular type and want to use those same set of records in the same flow, without making an additional network request. A peekAll request looks as follows: 
```ts

let clients = this.store.peekAll('client')
```

the peekAll function does not return a Promise since it does not make a network request. The list of clients that we received inside the then function of a findAll call will be available as the default response of the peekAll function. 

## Filter and Fetch Certain Objects
It is optimal to load only the information that we display on the screen and make additional requests only when the user wants to view more than the initial set of records. 

we can use the query function of the Ember store. The query function accepts an object as a parameter, which it translates into query parameters when making the API call. A typical query call looks as follows:
```ts

this.store.query('client', {
    salesman: 4
}).then(function(clients) {
    // Do something with the clients list
});
```
From this example, you can see that the query function accepts
an object, which is translated into query parameters. 
The above object will be translated into `/clients?salesman=4`. Through this query parameter, the backend will filter out and return only clients that have a salesman with ID 4. 
Similarly, the query function will handle pagination as well. 
In order to use the widely available Page Number Pagination, you can use the query function as follows:
```ts

this.store.query('client', {
    page: 1
}).then(function(result) {
    
    let clientsList = result.clients
    // Do something with the clients list
});
```


The number of records that are returned on a page are maintained and handled by the backend. We only specify the page number for the list of records to be returned by the API. Unlike the findAll function, query does not have an alternative that does not make a network request. Since the information queried is bound to change because of the filtering, query always makes a network request to fetch information from the API.

## Handling Metadata
Typically paginated APIs provide a response in the following format:
```json

{
"meta": {
"count": 40,
"next": "https://example.com/clients/?page=3",
"previous": "https://example.com/clients?page=1"
},
"clients": [...list of clients]
}
```

It usually contains the following keys:
- count: The total number of records that match the provided filter conditions.
- next: API URL that points to the next page/next set of records.
- previous: API URL that points to the previous page.


With this information, the frontend can decide things such
as whether there is a next page of records to fetch, display
the total number of records available, and more. 

This can be accessed through the meta property of the response as
follows:
```ts

this.store.query('client', {
    page: 2
}).then(function(result) {
    let meta = result.meta;
    console.log(result.meta.count);
});
```

## Fetch a Specific Record
fetch a single record alone from the API. 
You can use the `findRecord`

```ts

this.store.findRecord('client', 2)
.then(function(client) {
    console.log(client);
});
```

findRecord returns a Promise just like findAll, as it makes a network request. Similarly, we have a peekRecord function that does not make a network request but only returns the data if it is already loaded in the store.

# RSVP Hash
In certain routes, we might need to fetch data pertaining to different models. For example, if we have clients and salesmen, we will need to make two API requests in the clients route: one to fetch the list of clients and another to fetch the list of salesmen.
We will want the route to continue to the next step (afterModel hook) after both the API requests are done.

```ts

import RSVP from 'rsvp';

model() {
    return RSVP.hash({
        clients: this.store.query('client', {}),
        salesmen: this.store.query('salesman', {})
    });
}
```

In doing this, the model hook is resolved only when both individual API requests are complete. 
You can access both the clients and salesmen using the notations model.clients and model.salesmen.

# Create, Update, and Delete Records
Similar to reading data, Ember Store also provides functions
and capabilities to create, update, and delete records in the
API. Let us look at each of the functions available for the
same.

## Create Records
```ts

let client = this.store.createRecord('client', {
    name: 'Arjun',
    company_name: 'Modern Bakers',
    email: 'arjun@example.com',
    phone_number: '+91 9876543222',
    active: true
});
```
The createRecord function gets the object type as the first parameter, and the second parameter is the data for the object.

## Persisting Data
Note that the createRecord function creates the data only in the Store. It does not create the data in the API. Hence, the created record is lost when the page is refreshed and the store is cleared. For Ember to make an API call to the backend, we will need to call the `save` function on the model object. 
Unless the save function is called, we can create and view records only in the store and the data is valid only for the lifetime of the page.

```ts

let client = this.store.createRecord('client', {
    name: 'Arjun',
    company_name: 'Modern Bakers',
    email: 'arjun@example.com',
    phone_number: '+91 9876543222',
    active: true
});
client.save()
```

By default, Ember Data automatically takes care of handling newly created records and existing records differently. So, when the save function is called on a model object, the backend URL called varies depending upon whether the record exists in the API or not. 
For example, to create a new client, the API endpoint to call as per the REST conventions is POST /clients/.

## Updating Records
Making changes to an existing record is as simple as creating them. The save function is the only way to make changes and persist to the API. Here is an example:
```ts

this.store.findRecord('client', 2)
    .then(function (client) {
        client.name = 'Updated Name';
        client.save();
    });
```

The save function is available for all Model objects. Note that the first line, where we assign client.name, updates the name field of the client object in the memory/store. However, only when `client.save()` is called, the data is persisted on the API.

Even here, Ember Data intelligently makes the API call to update the record instead of the create record API call it does for a new object. As per REST conventions, it makes an API call to PATCH `/clients/<client_id>/`. Both PUT and PATCH methods can be used to update a record as per REST conventions. The difference is that a PUT request expects all the fields of the particular object in the request, just like when you create the record using the POST method. In contrast, the PATCH method is for partially updating the record and does not expect all the fields in the request; it only updates the fields that are passed in the request data. 

# Tracking Changes
Ember Data keeps track of the changes made to an object that has not yet been pushed to the API. If you want to know whether a particular record has changes that have not been pushed to the API, you can access it through the hasDirtyAttributes attribute of the model. Here is an example of how you can see this variable in action:
```ts

this.store.findRecord('client', 2).then(function(client) {
    console.log(client.hasDirtyAttributes)
    client.name = 'Updated Name';
    console.log(client.hasDirtyAttributes)
});
```

first console log statement prints false, and the second console log statement prints true because the name property of the object was changed in between.

In addition, Ember keeps track of each parameter that has been
changed in detail.

The model contains a `changedAttributes` function that helps you identify which fields have changed, what their values were initially, and what their values are now. You can try the same with the following code:
```ts

client.name = 'Updated Name'
client.changedAttributes()
```

Running the preceding code, changedAttributes will return an object with the following structure:
```ts

{
    name: ['John', 'Updated Name']
}
```

The response of changedAttributes is an object whose keys are the fields that have changed but have not been pushed to the API yet. For each key, the value is an array. 
The first value in the array defines the data fetched from the API, whereas the second value is the updated value that is present in the store.

Similar to keeping track of the changes, Ember Data also provides an easy option to rollback the changes that have not been pushed to the API yet. Here is an example:
```ts

client.name = 'Updated Name'
console.log(client.hasDirtyAttributes) // true
client.rollbackAttributes();
console.log(client.hasDirtyAttributes) // false
console.log(client.name) // John
```

rollbackAttributes function resets the data that has not been pushed to the API yet, and also sets the hasDirtyAttributes attribute to false for the particular object. 
This also sets the changedAttributes to an empty object, as the changes have been rolled back. 
When you call rollbackAttributes for an object that was newly created using the createRecord function and has not persisted in the API yet,
rollbackAttributes removes the entire record from the store.

## Deleting Records
The following are the different ways to delete records through Ember Data:
1. `deleteRecord` delete a particular record is by using the deleteRecord function. will trigger a DELETE request to the endpoint `/clients/<client_id>/` to remove the record from the API.
2. `unloadRecord` Since it is always optimal to reduce the data stored in the frontend storage, Ember Data provides a way to remove a particular record from the store, without affecting the same record in the backend. Normally unloadRecord is called when you fetch an object from the API and want to clear the memory after the object does its job. 
```ts

store.findRecord('client', 2).then(function(client) {
    // Do something
    store.unloadRecord(client);
});
```

This process does not affect the API and only clears the object from frontend memory.

3. `unloadAll` remove all records from the store or remove records of a single type from the store. This will help keep the memory usage of the store in check.

```ts

this.store.unloadAll();
this.store.unloadAll('client');
```

The second line removes all the client objects that are present in
the store.

# Handle Relationships in Models
Databases can have different types of relationships between models. The most common of them are one-to-one, one-to-many, and many-to-many. There are two ways by which all these types are handled.

## belongsTo
belongsTo is used to handle a scenario of Foreign Key, where a field in a particular model points to another model. For example, let us create a new model named salesman in our application:
```ts

ember generate model salesman
```
The salesman model will contain only the name for now:
```ts

import Model, { attr } from '@ember-data/model';
export default class SalesmanModel extends Model {
    @attr('string') name;
}
```

Now, let us say we have a foreign key relationship where each client has a salesman assigned to them. 
In these cases, belongsTo comes into play. 
Here is how you add the salesman field to the client model:
```ts

import Model, {attr, belongsTo} from '@ember-data/model';

export default class ClientModel extends Model {
    @belongsTo('salesman', {async: true}) salesman;
}
```

The common convention to reduce the amount of data transferred from the API is that APIs usually send only the ID of the foreign key object in the response instead of sending the entire foreign key object. The use of belongsTo here is to simplify the process of fetching the related element from the API in order to display the details of the foreign key element. 
For example, let us say the client is assigned to a salesman with ID 3. 
> Note the use of `async: true` in the belongsTo section. async is used to determine when Ember should fetch the associated foreign key record. If async is set to true, the associated record will only be fetched from the API when some template or component requests that particular field. If the value is set to false, the data is fetched at the time of fetching the model record itself.

If we want to display the name of the salesman in the client detail route, here is a simple example that doesn't involve the belongsTo method: 
```ts

this.store.findRecord('client', 2)
    .then(function (client) {
        var salesman = client.salesman;

        this.store.findRecord('salesman', salesman)
            .then(function (salesman) {
                console.log(salesman.name);
            });
    });
```

We will have to call findRecord separately to fetch the salesman associated with the client. 
With the belongsTo relationship, you can directly use `{{client.salesman.name}}` in your template file, and Ember will fetch the related salesman record and show the information on the screen.

The Ember function intelligently queries a particular salesman record only once from the API, and the next time when there is another client with the same salesman, the data is peeked from the store and not from the API.

## hasMany
Sometimes there can be multiple items referenced to a single model object. For example, we have a salesman assigned to each client in our database. Looking from the other side, it is understood that a salesman can have multiple clients. 
This relationship can be handled by the hasMany method. You can add the following code to the salesmanmodel to specify the list of clients:

```ts

import Model, {attr, hasMany} from '@ember-data/model';

export default class SalesmanModel extends Model {
    @attr('string') name;
    @hasMany('client') clients;
}
```

hasMany works very similarly to the belongsTo relationship, with the difference that hasMany expects a list of related objects instead of just a single object. Ember Data does a query instead of findRecord to fetch the related objects for that field.

## inverse
Sometimes multiple fields can map to the same model. In those cases, we need to map which of the fields in the other model map to the current field in the first model. Ember Data provides a way to specify the reverse relationship from one place so that it automatically maintains the mapping, such that when a client is updated, the associated salesman is also updated. Let us create a new field named backup_salesman, which will maintain a record of backup salesmen when the associated salesman is not available.

We can update the client model to look as follows:
```ts

@belongsTo('salesman', { inverse: 'clients' }) salesman;
@belongsTo('salesman', { inverse: 'backup_clients' }) backup_salesman;
```

From this, you can see that we have two fields in the client model that point to the salesman model. 
Each field has a different name and a different inverse value. 
Just like how we have defined the clients field in the salesman model, we can define the backup_clients field in the salesman model. This will keep Ember informed on how to differentiate the two fields in the client model that point to the salesman model.

## Adapters
Adapters are the gateways that decide the API domain, URL, headers to send in the API call, and more. 
Like all other modules in Ember, Adapters also follow a convention, and developers can override the default adapters to configure these parameters for the overall application or, in some cases, to a single model as well. Adapters do not concern themselves with the format of the data sent and received, but it is concerned with the metadata of the request like the URL and headers.

## Extending Adapters
In all the Ember applications, the application adapter is extended in order to configure the API URL and namespace.


```shell

ember generate adapter application
```

You can see a new file named app/adapters/application.js in the project. 
Any configuration to this adapter will reflect on all the requests made by Ember Data.

## Host and namespace
It is a normal convention to specify the API domain and the namespace in the application adapter. It can be added as
follows: 
```ts

import JSONAPIAdapter from '@ember-data/adapter/json-api';

export default class ApplicationAdapter extends JSONAPIAdapter
{
    host = 'https://exampleapi.com'
    namespace = 'api/v1'
}
```

We have defined two parameters in this Adapter as follows:
- host: The domain associated with the API.
- namespace: The prefix to be added to the URL for all API calls.

The API URL is generated in the following format:
`{domain}/{namespace}/{model-name-plural}`. Given that, the API call for clients will go to the following URL:
https://exampleapi.com/api/v1/clients.

# Model-URL Mapping
The adapter also takes care of defining the URL name associated with the model. By default, the URL path is considered as the plural form of the model name. The plural format is assumed by adding a s to the model name. Thus, the URL path for a model named client becomes clients.

But this does not work in all cases. For example, according to Ember Data, the URL path for our salesman model is generated as salesmans. We know that the correct plural form is salesmen. For customizing this, the adapter provides a
pathForType function where you can configure the URL mapping for a model. Let us implement the same for our use case:
```ts

import JSONAPIAdapter from '@ember-data/adapter/json-api';
import Ember from 'ember';

export default class ApplicationAdapter extends JSONAPIAdapter
{
    host = 'https://exampleapi.com';
    namespace = 'api/v1';

    pathForType: function(type) {
        if (type === 'salesman') {
            return 'salesmen';
        }
        return Ember.Inflector.inflector.pluralize(type);
    }
}
```
By customizing the pathForType function, we are specifying a custom value only for the specific salesman model, while
following the default format for all other models. This is how the Convention over Configuration setup of Ember works.

## Headers
You can specify the set of header values to pass in all requests in our application adapter. You can even customize
the headers for each model in the adapter of that particular model. Here is how you can add the headers function to
your adapter: 
```ts

get headers() {
    const accessToken = localStorage.getItem('accessToken');
    return {
        'Authorization': 'Token ' + accessToken,
        'Content-Type': 'application/json'
    }
}
```

Notice the get before the headers function. 
Getter functions like these are executed on each call. 
We use a getter function here because it depends on dynamic values, such as the access token, which is taken from the local storage and can expire after a period of time. 
Adapters can be customized for individual models as well. 
Let us say our client model alone requires the data to be sent in form-data format instead of JSON, we can generate a separate adapter as follows by generating an adapter with the name of the model:
```shell

ember generate adapter client
```

Once the adapter is created, you can add the following piece of code to your adapter to differentiate the 
Content-Type header for the requests to client model alone: 

```ts

import ApplicationAdapter from './application';

export default class ClientAdapter extends ApplicationAdapter {
    get headers() {
        const accessToken = localStorage.getItem('accessToken');
        return {
            'Authorization': 'Token ' + accessToken,
            'Content-Type': 'multipart/form-data'
        }
    }
}

```

# URL Conventions
As per REST conventions, these are the URL translations done for each type of request as follows. Let us take the
client model as an example:
```
Fetch all/multiple records: GET /clients/
Fetch a particular record: GET /clients/<client_id>/
Create a new record: POST /clients/
Update an existing record: PATCH /clients/<client_id>/
Delete a record: DELETE /clients/<client_id>/
```

## Serializers
Adapters take care of all the metadata of the API call, including the domain, URL, API method, headers, and more.

On the other hand, Serializers take care of the data sent and received through the request. They define how the data
should be formatted before sending it in the API request or how the data should be transformed when it is made
available in the Ember store. 

You can generate serializers for individual models as follows:
```shell

ember generate serializer client
```

Once generated, you can configure the serializer to modify and update the data that you send and receive from the API.

For a similar functionality, we have seen transforms and how
they decide what operations to perform on a particular field
in the model. However, this similar functionality works on
the entire model level rather than just for a single field.

## serialize
For our example, let us consider that we need to send the
phone number of the client in a different format. Here is
how we can use the serialize function in the serializer to
modify the data before it is sent to the server. Here is an
example:
```ts


import JSONAPISerializer from '@ember-data/serializer/json-api';

export default class ClientSerializer extends JSONAPISerializer {
    serialize(snapshot, options) {
        let json = super.serialize(...arguments);
        let phone_number = json.data.attributes.phone_number;
        json.data.attributes.phone_number = {
            country_code: phone_number.slice(0, 3),
            phone_number: phone_number.slice(3)
        }
        return json
    }
}
```
You can see from the example that we are converting the phone number, which is a single field into an object, where the country code and phone_number are keys in the object.

## normalizeResponse
Similarly, when getting a response from the API, the phone_number field will be an object, and we can use the normalizeResponse function to convert the phone_number field back to a string to be used by the model and the Ember
application.

```ts

normalizeResponse(store, primaryModelClass, payload, id,
    requestType)
{
    const phoneNumber = payload.data.attributes.phone_number;
    payload.data.attributes.phone_number =
        phoneNumber.country_code + phoneNumber.phone_number;
    return super.normalizeResponse(...arguments);
}
```

This is how we control how the data is being passed to and from the server and the differences in format expectations
are adjusted.

## Identifier
By default, the ID field of any model object will contain the unique identifier for that record, which would usually be the database ID of that particular object. In some special cases, we might not have ID as the primary key field in the
database. In those cases, we can specify the primaryKey parameter for a serializer and Ember Data will take care of using that primaryKey field as the primary key/unique identifier for the records of that model when serializing and
deserializing data: 
```ts

export default class ClientSerializer extends JSONAPISerializer {
    primaryKey = 'identifier';
}
```

## Attribute Name Mapping
When it comes to variable naming, there is always a conflict on what kind of conventions to follow when naming our variables. The convention depends on the language we use.

For example, it is always recommended to use camel case in JavaScript, while Python supports snake case (using _
between words in variable names). The backend API obviously sends data in a format that supports their own language, but in JavaScript, we might be tempted to use our own conventions.

Handling this in Ember Serializer is an easy job. You have a keyForAttribute function in the serializer that can be used to make such general changes or provide specific changes, such as when a particular field is renamed in the backend, and changing the same in our Ember code might need too many changes.

Let us say we have an attribute named modified_at in the client model and the API decides to change the field name
to updated_at. It might be difficult for us to find all the occurrences of this field and rename it everywhere. In such
case, we can use the keyForAttribute function as follows:

```ts

keyForAttribute(attr)
{
    if (attr === 'modified') {
        return 'updated';
    }
    return attr;
}
```

This function is used to dynamically determine the mapping.

If you need to statically specify the change, you can use the attrs attribute of the serializer to specify an updated
mapping as follows in the serializer: 
```ts

attrs = {
    modified_at: updated_at
}
```

-------------------------------
# Ember Services
We have seen before that services are singleton instances that live through the lifecycle of an Ember application. It can be injected into any part of the application, such as Controller, Component, Route, and more. We have seen examples of injecting the session service or the router service. 
Services are used to store information such as an authenticated user's details, handle a WebSocket connection with the backend, or handle any network requests that are not compatible with Ember Data.

### Generating a Service
Ember provides a blueprint for generating services as well.
```shell

ember generate service user-reports
```

app/services/user-reports.js file

A service is considered an object similar to a Controller or Component. It can handle variables and functions that alter these variables or make external API requests. 
In our case, let us say we want to keep track of the number of button
clicks the user makes across the application. The service will look something like this:
```ts

import Service from '@ember/service';

export default class UserReportsService extends Service {
    count = 0;

    incrementCount() {
        this.count += 1;
    }
}
```

 Let us create a button component and call the service to increment the count from there whenever the button is clicked:
```shell

ember generate component count-button
ember generate component-class count-button
```

```html

<button {{action "incrementCount"}}>Click to increment count</button>
```

add the action to call the service as follows:
```ts

import Component from '@glimmer/component';
import { service } from '@ember/service';
import { action } from '@ember/object';

export default class CountButtonComponent extends Component {
    @service('user-reports') userReports;

    @action incrementCount() {
        this.userReports.incrementCount();
    }
}
```

> since the service name contains a -, and it cannot be named as a JavaScript variable, we have imported the service by enclosing it within quotes and providing a JavaScript-compatible name to it. 

We can add the following piece of code to both the home and about templates as follows: `<CountButton />`

You can generate the application controller and inject the userReports service just like we did inside the count-button component. 
Once injected, we can access the count from the application template below the page title as follows:
```html

<h1 class="page-title text-center">My Ember Application</h1>
<p class="text-center">Total Click Count: {{this.userReports.count}}</p>
```

service value of count does not reset once you move out of a particular route, and the service can be injected anywhere inside the application with ease.


Thus, a service can be a good alternative for actions that affect multiple parts of the application and cannot be tied to a specific component or route.

# Conclusion
Mirage allows us to mock external API calls without making changes to how the application communicates with the actual backend. 

models and how it is a JavaScript object description of the data being returned from the API. 

configure fields that are returned from the API, add additional fields that are computed based on the other fields, and more. 
We also saw how we can create custom data types in addition to the predefined data types provided by Ember, in the form of _transforms_, and how to easily inject them into your models. 

how relationships between models can be handled through the _hasMany_ and _belongsTo_ decorators.

Ember Data Store, connect with the backend, configure different
stuff using adapters and serializers to customize the default
conventions provided by Ember to make API requests and
format the request and response data. 

Ember Services.

Ember Data is the recommended way to communicate with the external applications that transfer data to and from our application.

Even though there are other ways to communicate and make API requests, Ember Data provides a lot of default functionalities that reduce
code complexity and redundancy.

Ember Store is an ORM that is agnostic of the backend involved,
containing functions to  communicate effectively with the API.

Foreign key and Many-to-Many relationships can be handled via hasMany and belongsTo functions.

You can create custom data types by creating transforms.

Adapters are used to configure the metadata of API requests, such as the API domain, the URL prefix for each request, URL mapping for each model, headers to be sent in the request, and more.

Serializers are used to configure the data. They allow you to decide how to reformat data before sending it to the API or after receiving a response from the API.


## Multiple Choice Questions
1. Which of the following is not a method to make API requests to the backend?
a. Axios
b. Fetch
**c. Call**
d. Ember Data
2. Which of the following is not a predefined Ember data type?
a. date
b. string
c. boolean
**d. time**
3. What is the function that does not make an API call, but fetches the data from the store?
a. findRecord
**b. peekRecord**
c. unloadRecord
d. All of the above
4. Where do we set the domain of the API to make all API calls through Ember Data?
a. Application router
b. Any controller
**c. Application adapter**
d. Any component
5. Which of the following persists in the variable values
even across routes?
**a. Services**
b. Components
c. Controllers
d. None of the above


## Questions
1. Why do you need to connect your Ember application to an external API?
2. What are the types of Ember Data Store functions to fetch data and how are they different?
3. What is the difference between findAll and query?
4. How do you keep track of changes to a particular model object that are not pushed to the store?
5. What is the difference between Adapters and Serializers?

### Key Terms
- Ember Data: The Ember addon that is used to connect with backend APIs.
- Store: An Ember Service that provides the functions for communicating with the API and stores the fetched information in a cache.
- Model: A class-based object representation of the underlying data.
- Serializer: An Ember module that is used to format the data that is sent and received from the API.

