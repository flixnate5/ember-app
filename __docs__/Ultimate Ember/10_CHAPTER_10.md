# 10 CHAPTER 10 Conclusion

Convention over Configuration design flow by default. 

Hence, Ember’s architecture model is sometimes referred to as MTC (Model, Template, Controller). Here is what each component in the architecture model refers to: Model: The model represents the JavaScript object
representation of the data present in the application.


View/Template: Handles the interactions of the
application with the end user. This takes care of the
user interface, aesthetics, look and feel of the
application that the user sees.


Controller: The controller part of the application
contains the core business logic and takes care of
connecting the Model and View. It also handles any
external interaction of the application with APIs or third-
party services.


Ember applications are built using the Component-Service
strategy. The business logic and connectivity of the
application
are
split
and
written
into
modularized
Components and Services as much as possible, allowing us
to reuse the same code in multiple places in the application.


It also uses Two-way data binding, which means any
change to the data in the View gets immediately reflected in
the controller and vice versa.


It provides you with a few optional features which can be
enabled in the application quickly based on your needs.


Features
like
allowing usage of jQuery inside your
application are present in the framework by default but
require you to manually enable them if and only when
required.


Ember-CLI
Ember Command Line Interface (Ember-CLI) is a wrapper on
the main framework, thus creating an interface for
developers to interact with and manage their Ember
application. Following are some of the functionalities of the
CLI:
1. Create a new Ember application/addon with the proper
folder structure.


2. Install Ember addons into your project and run the
blueprints configured in the addon.


3. Run the Ember development server with Watchman, so
that any change in the code will immediately alert the
browser and trigger a page refresh.


4. Generate different modules in the application like
Routes,
Components,
Models
and
generate
the
boilerplate code for the same based on configured
blueprints. There are also options to destroy the
modules created with the generate command.


5. Run tests on the application.


6. Build the application to generate static files that can be
hosted easily.


Ember-CLI is a huge part of the framework as it handles the
complex jobs of creating the application, installing the
dependencies, running, testing, building and deploying the
application. It also allows us to configure the development
server in such a way that it is accessible from remote
machines
as
well.


The
simplicity
of
the
interface
encapsulates all these functionalities and makes them
available to developers in the form of simple commands.


Each of those commands supports a wide variety of
parameters to configure anything you want with your
application.


Ember-CLI requires Node.js to be installed in your system
and available to access from your terminal. It supports
usage of both yarn and npm as package managers and you
can choose one based on your convenience when creating
the Ember application.


Developing your Ember Application
The Ember application is fully modularized with specific
conventions of where each module is placed and how they
interact
with
each
other.


Here
are
the
core
modules/concepts in an Ember application:
Route Handler: Route handler is the first part of the
application that interacts with the user. When the user
enters a URL in the browser, the Route Handler decides
which route should be called based on the URL and
loads the particular Route.


Route: A Route is a piece of code that directly links to a
URL in the browser. The Route can handle dynamic
parameters in the URL like id. It takes care of fetching
the data (model) related to the route and loading the
template associated with the route. It contains a wide
range
of
hooks
like
beforeModel,
afterModel,
and
setupController to execute any logic at any given point of
the Route’s lifecycle.


Model: A Model is the JavaScript representation of real-
time data that is loaded into the application. The model
and the underlying Ember Store take care of interacting
with the backend API to load data into the application
and convert them into JavaScript objects.


Template: A Template is the part of the application that
the user sees on screen. The Ember Template allows for
displaying dynamic data on screen using the {{ }} and
{{{ }}} syntax. It provides options to introduce a lot of
dynamicity using conditions and loops. The Template is
also responsible for the aesthetics of the screen (CSS).


Template files are represented in the repository using
the .hbs extension, as Ember templates use the syntax
of the Handlebars.js templating library.


Controller: A Controller is an intermediary between the
Route and the Template. The model data or any
parameter fetched from the Route is passed to the
Template only through the Controller. There can be a
maximum of only one Controller per Route. It is not
necessary for a Controller to be present for each Route
and the Ember blueprint does not generate it by
default. Ember uses a pre-generated default Controller
whenever the application does not provide an explicit
Controller for a particular Route.


