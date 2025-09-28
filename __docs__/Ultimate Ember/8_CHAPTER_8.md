# 8 CHAPTER 8 Ember Inspector

 
towards production readiness, which is to ensure the application is scalable and does not have memory issues when navigating between routes or keeping the application
loaded for a long time in the browser.


Ember Inspector is a very useful tool provided by the
framework to debug and keep track of the running state of
the application. We will explore the tool in detail in this
chapter. We will look at how you can install the application,
look at the object inspector to view individual data present in
the application and how you can inspect each module of the
application. This tool is necessary for you to track the
memory and data usage of your application and ensure it
does not spiral out of control in any case. This helps you
track memory leaks in the system that can cause the page
to hang in the browser.


Structure
The following topics will be discussed in this chapter:
Introduction to Ember Inspector
Installation
Version Info
Object Inspector
Component Tree
Inspecting Routes
Inspecting Data
Performance Monitoring
Debug Promises
Handling Deprecations
Troubleshooting
Introduction to Ember Inspector
Ember Inspector is a browser add-on that allows you to
inspect and read information about an Ember application,
and look at the routes, components and data loaded in the
browser at a particular time. It helps you visually understand
the application better and easily debug the application in the
runtime. Ember Inspector is used for the following cases:
Visually map out the routes in the application
View the data loaded in the Ember store at any time
View the status of promises
Monitor the application for performance issues and
detect memory leaks
Installation
Ember Inspector is available as a browser extension for
Firefox and Google Chrome. For other browsers, you can
install it directly through a bookmarklet application. Let us
look at the installation steps:
Google Chrome
The Chrome extension of Ember Inspector is available at the
following
link:
https://chrome.google.com/webstore/detail/ember-
inspector/bmdblncegkenkacieihfhpjfppoconhi
Figure 8.1: Ember Inspector Chrome
You can click the Add to Chrome link to install the inspector in
your browser. Once installed, you can now see the inspector
by opening the developer tools. There you will see a new tab
named Ember now, as shown in the following figure:
Figure 8.2: Ember Inspector Tab
Display Ember Favicon
In order to be alerted when you are visiting a website that
uses Ember, you can enable an option in Ember Inspector to
display the ember favicon on such sites. You can do so by
visiting chrome://extensions in your browser, selecting Details
on Ember Inspector and clicking Extension Options. It will open
a popup with an option to enable the favicon:
Figure 8.3: Ember Inspector favicon
Once enabled, you can see an Ember favicon as illustrated in
Figure 8.3. The favicon is grayed out by default and
whenever you visit a website that uses Ember, the favicon
lights up to notify the same.


Firefox
Firefox
extension
can
be
found
here
-
https://addons.mozilla.org/en-US/firefox/addon/ember-
inspector/
Figure 8.4: Ember Inspector Firefox
Once installed, the Ember tab will be available in developer
tools similar to Chrome. You can also enable the favicon in
the URL bar by visiting
about:addons, selecting Ember
Inspector in the Extensions list and enabling the checkbox for
Display the Ember Favicon.


Bookmarklet Application
For browsers other than Chrome and Firefox, the Ember
Inspector is easily accessible via a URL, which can be
bookmarked in your browser. You can visit the extension
using
the
following
URL:
https://ember-
extension.s3.amazonaws.com/dist_bookmarklet/panes-3-16-
0/index.html?
inspectedWindowURL=https://guides.emberjs.com
This will load the Ember Inspector in a separate browser tab.


Mobile Devices
When testing your application on mobile devices, you might
want to inspect the elements there and detect issues. Ember
Inspector is available for that as well, through an addon:
https://github.com/joostdevries/ember-cli-remote-inspector
Once the addon is installed, you can open the inspector in
any browser by visiting http://localhost:30820 and then open
the application through the default http://localhost:4200 in
any other browser/mobile device to see the remote inspector
in action.


Version Info
The first thing you can see in the Ember Inspector is the list
of versions used in the project. The version of Ember, Ember-
CLI, Ember Data and other dependencies used in the project.


You can see this information by visiting the Info tab in the
Inspector. Here is how it will look for our project:
Figure 8.5: Version Info
You can see that along with the list of addons, you also see
our project name on the list. It is because by default we use
the ember-cli-app-version addon, which adds the current
project and version details found in the package.json file on
this list.


App Config
Along with the version details, the Inspector also reveals
some configuration values we have set up for the project.


Figure 8.6: App Config
Even though this information can be retrieved through
general debugging or inspecting the code, Ember Inspector
compiles and tabularizes important information to be easily
checked when someone is debugging the application. Figure
8.6 shows what you can see by clicking the App Config sub-
tab in the Info tab.


