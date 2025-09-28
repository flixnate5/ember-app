# 4 CHAPTER 4 Ember.js Components and Templates

        
        Introduction to Components
        Component Arguments
        Templates
        Conditional Statements
        Loops
        Helper Functions
        Component State and Actions
        Computed Values
        Designing with Ember-Bootstrap

## Introduction to Components
Every component comprises of two elements: 
- A template file (.hbs)
- A JavaScript file (.js or .ts)

## Generating a Component
```shell

ember generate component clients-table/table

# generate js file 
ember generate component-class clients-table/table 
```

move the table HTML into the component .hbs file (except for the yield line at the end of the template file). 

Let us call the component from the `app/templates/clients/index.hbs` file:
`<ClientsTable::Table />`

We can call the component just like any HTML tag. 
The component name should be in camel case, with the hyphens (-) removed and the next character capitalized. 

That is why clients-table became ClientsTable. 
Since the component we are looking for is inside a folder (clients-table/table), the nested structure is represented by a double colon (::). After adding this line to your client"s index template file, the table will be back on the page. 

Now the app/templates/clients/index.hbs file looks neat with just one line.

# Component Arguments
In templates, we have discussed using the model data and custom variables that are defined in the controllers. 
The model was automatically passed from the route to the template. However, they are not done between a template and a component. We have to define the list of variables that are passed down to the component from the template.

This will mean that the data the component looks for is predefined, and it only has access to the limited variables we pass in the template, rather than all the information specified in the controller.

Even though we have hardcoded the list of items in the clients table/table component, we know that the end goal
would be to load the list of items in the table from an external API source. That external API source will be queried from the route model hook and will have to be passed from the template to the component. Let us generate a model for the `clients/index.js` route resembling the data in the table:

```ts

model(params) {
return [{
id: 1,
name: "John",
company_name: "John's Furniture",
email: "john@example.com",
phone_number: "+91 98765 43210",
active: true,
}, {
id: 2,
name: "Robert",
company_name: "Smart Boutique",
email: "robert@example.com",
phone_number: "+91 98764 53210",
active: false,
}]
}
```
The model is defined and will be passed to the template.

We know that we can access the model in the form of `{{@model}}` in the template file. We can use the same syntax to pass the variable to the component as an argument:
`<ClientsTable::Table @clientsList={{@model}} />`

Let us update the HTML code to reflect the data from the model. 
We will make changes to the code step by step, refactoring the code when going through new concepts. Now the model is in a list format. So, we need to access list indices when displaying the data according to the existing approach. In Ember, you can access the element in a particular index of a list using get helper. 
We will see what helpers are later in this chapter. The get helper is used to access a specific index/key in an object/list. You can also access a specific key in an element present in an index. The updated code will look like this: 
```html

<tbody>
<tr>
    <td>{{get @clientsList "0.name"}}</td>
    <td>{{get @clientsList "0.company_name"}}</td>
    <td>{{get @clientsList "0.phone_number"}}</td>
    <td>{{get @clientsList "0.email"}}</td>
    <td>
        <LinkTo @route="clients.view" @model="{{get @clientsList
" 0.id
        "}}">View</LinkTo> | Edit | Delete
    </td>
</tr>
<tr>
    <td>{{get @clientsList "1.name"}}</td>
    <td>{{get @clientsList "1.company_name"}}</td>
    <td>{{get @clientsList "1.phone_number"}}</td>
    <td>{{get @clientsList "1.email"}}</td>
    <td>
        <LinkTo @route="clients.view" @model="{{get @clientsList
" 1.id
        "}}">View</LinkTo> | Edit | Delete
    </td>
</tr>
</tbody>
```

From the preceding template code, you can see how we have used the get helper to access the data. 
Looking at this, you can see that the first row and the second row in the table have almost the same code, except for the index of the element they access. This will cause inefficiency when making a change. For example, if we want to add a class called phone-number to the phone number column, we will have to do it in two places now. To avoid redundancy in these cases, we can create a component that displays only a row in the table. We can call this component twice, thus reusing the end code and reducing the number of places you have to update in case of a change. Let us create a new component called ClientRow. It can be inside the same clients-table folder:

`ember generate component clients-table/row`
The component will contain a single row of the table, with the same details:
```html

<tr>
    <td>{{@client.name}}</td>
    <td>{{@client.company_name}}</td>
    <td>{{@client.phone_number}}</td>
    <td>{{@client.email}}</td>
    <td>
        <LinkTo @route="clients.view"
                @model="{{@client.id}}">View
        </LinkTo>
        | Edit | Delete
    </td>
</tr>
```

You can see we have not used the get helper here, as we will just be passing only a single client object to this component instead of a model. The table component can be cleaned up further and updated as follows:
```html

<tbody>
<ClientsTable::Row @client={{get @clientsList 0}}/>
<ClientsTable::Row @client={{get @clientsList 1}}/>
</tbody>
```