Component: Components are the basic building blocks
of Ember.js. It is the smallest reusable piece of code in
the application that can be called from any Template in
the application. Each Component contains two files - an
HTML (.hbs) file for templates and a JavaScript (.js) file
for business logic. The JavaScript file is not generated
by default and can be created for each Component
based on requirements.


Service: A Service is a Singleton object that lives
through the lifecycle of the application. Services can be
injected into any object like Component, Controller,
Route or even other Services. Services usually contain
logic that is not part of any particular page, like making
third-party calls to interact with other applications like
payment systems and so on.


Helpers: Helpers are reusable JavaScript functions that
can be called from Templates. A Helper can receive any
number of parameters and the response is rendered
directly in the Template. Helpers support named
arguments that allow us to understand the code better
by seeing what data is being passed to a Helper along
with the parameter name.


We have discussed in detail about each of these modules in
the previous chapters, about how they work and interact
with each other. The Ember application is a modularized yet
tightly knit collaboration between all these modules. The
framework handles the internal communication among the
modules, thus letting the developer worry only about
building the application rather than facing the hassle of
getting the basics to work.


Testing your Ember Application
Once the application is developed, it is important to have
automated tests written for your application. Automated
tests allow you to ensure that the features in the application
are working as per the requirements and that new changes
do not affect any existing modules in the application. By
doing so, it gives a lot of confidence even when the
application grows large. Ember Tests are built on top of the
QUnit JavaScript framework. Here are the different levels of
tests that are present in Ember:
Unit Tests: These tests cover the basic modules of the
application
and
test
their
behavior
in
solitary
environments. Unit tests are written for Routes, Models,
Templates, Controllers and Services. Running a unit test
does not render the application.


Rendering Tests: Rendering/Integration tests are for
testing modules or a combination of modules, and their
interactions with each other. It requires at least a part of
the application to be rendered and hence the name
Rendering tests. Components and Helpers are tested
using rendering tests.


Application Tests: Acceptance tests are for testing the
application from the user’s point of view. It allows you to
open a particular URL in the browser, enter data in the
forms, click buttons, and then track the transition
between routes and so on. Acceptance tests trigger all
the lifecycle routes of each module, just like it happens
when the user loads the page in the browser.


We had discussed in detail how each level is different from
the other and the scenarios where each of them is useful.


We also looked at how we can find issues based on auto-
generated tests and how they can be fixed. The important
part we discussed was about writing tests for each module
in the application, thereby increasing our code coverage.


Code Coverage
Code Coverage is a vital benchmark in rating the
exhaustiveness of your test suite. The ember-cli-code-coverage
add-on tracks the lines of code that are called when running
the test suite and generates a report on the percentage of
your code that is covered during tests. The primary goal for
a test suite to be perfect is to have 100% test coverage.


From our small exercise in Chapter 7: Testing Ember.js Apps,
we were able to improve the coverage from around 50% to
more than 78%.


Deploying your Ember Application
Once the application is developed and tested, it can be
deployed for everyone to access from their browsers.


Deploying the Ember application consists of two steps:
1. Generating the build files for your application.


2. Copying the build files to a hosted environment for
serving it to others on demand.


Build Process
The build process of an Ember application takes the
individual modules of the application and combines them
into a single JavaScript file that can be expanded and
activated by any contemporary browser. Generating a static
build in Ember involves the following steps:
Transpiling: The Ember application may contain
modern JavaScript code that is not directly supported by
all browsers. For example, using arrow notations for
functions is not supported by default in a few browsers.


So Ember converts these notations into basic JavaScript
code that is readable by all supported browsers.


Minifying: In order to reduce the size of the output file,
Ember CLI renames variables and functions in the code,
thus improving the performance of the code in the
browser as well.


Bundling: Once minified, the multiple files are
combined into a single file for easy sharing.