You can see that important configuration information like
Environment Variables, APP config, the root URL, and so on
can be seen from this tab itself.


Object Inspector
The Object Inspector provides detailed information on each
object we have in our application. The Object inspector can
be loaded by clicking the Container tab in the Inspector. This
will give you an overall list of objects present in the
application, as follows:
Figure 8.7: Object Inspector
You can see from this list the different types of objects and
the number of objects we have created/used in our
application for each type. If you click any type, you can see
the list of objects we have in this type. For example, in
Figure 8.7, we can see that our application has seven
controllers and the names of the individual controllers. When
you click an individual object, you will see the list of
properties defined in the object and the list of actions and
functions defined in the object. Here is how it looks when you
click the clients/index controller:
Figure 8.8: Object Inspector Detail
The inspector not only shows properties defined inside the
object but also the attributes inherited from the parents. You
can also see the value of each property (both inherited and
defined). The values displayed in the Inspector are
consistent with the values present in the application. So, if
the value of any attribute changes after you load the
inspector, the value will be updated in the Inspector then
and there. The binding is also two-way. Meaning, you can
click any string value to edit the value of a particular
attribute. The changes will be immediately reflected in the
application.


We can see that the items are grouped by their types (Own
Properties, Action Handler, Constructor, ActionHandler, and so
on). Each property/item defined in this list will be prefixed
with an icon and a letter notation defining the type of
notation. You can hover over the icon to see more details on
what it denotes. Here are some notations:
P - Property
F - Function
T - Tracked Property
G - Getter function
Sending Objects to Console
Sometimes it would be easier to inspect the object in the
console rather than seeing it in the Inspector. Inspecting it on
the console will allow you to drill down on the options to
multiple levels at the same time. To make that process
easier, we can ask the Ember Inspector to send an entire
dump of the selected object to the console. You can do that
by clicking the >$E icon you see on the top right of the Object
Inspector:
Figure 8.9: Send to Console
If you send the clients/index controller to the console, here is
what the object will look like when you go to the Console tab:
Figure 8.10: Console Dump of Data
You can see all the information provided in the Inspector,
with the additional capability of interacting with the object
and viewing values at multiple levels at the same time.


Instead of dumping the entire object in the console, you can
also send individual properties or functions to the console by
clicking the >$E icon appearing when you hover over a
particular element. By sending individual functions to the
console, you can see the source code of the functions.


Console to Inspector
Similar to sending objects from Inspector to the Console, you
can also add new objects to the Inspector from the Console.


You can use the EmberInspector.inspect function to send the
object to the inspector:
let obj = Ember.objects.create({‘test’: true})
EmberInspector.inspect(obj)
Navigating through Objects
Along with viewing the values of each property/attribute,
complex Ember object values can be inspected further by
clicking them. For example, the model of a controller/route
will contain either a single model object or a list of model
objects. When you click one of those objects, Ember
Inspector will automatically open the particular model object
in the Object Inspector for you to debug/change the values
of the model object in the runtime. There is also a back array
(<) provided on the top left of the Object Inspector that
allows you to go back to the previous object that you were
viewing.


Component Tree
The Component Tree section provides a view of the Ember
components that are loaded into the application at the
moment. This provides a tree view similar to what we see in
the Elements tab of the Developer Tools, but the tree is made
up of Ember components present in the application instead
of normal HTML tags. You can view the tree by clicking the
Components tab of the Inspector. Here is how the tree looks for
our application’s index page:
Figure 8.11: Component Tree
In this tree, you can see the hierarchy of Components
present in the application, along with details on which route
calls this component, so that it is easy for us to find the code
and debug. From this figure, we can see that the navigation
components are called from the application route that is
common for all the routes, and the index route contains only
the click-tracker component. You can click any component to
see the Object Inspector for that particular component. You
can use this to dynamically change the values of attributes
in the component and test different scenarios instead of
making changes to the code or performing the test steps
multiple times. Here are some functionalities present in this
part of the Inspector:
View Component
When you hover over each component in this tree, you will
see two icons. One of an eye and the other representing
code (</>).


Figure 8.12: View Component
The eye icon will scroll to make the selected component
visible. So, if you do not know where the particular
component appears on the page (if there are CSS issues and
you cannot see the component on screen), this icon will
scroll the component to the visible section of the DOM and
highlight it, making it easy for us to identify.


The code icon (</>) does the same, but opens the root HTML
element for the particular component in the Elements tab. This
will be used to identify the parsed HTML code for any given
component.


Search Components
When the page grows larger in size, it might be cluttered
with a lot of Components and it would become difficult for us
to locate a specific Component in our tree. You can easily
find out the component you are looking for by searching the
Component by its name in the search bar present in the
Component Tree module:
Figure 8.13: Component Tree Search
Locate the Component of an Element
Sometimes you might see an element in the DOM which you
do not recognize or want to inspect the particular
Component that this element belongs to. You can use the
arrow icon present on top of the Component tree to do that.