We have updated the code now to look simpler by using the power of components. 
Now the code looks even more modular than before, as the table itself is now a component, and we have a separate component for the row, as we want to reuse the same code as much as possible.

# HTML Attributes
When passing arguments to components, you can see that we have used `@` as a prefix for each argument. 
We do this to differentiate Ember arguments from normal HTML attributes that can be assigned to an HTML tag. The attribute can be id, class, or any custom attribute that you want to add to the HTML element. Ember allows us to pass both component arguments and normal HTML arguments that can be applied to the wrapping div inside the component. For example, in the clients-table/row component, <tr> is the wrapping element. If we want to pass attributes like class from the calling template, we can do so. This is how it will look:
`<ClientsTable::Row @client={{get @clientsList 0}} class="text-right" />`

The component calling statement can work like a normal HTML tag and pass default HTML attributes. 
They can be used by the child component. To use it in the Row component, we can do as follows:
`<tr class="my-custom-class" ...attributes>`

We use the …attributes notation to denote that the attributes passed by the parent component have to be placed here.

When the same attribute is defined in both the parent and the child components, we can decide how Ember should
prioritize. Any attribute specified before the …attributes syntax can be overwritten from the parent component. 
If you do not want an attribute to be updated from the parent, you can define the attribute after the …attributes call. For example, if you do not want the id of the element to be specified by the parent, you can do this:
```html
<tr class="my-custom-class" ...attributes id="client-{{@client.id}}">
```

By defining the id after the attributes, we specify that this attribute cannot be overridden from the parent component. 

However, you can see the class attribute being specified from both the parent and the child components. 
Class is a special case and Ember automatically combines the classes provided in the parent and the child component when rendering the element.

## Templates
So far, we have seen how we can modularize the contents of our app by splitting the code into different templates and components. One advantage is that you can use any existing plain HTML code as it is in Ember templates. However, Ember is not required when you want to show simple and plain HTML in your UI. 
The power of Ember comes into play with the dynamicity. 
It allows you to add programmatic logic in the templates, just like you do in any language such as JavaScript or Python.

There are only a couple of restrictions in Ember templates:
- Only HTML tags that are valid inside the `<body>` tag are allowed. You cannot add tags like `<meta>` or `<link>` inside a template.
The `<script>` tag is not allowed inside an Ember template.

Other than that, Ember provides you with a lot of options to customize and build a large-scale application in a swift, hassle-free manner.

# Comments
Just like comments in HTML, you can add comments to your templates too. 
Adding comments in HTML format will render the underlying template code and then comment it out on screen, whereas commenting using the template syntax will prevent the process of rendering the code itself. 
Template comments can be used on big blocks of code instead of just a single line:
```html

{{!--
Multi line 
Ember template comment
--}}
```

The start of a comment block is denoted by `!--` and it ends with `--`, both present between double curly braces (`{{ }}`).

# Inserting HTML Directly
In some cases, we might need to display the HTML content returned by the API directly on the screen. This can be for cases like a blog post where the content is loaded via the API. Using the double curly braces will display the HTML content in text format (the user will see the actual HTML syntax instead of the formatted version).

To display the formatted HTML content, you need to use triple curly braces instead of double curly braces.
```html

{{{@customHTMLContent}}}
```

The triple curly braces indicate to Ember that the content is HTML and has to be directly inserted as HTML on the page.
However, this feature has to be used with a word of caution because it is possible for people to insert malicious
HTML/JavaScript code inside your application through this feature.

It is recommended to not insert data inputted by a user directly through this method, as it can lead to a large
number of security issues like XSS attacks. An XSS attack is a process in which an attacker inserts malicious executable scripts into our application, thus executing their code in a trusted manner inside our web application. It can be as simple as a JavaScript code that gets the access token stored in local storage and sends it to someone else, or it could be some script that sends an API request on your behalf through your application itself.

The double braces syntax in Ember handles these problems by default as part of the strong security provided by Ember.

However, when it comes to the triple curly braces, Ember does not do that since the custom HTML rendered cannot be
validated in that manner. Therefore, it is up to the developers of the application to maintain the sanity and ensure the content rendered within the triple curly braces is secure. The string provided inside the triple curly braces is not encoded or sanitized and is rendered as it is. 

Let us say we have  a variable in  our app/controllers/clients/index.js named dummyHtml: 
`dummyHtml = "<p style="font-weight: bold">Test Html</p>";`

Let us see the difference between using double curly braces and triple curly braces. When you render the variable as `{{this.dummyHtml}}` in the template, you will see the following on the screen:
`<p style="font-weight: bold">Test Html</p>`

When using the triple curly braces on this variable `{{{this.dummyHtml}}}`, you can see that the HTML is formatted
and displayed in bold. The HTML is inserted as it is on the page and executed by the browser. That"s the difference
between double-curly braces and triple-curly braces. It is another example of the Convention over Configuration
concept of Ember. A beginner developer will not expose the application to be vulnerable to malicious attacks, whereas an experienced developer who knows what they are doing can use the triple curly braces to render the custom HTML they require.

