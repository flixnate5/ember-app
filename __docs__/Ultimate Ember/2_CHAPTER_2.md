# 2 CHAPTER 2 Ember CLI and Local Setup

Ember CLI
Ember Folder Structure
Assets and Styling


The Ember CLI takes care of creating the folder structure, adding the internal connections to make the app functional, and running the server required to render the application on the browser.


It contains a dependency package manager, local server, and test runner all rolled into a single package. 


Node Version Manager (NVM) to maintain multiple versions of node.js in your system and switch between versions based on the project you want to work on.

```shell

npm install -g ember-cli

ember version
```

shows the licenses provided by all the packages that have been installed, which is useful to ensure we haven't violated any copyrights by installing a package that does not follow an open-source license. 

```shell

npm install -g yarn

yarn licenses list

```

```shell

ember new
```
create a new Ember application. 

```
ember new myEmberProject
```

# Ember addon
An addon is a reusable component that can be imported by any project to reduce the effort of coding the same component again. 

`ember addon myNewAddon`

# Ember init
prompts and resets the code to the initial state when the app was created. 

# Ember install
used to add additional addons to the project.  
runs customized blueprints configured in the installed package.

An **Ember blueprint** is a customized piece of code that will be executed when a package is installed. It can be about generating a required set of code files inside the client app
or installing additional packages required by this addon.

# Ember generate
Ember itself has its own set of blueprints that generate different types of files in Ember. The following are the blueprints available by default:
- Route
- Component
- Controller
- Model

```shell

ember generate route home
```
- Created files for your route and template
- Updated the router to add a mapping for this route
- Adding a test file for this route

# Ember destroy
If you have generated any element by mistake or want to undo the generated route, you use the
destroy command. 
```shell

ember destroy route home
```


# Ember serve
Ember serve runs the code and makes it accessible from a browser through a port. 
By default, 4200 `--port` Parameter. 

When you run ember serve, it runs a server locally. The server keeps running indefinitely unless we decide to close it.

Whenever you make any changes to the code, the browser is automatically notified of it and the page is reloaded to serve the new code. 
Ember CLI (or watchman) keeps listening for changes done to files inside the Ember project, and if there is a change detected, it sends a web socket notification for the browser to reload the page, thus updating the latest code in the browser. 

```shell

brew install watchman
```

# Remote access
You can pass the `--host 0.0.0.0`, and Ember will allow accessing the Ember application from a different machine.

# Ember test
The test runner in Ember can be used to run all the configured tests in the app or to run only a specific set of tests. 
It allows you to ensure that the app is secure and works as expected right from day one. 

The test command summarizes the test results by providing counts of the number of tests run, number passed, failed, etc. By default, the command runs the test suite only once and publishes the results. 

`--server` runs the test server. A test server is similar to a development server, but it runs the test suite explicitly whenever there is a change made to the code. It will automatically open a browser window and show the test results.

`--module` : When running tests during development, you might not want to run all the tests for each and every change. In that case, you can use the module parameter to specify the specific file or test to run in order to save time.

# Ember build
compiling the different files present in the application into one JS file, creating one file from all the CSS files present in the application, and combining all the dependencies into a single JS file. This is required to deploy the app in such a way that the browser just loads the static files and executes them rather than pulling each file from the source code.

Building is the process of combining and minifying the different files in the application into a single file, which will be pulled and used to execute the Ember code in the browser.

`--output-path` path where you want to store the build files.

# Ember asset-sizes
Once we've built the application, one thing to ensure is that
the generated output files are compact. Since these files will
be loaded from a source every time the user loads the page,
it is necessary these files are easily loaded to reduce the
waiting time for the user.


For this purpose, we can use the asset-sizes command to see
the size of the output files. The output of this command will
look like this:
Figure 2.10: Ember asset-sizes
You can see the size of each of the CSS/JS files present in the
output folder. You can also see that Ember provides the sizes
of the files when they are gzipped. Gzipping is a way to
compress the CSS/JS files when storing them in the CDN/file
storage. This reduces the amount of data that is transferred
between the CDN and the browser.


For example, if you look at the vendor.js file from Figure 2.10,
the default size is 2.7M, which when gzipped comes to
602kb. It is reduced to more than 75% of its original size,
which means the file is transferred way faster to the browser.


The browser then uncompresses the file before executing it.


The uncompression time is usually much less compared to
the data transfer time. This does not depend upon the
internet connection speed of the client. Hence, it is preferred
to gzip the files before deployment.


Since the developer/maintainer of the project cannot always
keep track of the growing asset sizes, there are addons that
can be injected into your CI/CD pipeline that will restrict your
output size to a specific amount, and you don't have to
manually check and keep track of the sizes anymore.


# Ember Folder Structure

- README.md
Usually, this file contains the setup and installation instructions for the repo, its
licensing details, and more. You can open the README file in the current project to understand how you can set up and run this project locally.

- app/
As you can see from Figure 2.11, it contains a folder each for routes, controllers, components, templates, models, and also helpers. It contains the base index.html that is loaded in the browser during the build time. It also contains a router.js file, which has the details of all route mappings in the application.

- config/
- `environment.js` 
environment.js is where you specify different configuration settings to be applied to different environments, namely development, staging and production.
You will want to enable specific features only in production, and enable some debugging features only in staging. These configurations go inside the environment file. 
- `targets.js` specify the list of browsers supported by this application. Ember backs this file with popular website usage tracking sites like Browserlist and CanIUse. 
This setting will help Babel to support the latest JavaScript format like ES6.