Fingerprinting: For every build, the output files
generated are suffixed with a random set of characters
and numbers. This fingerprint is used to uniquely
identify a build and prevent browsers from loading old
files from the cache, even after a new deployment. The
fingerprinted file names are updated in the index.html
file generated for the new build.


Testing: To ensure the build is generated properly,
Ember CLI runs the tests against the build.


Linting: Linting is the process of checking code
semantics. This ensures that there are no potential
errors and bugs like using a variable without defining it,
and so on.


Deployment
Once the build files are generated, the deployment process
is simple. We discussed how we can integrate with different
cloud hosting providers and how the
ember-cli-deploy
package can help us efficiently deploy the application with a
single command. We had gone through the process of
deploying to AWS, GCP and Azure in detail.


Maintaining your Ember Application
After the application is developed and deployed in the
production environment, maintaining the application is an
important task. Even though the application might not have
any changes to the requirements or any new features, it is
recommended to keep the application version up to date
and prevent the usage of outdated packages. There are two
steps to the maintenance process:
Handling Deprecations
We have discussed the different techniques available in
Ember to filter out the deprecations and modify them before
upgrading to a newer version. Deprecations are functions or
properties that are flagged to be removed/renamed from the
framework in a future release. So it is important to keep our
application deprecation free and updated so that release
upgrades are easy to do.


Upgrading packages and Ember
The Ember.js community keeps releasing new versions of
the framework with updated technical and security features.


The new versions also take into account the current browser
support and improve the performance of the application
based on the latest available browsers. So it is necessary to
run your application using the Latest Stable Version
(LTS) of Ember. The details about the latest releases of
Ember can be found at https://blog.emberjs.com.


Along with Ember.js, the dependencies of your application
will also have to be upgraded, so that any updates
regarding the usage of the addon are incorporated into the
system. When upgrading either Ember.js or any package, we
need to look for breaking changes in the packages that
might affect the existing code and deploy only after the
necessary changes are made in our code accordingly. Ember
provides the ember-cli-update package to make this process
easier. You can install this package and then run ember
update. This will download the latest version of Ember (or the
version specified when running this command) and check
the changes between the two versions. Once the update is
run, we need to run the following command:
ember update --run-codemods
The mentioned command will make any syntactic changes
required for upgrading from your current version to a new
version. It might be a function name that is changed, the
way variables are declared and so on. If there are some
changes that Ember is not sure about and wants you to
intervene, it will raise them as merge conflicts and you can
decide which changes to keep and what to delete.


