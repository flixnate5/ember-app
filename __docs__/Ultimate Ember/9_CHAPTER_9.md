# CHAPTER 9 Build and Deployment

We will also look at how you can automate your deployment process and connect it with your version control management system in order to reduce the manual effort/errors involved in the deployment process.

Building the Application
ember-cli-deploy
Deploying to AWS
Deploying to GCP
Deploying to Azure


```shell

ember build --environment=production
```

Generating the build will create a static output of the Ember application and place it inside a dist/ folder created in the
project. 
You can customize the folder of output to a different folder by passing the --output-path parameter passed to the build command.

it is all about uploading the
build files to an online directory that can serve the files on
demand. There are different cloud hosting providers that we
can use to serve the files. We will go through a few of them
and see how the application can be set up online.


ember-cli-deploy
In order to deploy the application automatically to any of the
cloud hosting providers, we will need the ember-cli-deploy
plugin that takes care of interfacing with the APIs of different
providers and programmatically upload our build files into
the specified locations. We can install ember-cli-deploy with
the following command:
ember install ember-cli-deploy ember-cli-deploy-build
ember-cli-deploy is a base plugin and it will need additional
plugins based on the hosting provider to interface with the
APIs of that particular provider. We will look at how you can
set up the plugin for each provider when we discuss in detail
the deployment steps for each provider. We also need to
install
the
ember-cli-deploy-build
plugin
alongside
to
automatically create a build before deploying it to the
specific provider.


# Deploying to AWS
The first provider we are going to see is Amazon Web Services (AWS). 
Amazon provides a huge variety of services to deploy and manage your cloud applications. 
We are going to use the S3 service of AWS to deploy our application.

AWS account by visiting https://portal.aws.amazon.com/billing/signup. 

# Creating a Bucket
The S3 service allows you to create directories called Buckets inside which we can upload our files and manage who can access them. Once logged in to your AWS account, you can
search on the top bar for S3 and go to the S3 service. Inside
the S3 dashboard, click the Create Bucket option. We need to
provide the following information for creating the bucket:
Bucket Type: The Bucket Type can be General Purpose, since
we are going to use this as a deployment container for
our website.


Bucket Name: Any bucket name you prefer. Usually for
hosting websites, it is preferred to name the bucket the
same as the domain name you will be applying to this
bucket.


Object Ownership: Since this is going to be an Ember
application, we will need public access to all the files
present in the bucket. Hence, we need to select ACLs
Disabled. ACL means Access Control List. ACL can be
enabled when you want to provide different access
permissions for individual files/folders in the bucket. For
example, when you want users to access only folders
that are in their name, an ACL can be set for each folder.


In our case, we will be using bucket policy to determine
who can access the data. We will discuss that next.


Public Access: The bucket is going to contain a frontend
application and hence it has to be opened for anyone to
access. For that purpose, we are going to uncheck the
Block all Public Access checkbox. That will require you to
acknowledge that everyone can access the files using
another checkbox below that field.


The remaining items can be left as the default values and
the bucket can be created. Once created, you will be
redirected to a list page containing the list of buckets in your
account. Select our newly created bucket to view its files.


Once inside the bucket, you can use the Upload option on the
top right section of the bucket. In the upload page, select
Upload Folder and upload all the contents from the dist folder,
or simply drag and drop the contents of the dist folder into
the upload space and click the Upload button. Once uploaded,
the bucket will look like this:
Figure 9.1: AWS Bucket
We can see all the contents of our dist folder listed in the
bucket. But still, it is not accessible for everyone. To make it
accessible, we need to do two things as follows.


Enabling Static Website Hosting
We need to change the setting in the bucket to notify that
the bucket will serve as a static website. For that, we need to
go to the Properties section seen in the list of tabs, and scroll
to the end of the section to see a card named Static Website
Hosting. You can see that it is disabled by default. You can
enable it by clicking the Edit button in the section and
clicking the enable radio button. When you click enable, it will
ask for a few options:
Hosting Type: We are going to host a static website.


Index Document: This field determines which file should be
the default file when a request is made to this bucket.


Since index.html should be served for all the requests, we
will put that as the Index Document.


Error Document: Usually, when a request is made to an S3
bucket, AWS looks for the specific file relative to the root
of the bucket. For example, if the URL is some-
bucket.aws.amazon.com/my-folder/test, then it looks for
a folder called my-folder in the root of the bucket and a
file named test inside that folder. Since our application is
not going to provide individual files for each URL, AWS
cannot find these files when looking for them. In those
cases, the Error Document specified will be served by
AWS. In our case we want index.html to be served for all
requests. So we will set that as the Error Document.


