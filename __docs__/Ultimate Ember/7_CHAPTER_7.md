# 7 CHAPTER 7 Testing Ember.js Applications

writing tests for our application to make it robust and secure. 

We will look at writing tests for individual modules in Ember like Routes, Models, Helpers and Components. 
This will ensure that every line of code written by us is tested and secure.


automated way to ensure every part of our application works as expected. 
The more your application grows, the more difficult it becomes to track changes and ensure all the connected components still work as expected.

Testing allows us to find out issues as and when they are introduced into the system, instead of going through multiple levels of reviews and merges and complicating the process of fixing them.

Test cases implicitly serve as documentation on how the application is expected to work. 
Detailed comments and descriptions in the test cases make it easy for the transfer of knowledge to new people joining the organization/project.

## Black Box Testing
the tester does not have any knowledge of the underlying code of the application that is being tested. 
The tester simply provides a certain input to the application and verifies the output is received as expected. 
The way the application reacts to edge cases is also tested. 
For example, what happens when the values provided are outside the allowed range? How does the application react in case of missing data? and so on.

## White Box Testing
white box testing requires an awareness of the internal structure and workflow of the application. The tester has access to the source code and creates test cases based on the code. This method requires test cases to be written in the form of code. It is also called Glass Box Testing or Transparent Testing. It can be started early in the software development cycle, as it tests the code execution directly without the need for an interface that is required for black box testing.

Through this method, testers can find bugs and provide feedback on the internal code flow rather than just what the user sees on the screen. Viewing the source code means the tester can easily provide detailed test cases that cover the different code paths. However, it is a bit laborious to maintain, as these test cases have to be rewritten to accommodate even small changes in the code base.

## Gray Box Testing
Gray Box Testing is a combination of black box testing and
white box testing to overcome the disadvantages of both
methods. In gray box testing, the tester does not have full
knowledge of the internal structure of the system, but they
have partial access and awareness of the internals of the
application. An example can be, you can test that an
authenticated page is not accessible to unauthenticated
users. This requires some knowledge of the system to access
the URL without clicking through the links in the application,
but the tester does not know how the internals work to check
if the user is authenticated.

# Testing Tools in Ember
Ember being a self-sufficient framework in many senses, offers a wide variety of tools for automating your testing process. It also provides an easy way to integrate the testing in your Continuous Integration process to ensure all builds
are tested and bug-free before they are merged.

# QUnit
QUnit is a JavaScript testing framework that is part of every Ember application by default. 
Ember also includes a wrapper for QUnit named QUnitDOM that helps create tests that are readable and user-friendly. Powered with QUnitDOM, you can write tests in Ember that are easy to understand and serve as documentation for reference when trying to learn the expected behavior of a feature.

For example, if we want to check a DOM element has a particular class associated with it, the following is the code in
QUnit:
```ts

assert.ok(button.classList.contains("my-class"));
```
The same functionality can be written in QUnitDOM as follows:
```ts

assert.dom(button).hasClass("my-class");
```

Based on this, we can see that QUnitDOM provides a wrapper that makes test cases more readable.

## Running Tests in Ember
There are two ways to run tests in Ember. The first option is to run tests once. We have seen this command when we discussed the list of commands in Ember-CLI:
```shell

ember test
  
ember test --server
```

Passing the --server command listens for changes to the file and restarts the test server on each change.

# Tests interface
Another way to run tests is to visit the URL http://localhost:4200/tests while running the server. This will load the test suite and run the tests once. You will receive feedback on the tests that failed. 

# Creating Tests in Ember
By default, whenever we create any object in Ember through
blueprints, it automatically adds a test file for the object
inside the tests folder of the project. Currently, the tests
folder would look something like Figure 7.2.


From the example, you can see we have a test file inside the
unit folder for each object we've created in our project. Also,
you can see another folder called integration containing tests
for each component and helper. We will discuss what unit
and integration are later in this chapter.


Figure 7.2: tests folder
Apart from this, Ember still provides additional blueprints to
generate the test files for each object. Here are some
examples of the blueprints:
ember generate model-test client
ember generate route-test about
ember generate acceptance-test clients
Filtering Tests
We saw options earlier to run tests using the --server option
to listen for changes and run tests. In those cases, we will
not want to run the entire test suite on each change, as it
will be time-consuming. We will want to run specific tests
that relate to the changes we are making to the application.


Before looking into how you can run specific tests, let us look
at what a sample test looks like. Let us open an existing test
file, the tests/integration/components/click-tracker-test.js file.


The default test generated for the component would look like
this:
module('Integration | Component | click-tracker', function
(hooks) {
setupRenderingTest(hooks);
test('it renders', async function (assert) {
// Set any properties with this.set('myProperty', 'value');
// Handle any actions with this.set('myAction',
function(val) { ... });
await render(hbs`<ClickTracker />`);
assert.dom(this.element).hasText('');
// Template block usage:
await render(hbs`
<ClickTracker>
template block text
</ClickTracker>
`);
assert.dom(this.element).hasText('template block text');
});
});
The test has two simple steps. In the first step, it renders the
component and asserts that it renders without any error. The
second time, it renders the component as a block with a
sample text in between and checks if the sample text is
rendered inside the component.


If you look at the top of this test, there are two things that
are used to classify tests and allow us to filter them. Here is
how you can use them:
module
The first classification is based on the module() specification
that we see. The module for this test has been specified as
Integration | Component | click-tracker. Inside this module,
there are multiple tests we can define. So if we want to run
this group of tests, we can use the module filter as follows:
ember test --module="Integration | Component | click-tracker"
ember t -m="Integration | Component | click-tracker"
Adding this filter will run only the set of tests defined within
this particular module.


