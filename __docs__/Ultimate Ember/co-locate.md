Ember.js applications traditionally separate route files (e.g., app/routes/my-route.js) and template files (e.g., app/templates/my-route.hbs) into distinct routes and templates folders, 
respectively. 

However, you can achieve co-location of templates and route files within the same folder using the Pods structure in Ember CLI.


You can enable the Pods structure in your Ember CLI application by setting the `usePods: true` in your `ember-cli-build.js` file:
```js

    // ember-cli-build.js
    module.exports = function(app) {
      // ... other configurations
      return app.toTree({
        // ... other configurations
        usePods: true
      });
    };
```    

Alternatively, you can generate new routes with the Pods structure enabled using the `--pod` flag:

```shell

    ember generate route my-route --pod
```

With Pods enabled, your folder structure will change. 
Instead of separate routes and templates folders, you'll have a single folder for each route, containing both the route file and its corresponding template.
For example, for a route named `my-route`, the structure would look like this:

```

    app/
    ├── my-route/
    │   ├── route.js
    │   └── template.hbs
    └── router.js
```    

- app/my-route/route.js contains the route definition.
- app/my-route/template.hbs contains the template for my-route.
> Note: While Pods offer a way to co-locate templates and routes, it's important to be aware of the implications on project structure and how you organize other related files (e.g., controllers, components). 
> The Ember community has evolved its recommendations over time, and while Pods were popular, more recent approaches might favor a more component-centric architecture with template co-location at the component level.