You can click Save Changes after providing the discussed
values. Once saved, you can see the Static Website Hosting
enabled and a URL associated with the bucket. It will be
similar to what you see in the following figure:
Figure 9.2: AWS Static Website Hosting
Enabling Public Access
Even though we can see a URL for our website, when you
visit the URL you will be seeing a 403 Forbidden error. It
appears so because we have not configured public access for
our files and AWS does not allow unauthorized people from
accessing the files. Let us remedy this by enabling public
access.


In order to enable public access, we need to go to the Bucket
Policy section of the Permissions tab in the bucket. The Bucket
Policy section can be used to define who can access which
folder/file in the application. Since our use case requires
public access to all our files, here is what we will set in our
Bucket Policy:
```json


{
  "Version": "2012-10-17",
  "Id": "MyPolicy",
  "Statement": [
    {
      "Sid": "PublicReadForGetBucketObjects",
      "Effect": "Allow",
      "Principal": "*",
      "Action": "s3:GetObject",
      "Resource": "arn:aws:s3:::emberapplication.com/*"
    }
  ]
}
```
Based on the policy JSON we added, we are simply stating that we will allow any request to our resource, which falls under `s3:::emberapplication.com/` folder. 
This will mean all the files inside the bucket are publicly accessible. Once you add the Bucket policy and save, you can wait a minute for these changes to take effect and then visit the bucket hosting URL to see our Ember application in action. Now that we have set up the application, we will look at a way to automate the deployment process instead of manually uploading files like we did just now.

# Create Programmatic User
For setting up automated deployments, we need to create a programmatic user that has access to the S3 bucket. Here are the steps: 
1. Search for the IAM section in the top bar to go to the User Management section of AWS.
2. Inside IAM, select the Users menu item from the left menu.
3. Click Create User to set up our user.
4. Provide a name for our user. For example, my-application-programmatic-access.
5. You can see a checkbox that says Provide user access to the AWS management console - This checkbox should be selected if the user we are creating should be able to login to the AWS portal that you are using now. Since that is not required, we leave the checkbox disabled.
6. Next, we need to provide permissions for the user. Since the user is going to interact only with S3 for now, we will provide only S3 access to the user.
7. Select Attach Policies Directly.
8. In the provided list of policies, search for S3FullAccess and add only that policy to the user.
9. By doing this, we are allowing the user to only access S3 and no other service. If needed, we can even create policies that will allow the user access to only the bucket that we wish, instead of the entire S3 service. 
10. Click Create User after selecting the policy. Now the user is created and ready to use.
11. Since the user is programmatic, we will need an Access Key and Secret combination to access AWS APIs on behalf of the user.
12. For creating the credentials, go to the particular user's page, click the Security Credentials tab and go to the Access Keys section.
13. Click Create Access Key and in the use cases list, select Command Line Interface option and click Next and Create Access Key.
14. Make sure to Download the CSV of the generated keys, as the secret cannot be seen anymore once you move out of this screen.

`ember-cli-deploy-s3`
ember-cli-deploy-s3 is a plugin specific for deploying Ember apps to S3. We will install it using the following command:
```shell

ember install ember-cli-deploy-s3
```

Once installed, we need to add the following configuration inside the config/deploy.js file:
```js

ENV.s3 = {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    bucket: process.env.AWS_BUCKET,
    region: process.env.AWS_REGION,
    acl: false
}
```

Note that we do not specify any credentials within our code and we simply fetch it from the process.env. Notice that we have specified the configuration inside the production environment because we might have a different provider for
our staging environment or we will have to deploy to a different bucket for staging and hence we will use a different
set of keys for the bucket. We have also specified acl: false because our bucket does not support ACL and we have an
overall configuration for the files. 

We can supply the data to process.env by adding the following to our .env file:
```dotenv

AWS_ACCESS_KEY_ID=<Your Access Key>
AWS_SECRET_ACCESS_KEY=<Your Secret Access Key>
AWS_BUCKET=emberapplication.com
AWS_REGION=us-east-1
```
In order to test if the process works, you can make some small change to the application and run the following command:
```shell

ember deploy production
```
Running the mentioned commands will create a new build and deploy that build to the specified S3 bucket. We can see the changes by refreshing our bucket URL. 


# Deploy to GCP
Google Cloud Provider (GCP) is Google's infrastructure and cloud management service. You can access the Google Cloud Console using your existing Gmail/Google account by visiting https://cloud.google.com and clicking the Console menu on
top. Once you go into the console, there is an additional step in creating and activating a billing account in GCP.

https://cloud.google.com/billing/docs/how-to/modify-project mentions the steps needed to enable the billing setup for your project.

## Creating a Bucket
Similar to S3, GCP offers a service called Google Cloud Storage (GCS). We will follow the same procedure as AWS to create a bucket. Go to GCS by searching for Cloud Storage in the search bar on top of the page.

In Cloud Storage, you can create a new bucket using the Create Bucket button. In the create bucket form, the following details have to be entered:
- Name: Provide a name for your bucket. It is good practice to name the bucket to be the same as your domain name.
- Storage type: We can select the Auto storage class since we don't need a specific class of storage.