filter
The second method for filtering and matching uses the test()
or module() tag. You can see the value for this test to be it
renders. The test filter is more efficient as it allows filtering
via substring. For example, if you want to run just all the
Component tests, we can do so by the following command:
ember test --filter="Component"
ember t -f="Component"
This
will
filter
tests
across
modules
and
run
only
modules/tests
that
match
the
phrase.


An
additional
functionality is to exclude certain tests based on the module
name or test name. For example, to run all tests except for
model tests, you can do as follows:
ember test --filter="!Model"
Test Selectors
In tests, we will want to grab certain DOM elements on a
page in order to perform checks on those elements. Just like
the normal element selectors we saw in the earlier chapters,
we can pull DOM elements using jQuery selectors in Ember
tests as well. By installing the ember-test-selectors addon
Ember
tests
have
functions
like
querySelector
and
querySelectorAll to select DOM elements. In order to select all
elements by a particular class, here is an example:
this.element.querySelectorAll(".my-class")
Or
this.element.querySelector("#myElementById");
Using this addon, you can use test attributes in your
template code by prefixing the attributes with data-test and
using the querySelector function to filter elements based on
the test attribute. The addon ensures that the test attributes
are ignored when generating a production build. It is
recommended to use data-test attributes instead of CSS
selectors in Ember tests, as CSS selectors are bound to
change frequently based on how the classes are mapped in
your application. That will require your selectors to be
rewritten. However, the data-test attributes are constant and
need not change based on other dependencies.


Debug your tests
When running your tests, you will face a lot of errors or cases
where they do not work as expected. In those cases, we
need to find the problem and make changes accordingly to
fix the issue. You can add debugger to any line in your test or
application code. When the code reaches this line, it will
pause the execution on that line, allowing you to check the
state of each variable to understand where the test fails.


For
example,
let
us
add
a
debugger
to
the
routes/clients/index.js file inside the model hook. It will look
like this:
model(params) {
debugger;
return this.store.query('client', {});
}
To test this, you can go to the application, open the
developer tools by doing a Right Click > Inspect on the page
and then click the Clients tab. This will load the clients route
and call the model hook, thus triggering the debugger. Your
screen will pause and look like this:
Figure 7.3: Debugger
You can see the code execution pausing at the place where
we have added the debugger. At this point, we can look at
the state of each variable in the memory now, execute
functions, see the response, and so on. You can do that by
going to the Console tab and typing your commands. Let us
see what the params variable contains. Just type params in
the console and press enter. You will see the output as
follows:
Figure 7.4: Console
pauseTest
Another option specific to Ember tests is to use the pauseTest
function. It can be used only in test code and once you add
await pauseTest(); to your test, the code pauses when it
reaches this line, very similar to the debugger. Once you are
done inspecting the variables, you can enter resumeTest() in
the console and the test continues further.


Levels of Testing
Inside the tests folder, you can see three sub-folders. Each of
the subfolders contains tests of each level. We need different
levels of testing to ensure all the use cases and code flows
are covered in the test flow and the application is bug-free.


The levels differ based on what part of the application they
concentrate on, their scope of testing, whether they depend
on the application being rendered for executing the test, how
fast they execute and so on.


Here is a chart of the different levels of testing commonly
used in Ember and their hierarchy of execution. We will look
at each of them in detail:
Figure 7.5: Levels of Testing
Unit Tests
Unit testing is the basic level of testing individual parts of
your application. It will help validate the correctness of
individual objects or functions without interference from
other objects in the system. Unit tests are made on the
smallest testable parts of the system. This will ensure the
small parts of the application work as expected. The
following are the benefits of unit testing:
Unit tests are isolated and focus on individual functions.


It is easy to debug failures as we can zero it down to the
exact object.


Unit tests allow testing small logics that cannot be
tested in big-picture application-level tests.


Unit tests do not require the application to fully render.


Hence, they are pretty fast.


Since unit tests are fast, we write test cases for each and
every branching in the code or every scenario that the code
is custom-written for. Once we provide 100% code coverage
for all the code in these objects, we can be sure that the
objects work perfectly as per the requirements and certify
the individual objects as bug-free. It also helps us find issues
early in the development process, as we can easily narrow
down the place and the cause for any issue occurring in the
system, as the test cases are written for a specific object and
not for the entire application.


The individual test cases will also serve as documentation to
understand the various cases handled by this application.


This also provides confidence that any change to these
objects that affects an existing functionality will immediately
be flagged by the failure of the corresponding test cases.


Based on the contents of the unit folder in the project, we
can understand that we usually write unit test cases for
adapters, controllers, models, routes, serializers, services, and
transforms. We do not need to render the application or the
template to test these objects. Hence, they fall under the
unit test category.


If you look at any of the existing unit test files, let us say the
tests/unit/services/user-report-test.js file, you can see the
following content:
module('Unit | Service | user-reports', function (hooks) {
setupTest(hooks);
// TODO: Replace this with your real tests.


test('it exists', function (assert) {
let service = this.owner.lookup('service:user-reports');
assert.ok(service);
});
});
If you look at the contents, the first line below the module
declaration - setupTest(hooks);. This line can be found in all
unit test files. This line allows us to use certain functionalities
in the tests like dependency injection. If you look at the first
line inside the test.


let service = this.owner.lookup('service:user-reports');
This line fetches the user-reports service to be used in the
test. This lookup functionality is enabled by calling the
setupTest
function.


This
also
enables
the
pauseTest
functionality we saw earlier.


Rendering Tests
The next level of tests is the rendering test (Integration test).


