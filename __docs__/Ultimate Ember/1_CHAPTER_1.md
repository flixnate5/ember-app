# 1 CHAPTER 1

Anatomy of an Ember.js Application
An Overview of Web Development
In recent times, we can see most of our day-to-day activities
being moved online. Right from purchasing groceries and
clothes, to doing your banking transactions from the comfort
of your home, anything and everything is now online. We
also spend a lot of time scrolling through social media posts,
watching movies on OTT platforms, and more. All these
activities can be done online either via a browser like Google
Chrome, Firefox, or Internet Explorer, or through different
mobile applications.


For all these online activities, the data is not stored in your
computer or mobile alone, but in some remote server under
the control of the owner of the program. For the scope of this
book, we will discuss only programs that you access through
browsers. Those are called websites or web applications.


Websites versus Web Applications
The programs you access through browsers can be
categorized into websites and web applications. There are a
few differences between the two types.


A website is simply a collection of related pages, where a
visitor will see text, images, videos, animations, and more.


Any code execution happens only on the browser and there
are no server-side actions/logic for a website. The pages will
be static and read-only, and the content might differ only
based on the region/language of the visitor. For example,
your personal profile site, or a restaurant’s website that
showcases their business timings and menu are websites.


A web application, on the other hand, is more complex and
more dynamic. It usually involves authentication. Users who
log in will see content based on their history or their user
access level. A web application requires a server to handle
requests from the client and respond accordingly. Code
executions happen both on the server and the browser. For
example, social media platforms where the feed is
personalized for the user, or a customer support portal
where every user sees data only based on their access level,
are examples of web applications.


Defining Web Development
Web Development refers to the process involved in
developing, building, and maintaining websites and web
applications. It is the creation of an application that is
accessible through the internet.


A web application involves the following components:
Frontend/Client Side
Backend/Server Side
The following figure depicts a typical architecture of a Web
application. This is how the client-side and server-side work
together to store and retrieve data that is shown to the user:
Figure 1.1: Architecture of a Web application
Frontend/Client Side
The client side is the part of the application that the end user
sees in a browser. It handles the user interface and user
interactions. This allows for a responsive and interactive user
experience, as the client-side code can handle events, make
requests to the server, manipulate the page content, and
update the user interface in real-time. Frontend uses the
following languages:
Hypertext Markup Language (HTML): HTML is used
to define the base structure of a web page using a series
of elements called HTML tags.


Cascading Style Sheets (CSS): CSS is used to style
the web page. It enables the separation of the structure
of the page and presentation of the page and defines
how each component of the web page should look.


JavaScript: JavaScript is a scripting language that is
used to make web pages interactive and dynamic.


JavaScript is used to dynamically alter the elements of
an HTML page, also called a Dynamic Object Model
(DOM) in the runtime. We will look into detail on
JavaScript later in the chapter.


Backend/Server Side
The server side is the part that the end user does not see or
interact with directly. The frontend part of the web
application
connects
with
the
backend
through
an
Application Programming Interface (API). APIs can be
understood as a contract of services between the frontend
and backend, which allows them to communicate with each
other through requests and responses. The server side
receives the requests, processes them, executes business
logic required by the application, and also takes care of
connecting and interacting with the database for storage and
retrieval of data.


It is common practice that databases are accessible only via
the backend and not directly from the frontend, due to
security reasons. The server side concentrates on efficiently
executing the business logic and securing the data from the
outside world. Some of the common languages and
frameworks used for the backend are:
JavaScript
Node.js
Express.js
Python
Django
Flask
Ruby
Ruby on Rails
JavaScript
JavaScript is the language of the web. It is an interpreted
language released in 1995 by the networking company
Netscape. Initially, JavaScript engines were used only in
browsers. However, in recent times, it has developed to be a
full-fledged programming language and is now the most
popular programming language, according to GitHub. From
the end users’ point of view, every time a browser does
something other than display static content, it uses
JavaScript. Studies state that almost 97% of websites and
applications use JavaScript.