For some reason, if you wish to render custom HTML in your code using the double curly braces itself, Ember offers a solution for that too. There is a function named `htmlSafe` that marks an HTML element safe to render directly on screen. 

You can use it like this:
```ts

import { htmlSafe } from "@ember/template";
export default class ClientsIndexController extends Controller
{
…
    dummyHtml = "<p style="font-weight: bold">Test Html</p>";
    dummyHtmlSafe = htmlSafe(this.dummyHtml);
}
```

In the preceding example, we have two variables: one a simple HTML and the other marked safe using the htmlSafe
method. When you render both these variables on screen, you can see the first one is plain HTML, whereas the second
one is a formatted HTML with just using double curly braces. 

Please note that passing the HTML through htmlSafe does not modify the HTML. It only marks the content as safe for
rendering and informs the framework that encoding need not be done for this string. It will cause issues if the HTML contains malicious content.

```html

{{outlet}}
```

We can see the {{outlet}} tag inside every template that has a child route. 
In our project, you can see it in the `app/templates/application.hbs` and `app/templates/clients.hbs` files. The outlet tag specifies the location for rendering the child templates. 
The outlet tag in the application template is the location where all the route templates will be rendered.

And the outlet tag in the app/templates/clients.hbs denotes the location where all the clients" module templates will be rendered. Since you can have custom HTML code at each level of the template hierarchy, the outlet tag can be placed as per your requirement in an appropriate position.

```html
{{yield}}
```

When you look at the component template files, you will see a ```{{yield}}``` tag in all of them. 
The yield helper is used to transfer content from the parent into the child component and render the same. 
The difference between passing variables and using the yield block is that the yield block supports handlebar-generated HTML, whereas normal variables can just be dynamic data. When we call a particular child component, notice that we auto-close the HTML tag in the same line, indicating that there are no child HTML elements being passed to the component. However, if we pass any child element to the component, that will be
rendered using the {{yield}} helper.

Calling a component with a child block will look like this:
```html

<ClientsTable::Row @client={{client}} class="client-{{index}}">
    <p>Some Dynamic Element for client {{client.name}}</p>
</ClientsTable>
```

The `<p>` tag passed inside the component will be rendered in place of the yield helper. 
Similar to the outlet tag, we can position the yield tag anywhere in the component. 
A yield tag can be placed in multiple places of the component as well. 
The content provided will be rendered in all the places where the yield tag is specified. 

# Conditional Statements

### if
You know that we define variables inside double curly braces ({{ }}) in the Ember template. For adding block statements like if, unless, each, you add a # after the curly braces, indicating the start of a block. 
At the end of the block, we add a / after the curly braces followed by the name of the block. For example, this is what an if block looks like:
```html

{{#if someCondition }}
    <p>If condition passed</p>
{{/if}}
```

let us say we want to display the email and phone number only if the client is active. 
We will wrap the two fields in the clients-table/row component with this if condition as follows:
```html

<tr class="my-custom-class" ...attributes id="client-{{@client.id}}">
<td>{{@client.name}}</td>
<td>{{@client.company_name}}</td>
{{#if @client.active}}
    <td>{{@client.phone_number}}</td>
    <td>{{@client.email}}</td>
{{/if}}
<td>
<LinkTo @route="clients.view" @model="{{@client.id}}">View</LinkTo> | Edit | Delete </td>
</tr>
```
You can visit http://localhost:4200/clients and see that the email and phone numbers are displayed for only one client.

The contact details of the client with an active set to false do not show up. 
However, you can see that the phone number and email columns are not present for the inactive row, and hence the view and delete buttons have come to the third column near the company name. To prevent this, we will need to add either a replacement or an empty column element when the client is not active. That is when an else condition shows up.

### else
```html

{{#if someCondition}}
    <p>Condition is met</p>
{{else}}
    <p>Doesn"t meet the condition
{{/if}}
```

fallback empty columns inside the else block like this:
```html

{{#if @client.active}}
    <td>{{@client.phone_number}}</td>
    <td>{{@client.email}}</td>
{{else}}
    <td>-</td>
    <td>-</td>
{{/if}}
```            

### else if
```html

{{#if someCondition}}
    <p>Condition 1 met</p>
{{else if secondCondition}}
    <p>Condition 2 met</p>
{{else if thirdCondition}}
    <p>Condition 3 met</p>
{{else}}
    <p>No Conditions met</p>
{{/if}}
```

### unless
An unless condition is the reverse block of if. It is the equivalent of if not. An unless can be used if you want to just write an else block when an if condition is not met. Like this:
```html

{{#if someCondition}}
{{else}}
    <p>Condition not met</p>
{{/if}}
```

The unless equivalent of the preceding condition is as follows:
````html

{{unless someCondition}}
    <p>Condition not met</p>
{{/unless}}
````

For our project, let us say we want to add an Inactive tag near the name of inactive users. We can do that as follows:
```html

<td>
    {{@client.name}}
    
    {{#unless @client.active}}
        <span>(Inactive)</span>
    {{/unless}}
</td>
```