Rendering tests are not restricted to a single object but a
combination of objects or components and require some
amount of rendering for them to be tested. Unit tests are
required to ensure that the objects are individually working
as expected. But we also need to ensure that the modules
work properly when interacting with each other as well.


Rendering tests focus on validating the interactions between
different modules and components and verifying that they
work as per expectations. So once all objects are unit tested,
we run rendering tests to verify that the objects work as
expected when interacting with other objects present in the
system as well.


From the existing tests/integration folder, we can see that
helpers and components have rendering tests. This is
because helpers and components can be tested only by
rendering them on the screen. Hence, integration tests are
also called Rendering Tests. These tests simulate the
rendering of components similar to how they render in the
real application, including all the life cycle hooks of the
component. You can pass different variables and functions to
the component just like you do from inside the application
and verify the output.


Similar to how we have setupTest() in the unit tests, you can
see a function call to setupRenderingTest();. This function calls
setupTests() internally. On top of that, it sets up the rendering
engine and allows us to interact with the DOM that is
generated. Through this, you can access the DOM using the
this.element
attribute.


Let
us
check
the
tests/integration/components/count-button-test.js
file
for
example here:
module('Integration | Component | count-button', function
(hooks) {
setupRenderingTest(hooks);
test('it renders', async function (assert) {
// Set any properties with this.set('myProperty', 'value');
// Handle any actions with this.set('myAction',
function(val) { ... });
await render(hbs`<CountButton />`);
assert.dom(this.element).hasText('');
// Template block usage:
await render(hbs`
<CountButton>
template block text
</CountButton>
`);
assert.dom(this.element).hasText('template block text');
});
});
From
the
preceding
example,
we
can
see
the
setupRenderingTest() function being called at the beginning
and the usage of this.element to access the rendered DOM
element.


Application Tests
Application tests are the highest level of testing, where the
tests simulate the actual loading of the application through
routes, triggering all the hooks of the particular route. These
tests are very close to the end-user experience. For example,
you can visit a URL, and verify that it redirects you to the
login page if the user is not authenticated. Then you can fill
out the login information and then go back to the first URL
and verify we are able to see the contents of the page now.


You can also use application tests to verify that the loading
and error substates work as expected.


Though rendering tests test the interactions between
different components, they do not test the full cycle of
loading the entire application and loading multiple unrelated
components as part of the page. The application tests, also
named System Tests do that and make sure the end user does
not face any issues when using the application. For that
reason, it is slower compared to unit or rendering tests.


You can see from the existing tests folder that acceptance
tests are not created by default. It is usual behavior to create
application tests, one for each route. Acceptance tests can
be generated with the following command:
ember generate acceptance-test clients
You can now see an acceptance folder inside tests and a
tests/acceptance/clients-test.js
file
with
the
following
content:
module('Acceptance | clients', function (hooks) {
setupApplicationTest(hooks);
test('visiting /clients', async function (assert) {
await visit('/clients');
assert.strictEqual(currentURL(), '/clients');
});
});
You can see the test loads the clients route and then checks
if the page loads properly. If you look at the first line of the
test, you can see setupApplicationTest(hooks);. This is similar
to the setup functions we saw in the earlier test types. This
takes care of setting up the application and helps manipulate
the routing of the application and accessing the currentURL,
visit functions, and so on.


Code Coverage
Before we modify the predefined test cases or create new
ones, we will first go through the process of benchmarking
the efficiency of our test suite. Code Coverage is the basic
parameter through which we validate the thoroughness of a
test suite. This tells you the number of lines of code that are
covered by test cases and provides a percentage of the code
that is covered in the tests that ran. It is basically the
percentage of the code that is executed when you run a full
test suite.


A code coverage of 100% is the ideal marker that a
repository should aim for. It means every line of code written
in the project has at least one test case that executes that
line. Code Coverage reports calculate four types of metrics
as follows:
Function Coverage: The number of functions defined
in the code that is called from the test suite.


Branch Coverage: Out of all the if/else branches
present, how many of the branches are called in the test
run.


Statement Coverage: Number of statements in the
overall code that were called in the test run.


Line Coverage: Number of lines of source code that get
executed during the test run. The difference between
statement and line coverage is that there can be
multiple statements present in a single line separated by
a semi-colon (;).