Considering the scope of the book, we will be discussing the
role of JavaScript in just the front end (Client side). JavaScript
consists of a variety of inbuilt functions and APIs for
manipulating the HTML DOM. First, let’s look at what DOM is.


Document Object Model (DOM)
The DOM is the Object Model for HTML. DOM is a data
representation of the HTML page in a tree format. When a
browser loads an HTML document, it generates a DOM of the
page, which makes it easier for JavaScript to understand and
manipulate the HTML elements on the page. Without DOM,
JavaScript will not have an idea of the structure of the web
page or its contents.


Key Features of DOM
Here are some of the key points that you should know about
the DOM:
Tree Structure: The DOM represents the HTML or XML
document as a tree structure, where each element is a
node in the tree. The topmost node is called the
“document”
node,
which
represents
the
entire
document. Elements, attributes, and text nodes are
represented as child nodes of their parent nodes.


Node Objects: Each node in the DOM tree is
represented by an object with properties and methods.


For example, an HTML element node has properties like
tagName, className, and methods like appendChild() to
manipulate the node.


Cross-Browser Compatibility: The DOM provides a
standardized way to interact with web documents,
ensuring compatibility across different browsers and
platforms. While some browser-specific differences exist,
the core concepts and methods of the DOM are
consistent.


Consider the following simple HTML code:
<html>
<head>
<title>My Web Page</title>
<link rel=”stylesheet” href=”/link-to-my-css-file.css”>
</head>
<body>
<h1 id=”page-title”>My First Web Page</h1>
<div class=”parent-div”>
<div class=”childdiv-1”>
Child Div 1
</div>
<div class=”childdiv-2”>
</div>
</div>
</body>
</html>
When the preceding HTML page is loaded on the screen, the
browser generates the following DOM:
Figure 1.2: Example of a DOM
In the preceding example, you can see how a DOM is
mapped from the HTML code provided to the browser. This
parsed structure helps JavaScript to select specific elements
and manipulate them. There are a few ways to select DOM
elements through JavaScript. Here are a couple of examples:
Selecting element by Id
The id attribute of an HTML element should be unique across
the page. So, when selecting an element by id, JavaScript
expects only one element to be returned. Here is how you
select an element by its id:
document.getElementById(“page-title”)
This line will return the JavaScript version of the h1 element
from the page as shown in Figure 1.2.


Selecting elements by Class Name
The class attribute can be used to specifically target
elements that are assigned to the same class. There can be
multiple elements with the same class name. So, this
function returns a list of matching elements.


document.getElementsByClassName(“parent-div”)
The preceding code will return a list of all DOM elements that
are associated with the class parent-div.


Selecting elements by Tag Name
Instead of the preceding two options, there would be a need
to select all elements of a particular tag. This function can be
used in such cases.


document.getElementsByTagName(“div”)
This line will return all the div elements present in the HTML
page (the parent div and the child divs).


Manipulating the DOM
Now that we’ve seen different ways to select elements from
the DOM, here are a couple of functions that we can use to
manipulate the selected elements. Once you have access to
an element through the DOM, you can modify its content,
attributes, and style. For example, you can change the text
inside an element, add or remove CSS classes, or modify
attribute values. In order to update the text of a particular
element, we can use the following line:
document.getElementById(‘page-title’).textContent = ‘Changed
Web Page Title’
This will update the text that we see in the title section to
“Changed Web Page Title”. Similarly, basic JavaScript can
update the content, styling, position, and more, for any
element on the page. For example, in order to change the
color of the title text using JavaScript, the following line of
code can be used:
document.getElementById(“page-title”).style.color = “green”
There are many other capabilities of basic JavaScript, which
can make the page very interactive and make the user’s
experience pleasant.


Event Handling
Another aspect of JavaScript is to listen for certain events to
occur and execute functions on the occurrence of those
events. The DOM enables event handling, allowing you to
respond to user interactions like clicks, key presses, or
mouse movements. You can attach event listeners to
elements and define functions to be executed when an event
occurs.


