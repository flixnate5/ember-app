# 

for Web App
Development
Leverage Convention Over
Configuration
Paradigm to Develop, Build, and
Deploy
Complex Applications Using
Ember.js
Aswin Murugesh K
www.orangeava.com
Copyright © 2024 Orange Education Pvt Ltd, AVA™
All rights reserved. No part of this book may be reproduced, stored in a retrieval
system, or transmitted in any form or by any means, without the prior written
permission of the publisher, except in the case of brief quotations embedded in
critical articles or reviews.


Every effort has been made in the preparation of this book to ensure the
accuracy of the information presented. However, the information contained in
this book is sold without warranty, either express or implied. Neither the author
nor Orange Education Pvt Ltd or its dealers and distributors, will be held
liable for any damages caused or alleged to have been caused directly or
indirectly by this book.


Orange Education Pvt Ltd has endeavored to provide trademark information
about all of the companies and products mentioned in this book by the
appropriate use of capital. However, Orange Education Pvt Ltd cannot
guarantee the accuracy of this information. The use of general descriptive
names, registered names, trademarks, service marks, etc. in this publication
does not imply, even in the absence of a specific statement, that such names
are exempt from the relevant protective laws and regulations and therefore free
for general use.


First published: March 2024
Published by: Orange Education Pvt Ltd, AVA™
Address: 9, Daryaganj, Delhi, 110002, India
275 New North Road Islington Suite 1314 London,
N1 7AA, United Kingdom
ISBN: 978-81-97081-92-7
www.orangeava.com
Dedicated To
My Beloved Wife:
Dr. Sowndharya Meera
and
My Family and Friends
About the Author
Aswin Murugesh K holds a Bachelor degree in Information
Technology from the College of Engineering, Guindy,
Chennai, India. He has worked as an intern and employee in
top MNCs like Amazon, Oracle and also has experience
working in startups of different stages, thus having an
overall knowledge of the industry. He then started his own
company back in 2019, focusing on developing quality
products for their customers. He started Kuriyam.io as a
service-based company and has recently transformed it into
a product-based company in 2023 with their first in-house
product, Pinaippu, that focuses on WhatsApp marketing and
automation.


Through his company, Aswin helps nurture college students
by providing internships for them to learn hands-on about
working in a nimble startup environment and learning
different technologies. He is an active contributor to Stack
Overflow and also provides paid mentorship for Python and
JavaScript based projects through online platforms like
Codementor.


Right from his college days, Aswin has been a part of the
Free and Open Source (FOSS) community and has been
interacting with students from colleges across Tamil Nadu to
teach them the importance of open-source software and
tools in the software community. He also conducts sessions
teaching different programming languages like Python,
JavaScript, and different frameworks like Ember.js, React.js,
Django and Flask. He always insists on students learning the
“How” in everything instead of just the “What”. His
teachings always focus on making people understand how
things work, and not just what they do. This will enable the
students to become thinkers instead of just doers.


Apart from his technical career, Aswin is an internationally
rated Chess player. In his free time, he plays Chess and
reads a lot of books. He is reachable in LinkedIn at
https://linkedin.com/in/aswinmurugesh.


About the Technical Reviewer
Yamuna is a seasoned professional with 14 years of
extensive experience in front-end development. Holding the
position of Technical Lead at HappyFox, she boasts over 13
years
of
comprehensive
web
development
expertise
alongside a robust background in physics. With a passion for
problem-solving and analytical thinking, Yamuna excels in
crafting high-quality, secure, and user-friendly features
using Ember, a cutting-edge JavaScript framework. Her
enthusiasm for embracing new technologies is only rivaled
by her dedication to imparting knowledge to others.


In her role as Technical Lead, Yamuna undertakes a
multifaceted approach, encompassing code review, release
management, and seamless coordination with backend
teams. Notably, she has spearheaded the implementation of
generic solutions addressing critical web application security
concerns,
including
XSS,
CSRF,
and
CSP.


Yamuna's
proficiency extends to end-to-end feature development,
leveraging
Python
and
Ember,
while
her
skill
set
encompasses HTML5, CSS, Javascript, and Jquery, among
others.