We will need to set up Access Control for the files. We will select Uniform as we will need the same permission set for all the files.

Once the bucket is created, we can upload all the files from the dist folder into the bucket by clicking the Upload Files button in the Objects tab of the bucket. Now that the files are uploaded, we will make changes to the bucket setup to enable public access and Static Website Hosting to the bucket.

## Enable Public Access
For enabling public access, you can follow these steps:
1. Go to the Permissions tab in your GCS bucket.
2. Inside the Permissions tab, go to the Public Access pane and we can see that public access is disabled. In order to enable it, click the Remove Public Access Prevention button you see at the top of the pane and click Confirm.
3. Once you've enabled public access, you can then share the files by clicking the Grant Access button in the same pane.
4. Here, we will enable access for all users to read the files in the bucket. In order to do that, enter allUsers in the New Principal field.
5. allUsers in this section defines any request coming to this bucket (both authenticated and unauthenticated requests)
6. In the role dropdown field, we need to select Storage Object Viewer as the role. It means that for all the requests we will allow viewing the objects in this bucket.
7. Click the Save button and confirm the same by clicking the Allow Public Access button.

Now we will have public access enabled for this bucket.

# Enable Static Website Hosting
For enabling Static Website Hosting, we need to set up the Index Document and Error Document that we specified in AWS.

Follow these steps:
1. Go to the buckets list page in Cloud Storage.
2. Click the three dots specific to our bucket and select Edit Website Configuration.
3. In the dialog that opens, specify index.html in both the Main page and the Error page.
4. Click Save.

You can now access the application by clicking the URL associated with the index.html file in the bucket.

Unfortunately, GCP does not allow creating a generic URL for
the bucket like AWS. It requires us to set up a domain and
map the domain to GCS to access the application. Hence, for
the scope of this book, we will load the application by
loading the index.html file.


Create Programmatic User
Next, in order to automate the deployment process, we will
need to create a programmatic user who can access the GCP
from our command line. Such users are named as Service
Accounts in GCP. Create a service account through the
following steps:
1. Search for Service Account in the top search bar.


2. In the Service Account dashboard, click Create Service
Account.


3. Provide a name for your service account and click Next.


4. In Grant Service Account access to this project section, we
will provide it with access to our Cloud Storage. Select
the role Environment and Storage Object Administrator.


5. Click Done to complete the setup.


Once the service account is created, you can see the
account is identified by an email address. We need to
generate a key to allow access to GCP services via this
service account. Let us do so using the following steps:
1. Inside the newly created service account, go to the Keys
tab.


2. Click Add Key and Create New Key.


3. In the key type, select JSON and click CREATE.


A JSON file will be downloaded with the credentials required
for this user. We will use the Private Key field in that file as a
credential to access the application.


ember-cli-deploy-gcloud-storage
The Gcloud Storage plugin of ember-cli-deploy allows us to
deploy our application into the GCS service. To test this, let
us deploy our staging setup to GCP. In the config/deploy.js
file, let us add the following to the staging environment.

```js

if (deployTarget === 'staging') {
    ENV.build.environment = 'production';
    ENV['gcloud - storage'] = {
        credentials: {
            private_key: process.env.GCLOUD_PRIVATE_KEY,
            client_email: process.env.GCLOUD_SERVICE_ACCOUNT_EMAIL,
        },
        projectId: process.env.GCLOUD_PROJECT_ID,
        bucket: process.env.GCLOUD_STORAGE_BUCKET,
    }
}
```
We do not hardcode the credentials in the code here as well.


The corresponding values will be added to our .env file to be taken during the deployment process. The projectId can be
fetched by clicking the project name that you see on top of the cloud console (to the left of the search bar).

Once the .env file is updated, you can run the deployment using ember deploy staging to see the files getting uploaded to
your GCS bucket. 

-------

# Deploy to Azure
Azure is the Cloud Infrastructure Management tool offered by Microsoft.

https://azure.microsoft.com/en-in/free/.

In order to facilitate the integration, let us first set up the GitHub repository for our project.

`ember-cli-azure-deploy`
We will install the ember-cli-deploy plugin specific for Azure: 
```
ember install ember-cli-azure-deploy
```


Git status allows you to see the list of uncommitted files in the repository. 
Since we have not configured any repository yet, all the folders/files in the root directory of the repository will show up in the list. We need to add our newly created repository to this project using the following command:
```shell

git remote add origin git@github.com:aswinm/sample-ember-application.git
```

 open the .gitignore file in the repository and add .env to the end of the file.

```shell

git add .
git commit -m "Initial Commit"
git push origin main
```

## Create Static Web App
Azure provides a service named Static Web Apps for
deploying front-end-frameworks. This static web app can be
integrated with your GitHub repository directly.