Writing and Deploying an addon
We
have
looked
at
creating
and
deploying
Ember
applications. In this section, we will discuss how you can
create your own addon, and get it deployed to the Ember
Observer website (https://emberobserver.com/) so that
everyone can look at your addon and install it in their
applications. Here are the steps involved in building and
deploying your addon:
Generating an addon
Creating an addon is a simple process similar to creating an
Ember application. We can run the following command
outside the current Ember project. We have to create a new
addon:
ember addon my-new-addon
This will create a folder named my-new-addon just like ember
new. But you can see the differences in the folder structure
with a new addon folder inside the project.


Adding Content
Adding content into the addon is similar to how you do for
an Ember project. Let us create a new Component in this
addon to print some text. Let us generate a component with
the following command:
ember generate component title-displayer
Let us say this component will get the title from the calling
template and display the title in a specific styling format.


The preceding command will have created a few files in
both the app folder and the addon folder inside our project.


You can open the app/components/title-displayer.js file to see
that it references the file inside the addon folder. This means
this component is rendered by default by our addon. Let us
add the following code to our
addon/components/title-
displayer.hbs:
<h1>{{@title}}</h1>
So this component will simply get the title from the calling
template and display it inside h1.


Linking the addon to our existing
project
Once the addon is ready, next we can try using it in our
local project to ensure it works as expected. Here is how you
can link/import our new addon into our current Ember
application:
1. To ensure all dependencies of the addon are properly
installed, we should run yarn install from inside the
addon directory.


2. In order to expose our addon to projects available
locally, we will run yarn link so that the local yarn
manager will be notified to fetch the addon files from
this folder when someone tries to install this addon.


3. Next, we need to call the addon from our Ember
application directory. From inside the Ember application
directory, run yarn link my-new-addon.


4. Once linked, we need to add our addon to the
package.json file in the Ember project. Since we do not
have any version constraints as of now, we add the
following line to the devDependencies section of the
Ember project: “my-new-addon”: “*”
5. Now yarn will treat the addon as a new dependency and
we will install it by running yarn install.


6. The setup process is complete and now we can call our
addon from anywhere inside the application using the
Camelized name of the addon. Let us add the following
to our index template:
<MyNewAddon @title=”Testing my new Addon” />
You can now refresh your browser to see the text reflecting
in a h1. Thus we have successfully tested our addon in our
project.


Pushing to Ember Observer
After your addon is tested and ready to deploy, you can
publish
it
as
an
npm
package
by
following
https://docs.npmjs.com/creating-and-publishing-scoped-
public-packages
which
provides
the
instructions
for
publishing an npm package. Some steps are recommended
before publishing:
Creating a website for your addon. There is already an
existing package ember-cli-addon-docs which helps you
design a webpage for your addon.


Your addon should contain a README.md file that explains
in detail about the addon and how it works.


A CONTRIBUTING.md file for informing people if they can
contribute to building this addon and the steps for the
same.


Once published, you can share the link to your addon
website on Ember Observer and then developers will start
noticing your addon and start incorporating your addon in
their projects.


Best Practices in Ember.js
Best practices are framework-level conventions that are not
enforced upon us but are good to have in your application.


Here are some of the best practices to be kept in mind when
developing your application:
URLs with nested Routes should be named in plural (for
example, clients, users).


Model names should be named singular (for example,
client, salesman, user).


All variable names should be camel-cased. Class Names
should start with a capital letter whereas functions and
variables should start with a small letter.


Use Components and Component actions as much as
possible instead of Controllers and Controller actions.


Data down, actions up: When nesting Components, it
is always preferred to abstract the data handling and
pass the information from a parent Component to the
child Component. But when you want to update a
particular property or information passed from a parent
Component, it is recommended to call a function in the
parent Component to update the data instead of
updating the data directly in the child Component.


Always keep in mind that Controllers are singleton
objects and the property declarations inside the
Controller are not automatically reset when the
application transfers from one Route to another. So, it is
better to ensure any property of the Controller that is
updated should be reset back to default using the
resetController function in the Route.


Contributing to Ember.js
Ember.js is a community-driven framework and as a
developer, you can do your duty to the developer
community by helping build Ember.js. The core repository of
Ember.js is present at https://github.com/emberjs/ember.js.


You can contribute to Ember through the following methods:
You can create an issue in the Ember repository to
report any bug you find in the latest version or any
enhancement you would like to add to the framework.


You can take a look at existing issues and submit a Pull
Request with the changes to the same. You should look
at the
CONTRIBUTING.md file in the Ember GitHub
Repository for guidelines on how to submit a Pull
Request to Ember.


If you find any typos in the Ember documentation or API
guides, you can update the relevant documentation and
submit Pull Requests to the Ember repository.


More information can be found in the CONTRIBUTING.md file
present in the Ember.js GitHub repository.


Conclusion
Thus, we have covered the basics of Ember.js and through
this book we have gone through the process of creating
your first Ember application, adding different pages to your
application, and configuring, testing and deploying the
application. With a core understanding of the basics, you
will be able to apply this in creating any scalable application
for large-scale use.


It is now time for you to close this book and open yourself
up to the world of opportunities presented by this wonderful
framework. Being used by some of the top tech companies
in the world, Ember.js Developer is one of the most in-
demand roles, with a constant need for new developers
joining the community. My best wishes for your journey with
Ember
and
the
community
looks
forward
to
your
contributions to this esteemed framework.


Index
Symbols
.ember-cli 40
A
actions
about 98, 99
with params 100
activate hook 58
adapters 138
adapters extension
about 138
headers 139, 140
host and namespace 138
model-URL mapping 139
URL conventions 140, 141
addon
content, adding 261
deploying 261
Ember Observer 262, 263
generating 261
linking, to existing project 262
writing 261
addons 21
afterModel hook 59
Angular 14
app config 220, 221
app folder 37
application testing
about 188, 189, 209, 210
Mirage, setting up 210
redirections, testing 210, 211
array helper 94
assets 40
asynchronous routing 62-65
authentication service 19
automated testing 176
AWS deployment
about 237
Bucket, creating 238, 239
ember-cli-deploy-s3 plugin 242
programmatic user, creating 241, 242
public access, enabling 240, 241
static website hosting, enabling 239, 240
Azure deployment
about 246
ember-cli-azure-deploy plugin 246
environment variables, adding to GitHub 249, 250
GitHub repository, setting up 246, 247
static web application, creating up 247-249
B
Backbone.js 15
backend
about 3
languages and frameworks 4
backend API
Ember CLI Mirage structure 119
installation 119
models and database 121-123
routes, creating 120, 121
setting up 119
beforeModel hook 58, 59
black box testing 177
Bookmarklet Application
used, for installing Ember Inspector 219
branch coverage 189
bug fixing, with existing tests
about 192, 193
tests/integration/component/clients-table/row-test.js 195-197
tests/integration/helper/get-display-name-test 194, 195
tests/unit/serializers/client-test.js 193, 194
built-in components, Ember Bootstrap
buttons 103, 104
carousel 109
form 106-108
navigation 105, 106
promise support 104
tooltip 108
built-in helpers
about 93
array helper 94
concat helper 93
hash helper 94
input helper 94, 95
let helper 94
textarea helper 94, 95
buttons
disabled parameter 104
outline attribute 104
C
Cascading Style Sheets (CSS) 3
class attribute 6
client side 3
client-side rendering (CSR) 9
code coverage
about 189-191
branch coverage 189
function coverage 189
line coverage 190
statement coverage 190
updating 211, 212
commands, Ember CLI
folder structure 36, 37
component
about 77
elements 77
generating 77, 78
component arguments
about 78-81
HTML attributes 81, 82
components 19
component-service framework 17
Component-Service strategy 255
component state 98
Component Tree
about 224, 225
element component, locating 226, 227
search component 226
view component 225, 226
computed values
about 100, 101
actions, combining with arguments 102
concat helper 93
conditional statements
about 85
else block 86, 87
else if 87
if conditions 85, 86
inline if 88-90
unless condition 88
config folder 38
Content Security Policy (CSP) 154
controller
about 19, 69
generating 69, 70
Convention over Configuration design flow 254
Cross-Origin Request Sharing (CORS) 154
CSS Preprocessors 41
custom helper
global helper 96
local helper 95
D
data
persisting 131, 132
data inspection
about 228, 229
filters 229
inspect store 229
deactivate hook 58
deleteRecord function 134
deprecation
filtering 158
handling 157, 158, 232
workflow 159, 160
didTransition hook 61
Document Object Model (DOM)
about 4
class attribute 6
event handling 7, 8
id attribute 6
key features 5, 6
manipulating 7
tag name attribute 7
dynamic segment 54, 55
E
else block 86, 87
else if 87
embedded applications
about 161
root element 161
root URL 161, 162
ember addon 29, 30
Ember API requests
about 123
Ember Data, advantages 123
making 124, 125
Ember application
app secrets 152, 153
build environment 151
building 236, 237
build process 259
code coverage 258
component 257
configuring 151
controller 257
deploying 258, 259
deprecations, handling 260
developing 256
helpers 257
maintaining 260
model 256
packages, upgrading 260
route 256
route handler 256
service 257
template 256
testing 257, 258
ember asset-sizes 35, 36
Ember Bootstrap
about 102, 103
built-in components 103
ember build 34, 35
Ember CLI
about 25
app folder 37
commands 36
config folder 38
.ember-cli 40
ember-cli-build.js 38
functionalities 28
installation 26-28
node_modules 40
package.json 39
public folder 39
README file 37
source maps 38, 39
testem.js 39
tests folder 39
yarn.lock 39, 40
Ember-CLI
configuring 153, 154
ember-cli-build.js 38
ember-cli-deploy plugin 237
ember-cli-deploy-s3 is a plugin 243
ember-cli-deprecation-workflow 159
Ember CLI Mirage structure
about 119
components 120
Ember Command Line Interface (Ember-CLI)
about 255, 256
functionalities 255
Ember Data
about 114
advantages 123, 124
functionalities 114
EmberData 18
ember destroy 31, 32
Ember favicon
displaying 218
Ember framework
features 162
life-cycle feature 162
runtime feature, enabling 163
ember generate 30, 31
ember init 30
Ember Inspector
about 217
installation 217
installing, in Bookmarklet Application 219
installing, in Firefox 219
installing, in Google Chrome 217, 218
installing, in mobile devices 219
ember install 30
Ember.js
about 15, 16, 254
application architecture 254, 255
best practices 263
contributing 263, 264
Convention over Configuration design flow 254
history 15, 16
key features 16
Ember.js application anatomy
about 17
addons 21
architecture 20, 21
components 19
controllers 19
models 18
route handler 18
router 17
services 19
templates 18
tests 21
Ember.js, features
component-service framework 17
convention over configuration 16
two-way data binding 17
Ember Models
about 114, 115
default values 116
getter functions 116, 117
transforms 117, 118
ember new 29
Ember routes
linking between 50, 51
setting up 49, 50
ember serve
about 32, 33
remote access 33
watchman 33
Ember Services
about 143, 144
configuring 144-146
generating 144
Ember Store
about 125
injecting 126
ember test 34
Ember testing tools
about 178
QUnit 178
tests, creating 180, 181
tests, running 178, 179
ember-truth-helpers 97, 98
error event 68, 69
error substate 67
event handling 7, 8
F
Firefox
used, for installing Ember Inspector 219
Flux pattern 13
frontend
about 3
Cascading Style Sheets (CSS) 3
Hypertext Markup Language (HTML) 3
JavaScript 3
frontend applications
about 9
client-side rendering (CSR) 9
server-side rendering (SSR) 11
Single-Page Application (SPA) 9
frontend frameworks
about 13
Angular 14
Backbone.js 15
Next.js 14
React 13, 14
Vue.js 14
functionalities, Ember CLI
ember addon 29, 30
ember asset-sizes 35, 36
ember build 34, 35
ember destroy 31, 32
ember generate 30, 31
ember init 30
ember install 30
ember new 29
ember serve 32, 33
ember test 34
function coverage 189
G
GCP deployment
about 243
bucket, creating 243
ember-cli-deploy-gcloud-storage 245, 246
programmatic user, creating 245
public access, enabling 244
static website hosting, enabling 244
Glass Box Testing 177
global helper 96
Google Chrome
used, for installing Ember Inspector 217, 218
Google Cloud Storage (GCS) 243
gray box testing 177
H
hash helper 94
helper functions
about 93
built-in helpers 93
ember-truth-helpers 97, 98
named arguments 96, 97
nested helper 96
textarea helper, creating 95
helpers template 76
HTML attributes 81, 82
Hypertext Markup Language (HTML) 3
I
id attribute 6
if conditions 85, 86
inline if 88-90
input helper 94, 95
J
JavaScript
about 3, 4
Document Object Model (DOM) 4
JQuery 8, 9
JQuery 8, 9
K
keyword arguments 96
L
Latest Stable Version (LTS) 260
let helper 94
line coverage 190
LinkTo 72
loading event 66
loading substate 65, 66
local helper 95
loop
about 90
empty lists 91
index 91
objects, iterating 91-93
M
manual testing
about 176, 177
black box testing 177
gray box testing 177
white box testing 177
metadata
handling 129, 130
Mirage
setting up 210
mobile devices
used, for installing Ember Inspector 219
model relationships
belongsTo 135, 136
handling 135
hasMany 137
inverse 137
models 18
Model Template Controller (MTC) 255
Model-View-Controller pattern 14
model-view-viewmodel pattern 15
N
named arguments 96, 97
nested helper 96
nested routes
about 51-54
dynamic segment 54, 55
Next.js 14
node_modules 40
Node Version Manager (NVM) 26
O
Object Inspector
about 221, 222
console, sending to inspector 224
navigation, through objects 224
objects, sending to console 223
Object-Relational mapping (ORM) 125
optional features
about 163-165
application-template-wrapper 164
jquery-integration 164
P
package.json 39
pauseTest function 184
performance monitoring 230
Promise
about 63
fullfilled state 63
pending state 63
rejected state 63
Promises
debugging 230, 231
tracing 231
prototype extensions
about 154, 155
alternatives 157
array immutable, making 156
disabling 156, 157
immutability, advantages 155
immutability, disadvantages 155
public folder 39
Q
query parameters
about 70-72
LinkTo 72
routing 72
transitionTo 72
QUnit 178
R
React 13, 14
read and filter records
about 126
hash 130, 131
objects, fetching 126-128
objects, filtering 128, 129
specific record, fetching 130
README file 37
records
creating 131
deleteRecord function 134
deleting 134
unloadAll function 135
unloadRecord function 134
updating 132
redirect hook 62
remote access 33
rendering testing 187, 188
resetController hook 62
robots.txt
about 166
configuring, for environment 168, 169
scenarios 167
syntax 166
root element 161
root URL 161, 162
route handler 18, 48
route hooks
about 57
activate hook 58
afterModel hook 59
beforeModel hook 58, 59
deactivate hook 58
didTransition hook 61
redirect hook 62
resetController hook 62
setupController hook 60
willTransition hook 61
route model 56, 57
router 17, 48
routes inspection
about 227
hide substates 228
read only 228
search bar 227
routing 47-49
S
Sassy CSS (SCSS) 41
serializers
about 141
attribute name mapping 143
example 141
identifier 142
normalizeResponse function 142
server side 3
server-side rendering (SSR)
about 11
advantages 12
disadvantages 12
services 19
setupController hook 60
Single-Page Application (SPA)
about 1, 9, 10
advantages 10
disadvantages 10, 11
socket service 19
source maps 38, 39
SproutCore 15
SproutCore2.0 15
statement coverage 190
Static Site Generation (SSG)
about 12
advantages 12, 13
disadvantages 13
stubbing
about 199
functions 200
objects 200
services 201, 202
styling 40
Syntactically Awesome Style Sheets (SASS) 42, 43
system testing 209
T
tag name attribute 7
target build 165, 166
templates
about 18, 82
comments 82
HTML directly 83, 84
{{outlet}} tag 84
{{yield}} tag 85
testem.js 39
testing
about 175
advantages 175, 176
manual testing 176
testing components
about 202
actions, testing 204
DOM attributes, testing 202, 203
user interactions, testing 203
testing controllers 205, 206
testing helpers 206
testing levels
about 185
application testing 188, 189
rendering testing 187, 188
unit testing 185, 186
testing models
about 207
default values 207
model functions 208
relationships 208, 209
testing routes 206, 207
tests 21
tests debugging
about 183, 184
pauseTest function 184
test selectors 182, 183
tests filtering
about 181, 182
filter 182
module 182
tests folder 39
tests interface 179
textarea helper
about 94, 95
creating 95
Tomster 15
tooltip 108
tracked properties 98
tracking changes 133, 134
Transparent Testing 177
troubleshooting
about 232
Ember Inspector detection 232, 233
Promises detection 233
two-way data binding 17, 255
U
unit testing
about 185-197
benefits 185
object methods 198, 199
skip tests 199
stubbing 199
tracked properties 197, 198
unless condition 88
unloadAll function 135
unloadRecord function 134
URL types 160
V
version info
about 220
app config 220, 221
Vue.js 14
W
watchman 33
web applications
versus websites 2
Web Crawlers 166
web development
backend/server side 3, 4
defining 2, 3
frontend/client side 3
overview 2
websites
versus web applications 2
white box testing 177
willTransition hook 61
Y
yarn.lock 39, 40
Yet Another Resource Negotiator (YARN) 27