In order to validate the test coverage of our codebase, we
will install a package named ember-cli-code-coverage with the
following command:
ember install ember-cli-code-coverage
Once installed, we need to do a setup in a couple of places in
the application. In the first place, we need to include the
plugin in our ember-cli-build.js. You can do this by adding the
following lines to the build file:
const app = new EmberApp(defaults, {
…
babel: {
plugins: [...require('ember-cli-code-
coverage').buildBabelPlugin()]
}
…
}
This installs the code coverage plugin, enabling us to use the
plugin inside the project. Next, we need to instruct the test
code to run code coverage after the tests are completed. You
can do that by adding the following lines at the end of the
tests/test-helper.js file:
import { forceModulesToBeLoaded, sendCoverage } from 'ember-
cli-code-coverage/test-support';
QUnit.done(async function() {
forceModulesToBeLoaded();
await sendCoverage();
});
Through these lines, we have instructed the code coverage
function to run in the QUnit.done hook which executes after
the tests are done.


Once installed, we can run the tests and generate a
coverage report using the following command:
COVERAGE=true ember test
By passing the COVERAGE=true environment variable when
running the tests, you can see a new folder named coverage
after the test run completes. You can open the folder to see a
lot of files inside. Let us visually see the results by opening
the index.html file inside the coverage folder. It will look like
this:
Figure 7.6: Code Coverage
From this screen, you can see that we have around 50% of
code coverage in our project. And we get the coverage count
of each folder in the project as well. You can click on
individual folder names and find out the coverage metrics of
each of the files inside the folder. For example, we can see
that apps/components have 62.5% statement coverage. Now if
you want to see the coverage of each individual component,
you can click the folder name and see the coverage result of
each component. You can click an individual component
name to see red highlights on lines of code that were not
touched by the test coverage.


Let us open
adapters/application.js and see the code
coverage there. From Figure 7.5, you can see that there are
no test cases for the pathForType function that has the type
salesman. That is one test case we can add to add coverage
to this line. Similarly, we do not have tests for the
authentication process as well. Our goal at the end of the
chapter will be to increase the coverage as much as
possible.


Figure 7.7: File Code Coverage
Bug Fixing with Existing Tests
Before writing new test cases, we can first run the test suite
and check if there are any failures occurring in our existing
test suite and fix them. We can run the tests using the ember
test command, and here is the example of the output you
will see:
1..25
# tests 25
# pass 17
# skip 0
# todo 0
# fail 8
We can see that eight tests are failing in this situation. Let us
look at a few scenarios on why they fail and how we can fix
them. You can scroll through the output of the test command
to find out the issues. Doing this exercise is for us to
understand the problems in the code that we have already
written and ensure that we do not run into similar issues
when writing further code.


tests/unit/serializers/client-test.js
not ok 21 Chrome 119.0 - [18 ms] - Unit | Serializer | client:
it serializes records
---
actual: >
null
stack: >
TypeError: Cannot read properties of undefined (reading
'slice')
at ClientSerializer.serialize
(http://localhost:7357/assets/my-ember-project.js:9829:36)
at Snapshot.serialize
(http://localhost:7357/assets/vendor.js:56106:25)
at Store.serializeRecord
(http://localhost:7357/assets/vendor.js:72381:79)
at ClientModel.serialize
(http://localhost:7357/assets/vendor.js:60943:41)
at Object.<anonymous>
(http://localhost:7357/assets/tests.js:3857:62)
message: >
Died on test #1: Cannot read properties of undefined
(reading 'slice')
at Object.<anonymous>
(http://localhost:7357/assets/tests.js:3853:21)
negative: >
false
browser log: |
This error is in the client serializer we created. As the error
states, we are trying to slice an undefined variable. In our
serializer code, we have the following lines:
json.data.attributes.phone_number = {
country_code: phone_number.slice(0, 3),
phone_number: phone_number.slice(3),
};
From the error message, we can understand that the variable
phone_number is undefined, hence the failure. This will cause
errors in execution when working with clients without a
phone number. So let us update the code to do a slice only
when the phone number has a value. The updated code will
look like this:
if (phone_number) {
json.data.attributes.phone_number = {
country_code: phone_number.slice(0, 3),
phone_number: phone_number.slice(3),
};
} else {
json.data.attributes.phone_number = {
country_code: '',
phone_number: ''
}
}
Once you make the changes, you can run the test suite
again and see that the number of failures is down to seven.


tests/integration/helper/get-display-
name-test
not ok 7 Chrome 119.0 - [45 ms] - Integration | Helper | get-
display-name: it renders
---
actual: >
undefined <undefined>
expected: >
1234
stack: >
at DOMAssertions.hasText
(http://localhost:7357/assets/test-support.js:8669:14)
at Object.<anonymous>
(http://localhost:7357/assets/tests.js:1533:32)
message: >
Element div#ember-testing.ember-application has text "1234"
negative: >
false
browser log: |
Based on the test code, we can see that the test tries to pass
a value to this helper function and checks if that value is
present in the generated DOM. This will not suit our case as
we expect a client object for this test case and not just a
string. For this instance, we will update the test case instead
of the code. Let us update the test case to call the helper
with an object instead of a string. Since the helper uses the
name and email to display, let us update the test code as
follows:
this.set('inputValue', {'name': 'Test', 'email':
'test@example.com'});
Similarly, we should also update the assert statement to
check for the actual response that should be returned by the
helper. It should be updated as follows:
assert.dom(this.element).hasText('Test <test@example.com>');
Once these two lines are updated, we now have the test
case providing a proper parameter to the helper function and
checking for a valid response from the helper function. We
can run the test suite now to ensure that the number of
failures has reduced to six.


tests/integration/component/clients-
table/row-test.js
not ok 4 Chrome 119.0 - [49 ms] - Integration | Component |
clients-table/row: it renders
---
stack: >
TypeError: Cannot read properties of undefined (reading
'name')
at getDisplayName (http://localhost:7357/assets/my-ember-
project.js:5379:22)
at FunctionHelperManager.getValue
(http://localhost:7357/assets/vendor.js:27557:14)
at http://localhost:7357/assets/vendor.js:27518:70
at http://localhost:7357/assets/vendor.js:31347:37
at track (http://localhost:7357/assets/vendor.js:39169:7)
at valueForRef
(http://localhost:7357/assets/vendor.js:31346:44)
at Object.evaluate
(http://localhost:7357/assets/vendor.js:34877:60)
at AppendOpcodes.evaluate
(http://localhost:7357/assets/vendor.js:32660:19)
at LowLevelVM.evaluateSyscall
(http://localhost:7357/assets/vendor.js:35822:22)
at LowLevelVM.evaluateInner
(http://localhost:7357/assets/vendor.js:35793:14)
message: >
global failure: TypeError: Cannot read properties of
undefined (reading 'name')
negative: >
false
browser log: |
{"type":"error","text":"\n\nError occurred:\n\n-While
rendering:\n -top-level\n application\n index\n clients-
table/row\n\n"}
{"type":"error","text":"\n\nError occurred:\n\n\n\n"}
{"type":"warn","text":"Attempted to rerender, but the Ember
application has had an unrecoverable error occur during
render. You should reload the application after fixing the
cause of the error."}
For this failure, we can see that the failure is in the clients-
table/row component. If you look at the test, it calls the
component without any parameters. The row component
uses the get-display-name helper to show the display tag of a
client. In the helper, you can see we try to access client.name
and from the tests, we can see the component being called
without a client. There are two ways to fix this:
Update the get-display-name helper to handle cases where
the client is not present
Modify the test case to pass a client from the tests
For security purposes, let us do both. You can update the
helper function as follows:
export default function getDisplayName(client) {
if (client)
return `${client.name} <${client.email}>`;
return '';
}
This will check if the client object is present and only then
return the display tag. Otherwise, it returns an empty string.


Next, let us update the test for the same:
test('it renders', async function (assert) {
this.set('client', {'name': 'Test', 'email':
'test@example.com'});
await render(hbs`<ClientsTable::Row @client={{this.client}}
/>`);
assert.dom(this.element).hasText('Test <test@example.com>
(Inactive) - - View | Edit | Delete');
}
Note that to pass an object to the component, you will need
to do a this.set to associate the object to the current test
and then pass it to the component using this.client. The
assertion is updated to check for the actual text output
generated by this component, stripping out the HTML tags.


After updating the test, you can run the suite again and see
the failure count reduced to five. You can do the fixes for the
remaining tests in the same manner to remove all failures.


Unit Tests
We will now see how we can write test cases for the
application. It is recommended that we write test cases for
every custom logic or item we write that is custom for our
application. Here are some common cases that we will need
to write test cases for.


Tracked Properties
We saw earlier how tracked properties are used to update
the value of a particular property based on changes to
another property. For example, we have a count variable in
our user-report service. Let us make that a tracked property,
and create a getter function that returns the count multiplied
by 2. Here is what the service will look like:
import Service from '@ember/service';
import { tracked } from '@glimmer/tracking';
export default class UserReportsService extends Service {
@tracked count = 0;
get multipliedCount() {
return count * 2;
}
…
}
Now in our tests/unit/services/user-reports-test.js file,
let us add a new test for checking if the tracked variable
works:
test('multipliedCount tracker', function(assert) {
let service = this.owner.lookup('service:user-reports');
service.count = 2;
assert.equal(service.multipliedCount, 4);
});
We can run just the service test with the following command.


The test passing means that the computed property works
as expected.


ember test -f="user-reports"
Object Methods
Similar to tracked properties, we need to write tests for
functions/methods we have written for each object. For
example, our
user-reports service has two functions.


incrementCount and getCount. We will have to write test cases
for both. Let us add the following tests for user-reports:
test('incrementCount test', function(assert) {
let service = this.owner.lookup('service:user-reports');
service.count = 2;
service.incrementCount();
assert.equal(service.count, 3);
service.incrementCount();
assert.equal(service.count, 4);
});
test('getCount test', function(assert) {
let service = this.owner.lookup('service:user-reports');
service.count = 2;
assert.equal(service.getCount(), 2);
service.count = 4;
assert.equal(service.getCount(), 4);
});
From the code, you can see that we set an initial value to the
count variable, call the incrementCount function twice and
ensure the count variable is updated as per expectation
every time. Similarly, we set the count variable and ensure
that getCount returns the value as it is.


Skip Tests
When running the test suite, you will want to skip certain
tests from executing because the feature might not have
been completed or there is a bug that is not fixed yet. In
these cases, You can just change the test function call to skip
and that particular test will not be executed during the test
run.


import { skip } from 'qunit';
skip('skip this test', function(assert) {
assert.ok(false);
});
Stubbing
When running unit tests, sometimes there will be cases
where we will not want to execute the whole code of a
function for a few reasons:
The function could be complex and time-consuming. We
would not want the test to take long to execute.


When testing a function, we will want to restrict the code
execution to that particular function so that we can
isolate the bugs specific to that particular function.


There can be third-party API calls from within a function
that cannot be executed during test runs, as they can
charge you for every API call.


In the preceding cases, it is normal to mimic the execution of
a function or an object and make it return a value that you
expect the actual function to. This will ensure we know
exactly what another function will return and any issues we
find are restricted to the actual function we are testing.


Stubbing Functions
Let us say we want to stub the incrementCount function in our
service to increment the value by two instead of one. Here is
the updated test case with the function stubbed:
test('incrementCount test', function(assert) {
let service = this.owner.lookup('service:user-reports');
service.count = 2;
service.incrementCount();
assert.equal(service.count, 3);
service.incrementCount();
assert.equal(service.count, 4);
service.incrementCount = function() {
service.count += 2;
}
service.incrementCount();
// After the increment, the value should be increased to 6
assert.equal(service.count, 6);
});
By doing this, you can reduce complex functions into simple
lines of code to reduce the time and complexity of test
cases.


Stubbing Objects
Similar to functions, we will want to mock a complex object
in the test as well, with just specific attributes that are
required inside the function for testing. A particular object
that is used inside a service or component can have complex
functions in it, so you might want to simplify them during
test execution. For example, in a preceding example, we saw
how we passed the client object when calling the client-
table/row component. There, instead of passing a Client
model record, we passed just a sample object. Similarly, we
can mimic any object by creating relevant functions within
the test code and only attributes/properties that are required
inside the current function that we are testing.


Stubbing Services
Some parts of your application can have multiple services
injected into them, and functions from each service can be
called from the object. For example, you can have objects
that call payment services to make payments or to get your
subscription status. In these cases, we would not want the
payment API to be called from the tests or the tests failing
because of that. So we will need to create a stub for the
entire service and the functions inside them. Here is an
example of how you can stub it:
import Service from '@ember/service';
class PaymentServiceStub extends Service {
someParam = 'test';
secondParam = 'example';
getSubscriptionStatus() {
return {
subscribed: true,
subscriptionId: '123432'
}
}
createSubscription() {
return { success: true };
}
}
module('Integration | Component | ClickTracker',
function(hooks) {
setupRenderingTest(hooks);
hooks.beforeEach(function(assert) {
this.owner.register('service:payment-service',
PaymentServiceStub);
});
}
You can see that we are creating a dummy service that
extends the actual Service class. After the setupRenderingTest
function is called, we call the hooks.beforeEach event and
register the dummy service we created in place of the
original service. Once done, it will replace the service for the
entirety of the module. We can be in full control of the
service execution and prevent unnecessary API calls.


Testing Components
As
mentioned
earlier,
components
are
testable
via
integration/rendering tests that generate the component and
allow you to access the generated DOM to test for HTML
elements and their attributes/values. We can use this to test
whether DOM generation works as expected and the
component HTML is generated as per requirements.


Testing DOM attributes
For example, we have the client-table/row component that
adds a green background if the client is active, and gray if
the client is inactive. We can add a test for the same using
the following code:
test('row background test', async function(assert) {
this.set('client', {'name': 'Test', 'email':
'test@example.com', 'active': false, 'id': 1});
await render(hbs`<ClientsTable::Row @client={{this.client}}
/>`);
assert.dom('.my-custom-class').hasClass('bg-gray');
this.set('client', {'name': 'Test', 'email':
'test@example.com', 'active': true, 'id': 1});
await render(hbs`<ClientsTable::Row @client={{this.client}}
/>`);
assert.dom('.my-custom-class').hasClass('bg-green');
});
In this test, we are rendering the component twice, once with
each case that we want to test. After each render, we find
the element using the class name my-custom-class, which we
have added to the clients-table/row component already. After
fetching the element, we check if the element has the proper
class name attached to it based on our requirements. We
can use this to check if certain attributes are present for the
element as well. We can check if the element has the proper
ID based on the ID of the client. You can do the check as
follows:
assert.dom('.my-custom-class').hasAttribute('id', 'client-1');
Testing User Interactions
In components, we will need to test that user interactions are
triggering actions and making changes to the DOM
accordingly. For example, in our click-tracker component, we
have two buttons that increment count by one and two,
respectively. We need to write tests to click the button and
confirm if the count increases as expected. Ember tests offer
a click function that allows you to simulate a button click
inside a test case. Here is how it works:
import { click, render } from '@ember/test-helpers';
test('increment count', async function (assert) {
await render(hbs`<ClickTracker />`);
assert.dom('.count').hasText('Count: 0');
assert.dom('.multiplied-count').hasText('Multiplied Count:
0');
await click('.btn-primary');
assert.dom('.count').hasText('Count: 1');
assert.dom('.multiplied-count').hasText('Multiplied Count:
2');
await click('.btn-success');
assert.dom('.count').hasText('Count: 3');
assert.dom('.multiplied-count').hasText('Multiplied Count:
6');
});
In this test, we are rendering the component and verify the
initial state of the component by checking if the count and
multiplied count are set to 0. Then we simulate the button
click by using the click function of Ember tests. We click
each button once and check if the DOM elements are
updated with proper values, as expected. It ensures that the
corresponding action is called when the button is clicked and
the values are updated in the DOM immediately.


Testing Actions
When calling components, you can pass actions from a
parent component or controller to the child component, and
the same can be called from the child component. Even
though we can test the action separately in the parent
component, we will need to check that the action is being
called from the child component in this case. It can be done
by altering the stubbing mechanism we saw previously in
this chapter.


For example, let us consider a component that expects a
dummyFunction as a parameter and calls that function when a
button is clicked. The test will need to pass a stub of that
function when rendering the component and then clicking
the button. After that, we need to check if the stubbed
function was called. Here is how we can do it:
test('dummyFunction call check', async function (assert) {
assert.expect(1);
this.set('dummyFunction', (param) => {
let expectedParam = 10;
assert.equal(param, expectedParam, 'dummyFunction is called
with the expected param');
});
await render(hbs`<MyDummyComponent @dummyFunction=
{{this.dummyFunction}} />`);
await click('.dummy-trigger');
});
We create a sample dummyFunction inside the test. Inside the
function, we create a variable containing the value you
expect this function to be called with. In this example, we
expect the function to be called with the parameter 10. We
do an assertion on the same. Then we pass this function to
the component and simulate the click of the button that
triggers the dummyFunction.


Notice the assert.expect(1) at the beginning of the test. It
notifies Ember that it needs one successful assertion for the
test to be considered a pass. By this, we can be sure that the
function is called, and the assertion is triggered from inside
the function, for the assertion count to match.


Testing Controllers
Testing Controllers are similar to testing components. But
Controllers tests are unit tests, as we test only the functions
and actions in the controller rather than checking on the
rendering of the page and rendering the components called
from inside the controller. That is because the components
are individually tested and the interactions among them are
tested in the acceptance tests. So, unit tests for controllers
are to ensure that all the functions and actions in the
controller are working as expected.


When testing components, we tested actions by the results
that they produced in the DOM. But here we cannot do that
as we do not have a DOM in these unit tests. We will need to
call the action and test its execution based on the updates it
does to properties inside the controller. Let us consider a
sample controller that has an action which updates a
property in the controller as follows:
import Controller from '@ember/controller';
import { action } from '@ember/object';
export default class SampleController extends Controller {
testProp = '';
@action
updateTestProp(updatedValue) {
this.testProp = updatedValue;
}
}
To test this controller, we can write a test that checks the
value of the prop on load, then calls the action to update the
value and finally checks if the prop is updated. Here is how it
will look:
test('sample controller test', function(assert) {
let controller = this.owner.lookup('controller:sample');
assert.equal(controller.testProp, '');
controller.send('updateTestProp', 'update');
assert.equal(controller.testProp, 'update');
});
The action is called from the test using the send function in
the controller, which eventually updates the testProp.


Testing Helpers
When testing helpers, we need to ensure that we write test
cases for every combination of arguments that this helper
can accept. This will help us ensure that the helper is
working for all cases and will not raise an issue irrespective
of whether the helper is called with or without the correct set
of parameters.


For example, in our get-display-name helper, we tested that
it succeeds and returns the expected data when passing the
client object. But what if there is no parameter passed to this
function? Let us add a test case for that by adding the
following
lines
to
the
existing
test
case
in
the
tests/integration/helpers/get-display-name-test.js file:
await render(hbs`{{get-display-name}}`);
assert.dom(this.element).hasText('');
This ensures that even if the helper is called without any
parameters, there is no error and the helper renders with an
empty string. Note that helpers can also be unit-tested, by
simply calling them like a function and checking the
response, instead of rendering the helper.


Testing Routes
Routes are an integral component of the application that
connects the different modules in the application. But for the
test suite to be thorough and for us to validate each
functionality, it is required to test the individual or lifecycle
hooks of each router. However, some of them can only be
tested via Application Testing (like transitioning to a different
route). Here is what a simple route test will look like:
import { module, test } from 'qunit';
import { setupTest } from 'my-ember-project/tests/helpers';
module('Unit | Route | index', function (hooks) {
setupTest(hooks);
test('it exists', function (assert) {
let route = this.owner.lookup('route:index');
assert.ok(route);
});
});
The test just fetches the route and checks if it loads okay. We
saw in earlier chapters about the different lifecycle hooks in
an Ember Route like beforeModel, afterModel, error, and loading
states. We can also set controller variables from within the
router using the setupController method. We can test each of
these hooks by calling them directly from the test and
checking if a particular value has been updated in the
controller.


Testing Models
Models can be unit tested by isolating them from the Store
service, making the model just like any other object in our
application. Without the involvement of the store, there are a
few functionalities we can test:
Default Values
When defining the model, we usually specify a default value
for items when the value is not specified in the API or not
specified when creating the model object in the Ember
application. Such behaviors have to be tested by creating a
dummy model object. We can modify the default test case
created for the model as follows:
module('Unit | Model | client', function (hooks) {
setupTest(hooks);
// Replace this with your real tests.


test('it exists', function (assert) {
let store = this.owner.lookup('service:store');
let model = store.createRecord('client', {});
assert.equal(model.date, new Date());
});
});
Model Functions
The next type of testing is for model functions. We will need
to check if each of the functions returns data exactly as
expected. For example, our client model has a function
named displayTag which returns a formatted name and email.


Here is how we can test it:
test('displayTag test', function (assert) {
let store = this.owner.lookup('service:store');
let model = store.createRecord('client', {name: 'Test', email:
'test@example.com'});
assert.equal(model.displayTag, 'Test <test@example.com>');
});
As an exercise, you can write test cases for different cases
like empty names, empty emails or both fields being empty.


Relationships
We saw different ways in which models can be related to
each other. In tests, we will need to ensure they are related
to the correct model with the correct type of relationship. In
our project, we have a relationship between the user model
and the salesman model. We can test the relationship as
follows:
import { get } from '@ember/object';
test('relationship test', function (assert) {
let client =
this.owner.lookup('service:store').modelFor('client');
let clientRelationship = get(client,
'relationshipsByName').get('salesman');
// Assert the name of the related model
assert.equal(clientRelationship.key, 'salesman');
// Assert the type of relationship
assert.equal(clientRelationship.kind, 'belongsTo');
});
We fetch the relationship object from the model and check
that the field is linked to the correct model and that the type
is as expected as well. A similar check can be done for the
salesman:
test('relationship test', function (assert) {
let salesman =
this.owner.lookup('service:store').modelFor('salesman');
let salesmanRelationship = get(salesman,
'relationshipsByName').get('clients');
assert.equal(salesmanRelationship.key, 'clients');
assert.equal(salesmanRelationship.kind, 'hasMany');
});
Application Testing
Application Testing or System Testing is for checking if
the entire application loads properly and redirections happen
as expected. Ember provides a set of functions to help us
judge the current status of the application like the currentURL,
currentRoute, and so on. Here are some of the actions that
you can do in the application tests:
visit: The visit function can be used to load the
application with a specific URL. We discussed earlier in
our generated acceptance test how this works.


click: This function can be used to simulate a click on
any element present in the DOM.


fillIn: When there are input elements present on the
page, we can use this method to enter values into this
input field. You can select input elements either through
their id or class or through their name or the data-test
attribute of the element. Here is an example:
fillIn('[data-test-field="Name"]', 'Fill Value');
triggerEvent: This function can be used to trigger any
DOM event like a mouse click, hover, blur, and so on.


Here is an example of how you can use it:
triggerEvent('#id-of-element', 'hover');
triggerKeyEvent: Similar to triggerEvent, this function can
be used to trigger any key-based event like keyUp and
keyDown.


These functions are asynchronous and return a promise that
resolves once the action is performed. As seen in the
preceding examples, it is required to use await when calling
these helpers. Similar to this, there is a set of synchronous
functions that return data about the state of the application
immediately:
currentURL: Returns the current URL that is loaded in the
application
currentRouteName: Returns the route that is loaded in the
application
find: Enables you to fetch a single element from the
DOM that matches the selector passed to this function
findAll: Allows filtering multiple elements in the DOM
that match the selector
Setting up Mirage
By default, Mirage is not enabled during tests. It is disabled
by default to prevent accidental third-party calls so that tests
are executed only based on data provided to each test. We
will have to consciously enable Mirage in those specific tests
where we want the application to contact Mirage. Here is
how you enable Mirage in tests:
import { setupMirage } from 'ember-cli-mirage/test-support';
module('Acceptance | clients, function (hooks) {
setupApplicationTest(hooks);
setupMirage(hooks);
});
Testing Redirections
A main part of Application Testing is to verify redirections
between routes. In our case, we have a restriction about
redirecting the user back to the clients list page, when the
client is inactive. Let us generate an acceptance test for
clients/view route and add the following test to check the
redirection:
import { module, test } from 'qunit';
import { visit, currentURL } from '@ember/test-helpers';
import { setupApplicationTest } from 'my-ember-
project/tests/helpers';
import { setupMirage } from 'ember-cli-mirage/test-support';
module('Acceptance | clients/view', function (hooks) {
setupApplicationTest(hooks);
setupMirage(hooks);
test('visiting /clients/view', async function (assert) {
await visit('/clients/1');
assert.strictEqual(currentURL(), '/clients/1');
});
test('visiting inactive client', async function (assert) {
await visit('/clients/2');
assert.strictEqual(currentURL(), '/clients');
});
});
Here we have two test cases. From the Mirage data, we know
that the client with id 1 is active and the client with id 2 is
inactive. So we first load the client with id 1 and ensure the
application stays in the same route. Then we load the client
with id 2 and check that the user is routed back to the clients
list route.


Updated Code Coverage
In the entirety of this chapter, we have written a variety of
test cases to make our code more secure. Let us quantify the
results by running the code coverage via the command
COVERAGE=true ember test.


Here is the updated code coverage:
Figure 7.8: Updated code coverage
Through our efforts, we have improved the code coverage
from around 50% to more than 78%. We can visibly see the
red color bars in the previous image turn to yellow or green
in the new one. The goal of our test suite and an exercise for
you is to convert this 78% to 100%.


Conclusion
In this chapter, we went through in detail about what testing
is and how it is done for software applications. We discussed
the different methods of testing, the advantages and
disadvantages of each of them, and the efforts involved. We
discussed individual testing methods like manual and
automation testing and learned how they can be classified
based on who does the testing and the technical knowledge
required for the testing. We also discussed the different
levels of testing, their scope and why each level is required
to make the application robust and secure.


We then moved towards testing in Ember and how we can
run tests, and configure the application to support plugins for
testing purposes. We also looked at how we can debug our
tests in the runtime. After that, we went through some of the
auto-generated test cases that were failing and gained
knowledge about how we could fix those test failures. This
gave you hands-on experience working with an existing code
base and fixing bugs in them.


We then discussed individual modules in the application and
how we can write test cases for each of them. We also
learned about the general use cases the tests can
concentrate on to make sure we get a very high code
coverage. We also saw how we can mock/stub functions or
objects to reduce the complexity of the tests. In the end, we
saw around a 28% increase in the code coverage of our
application.


In the next chapter, we will dive into detailed runtime
debugging through the Ember Inspector tool.


Points to Remember
Tests are important for an application to make sure the
features work as expected and the new code does not
break any existing feature.


Testing can be classified into Automated and Manual
Testing.


Tests in Ember have three levels - Unit, Rendering and
Application tests.


Unit tests check on a specific object/function in an
isolated environment.


Integration/Rendering tests test the rendering of a
component
or
the
interaction
between
different
components in the application.


Application tests check the working of the entire
application by loading the application from an end-user
point of view.


We need to mock/stub objects and functions to reduce
the complexity of tests.


Application
tests
can
be
used
to
test
redirection/transition between routes.


Multiple Choice Questions
1. Which of the following does not require any knowledge
of the internals of the application that is being tested?
a. Black Box Testing
b. White Box Testing
c. Gray Box Testing
d. Automated Testing
2. Which of the following is a level of testing provided by
Ember?
a. Unit
b. Rendering
c. System
d. All of the Above
3. What is the keyword used to pause the execution of a
test during runtime?
a. debug
b. debugger
c. pause
d. None of the above
4. Which of the following modules can be unit-tested?
a. Component
b. Model
c. Helper
d. Template
5. What is the name of the test that simulates an end-user
perspective?
a. Unit
b. Rendering
c. Application
d. Global
6. Ember Mirage is enabled by default in tests.


a. true
b. false
Answers
1. a
2. d
3. b
4. b
5. c
6. b
Questions
1. What are the different types of Manual Testing?
2. What is Code Coverage and how do you improve it in an
application?
3. Why are different levels of testing important?
4. How do you test the different lifecycle hooks of a route?
5. What are the points to note when coming up with test
cases for your application?
6. How do you connect your test suite to your CI/CD
process?
Key Terms
Testing: A process for ensuring the application works as
expected before deploying it to customers.


QUnit: A JavaScript framework testing framework that
forms the core of Ember's tests.


Module: A group of tests that targets a specific part of
the application.


Code Coverage: A metric that specifies the percentage
of your code base that is covered when running your
test suite.


Stub: A dummy object or function that mimics a
function defined inside the code to reduce the
complexity when running tests.