Figure 8.14: Locate Component
Once you click this option, you can then go around the DOM
and hover on any element in the DOM to see the
corresponding Component highlighted in the Component
Tree. You can click any element to select the Component in
the Tree. This method makes it easier to locate a Component
in the tree compared to searching and finding it.


You can also use the arrow icons seen in Figure 8.14 to
collapse and uncollapse the tree.


Inspecting Routes
The Routes tab provides a detailed list of Routes configured
in the application along with their hierarchy. Here is what the
content looks like:
Figure 8.15: Routes
You can see the list of all routes we have in the application,
along with the loading and error substates of each route. You
can also see a hierarchy of the children of each route clearly.


In the second column of this table, you can see two links -
Route and Controller. Clicking any of those links will open the
particular Route or Controller associated with that Route in
the Object Inspector. Ember Inspector also provides the >$E
icon to dump the state of any object into the console. The
URL associated with the particular route can be seen in the
third column of the table.


Let us take a look at some of the options we have in this tab:
Search Bar
The Search Bar can be used to locate any Route by searching
for its name. This will be useful when the application grows
large and scrolling through the list to find a specific route
becomes difficult.


Current Route Only
In the normal view, you can see that the Current Route that
is loaded in the application is highlighted with a blue
background. The Current Route only checkbox hides all other
routes and displays only the Route that is loaded in the
application, along with its parents.


Hide Substates
By default, you can see the loading and error substates as
individual entries in the Routes table. The Inspector provides
a specific option to hide these substates so that you can see
only individual routes and not the substates.


Inspecting Data
You can notice that in the Container tab, we could see
Controllers, Adapters, Routes, Services and even Transforms,
but not Models. This is because the Models and their data
are shown specifically in a separate tab in the Inspector. You
can see that in the Data tab of the Inspector. The Data tab
shows the list of models for which records are loaded into the
store, along with the number of records of each model type
that have been loaded.


When you load the clients-index route, you can see the Data
tab contains two objects of the client model:
Figure 8.16: Data tab Models list
When clicking each model type, it will open a table with the
list of objects that are loaded for the selected model type.


This table will provide the value of each object for every
column the model contains.


Figure 8.17: Data tab Model Objects
You can click any row and it will open the particular Model
Object in the Object Inspector. From the Object Inspector you
can edit any property and the same will be reflected on the
screen immediately.


Filters
The Data tab provides four filter options to view Model
Objects based on their current state in the store. Here are
the filters:
All: View all the records in the store for this Model.


New: View records that were created in the store, but
not pushed to the API yet.


Modified: View records that are present in both the
Store and API, but were modified after the last push/after
last loaded from the API. This will show the list of records
whose values are different from what was last synced
from the store.


Clean: View records that are up to date with the store
and have no modifications.


Inspect Store
The Data tab has a button on top for Inspecting the Store.


Clicking this button will open the Store service in the Object
Inspector. This can be used to see the different functions and
customizations we have done to the Store service. The Store
service can also be located in the Services section of the
Container tab.


Performance Monitoring
An important functionality of the Ember Inspector is to allow
the developers to debug and figure out the performance
timings of each Route/Component. When the application
becomes larger, the page load times are bound to increase
due to loading and interaction between Components and so
on. This section of the Inspector helps you see the time
taken for each route to load. Through this, we can identify
the sections of the page that cause delays in loading the
page and reduce the delays or inefficiencies in the particular
component.


Figure 8.18: Rendering Performance
From the Render Performance section, you can see the list of
Components and the time taken for each of them to load.


The clients/table and clients/row Components do not have a
time shown for them as they are too negligible.


There are two buttons on this panel along with the default
search bar. The clear button can be used to clear the existing
logs you see, and the reload button will trigger and track
load times of Components at the application boot time. Do
note that tracking the performance using the Ember
Inspector itself will create a small delay in code execution, so
these numbers are not an exact representation of the
rendering times in the production setup. But you can use
these numbers to compare the rendering times and find out
the bottlenecks involved in the load process. Components
taking a long time to load because of making multiple
unnecessary API calls, the same Component being called
multiple times, or memory leaks in a Component are
scenarios that can be found using the Performance section of
the Inspector.


Debug Promises
We have seen how Promises are used in the Ember
application when making API calls through the store or for
services that have external API interactions. The Promises
tab in the Inspector lists all the Promises created in the
application and the state of each of them. You can see the
details of the state of the promise, the resolved value, the
time it took to resolve/error out and so on.