A pivotal member of the development process team,
Yamuna has played a pivotal role in establishing best
practices for REST APIs and elevating code efficiency and
quality.


Her
commitment
to
fostering
teamwork,
collaboration, and innovation is evident in her efforts to
cultivate a positive and inclusive work environment for her
team members.


Having made significant contributions during her tenures at
Zoho and HappyFox, Yamuna is now eagerly seeking a new
and exciting role where she can continue to leverage her
expertise, drive, and passion for excellence in web
development. With a proven track record of success and a
steadfast commitment to professional growth, Yamuna
stands ready to make a meaningful impact in her next
endeavor.


Acknowledgements
My experience writing Ultimate Ember.js for Web App
Development has been a wonderful journey, and I am
grateful to everyone in my life who have played a role in
shaping my technical skills and guiding me in my constant
pursuit of knowledge. This book wouldn't have been
possible without the support and expertise shared by many.


Firstly, I would like to thank the Ember.js community and all
collaborators involved in creating this wonderful framework.


The official documentation of Ember.js, available at
https://guides.emberjs.com/release/
has
been
a
very
valuable resource in helping me stay true and accurate to
the excellence of the framework.


I thank my family for their ever-present support. Especially, I
wish to thank my wife Meera, who has been a source of
strength throughout the journey of writing this book, my
parents, teachers, relatives and friends who have always
encouraged me in my endeavors in life. Special thanks to
my mentors Vysakh Sreenivasan and Yamuna Subramaniam
(the technical reviewer for this book) for being a vital part of
my journey with Ember.js.


I would like to extend my appreciation to the publication
house for providing me with the opportunity to showcase
my knowledge in such a way as to contribute to the
community
by
helping
fellow
developers
learn
web
development. It was their constant support and guidance
that made me achieve my goal of writing my first book.


Finally, to the readers, thank you for choosing this book as
your source of knowledge. May it be a valuable companion
on your journey to mastering Ember.js and navigating the
dynamic world of web development.


Preface
In this fast-evolving world of web development, there are so
many new frameworks being released that choosing the
right framework for your project is of utmost importance.


Introducing Ember.js, the battle-tested frontend framework
that can help you build your applications with speed, in the
right way. In Ultimate Ember.js for Web App Development,
we will take you through the journey from being a beginner
to becoming a master of the Ember.js framework.


This book consists of 10 chapters. Each of the chapters
covers a specific module or topic about the framework, from
the basics of Web Development to the detailed internals of
Ember.js
and
also
the
process
involved
after
the
development is complete, like the testing and deployment
steps. From beginners to developers who already have
knowledge of Ember.js, this book has something for any
developer eager to learn something new.


Chapter 1 Introduction to Ember.js: In the first chapter,
we will take you through the basics of JavaScript and Web
Development, the types of Web Applications available, the
different components of a web application, and so on. We
will list some of the popular frontend frameworks widely
used in the market and discuss the advantages of Ember.js
and why it can be a right fit for your project.


Chapter 2 Ember CLI and Local Setup: This chapter talks
about Ember CLI, a Command Line Interface that is a
package used to interact with and manage your Ember
application. We will discuss in detail about the wide variety
of options presented by the tool, and we will also take you
through the process of setting it up locally and creating your
first Ember.js application.


Chapter 3 Ember.js Routing: In this chapter, we will
discuss in detail about Ember Routes. We will show you the
different types of Routes that can be setup in the
application, how you can create dynamic URLS and load
specific data based on the URL, and display it to the end
user through Templates.


Chapter
4
Ember.js
Components
Templates:
Components are the basic building blocks of your Ember
application,
and
we
will
dig
deeper
into
building
Components, adding dynamicity to the Templates and
handling
interactions
between
the
Components
and
Controllers and between Components themselves. We will
also learn about creating helpers that facilitate calling
dynamic JavaScript functions from within Templates.