This is a sample of how you can use unless with Ember.

### Inline if
We have seen how an if block can be created. 
That is useful when we want to show blocks of content or text based on conditions. 
Now, let us say we want to make a small change like adding an attribute or class to an element based on a condition. To say it in terms of our project, let us say we want to add a gray background to the rows of inactive clients. And let"s say we are adding a class bg-gray to our app.scss file as follows:
```scss

.bg-gray {
  background: #eee;
}
```

This class has to be added to the row only if the client is not active. 
If this has to be done through the if or unless block, we will have to replicate the entire code for the row to just add an extra class. This is because:
- An ember block can only be used within another HTML block, not in the middle of an HTML tag (inside the class
attribute). For example, the following code will not work: `<tr class="my-custom-class {{#unless @client.active}}bg-gray{{/unless}}" ...attributes id="client-{{@client.id}}">`

- The preceding sample will not work because the unless block is added inside the class attribute instead of within
the tag. 

All tags inside a block should be closed inside the block itself. For example, just changing the `<tr>` definition as follows will not work:
```html

{{#if @client.active}}
    <tr class="my-custom-class" ...attributes id="client-{{@client.id}}">
{{else}}
    <tr class="my-custom-class bg-gray" ...attributes id="client-{{@client.id}}">
{{/if}}
```

This example also will not work, as the `<tr>` tag is not closed in the if block. 
All tags have to be closed within a block.

This is where inline if comes to your rescue. 
It works for both if and unless clauses. 
You can prevent all this hassle by using a single piece of code:
`{{if condition value}}`

Note that there is no # prefix before if. It is because we are not creating a block here and the code is just inline. We can achieve what we want in a single line here:
```html

<tr class="my-custom-class {{unless @client.active "bg-gray"}}" ...attributes id="client-{{@client.id}}">
```
Refresh the page to see a gray background on the inactive row in the table.

The inline block supports an else part as well. If we want to
differentiate active and inactive clients by adding a gray
background to inactive clients and a green background to
active clients, here"s how you can do it:
`{{if @client.active "bg-green" "bg-gray"}}`

After these changes, the list page will look as follows:

# Loops
A loop is for handling repetitive code, which has to be executed multiple times. 
Whenever you want to display a list of elements in the UI, like the clients list we have in our application, you will have to call the same component multiple times.


app/components/clients-table/table.hbs, we have the following code:
```html

<ClientsTable::Row @client={{get @clientsList 0}} />
<ClientsTable::Row @client={{get @clientsList 1}} />
```
Ember has an each block for handling loops. 
Let us modify the clients" table as follows:
```html

{{#each @clientsList as |client|}}
    <ClientsTable::Row @client={{client}} />
{{/each}}
```

With this approach, it does not matter the number of records being rendered. 
From the syntax, you can see that we call the #each block with the @clientsList as the first parameter.

We use the as keyword to specify the variable name assigned to each item when the code loops through it. 
The order of the loop is always the same as the order of the list that we iterate over.

# index
When looping through the elements of a list, you might want to know the position of the element in the list for multiple purposes. You might want to show some differentiation between odd and even elements or have some specific conditions for the first element of the list. These are achieved by getting the index of the element in the list. 

index is passed as the second parameter after the as keyword. You can use the index as follows:
```html

{{#each @clientsList as |client index|}}
<ClientsTable::Row @client={{client}} class="client-{{index}}" />
{{/each}}
```
This will add the classes client-0 and client-1 to the respective rows. The index starts from 0.

# Empty lists
Handling empty states is crucial to user experience, as we need to aesthetically inform them there are no records and provide options to take some action accordingly, like a link to create a new record. So, the code that handles empty state should be written separately and cannot be part of each loop.

For this purpose, you can use an else block inside each block to handle cases when the list we iterate over is empty. The code for handling empty lists will look like this:
```html

{{#each @clientsList as |client index|}}
    <ClientsTable::Row @client={{client}} class="client-{{index}}" />
{{else}}
    <tr>
        <td colspan="5">No clients available</td>
    </tr>
{{/each}}
```

## Iterating over Objects
The each helper is useful when iterating over a list of objects.

However, when we want to iterate over an object containing key-value mappings, it will not be useful. For that purpose, ember has an each-in helper. It supports and iterates over a set of keys and values. For example, let"s consider an object containing the details of clients and the project names associated with them:
```ts

{
"John"s Furniture": [{name: "Project 1", cost: 100000}, {name: "Project 2", cost: 20000}],
"Smart Boutique": [{name: "Project 3", cost: 10000}, {name: "Project 4", cost: 20000}]
}
```

Rendering this type of complex structure will not be possible with the each helper. Hence, we will use the each-in helper for this purpose. The code looks as given here: 
```html
{{#each-in @projects as |clientName projectList|}}
<div class="client-projects">
    <h4>Client: {{clientName}}</h4>
    <ul>
        {{#each projectList as |project|}}
            <li>{{project.name}} ({{project.cost}})</li>
        {{/each}}
    </ul>
</div>
{{/each-in}}
```