Figure 8.19: Promises
As you can see from this image, you can filter the Promises
based on the following states:
Fulfilled
Pending
Rejected
If the fulfilled value of a Promise is an Ember object (like a
model) or an Array of Ember objects, the values are
displayed in this tab and you can open those objects in the
Object Inspector to understand the values returned by the
Promise. When a promise fails, you can find an option to
send the error stack trace to the console as well, to debug
why the Promise was rejected.


Trace Promises
You can see a checkbox on top that says Trace Promises. This
can be used to keep track of the stack trace of each Promise
made from the application and through the Trace link you see
in each row, the stack trace/call trace of the particular
Promise will be printed to the console for us to exactly
identify where the particular Promise was generated from.


Handling Deprecations
Earlier we discussed what Deprecations are and how you can
handle and resolve them in your Ember application. Ember
Inspector also provides options for viewing the Deprecations,
locate them and provide links to Transition plans that can be
used to fix the deprecation.


The Deprecations tab in the Inspector has a count denoting
the number of existing Deprecations in this application.


Clicking it will list all the deprecations in the application:
Figure 8.20: Deprecations
When you have Source Maps enabled in your application,
this list will provide links to the exact places where this
Deprecation is used. You can use these to locate your
deprecations and fix them. The Inspector also provides an
external link when clicking the Transition Plan, which will
take you to the particular deprecations’ documentation that
contains the steps to fix the deprecation.


Troubleshooting
When opening Ember Inspector in existing applications, the
Inspector may not load for these applications for some
reason. Let us look at a few of them:
Ember Application Not Detected
This is a common error you see when loading the Inspector
for older Ember applications. The Ember Inspector may not
be able to detect your Ember application for a few reasons:
The URL you have visited does not use Ember at all.


The application uses a very old Ember version, not
compatible with the current version of your inspector.


The Ember application is sandboxed or embedded into
another URL.


You are using a protocol other than HTTP/HTTPS to load
the application (like opening the HTML file directly).


In those cases, you will see the following error in the
Inspector page:
Figure 8.21: Ember application not detected
Promises not detected/Missing
Sometimes, Promises that were created before the inspector
was loaded will not be visible. So you might see some
Promises missing from the logs. A simple click of the reload
button will usually fix the error and load all Promises. But
sometimes, there can be an error with loading the Promises
in the Inspector itself. This could be because of using a very
old Ember version, as Promise tracking was added only in
Ember versions greater than 1.3.


Conclusion
In this chapter, we learnt in detail about Ember Inspector. We
discussed the uses of Ember Inspector, the installation
process and the options available in it. First, we saw how to
view the versions of libraries used in the project and a list of
configuration values supplied for this build. Then we looked
at inspecting individual objects, how you can look at the
values of each variable in the object and so on. We then
looked in detail about the Object Inspector, how you can edit
values of an object in the runtime and see it reflected on the
screen immediately.


Then we viewed the workings of the Component Tree and
how it can be used to locate and drill through Components
that are rendered on the current page, and how you can
search for components and inspect the Components for
values stored in them. We then saw the Routes tab that
shows all the routes in the application and how we can filter
only the route that is currently loaded along with its parents.


Next, we saw how you can look at the model records loaded
in the store, inspect them and change their values in
runtime. We also looked at understanding the rendering
performance of the application and how the numbers can be
used to make the application more efficient. After this, we
saw how we could handle Deprecations through the
Inspector and finally saw a couple of commonly occurring
errors and ways to solve them.


In the next chapter, we will discuss deploying the application
to different cloud storage providers and making our
application live.


Points to Remember
Ember Inspector helps debug and improve the efficiency
of the application
You can find a comprehensive list of all objects defined
in the application
Ember Inspector provides a two-way binding on the
values of every attribute defined in any object of our
application
The Component Tree provides a tree structure of the
Components loaded on the current page
You can see the individual model records loaded in the
store and edit them in real-time through the Inspector
The inspector provides options to handle Deprecations
introduced into the application
Multiple Choice Questions
1. Which of the following is Ember Inspector used for?
a. View Routes in the application
b. View Components loaded for the current Route
c. View Model objects loaded into the store
d. All of the above
2. Which of these browsers does not have a dedicated
extension for Ember Inspector?
a. Chrome
b. Firefox
c. Safari
d. None of the above
3. Which of the following is a valid filter option for an
Ember model?
a. New
b. Fulfilled
c. Modified
d. Clean
4. Ember Inspector provides options for viewing data from
resolved Promises.


a. True
b. False
Answers
1. d
2. c
3. b
4. a
Questions
1. What is the purpose of Ember Inspector and how is it
different from the default debugger in the browser?
2. How do you load the Ember Inspector in browsers other
than Chrome or Firefox?
3. What are the steps to figure out slow loading
Components in the application?