Chapter 5 Ember Data and Services: Ember Data is the
gateway for connecting your Ember application with a
persistent data source and loading and modifying the data
the user sees in the application. We will discuss the various
functionalities offered by the Ember Data Store for
authenticating and interacting with APIs, and we will also
look at Services in Ember, a special type of singleton object
that can be called from anywhere in the application.


Chapter 6 Configuring your Ember App: In this chapter,
we concentrate on the post development activities of an
application, the modifications or enhancements you can do
to make your application ready for deployment.


Chapter 7 Testing Ember.js Apps: Testing is a vital piece
in the Software Development lifecycle, as it helps you keep
your application secure and up-to-date with requirements.


This chapter talks in detail about the basics of testing, the
kinds of testing in Software Development. Then we discuss
testing in Ember.js, in particular, the different types of tests
you can write for each module present in the framework.


Chapter 8 Ember Inspector: This chapter is about Ember
Inspector, a tool used to monitor the performance of your
application and to debug issues with your code. We will dive
deep into the features available in this tool, how you can
use it to gain knowledge of the different objects present in
your application, the data that is loaded in the application,
and so on.


Chapter 9 Build and Deployment: This chapter shows
the steps involved in generating a build for your application
and then deploying your application to different cloud
hosting providers for everyone to access the application.


Chapter 10 Conclusion: The final chapter concludes the
journey by summarizing the concepts we have learned so
far in this book. We discuss some of the best practices
recommended by the framework and also guide you through
the process of creating an Ember addon. We will then
provide information on how you can contribute as a
developer to this great framework.


This book contains live examples of building a sample
project to learn the concepts by doing as and when you
learn about them. We have also provided exercises at the
end of each chapter to encourage you to validate your
understanding of the chapter and tickle your brain with
questions that encourage you to research further on certain
topics. The live examples and the application built through
the
process
of
this
book
are
available
at
https://github.com/aswinm/sample-ember-application.


Happy coding!
Downloading the code
bundles and colored images
Please follow the link or scan the QR code to download the
Code Bundles and Images of the book:
https://github.com/ava-orange-
education/Ultimate-Ember.js-
for-Web-App-Development
The code bundles and images of the book are also hosted
on
https://rebrand.ly/dc9a41
In case there’s an update to the code, it will be updated on
the existing GitHub repository.


Errata
We take immense pride in our work at Orange Education
Pvt Ltd and follow best practices to ensure the accuracy of
our content to provide an indulging reading experience to
our subscribers. Our readers are our mirrors, and we use
their inputs to reflect and improve upon human errors, if
any, that may have occurred during the publishing
processes involved. To let us maintain the quality and help
us reach out to any readers who might be having difficulties
due to any unforeseen errors, please write to us at :
errata@orangeava.com
Your
support,
suggestions,
and
feedback
are
highly
appreciated.


DID YOU KNOW
Did you know that Orange Education Pvt Ltd offers eBook
versions of every book published, with PDF and ePub files
available? You can upgrade to the eBook version at
www.orangeava.com and as a print book customer, you
are entitled to a discount on the eBook copy. Get in touch
with us at: info@orangeava.com for more details.


At www.orangeava.com, you can also read a collection
of free technical articles, sign up for a range of free
newsletters, and receive exclusive discounts and offers on
AVA™ Books and eBooks.


PIRACY
If you come across any illegal copies of our works in any
form on the internet, we would be grateful if you would
provide us with the location address or website name.


Please contact us at info@orangeava.com with a link to
the material.


ARE YOU INTERESTED IN
AUTHORING WITH US?
If there is a topic that you have expertise in, and you are
interested in either writing or contributing to a book,
please write to us at business@orangeava.com. We are
on a journey to help developers and tech professionals to
gain insights on the present technological advancements
and innovations happening across the globe and build a
community that believes Knowledge is best acquired by
sharing and learning with others. Please reach out to us
to learn what our audience demands and how you can be
part of this educational reform. We also welcome ideas
from tech experts and help them build learning and
development content for their domains.


REVIEWS
Please leave a review. Once you have read and used this
book, why not leave a review on the site that you
purchased it from? Potential readers can then see and use
your unbiased opinion to make purchase decisions. We at
Orange Education would love to know what you think
about our products, and our authors can learn from your
feedback. Thank you!
For more information about Orange Education, please
visit www.orangeava.com.