Note that the `each-in` helper provides two parameters instead of one, the first one being the key and the second one the value. You can also see that we can iterate over the list present inside the object using the nested each helper. The example provided will transform the object into the HTML as follows:
```html

<div class="client-projects">
    <h4>John"s Furniture</h4>
    <ul>
        <li>Project 1 (100000)</li>
        <li>Project 2 (20000)</li>
    </ul>
</div>
<div class="client-projects">
    <h4>Smart Boutique</h4>
    <ul>
        <li>Project 3 (10000)</li>
        <li>Project 4 (20000)</li>
    </ul>
</div>
```
As you can see, we are able to transform a multi-level object into a beautiful piece of HTML code without redundancy in Ember. We can also add an else block to each-in for handling empty objects.

# Helper Functions
Helper functions are reusable JavaScript functions that can be called from templates. The function can receive
parameters, process them, and return the data to be rendered in the template. Compared to components, helpers
are lightweight, and they only have a JavaScript component associated with them.

## Built-in Helpers
We have already seen a few helpers in our previous chapters. They are: 
- get
- if
- unless
- each
- each-in
These helpers are Built-in helpers that are available in your Ember app by default. 

Let us look at some of the other built-in helpers that are commonly used:
- concat helper: used to combine multiple strings when displaying them in the template. For example, when we
added a class to the `ClientsTable::Row` call, we used `class="client-{{index}}"` to define the class attribute. Using the concat helper, we can define the same in the following pattern:
`class="{{concat "client-" index}}"`. This helper accepts multiple parameters and combines all of them, rendering them in the template.

- array helper: used to generate a list of elements in the template. If the component that you are calling accepts only a list of elements, you can use the array helper to generate a list and send it to the component, as shown in the following example:
```html
<ChildComponent @elements={{array "First Element" "Second Element" "Third Element"}} />
```

In the child component, you can use the @elements parameter considering it to be a list.

## hash helper
The array helper is used to generate a list from the template.

Similarly, the hash helper is used to generate an object from the template. 
    `<ChildComponent @elements={{hash key1="First Element" key2="Second Element" key3="Third Element"}} />`   

When sent like this, the keys can be directly accessed from the child component. 
This can be useful in cases where you need to pass dynamic parameters to a component. 
It can be accessed as `{{@elements.key1}}` in the child component.

- let helper: When you feel the need to use a variable multiple times in a template, and referencing the variable in the structure as returned by the component is too long to be referenced multiple times, you can use the let helper to assign the value to a simple variable name that is bound only within the context of the let block.

```html

{{#let @client.name as |name|}}
    <td>{{name}}</td>
{{/let}}
```

In this example, you can see we assigned a simpler variable name to @client.name, so that the reference is made simple and easy to understand within the template. 

## input and textarea helpers
Input and textarea helpers are the extensions of <input> and <textarea> tags in HTML. The Ember helper supports the two-way binding of the variables, making the changes instantly available in the component/controllers. To demonstrate this, let us add the following to the client view component:
```html

{{input value=@model.name}}
```

# Creating a Custom Helper
Ember offers a wide variety of built-in helpers to be used by us. On top of that, we will definitely encounter use cases that require us to build custom helpers across the application.

Starting from Ember 4.5, Ember has two types of custom helpers:
- Local helpers
- Global helpers

### Local Helpers
Starting from Ember 4.5, Ember allows us to use normal JavaScript functions as Ember helpers. This gives developers the ease of defining functions in each component and use them within the component. For example, a simple function that returns a display name of the client as their name and email combined. Let"s create a function called displayName in our app/components/client-table/row.js. We can generate this component class if it does not exist.

```ts

getDisplayName = (client) => {
return `${client.name} <${client.email}>`;
}
```

This simple function we have defined in the component can be directly used in the template. 
Let"s replace the name column in the list with the following content:
```html

{{this.getDisplayName @client}}
```

The name column will be displayed as the name and the email of the client. 
This getDisplayName function is valid only within the clients-table/row component and cannot be used from outside it. However, this function can be called as many times as you want from the template.

## Global Helpers
defined separately and can be called anywhere from the application. 

Let"s move the getDisplayName to be a global helper. You can generate a helper with the following command:
`ember generate helper get-display-name`

Helpers are generated inside the `app/helpers` folder, and you can now see an `app/helpers/get-display-name.js` file for this newly created helper. We can add the same logic to the helper file:
```ts

export default function getDisplayName(client) {
    return `${client.name} <${client.email}>`;
};
```
The definition in the template will have to be changed as follows, since we are calling a global helper now. You can update the helper call as follows: 
```html
{{get-display-name @client}}
```
We have simply moved the content from a local helper function to a global helper, making the code reusable throughout the application.

## Nested Helpers
Helpers are nestable, meaning that you can call helpers from within other helpers, and the output of the inner helper will be passed as input to the outer helper. For example, we can call the get helper inside concat helper to combine different keys from an object:
```html

{{concat (get @client "name") (get @client "email")}}
```