For example, let’s say when a user clicks a button, we need
to show the current date as an alert to the user. The
following JavaScript function will take care of it:
document.getElementById(‘page-title’).onclick = function() {
window.alert(new Date());
}
The preceding code asks JavaScript to listen for a click event
on the element with the id page-title and executes the
associated function when that event occurs. Similarly, there
can be multiple functions associated with the same event for
the same element. JavaScript executes each of those
functions in the order in which they are registered. This
allows validation of form elements, tracking user activity on
the screen, and more, through JavaScript.


JQuery
When JavaScript started becoming popular, it was used in a
variety of websites for different purposes, like validating user
forms, updating the CSS styles of the elements dynamically,
and most importantly, loading dynamic data from a backend
server into the browser using Ajax requests.


“John Resig”, a developer who was working on multiple
JavaScript projects, felt that the syntax of plain JavaScript
was too redundant and frustrating. So he released the jQuery
library in 2006. jQuery offers easy-to-access APIs for DOM
tree
traversal
and
manipulation,
creating
animations,
handling events, and making Ajax requests.


For example, selecting an element based on its div (the
equivalent of the previous example):
$(‘#page-title’)
We can see that the code is a lot simpler compared to
normal JavaScript. The preceding code indicates that we are
selecting the element with the id page-title (# denotes that
we are accessing the element by its id). To access all
elements that have a particular class, the jQuery syntax is:
$(‘.parent-div’)
Here the .(dot) in front of the selector indicates that we are
accessing the element based on the class. Similarly,
updating the DOM elements is also easier in jQuery
compared to JavaScript. The equivalent of updating the text
of the page-title div is:
$(‘#page-title’).text(“Updated Title”)
Event handling syntax for the same event we added earlier,
in jQuery format, is as follows:
$(‘#page-title’).click(function() {
window.alert(new Date());
});
A huge advantage of jQuery is that it enables cross-browser
support, handling the differences between JavaScript engines
in different browsers. The development of jQuery was a very
important step in simplifying the loading of data from
different API/server sources. It caused a very important leap
to the level where JavaScript is being used now, compared to
when it was initially developed.


Frontend Applications
Traditional server-rendered pages require the browser to
contact the server with every click. The server generated the
HTML code and the browser then rendered the page. It
started affecting the user experience as users had to wait for
the entire page to reload before they could access the new
content/link. Though JavaScript was able to pull data from
APIs and update the data through Ajax requests without
refreshing the page, it is very difficult to maintain the states
of those variables, keep the UI updated based on the
variables changing, and more. When there are multiple
pages in a web application, even with the support of jQuery,
the browser tab has to be refreshed every time the user
clicks on a link to navigate to another page in the same
application. Every single request had to reach the server,
and the server had to process and render the HTML for each
request.


This
impacts
the
server’s
performance
and
increases the waiting time for the user.


Over time, when web applications became large and
complex, it became very difficult to maintain and manage all
the code using plain JavaScript or jQuery. So, people wanted
an efficient way to manage the complexity on the client side
and reduce server dependency for rendering HTML, CSS, and
JS, which are all browser-oriented. This led to the
development of Web Application frameworks that develop
“Frontend Applications”. Frontend applications can be
classified into three types: client-side rendering or single-
page application, server-side rendering, and static site
generation.


Client-Side Rendering /Single-Page
Application
A client-side rendering (CSR) application or a Single-Page
Application (SPA) is a web app implementation that loads the
HTML, CSS, and JavaScript contents of the application for the
first time when the user loads the page. Once the contents
are loaded, any navigation within the application is
automatically handled and the framework itself rerenders
the contents of the browser without requiring a page reload.


This means that once the app is loaded into the browser, the
server has to be contacted only for fetching and updating
data. This made the server-side applications to be reduced to
being pure API services or data services.


In most of the applications, the same UI elements are reused
across different pages. Consider any social media app or any
email app that you have used. You can see that the layout of
the site remains the same for all pages, be it the logo on top,
the menu items, search bar, and others, remain the same,
and only the content in the middle of the screen changes
based on the links you navigate to. A single-page application
takes advantage of this fact and loads the data from the
server only based on what needs to be changed when the
user navigates between links.


Advantages of SPA
Here are some of the reasons why SPAs became popular and
why we need them:
User Experience: The main advantage of a SPA is the
pleasantness the user feels when using the site. They
would not face the pain of waiting for the entire page to
load whenever they click a link within the site. Lesser
data being loaded from the server means the changes
are seen by the user way faster than in a traditional
application. Since only some parts of the HTML elements
are replaced for every action, the browser rendering
time is reduced drastically.


Reduced Server Queries: Since the server-side
applications need not render the HTML every time now,
the overall traffic to the backend reduces even if the
number of users remains the same. This means that the
companies can save a lot of money while providing a
better experience to their users.


Independent Development Streams: SPAs decouple
the client-side and server-side applications to work
independently.


The
client-side
application
can
concentrate on the user experience and aesthetics,
while the server side can concentrate on optimally
fetching and storing data. It helps reuse the same
backend APIs for both a web application and a mobile
application, which was not possible with the traditional
architecture.


Disadvantages of SPA
Even though it provides a lot of advantages, there are some
cons to the SPA architecture:
SEO: Many search engines lack the ability to execute
JavaScript when crawling across the web. This means
that SPAs will not be indexed by the engines properly
since all the data is not rendered from the backend.


Google has optimized its crawlers to handle SPAs
recently, but SEO remains a problem to be solved for
SPA sites. A quick solution to this is to use server-side
rendering in our SPAs.


JavaScript dependency: SPA is heavily dependent on
JavaScript. So if someone has disabled JavaScript in their
browser, they will not be able to access the contents of
the site at all.


Browser resources: Though it is a relief that SPA
reduces the load on servers, it instead transfers the
execution load to the browsers, which is limited by the
configuration of the client system. Loading large
applications in older machines might cause a poor
experience for the users.


Server-Side Rendering
With single-page applications, there were a couple of
problems:
The site did not get good SEO rankings because of the
crawling issues.


For large applications, the compiled CSS and JS files
become very heavy. So initially, the user has to wait for
the entire JS/CSS to load before they can see content on
the screen.


The page load time is an important factor for SEO. In order to
avoid such delays, “Server-Side Rendering” (SSR) came into
existence. When a user visits a web page, SSR apps fetch
the information required for the page, render the HTML and
return the rendered HTML, instead of the basic plain HTML
returned by the CSR apps. So, now the user need not wait for
the JS to be loaded before seeing any content on the page.


The content is rendered as HTML by the server and sent to
the browser. So, when the JS files are loaded in the
background, the user can still see the contents of the page,
which were returned from the server. Once the page is
loaded for the first time, the framework then takes control of
the tab and takes care of further navigation or API calls. The
only difference is the extra effort of rendering the page on
the server before giving it to the browser.


This approach also solves the SEO issue, as crawlers will
parse the full contents of the page returned from the server.


Because of this, all the popular frontend frameworks have
the option of setting up Server-Side Rendering.


Advantages of SSR
Fast Loading: When the user initially visits a page, they
see content almost immediately, as the loaded HTML
itself contains all the contents, instead of having to wait
for the JS files to load and then paint the content on the
screen.


SEO: SSR apps are great for SEO, as you can optimize it
for SEO similar to optimizing a traditional application.


Disadvantages of SSR
Server Dependency: On the first page load, the
contents are rendered twice: once on the server, and
once more on the browser. This requires an optimally
configured server to handle the load, which will also
incur monetary costs.


UI Compatibility: SSR is not fully compatible with some
UI libraries, which rely upon the window and document
objects of the browser, since those are not available in
node servers.


Caching: Since every page returned from the servers is
different, SSR app HTML files cannot be cached in CDN
services. So, the user cannot enjoy the luxury of loading
cached files from the CDN.


Static Site Generation
Static Site Generation (SSG) is a third option, which is best
suited for sites displaying static content that does not
change based on the user who is accessing the page. For
example, a personal profile website, where you list your
expertise, projects, and more, or a corporate company’s
website that describes the company, team members, contact
details, and so forth. The content of these sites always
remains the same. Hence, they are best suited for static
rendering.


SSG renders the HTML pages on the server, but they are
rendered and stored as individual files during the build time
itself. So, when the user loads a page, they will get the pre-
rendered HTML page directly on the screen. Whenever the
content of the page changes, we have to rebuild the app and
the rendered pages get updated.


Advantages of SSG
Speed: The individual HTML files are generated and
stored during the build time. Hence, the pages are
cached and loaded from CDNs pretty fast. It accounts for
a pretty good user experience.


No Server needed: Unlike SSR apps, SSG apps do not
need any servers and can be served from any content
delivery network or static file storage service like
Amazon S3, Google Cloud Storage, and so on.


Disadvantages of SSG
No support for dynamic content: The scope of static-
generated sites is very limited and when the app
becomes a bit complex, requiring dynamic content, it
goes out of hand for SSG.


Longer build time: Since all the pages are rendered
during the build, the time to generate a build increases
proportionally to the number of pages and the size of
the pages.


Popular Frontend Frameworks
Before looking into Ember, we will look into similar
frameworks in the market and how they work, which will help
you understand how Ember is different from the others.


Comparing multiple frameworks will also give you an idea of
different ways things can be handled in solving user
problems.


React
React.js is the most widely used framework in recent times.


It was initially released in 2013. It was built and, to date,
maintained by Meta (Facebook) and a community of
developers. React is known for its performance, which
targets optimally rerendering only the specific part of the
screen which needs change, using its Virtual DOM concept. It
keeps a copy of the DOM in memory, known as virtual DOM.


When there is something to be changed in the webpage, it
creates a copy of the virtual DOM first and compares it with
the existing virtual DOM. Now, only the elements that are
different from the current virtual DOM are updated in the
actual DOM, reducing the effort of repainting the screen. It is
also endorsed for its development speed. It uses JSX, which
allows writing HTML code directly into JavaScript functions. It
is both an advantage and a disadvantage, considering the
initial time taken for beginners to learn JSX. It uses the Flux
pattern, which is a unidirectional data flow pattern that
passes data/variables from parent to child components.


Since JSX binds HTML and JS together, there is no Model/View
pattern here, as everything is written in the same file.


However, react does not have a strict convention on the
architecture of the application, so there is no uniformity in
the structure of the app and hence it is difficult to maintain
large apps. Popular apps like Atlassian, Airbnb, Facebook,
Instagram, and more, have all been built using React. React
is suitable for applications that require high user interaction.


A simple state management system within React allows you
to smoothly rerender pages, which involve a lot of interactive
and dynamic elements.


Next.js
Next.js is a framework created by a company named Vercel.


It helps to provide support for server-side rendering and
static site generation for react-based applications. It is not a
standalone framework, but only a framework written on top
of React.js. It offers a huge boost in page load time, and SEO,
along with better development speed due to its SSR and SSG
capabilities. Websites like Loom, HBO Max, and Hulu have
been built using Next.js. Next.js can be used when you want
to enable SSR or SSG in your React application.


Angular
Angular is the second attempt at a successful framework by
Google. They initially released AngularJS in 2010, which was
one of the earliest SPA frameworks. They then rewrote and
released Angular in 2016, which is built on top of Typescript.


Typescript is a superset of JavaScript developed by Microsoft.


It offers a type system that does type checks for variables
and functions. JavaScript allows you to pass any data type to
any variable/function. However, in Typescript, you have to
specify the type of parameters passed to a function, and
Typescript ensures that the code does not pass data of any
other type. It reduces the risk of bugs caused by unexpected
data-type behaviors of JavaScript. Angular follows the
Model-View-Controller pattern similar to ember, which we
will discuss later. Most of the Google websites like Google,
Gmail, and other popular sites like PayPal, Forbes, and
UpWork are built using Angular.


Vue.js
Vue.js is a lightweight framework developed by Evan You,
who was a developer for Google. He mentioned that he
wanted to take all the things he liked in Angular and create a
lightweight framework from it. It has a lot of similarities to
Angular and is easy to develop and deploy because of its
lightweightedness. Popular websites like NBC Sports, BMW,
and Adobe use Vue.js for their websites. Vue.js is your ideal
choice when you want to build simple web applications that
need to be built fast.


Backbone.js
Backbone.js is one of the frameworks offering a bit different
approach. Unlike Angular/Ember, Backbone uses the Model-
view-viewmodel pattern. It aims toward separating the
development of business logic from the user interface by
creating an intermediate “ViewModel”. The ViewModel is
the abstracted version of the View (UI components) which
handles the communication between the view and the data
model, using a binder. Sites like Trello, Bitbucket, and
FourSquare use the backbone or one of its extended
versions built by them. You can use Backbone.js in your
application to add a structure to your JavaScript code with its
MVVM pattern. It is lightweight and easily built and deployed.


Ember.js
Having seen the different popular frameworks available in
the market, let’s look into detail about Ember.js. Ember.js is
an open-source JavaScript framework that helps build large-
scale web applications. It was created by Yehuda Katz, a
member of the core team in jQuery, Ruby on Rails, and
SproutCore. It is available under the MIT License. Here is the
logo of Ember.js:
Figure 1.3: Ember.js Mascot
This is called a “Tomster” and it is the alternative to using
the Ember logo. It has been customized by different regions
for mascots of their own, but this is the base mascot
provided by Ember.js.


History
It was in 2007 that a company named Sproutit created a
framework for their mailroom application and named it
SproutCore. It was one of the earliest frameworks that
introduced the MVC model, which was incorporated in
Ember, and other frameworks like Angular too.


When they developed the second version of the same,
SproutCore2.0, in May 2011, they decided that to cater to
a larger audience with an easy-to-build web framework, they
had to make a lot of changes to the existing SproutCore
framework. So, they decided to create a new framework with
SproutCore as the base and named it Amber.js. Immediately
after announcing this change, they received feedback about
the name conflict with an existing application - “Amber
Smalltalk”. Hence, after receiving feedback on the web, they
decided to go with the name “Ember.js”.


The original intention of SproutCore was to help build native-
looking applications (desktop applications). But Ember is
about building web applications.


Popularity
Ember.js is being used by top software development teams
in the world to build large-scale web applications that serve
millions of users at a time. To name a few, the following
websites have been built using Ember: LinkedIn, Heroku,
Cloudflare, Netlify, Intercom, and Apple apps.


At the time of writing this book, the framework has 22.5k
stars and 4.3k forks on GitHub. The technology is being used
by around 31.6k developers on GitHub. The repository has
over 800 active contributors developing the application for a
better experience. It has a weekly download rate of 175k and
is the most preferred framework for building complex large-
scale single-page applications.


Key Features
Here are some of the important features of Ember.js you
should know before you start building applications with it.


Convention over Configuration
Ember follows the convention over the configuration pattern.


It helps reduce the number of decisions the developer has to
make, without reducing the flexibility. It means that Ember
generates all the basic codes and connections using the
simple inputs provided by the developer, and the developer
has to write additional code in specific cases where the
convention does not work. There are a couple of advantages
to this:
It gives a well-defined structure to the application so
that even a beginner developer cannot stray too far
away from the recommended architecture.


With many AI assistants emerging in the market, it
becomes easier for them to suggest/generate code
based on patterns of this convention.


We will look into detailed use cases in the later chapters.


Component-Service Framework
Component-Service Framework is a strategy adopted by
companies to build large-scale applications by breaking them
down into smaller and reusable components. Components
are one of the core features of Ember, which help:
Reusing code in multiple parts of the application.


Finding bugs is easier since the code blocks are small
enough to zero down precisely on the issue.


Two-Way Data Binding
Data binding is a way to keep the data displayed in the UI
and the data in the JavaScript in sync. This means that if
there is an update in one of the variables of the component,
it should reflect automatically in the UI, and similarly the
other way around. Ember also offers a strong binding
between variables, such that when one variable changes, the
other dependent variable changes automatically.


# Anatomy of an Ember.js App
An Ember application consists of the following core concepts:
- **Router**
direct mappings to the path entered by the user in the browser. 
determines which part of the code Ember should execute, to return the relevant data for this particular URL. 
- list of mappings that decide what Route Handler should be called based on the URL. 

- **Route Handler**
called by the router. The function of the route handler is as follows:
- Load the template associated with this route
- Define the model for this route, which will be used by the template or controller
- Route handler can load the model for the route dynamically based on the parameters passed in the URL. 


- **Models**
Models represent the persisted data. The data may either come from a local storage, or a backend server, or maybe even hardcoded in the code. 
- A model is a representation of any data that can survive page reloads. 
- Ember has a data library called “EmberData”, which contains the model layer for communicating with backend/server environments. 

- **Templates**
Templates manage the HTML part of the application.
Templates define the structure of the page and the elements to be displayed on the page. 
- In previous versions, Ember used an inbuilt engine of “Handlebars.js”
- Now Ember supports templates by default, and we can use the same handlebars syntax to introduce all the dynamicity we want to the HTML files.

- **Components**
Components are the broken-down reusable parts of the application. 
- A template can call multiple components, each having its own functionality. 
- You can consider components to be an Ember way of writing your own custom HTML tags.

Adding just the component name in the template will display the HTML of the component. 
Components can either contain just HTML code or can contain both HTML and JavaScript code, making them modular and self-contained to be easily called from anywhere. 

## **Controllers**
act as mediators between the route handler and the templates/components. 
The model data fetched by the route handler is passed to the templates via the controller. 
By default, controllers are not generated when creating a route and are implicitly created by the route handler when the route is instantiated. 
We can generate the controller only when we want to customize the model data being passed from the router or have to maintain page-level attributes/functions that are passed to multiple components via the templates. 
controllers are the state maintenance area for a route, which keeps track of the model and other variables, and in some cases, even functions. 
A controller is a singleton instance. 
This means that only one instance of the controller is generated when the application is loaded, and every time a route is called again, the same instance of the controller is used instead of creating a fresh instance. 

## **Services**
Services are independent utilities or objects that are alive for the entire duration of an Ember application, and they can be shared or used across all the components in the application.

A service can be used in any controller or component by injecting the service. 
Services are used to keep track of global data for the application or for doing asynchronous tasks. 
For example, an authentication service can keep track of whether the user is logged in and the details of the logged-in user. 
A socket service can maintain web socket connections with the server. 
This way, the same piece of code can do all the work, and the data is unanimously shared across the application.

The preceding are the different sections of Ember that work together to run the application.

## Overall Architecture
what happens when you enter a URL in the browser and it loads the Ember application:
- Router decides which route handler to call based on the URL.
- Route Handler fetches the model data, sets up the controller, and renders the template.
- Controller is used to pass the model data and other attributes or functions to the template.
- Template renders the HTML content of the page, uses variables from controllers, and calls multiple components.

Components are self-contained modularized code that has HTML and the core JavaScript logic related to that HTML.

Services can be injected into both components and controllers on demand.

# Addons
where we need additional functionality or features to be integrated into the app. 
Ember has a large collection of addons that can be easily integrated into your application.

Functionalities like CSS scripting using SASS/SCSS are perfect examples of Ember addons.

Ember has a router,
route handler,
controllers,
components, models, templates, and services that work together.

Ember has an integrated test framework that makes the application robust and secure.

4. What pattern does Ember follow? a. Flux pattern
    b. MVC Pattern





Convention over Configuration: Reduces the effort of the user by creating boilerplate code based on user input, and allows configuring further only when needed.