Table of Contents
1. Introduction to Ember.js
Introduction
Structure
An Overview of Web Development
Websites versus Web Applications
Defining Web Development
Frontend/Client Side
Backend/Server Side
JavaScript
Document Object Model (DOM)
Key Features of DOM
Select element by Id
Select elements by Class Name
Select Elements by Tag Name
Manipulating the DOM
Event Handling
JQuery
Frontend Applications
Client-Side Rendering /Single-Page Application
Advantages of SPA
Disadvantages of SPA
Server-Side Rendering
Advantages of SSR
Disadvantages of SSR
Static Site Generation
Advantages of SSG
Disadvantages of SSG
Popular Frontend Frameworks
React
Next.js
Angular
Vue.js
Backbone.js
Ember.js
History
Popularity
Key Features
Convention over Configuration
Component-Service Framework
Two-way data binding
Anatomy of an Ember.js App
Router
Route Handler
Models
Templates
Components
Controllers
Services
Overall Architecture
Tests
Addons
Conclusion
Points to Remember
Multiple Choice Questions
Answers
Questions
Key Terms
2. Ember CLI and Local Setup
Introduction
Structure
Ember CLI
Installation
Functionalities
Ember new
Ember addon
Ember init
Ember install
Ember generate
Ember destroy
Ember serve
Ember test
Ember build
Ember asset-sizes
Short Commands
Ember Folder Structure
README.md
app
config
ember-cli-build.js
Source maps
package.json
public
testem.js
tests
yarn.lock
node_modules
.ember-cli
Assets and Styling
CSS Preprocessors
SCSS/SASS
Conclusion
Points to Remember
Multiple Choice Questions
Answers
Questions
Key Terms
3. Ember.js Routing
Introduction
Structure
Introduction to Routing
Setting up Ember routes
Linking between routes
Nested routes
Dynamic segments
Route model
Route hooks
activate
deactivate
beforeModel
afterModel
setupController
willTransition
didTransition
resetController
redirect
Asynchronous routing
Loading and error substates
Loading substate
Loading event
Error substate
Error event
Controllers
Generating a controller
Query parameters
Routing with query parameters
LinkTo
transitionTo
Conclusion
Points to Remember
Multiple Choice Questions
Keys
Questions
Key Terms
4. Ember.js Components and Templates
Introduction
Structure
Introduction to Components
Generating a Component
Component Arguments
HTML Attributes
Templates
Comments
Insert HTML directly
{{outlet}}
{{yield}}
Conditional Statements
if
else
else if
unless
Inline if
Loops
index
Empty lists
Iterating over objects
Helper Functions
Built-in Helpers
concat helper
array helper
hash helper
let helper
input and textarea helpers
Creating a custom helper
Local helpers
Global helpers
Nested Helpers
Named Arguments
ember-truth-helpers
Component State and Actions
Tracked Properties
Actions
Actions with Params
Computed values
Combining Actions with Arguments
Ember Bootstrap
Built-in Components
Buttons
Navigation
Form
Tooltip
Carousel
Conclusion
Points to Remember
Multiple Choice Questions
Answers
Questions
Key Terms
5. Ember Data and Services
Introduction
Structure
Introduction to Ember Data
Ember Models
Default Values
getter functions
Transforms
Setting up a backend API
Installation
Structure of Ember CLI Mirage
Creating Routes
Models and Database
Ways to make API requests from Ember
Advantages of Ember Data
Places to make API requests in Ember
Ember Store
Injecting the Store
Read and filter Records
Fetch all objects
Filter and fetch certain objects
Handling Metadata
Fetch a Specific Record
RSVP Hash
Create, update, and delete records
Create records
Persisting Data
Updating Records
Tracking Changes
Deleting Records
deleteRecord
unloadRecord
unloadAll
Handle Relationships in Models
belongsTo
hasMany
inverse
Adapters
Extending Adapters
Host and namespace
Model-URL mapping
Headers
URL Conventions
Serializers
serialize
normalizeResponse
Identifier
Attribute Name Mapping
Ember Services
Generating a service
Configuring the Service
Conclusion
Points to Remember
Multiple Choice Questions
Answers
Questions
Key Terms
6. Configuring your Ember.js Application
Introduction
Structure
Configuring your App
Build Environments
App Secrets
Configuring Ember-CLI
Prototype Extensions
Advantages of Immutability
Disadvantages of Immutability
Making an Array immutable
Disabling Prototype Extensions
Alternatives to Prototype Extensions
Handling Deprecations
Filtering Deprecations
Deprecation Workflow
URL Types
Embedded Applications
Root Element
Root URL
Feature Flags
Life-cycle of an Ember feature
Enabling features in runtime
Optional Features
Build Targets
Robots.txt
Configuring robots.txt for each environment
Conclusion
Points to Remember
Multiple Choice Questions
Answers
Questions
Key Terms
7. Testing Ember.js Applications
Introduction
Structure
Introduction to Testing
Advantages of Testing
Different Ways of Testing
Manual Testing
Automated Testing
Manual Testing
Black Box Testing
White Box Testing
Gray Box Testing
Testing Tools in Ember
QUnit
Running Tests in Ember
Tests interface
Creating Tests in Ember
Filtering Tests
module
filter
Test Selectors
Debug your tests
pauseTest
Levels of Testing
Unit Tests
Rendering Tests
Application Tests
Code Coverage
Bug Fixing with Existing Tests
tests/unit/serializers/client-test.js
tests/integration/helper/get-display-name-test
tests/integration/component/clients-table/row-test.js
Unit Tests
Tracked Properties
Object Methods
Skip Tests
Stubbing
Stubbing Functions
Stubbing Objects
Stubbing Services
Testing Components
Testing DOM attributes
Testing User Interactions
Testing Actions
Testing Controllers
Testing Helpers
Testing Routes
Testing Models
Default Values
Model Functions
Relationships
Application Testing
Setting up Mirage
Testing Redirections
Updated Code Coverage
Conclusion
Points to Remember
Multiple Choice Questions
Answers
Questions
Key Terms
8. Ember Inspector
Introduction
Structure
Introduction to Ember Inspector
Installation
Google Chrome
Display Ember Favicon
Firefox
Bookmarklet Application
Mobile Devices
Version Info
App Config
Object Inspector
Sending Objects to Console
Console to Inspector
Navigating through Objects
Component Tree
View Component
Search Components
Locate the Component of an Element
Inspecting Routes
Search Bar
Current Route Only
Hide Substates
Inspecting Data
Filters
Inspect Store
Performance Monitoring
Debug Promises
Trace Promises
Handling Deprecations
Troubleshooting
Ember Application Not Detected
Promises not detected/Missing
Conclusion
Points to Remember
Multiple Choice Questions
Answers
Questions
9. Build and Deployment
Introduction
Structure
Building the Application
ember-cli-deploy
Deploying to AWS
Creating a Bucket
Enabling Static Website Hosting
Enabling Public Access
Create Programmatic User
ember-cli-deploy-s3
Deploy to GCP
Creating a Bucket
Enable Public Access
Enable Static Website Hosting
Create Programmatic User
ember-cli-deploy-gcloud-storage
Deploy to Azure
ember-cli-azure-deploy
Setup GitHub Repository
Create Static Web App
Adding Environment Variables to GitHub
Conclusion
Points to Remember
Multiple Choice Questions
Answers
Questions
Key Terms
10. Conclusion
Introduction
Structure
Ember.js
Convention over Configuration
Application Architecture
Ember-CLI
Developing your Ember Application
Testing your Ember Application
Code Coverage
Deploying your Ember Application
Build Process
Deployment
Maintaining your Ember Application
Handling Deprecations
Upgrading packages and Ember
Writing and Deploying an addon
Generating an addon
Adding Content
Linking the addon to our existing project
Pushing to Ember Observer
Best Practices in Ember.js
Contributing to Ember.js
Conclusion
Index