Through this, we can nest any number of helpers from one within the other from the template. 
Helpers can be used anywhere in place of a hard-coded normal value, and Ember will auto-resolve the value of the helper before proceeding to the next step.

# Named Arguments
helper function that calculates the area of an object. 
Depending upon the type of the object, the parameters passed will vary, and the formula will vary.

```ts

export default function calculateArea(objectType, options) {
    if (objectType === "square") {
        return options.side ** 2;
    } else if (objectType == "rectangle") {
        return options.length * options.width;
    }
}
```

Receiving the named options and passing them through a single options object gives us the power of dynamicity. Now we can call this helper in the following ways:
```html
{{calculate-area "square" side=5}}

{{calculate-area "rectangle" length=10 width=20}}

```

This serves two purposes:
1. From the template perspective, the code is clean and easy to identify what parameters are being passed.
`{{calculate-area "rectangle" length=10 width=20}}` is easy to read and understand rather than just `{{calculate-area "rectangle" 10 20}}` 
2. From the helper point of view, it gives the function the power of dynamicity. Without this, we might have to
create different functions for each area type or keep listing so many parameters that it becomes very
confusing in the end and the code becomes unreadable.

## ember-truth-helpers
By default, you cannot compare two values within an Ember if helper. You can only specify a variable in the helper and Ember decides based on the boolean value of the specified variable. 
If we need to compare two variables, we will have to write a function that does the comparison and returns the
boolean value and use that function inside the Ember template. `Ember-truth-helpers` is an addon that can be used
to overcome this issue. It provides different helpers that can compare two or more variables by using the nested helpers feature of Ember. 
With this helper, if we want to compare two numbers, we can do it like this:
```html

{{#if (gt number1 number2)}}
    {{number1}} is greater than {{number2}}
{{else}}
    {{number2}} is less than or equal to {{number2}}
{{/if}}
```

This operation is possible because of the `gt` helper provided by the ember-truth-helpers addon.

# Component State and Actions
A Component behaves like a controller where the state of the object is maintained across the lifecycle of the component.

The state variables can be initialized in the component with any default value. 
You can simply define a variable in the component and use it in the template of the component.

Let"s create a simple component that maintains a variable to keep track of the number of clicks made to a button in that component. Let"s create the component click-tracker like this:
```shell

ember generate component click-tracker
ember generate component-class click-tracker
```

# Tracked Properties
Inside the component, let"s create a simple variable called count. 
This will be the state variable that we will display in the template.

```ts

import { tracked } from "@glimmer/tracking";

export default class ClickTrackerComponent extends Component {
    @tracked count = 0
}
```

The `@tracked` notation identifies that the value of the variable will be changed and hence Ember re-renders the component whenever the value of count changes.

We can use the variable in the template file of the component by adding the following line to app/components/click-tracker.hbs:
```html

<p class="text-center">Count: {{this.count}}</p>
```
Let us embed the component inside our home page at app/templates/index.js:
```html

<ClickTracker />
```

## Actions
Actions are the Ember version of event handlers. 
You can attach an action to any HTML element and the action will be triggered by clicking the element. 
The actions are usually used to either update variables in the state, make API calls and update models, or show alerts to the user.

An action can be defined using the `@action` decorator. 

```ts

import Component from "@glimmer/component";
import { tracked } from "@glimmer/tracking";
import { action } from "@ember/object";

export default class ClickTrackerComponent extends Component {
    @tracked count = 0
    @action increaseCount() {
        this.count += 1;
    }
}
```

Attaching an action to a HTML element is simple:
```html

<div class="text-center">
    <button {{on "click" this.increaseCount}}>Click</button>
</div>
```

 
Ember listens for changes to the tracked variable and re-renders the component every time it changes. 

## Actions with Params


```ts

@action
increaseCount(increaseBy) {
    this.count += increaseBy;
}
```

And let"s update the buttons to pass the increaseBy as a parameter to the action:
```html

<button {{on "click" (fn this.increaseCount 1)}}>Click</button>
<button {{on "click" (fn this.increaseCount 2)}}>Double Click</button>
```

We are able to pass parameters to an action through the `fn` helper. 
Through this method, we can pass as many parameters to the action as required.

# Computed Values
Ember has a "computed" helper that will listen for changes in a list of dependencies and will update the value of the computed property upon a change in dependencies. 
The resulting computed property can be used in the template, and it will always display the updated value. 
For example, if we need to display the count multiplied by 2 in our component, earlier notation of using computed variables was something like this:
```ts

import { computed } from "@ember/object";

multipliedByTwo = computed("count", function() {
    return this.count * 2;
}
```

This computed function listens for changes to the `count` variable and every time it changes, the function is executed and the value of multipliedByTwo is updated in the component state. 
This method has its own issues as listening to changes in a list or an object inside a list was not possible by default and special code had to be written to make that possible. 
To fix those issues, Ember now uses functions to return computed values. 
We can create a function named countDouble for our use case:

```ts

get multipliedCount() {
    return this.count * 2;
}
```

performed whenever the component is re-rendered, and since Ember is already tracking the count variable to re-render the component on change, the function also recalculates the value to display the updated value on screen.

## Combining Actions with Arguments
we did not consider the arguments passed by the parent component/template when calling this component. 
We can use the arguments directly inside the actions/functions using `this.args` notation. If we want the count to be multiplied by some other number than 2, we can pass the number as an argument like this:
```html

<ClickTracker @multiplier=4 />
```
And we can use the same in the multipliedCount function as follows:
```ts

get multipliedCount() {
    return this.count * this.args.mulitplier;
}
```

Here, you can see that using the `this.args` notation, we are able to access the arguments passed from the parent
component, and the values are computed accordingly and displayed on the screen.

This is how we introduce dynamicity by directly computing values from within the component or using arguments that are passed from the parent component.

---------

# Ember Bootstrap
- Making the design responsive to look good on smaller devices like tablets or mobile phones 
- Follow certain predefined specifications on the spacing between objects, and use color combinations that complement each other to prevent odd-looking pages 

Bootstrap is a framework that provides a package of all these basic CSS definitions that are required to build a
responsive design, with in-built components to reduce the effort required to develop a basic webpage that follows some default styling conventions. 

**Ember Bootstrap** is an addon that integrates the Bootstrap framework with the power of Ember components. 
```shell

ember install ember-bootstrap
```

Bootstrap is added to your project with its default blueprint. 
If you are using a specific preprocessor and want to generate a Bootstrap with that preprocessor, you can use the following blueprint command:
```shell

ember generate ember-bootstrap --preprocessor=sass --bootstrap-version=5
```

We are generating the blueprint to use the sass preprocessor that we are already using in our project and also specifying the bootstrap version as 5. (The default blueprint installs Bootstrap version 4.) 

Once this is done, you can open our `app/styles/app.scss` file to see if there is an import statement at the end that loads the Bootstrap.css file. 
Any CSS you write below that line will supersede the default Bootstrap code. 
Any CSS defined above the import statement will have the possibility to be overwritten by the default Bootstrap
code.

# Built-in Components
Ember Bootstrap has a lot of Ember Components that wrap existing Bootstrap classes to provide a native experience for Ember applications. 
 
- Buttons: buttons with different varieties of backgrounds. We can use the `<BsButton>` component to style
your buttons in accordance with Bootstrap while enjoying the customizations provided by Ember. 
```
<BsButton @type="primary" @onClick={{(fn this.increaseCount 1)}}>Click</BsButton>
<BsButton @type="success" @onClick={{(fn this.increaseCount 2)}}>Double Click</BsButton>
```

Ember Bootstrap buttons support the following types:
- primary
- secondary
- success
- danger
- warning
- info
- light
- dark
- Outlined

`<BsButton @type="primary" @outline={{true}} @onClick={{(fn this.increaseCount 1)}}>Click</BsButton>`   
  
  - Disabled
  Buttons can be disabled by passing the @disabled parameter.


Here is an example:
`<BsButton @disabled={{true}}>Disabled Button</BsButton>`

# Promise Support
The Ember Bootstrap Button component can handle Promises. 
We can set the button text for the default state, when data is being loaded via a promise or when the Promise is completed. This requires the onClick event to return a Promise, and the button text can be modified based on the status of the returned Promise object.

```html

<BsButton
@defaultText="Submit"
@pendingText="Submitting information…"
@fulfilledText="Data submitted successfully!!!"
@onClick={{this.onClickAction}}>
Submit
</BsButton>
```

# Navigation
Bootstrap provides a mobile, responsive way to handle navigation buttons. 
Let us modify our current simple navigation setup to use Bootstrap components. 
The three links - Home, About, and Clients - will be modified in the following code:

```html

<BsNav
        @type="pills"
        @justified={{false}}
        @stacked={{false}}
        @fill={{false}} as |nav|
>
  <nav.item>
    <nav.link-to @route="index">Home</nav.link-to>
  </nav.item>
  <nav.item>
    <nav.link-to @route="about">About</nav.link-to>
  </nav.item>
  <nav.item>
    <nav.link-to @route="clients.index" @query={{hash sortBy="name" }}>Clients    </nav.link-to>
  </nav.item>
</BsNav>
```

You can see that Ember Bootstrap itself provides a version of link-to that replaces the default LinkTo tag. Upon making this change, we can see that the navbar has been moved to the left side of the screen. 
We can bring the navbar to use the entire width of the screen by setting the `@justified` attribute in the BsNav component to true. 
Also, by setting the BsNav type to `tabs`, you can see a different UI for the nav buttons. 

The navbar can also contain dropdowns, which hold multiple links inside them. Here is an example:
```html

  <nav.dropdown as |dd|>
      <dd.toggle>Dropdown <span class="caret"></span></dd.toggle>
  
    <dd.menu as |ddm|>
        <ddm.item><ddm.linkTo @route="index">Index</ddm.linkTo>  </ddm.item>
        <ddm.item><ddm.linkTo @route="about">About</ddm.linkTo>  </ddm.item>
    </dd.menu>
  </nav.dropdown>
```