- ember-cli-build.js
This file defines how Ember CLI should build this application.

It uses a compilation library named `broccoli.js` to build the app. 
We can specify options like how to handle CSS files, enable preprocessors like LESS, SASS or SCSS in the application, and more.

## Source maps
When Ember generates a build, it combines all the source JS files into one single file. Source maps are mapping files with `.map` extensions, which contain information on how the
generated build maps with the source code. This feature is enabled by default in Ember in the development and staging environments, but disabled in the production environment by
default. You can enable it in the production build, too, by adding the following line in the ember-cli-build.js file to the constructor of the EmberApp call present inside the file:
```js

{
…
    sourcemaps: {
        enabled: true
    }
}
```
By doing this, you will be able to view all the source files from the Network tab of the browser, which we will look at in detail in a later chapter corresponding to debugging.

- package.json
contains details like the project name, description, the licensing of the project, and more. The list of dependencies required by this project can also be found in this file. Also,
you can see a scripts section in this file. It defines the list of subcommands that can be run in this project and the subcommands that will be called for the respective commands.

- public/
all asset files that do not need processing. 
When building the project, Ember copies all the files from the public folder into the build path. This folder is normally used to store image files or font files. 
By default, you can see a file named robots.txt in the folder. robots.txt is used by search engines and crawlers to identify which URLs are supposed to be crawled and indexed, which ones should be ignored, and so on.

- `testem.js`
Testem is the test runner that Ember uses internally to run your  tests across browsers.
contains the configurations required for testem.js. You can configure the port you want to run the tests on, a list of tests you want to skip, and so on.

- tests/
The tests folder is where you write all your tests for the project. You can write unit tests, and integration tests specifically, and structure them inside this folder.



`.ember-cli`
parameters that are dynamically passed when running Ember CLI. 
For example, instead of passing the port dynamically by calling the ember serve command, you can add it to this file, and it will be automatically applied whenever you run the server.

# Assets and Styling
For CSS, it is by default combined into a single file from all the source CSS files. Combining them into a single file helps the loading time, as the browser needs to load only one file before it applies the styles on the page. However, when the project size grows, the size of the CSS file can also become large and might cause the combined CSS file to be too large for the browser to load. In order to reduce the size of the output CSS file, we follow a process called minification.

CSS minification is the process of removing extra spaces, new lines, comments, and so on, from the output file so that the file size is reduced to a good extent. It also makes the
CSS file less readable. So, we usually maintain the full version/the beautified version for the development process and minify the CSS during the build time. This ensures that the CSS file the browser loads will be smaller. CSS minification is disabled by default in Ember and can be enabled by adding the following line to the EmberApp constructor in the ember-cli-build.js.

```ts

let app = new EmberApp(defaults, {
    hinting: false,
    fingerprint: {
        enabled: true,
        extensions: ['js', 'css']
    },
        minifyCss: {
            enabled: true
    }
})
;
```

Once the preceding option is added, Ember will minify your CSS files and generate a .min.css instead of just a .css file. 

## CSS Preprocessors
When writing CSS for your project, you might have to write a lot of repetitive code. For example, you would want the padding to be of a certain amount for different objects, like
buttons and cards. You would want a couple of colors being used in multiple places in the project. Using plain CSS means you will have to hardcode the values in all the places,
leading to a lot of redundancy. 


Now, let's say the requirement changes and you have to
change the colors in the project to a different shade. This
means you will have to go through all the places you've
defined the colors before and redo it. Or consider that the
client wants you to create a light theme and dark theme
where the colors vary depending on the end user's selection.




## SCSS/SASS
Sassy CSS (SCSS) is a superset of the default CSS syntax, which allows additional configuration. This means all existing CSS code is valid SCSS code. But not all SCSS code is valid CSS code. It follows the same curly braces syntax of CSS to define blocks. 

## Syntactically Awesome Style Sheets
(SASS) is a more strict version of SASS. It does not use curly braces syntax to identify blocks. It uses indentation to define the blocks (similar to Python syntax). SCSS is the most widely used of the two syntaxes, due to its compatibility with plain CSS code.

`ember install ember-cli-sass`

specify the following lines in the EmberApp constructor of the ember-cli-build.js file:
```ts

sassOptions: {
    extension: 'scss'
}
```

In your `app/styles/` folder, rename file `app.css` to `app.scss`. 

Ember will automatically build the .scss files and create a my-ember-project.css in the dist/assets folder.

The color of the title text should be green and the description text to be bold. 

```css

#ember-welcome-page-id-selector h1 {
    color: green;
}

#ember-welcome-page-id-selector p {
    font-weight: bold;
}
```

In SCSS, the same code can be written this way:
```scss
/* Variables */
$description-font-weight: bold;
$title-color: green;

/* CSS Blocks */
#ember-welcome-page-id-selector {
  h1 {
    color: $title-color;
  }
  p {
    font-weight: $description-font-weight;
  }
}
```

Next, you can open the `dist/assets/my-ember-project.css` file and see that Ember has generated the plain CSS syntax for you from SCSS, and the code looks similar to the plain CSS example mentioned previously. This is the power of CSS preprocessors.

1. What are the main differences between npm and yarn?
2. What are the alternatives to SASS/SCSS? What is LESS?
3. How do you remove an addon installed via Ember CLI?
4. What is a sourcemap and how do you use it?
5. Where do you store static content like images and fonts in an Ember project?