1. Search for the Static Web Apps service in the search bar
on top of the console.


2. Inside the Static Web Apps section, click Create +.


3. Provide a name to your application.


4. In the deployment source section, select GitHub
5. It will then ask you to provide access to your GitHub
account.


6. Click the link and enable access to your GitHub account
7. Then it will allow you to select your repository and
branch.


8. Select the newly created repository and the default
branch main.


9. Click Create.


Once the static web app is created, Azure automatically does
a few changes to your GitHub repository:
Adds a new file inside your repository for the
deployment workflow
Adds a deployment token into your GitHub Actions
configuration
You can go to the Actions section in your repository to see the
CI/CD pipeline created by Azure. But we can see that the
latest deployment failed. You can see an error similar to this:
Figure 9.3: GitHub Actions failure
This error occurs because we have not configured the folder
in which the build files will be stored. Our Ember application
stores the output files into the dist folder. We need to specify
this in our github workflow file. Pull the latest code
containing the commit made by Azure into your local by
doing:
git pull origin main
Once
pulled,
you
can
see
a
file
named
.github/workflows/<some-random-name>.yml.


This file is a GitHub Action file, containing the steps for
automatically deploying the code to your Azure Static Web
App. Inside the file, you need to look for a line named
output_location, which will contain an empty value. Replace
the line with the following:
output_location: "dist"
We can now push these changes just like we did earlier and
see the github actions succeed. The GitHub Actions is a
CI/CD pipeline that automatically deploys your branch into
the specified environment (Azure Static Web App in this
case) by simply adding a commit to the specified branch of
our repository (We have configured the main branch in our
Static Web App). Next, we can visit the Static Web App URL
available on the Static Web App overview page.


Figure 9.4: Azure Static Web App URL
You can click the URL to visit our web application hosted as
an Azure Static Web App.


Adding Environment Variables to
GitHub
In the previous setups, we initiated the deployment process
from our local terminal. Hence, the required ENV variables
were being fetched from the .env file we have inside our
project. But in this case, we are doing the deployment from
the Github Actions environment. We have intentionally not
pushed our .env file to the repository, for security reasons.


So how will the build process access the environment
variables in that case? We will need to specify them in the
repository settings in GitHub.


1. Go to the Settings tab of the repository.


2. In the settings page, expand the Settings and Variables
menu in the left navbar and select Actions inside it.


3. In the Actions section, we can already see the
AZURE_STATIC_WEB_APPS_API key configured to supply the
Azure authentication token into the Github Action. This is
how GitHub authenticates to upload the files to their
portal.


4. Here, click New Repository Secret and provide the name
and value for each secret that we have in our .env file
that we want to expose to the GitHub Actions runtime
environment.


We can see that the values are not visible once uploaded.


This makes it secure from even people who can access the
Settings page of the repository. The values uploaded can
only be seen during the upload time and even when editing,
the old value will not be displayed.


This completes our automatic deployment setup to push our
application as an Azure Static Web Application.


# Conclusion
We learned the workarounds of using the `process.env` object to access secure variables.

When setting up Azure, we saw automated deployments using GitHub actions, how it automatically pushes the code into the Azure environment when we add a commit to our main branch.

environment variables in a secure manner using the Secrets and Variables section of the GitHub settings, thus exposing our credentials only to the Github Actions environment. 

Ember builds the code into static CSS and JS files 
The build folder can be uploaded and served just like any static HTML site

The browser downloads the static files and the JS files in the build activate the Ember environment in the browser

Multiple Choice Questions
1. What is the best way to serve an Ember application in a production environment?
a. Run the ember server and access it through port 4200
**b. Generate a static build and upload it to a cloud environment**
c. Both
d. None of the Above
2. Which of the following is not a cloud hosting provider supported by ember-cli-deploy by default?
a. AWS
b. GCP
c. Azure
**d. Digital Ocean**
3. What is the AWS service that allows Static Web Hosting?
**a. S3**
b. S4
c. Static Hoster
d. None of the above
4. What is the GCP service that allows Static Web Hosting?
a. Compute
b. Cloud Functions
**c. Cloud Storage**
d. Cloud File System
5. What is the Azure service that can be used for deploying a Static Web Application?
a. S3
**b. Static Web Apps**
c. Websites
d. Compute

### Questions
1. How does the Ember build process work internally?
2. What are the advantages of generating a static build?
3. What is a CDN and how does it help in serving our static website?


Static Build: An easily deployable version of our Ember Application that can be downloaded and run in any browser with ease
AWS: Cloud Hosting Solution provided by Amazon
GCP: Cloud Hosting Solution provided by Google
Azure: Cloud Hosting Solution provided by Microsoft
Secrets: Credentials that cannot be hardcoded into our codebase. They have to be configured and supplied separately.