Adding this piece of code within the BsNav tag will create a dropdown with two links - to the index and about pages.

# Form
Ember Bootstrap provides simple and easy ways to build forms that can align easily in all kinds of devices. 

Let us create a simple Login route that has a form containing email and password fields:
```shell

ember generate route login
```

Inside the login route, let us add the form with Email and Password fields, with a submit button. 
Let us add the following content to the login.hbs file:
```html

<div class="w-50 mx-auto mt-5">
  <h4 class="text-center">Login</h4>
    <BsForm @formLayout="vertical" @model={{this}} @onSubmit={{this.submit}} as |form|>
        <form.element @controlType="email" @label="Email" @property="email" as |element|>
            <element.control placeholder="Email" required/>
        </form.element>
        <form.element @controlType="password" @label="Password" @property="password"
                      @helpText="Minimum 8 characters, one special character" as |element|>
            <element.control placeholder="Password" required/>
        </form.element>
        <form.submitButton>Submit</form.submitButton>
    </BsForm>
</div>
```

The actual spacing depends on the spacer CSS variable specified by Bootstrap, which is `1rem` by default. Based on the spacer value, the spacing class multiplies the following values:
```
1 - $spacer * 0.25
2 - $spacer * 0.5
3 - $spacer * 1
4 - $spacer * 1.5
5 - $spacer * 3
```

The BsForm component itself has certain interesting parameters:

`formLayout`: This attribute defines how the label and the input box are positioned in the form: 
- `vertical`: This means the input box is placed below the label.
- `horizontal`: The label and input boxes are placed next to each other, like table columns.
- `Inline`: There is no separate space for the label here.

`model`: provides the data values. You can either provide an object defined in the component/passed from the parent or if the variables are individually defined in the current component itself, you can use {{this}} to notify that the variables required are defined in the current component itself. Based on the object passed as a model, Bootstrap matches the property value provided for each field to the keys in the object to get the default data and store the updated values.
`onSubmit`: The function to be called when the submit button is clicked.

You can also see that the individual fields of the form are specified using the `form.element` component, which supports attributes like the type of the field, name of the field, label, placeholder, and so on. You can also see that there is a helpText parameter, which displays a description for the field below the text box in a neat manner. The form must look like this when you visit http://localhost:4200/login:

With just a few lines of code and no CSS, we have designed a pretty form. This is the power of Bootstrap in your
application. We will look at how we can add validations to this form later.

# Tooltip
Usually, tooltips are used on disabled elements to display the reason why they are disabled, or show labels for a particular icon to inform what it does, and so on.

Ember Bootstrap provides an inbuilt tooltip component that you can use:
```html

<button class="btn">
    <BsTooltip @title="Title for my Tooltip" />
</button
```

If you want to display custom HTML inside the tooltip, you can pass them as a child to the component:
```html

<button class="btn">
<BsTooltip>
    This is a custom HTML inside the tooltip
</BsTooltip>
</button
```

# Carousel
Carousels can be used to show a series of images or slides that automatically loop around, hence making the page
interactive and displaying content dynamically to the user.

Here is how you can invoke the BsCarousel component in your template:
```html

<BsCarousel as |carousel|>
    <carousel.slide>
        Carousel Slide 1
    </carousel.slide>
    <carousel.slide>
        Carousel Slide 2
    </carousel.slide>
    <carousel.slide>
        Carousel Slide 3
    </carousel.slide>
</BsCarousel>
```

With these simple lines of code, you can instantly integrate a carousel into your webpage. 
By default, the slides autoplay one after the other every 5 seconds. You can configure the autoplay mechanism and interval through component properties.

# Conclusion
1. What is the reusable part of an Ember application that can be called from different routes?
a. Router
b. Controller
c. `Component`
d. None of the above

2. Which of the following characters is used to denote custom attributes passed to a component?
a. ?
b. _
c. `@`
d. !

3. Using triple curly braces( `{{{ }}}` ) can be used to insert any HTML into the template.
**a. True**
b. False

4. What do you call a function in Ember that can be reused from templates across the application?
**a. `Helpers`**
b. Service
c. Mixin
d. None of the above
 
5. Which of the following can be used to update Component state variables?
a. Tracked properties
b. **Actions**
c. Params
d. Helpers

6. What are the different types of helpers?
a. Local
b. Global
c. **`Both a and b`**
d. None of the above

7. Which of the following is not a built-in helper?
a. get
b. array
c. **list**
d. hash


### Questions
1. How do you generate a component class?
2. What is the difference between output and yield?
3. What are computed values and how can they be tracked?
4. How do you handle the empty state of a loop?
5. What are global and local helpers?


Action: A function that can be bound to events, used to update the state or make API calls
Named Arguments: Dynamic set of arguments that can be passed to helpers