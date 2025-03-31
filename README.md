<img width="1001" alt="Screenshot 2025-01-30 at 10 50 10 AM" src="https://github.com/user-attachments/assets/d2366db1-28b8-4acc-812b-908a9812cde7" />


🚀 From Code to Cloud Automating ReactJS Deployment: Building a CI/CD Pipeline for a ReactJS BookApp-Store with AWS, Docker, and GitHub. 


![2025-02-04 (8)](https://github.com/user-attachments/assets/87719dfc-88b9-449d-860e-d0c81a2d7a6c)

Automating the Continuous Integration and Continuous Deployment (CI/CD) process ensures faster releases, better scalability, and fewer deployment failures.
That's where CI/CD (Continuous Integration and Continuous Deployment) comes in. CI/CD automates the entire process of building, testing, and deploying your app, so you can focus on writing code instead of worrying about deployments.

AWS CodePipeline is a powerful tool that automates your CI/CD workflow. It integrates seamlessly with other AWS services like CodeBuild and CodeDeploy, as well as external tools like GitHub and Docker.
Clone Repo: https://github.com/etaoko333/BookAppFrontend-Store.git

📌 Tech Stack & Tools Used
- GitHub: Stores our ReactJS app's source code and triggers the pipeline whenever we push new changes.
- AWS CodeBuild: Builds and tests our app, then packages it into a Docker container.
- Docker: Ensures our app runs consistently across different environments.
- AWS CodePipeline: Orchestrates the entire process, from code changes to deployment.
- ReactJS - Frontend framework
- AWS IAM - Managing security and permissions
- Amazon ECR - Storing Docker images
- GitHub - Source code management

 🏗 Step 1: Setting Up the ReactJS Application
Every great app starts with code. If you don't already have a ReactJS app, you can create one using create-react-app:
``npx create-react-app my-react-app``
``cd my-react-app``git init

🐳 Step 2: Dockerizing the the React Application 
- Why Docker?
Docker is a game-changer for modern development. It allows you to package your app and its dependencies into a lightweight container that runs consistently across different environments.
Creating a Dockerfile
- In the root directory, create a Dockerfile:
# Use an official Node.js image for building the app
`FROM node:18-alpine as build`
# Set working directory
`WORKDIR /app`
# Copy package files and install dependencies
`COPY package*.json ./`
RUN npm install
# Copy the app's source code
`COPY . .`
# Build the React app
`RUN npm run build`
# Use Nginx to serve the app
`FROM nginx:alpine`
COPY - from=build /app/build /usr/share/nginx/html
# Expose port 80
`EXPOSE 80`
# Start Nginx server
`CMD ["nginx", "-g", "daemon off;"]`

- This Dockerfile does the following:
- Uses Node.js to install dependencies and build the React app.
- Uses Nginx to serve the built app on port 80.
- Push the Dockerfile to your GitHub repository.

🚀 Step 3: Setting Up AWS CodePipeline
- IAM Roles & Permissions
- To make sure AWS CodePipeline, CodeBuild, and CodeDeploy can interact securely, we need IAM roles with specific permissions.
- 📌 IAM Role for AWS CodeDeploy
- 📌 IAM Role for AWS CodePipeline
- 📌 IAM Role for AWS CodeBuild
- 📌 Configure the SSM: Parameter

![2025-02-04](https://github.com/user-attachments/assets/7008bee4-7bb0-4c9d-b6b4-c6a4ccc20b01)




🏗 Step 4: Create buildspec.yml for AWS CodeBuild
- 📌 This file tells AWS CodeBuild how to build and push our Docker image.
`version: 0.2`
`phases:`
` install:`
` runtime-versions:`
` nodejs: 16`
` commands:`
` - echo "Installing dependencies…"`
 - npm install
` build:`
` commands:`
` - echo "Building the React app…"`
` - npm run build`
` post_build:`
` commands:`
` - echo "Building Docker image…"`
 `- docker build -t my-react-app .`
`artifacts:`
` files:`
` - '**/*'`
 **base-directory: build**
- This file tells CodeBuild to:
- Install dependencies.
- Build the React app.
- Build a Docker image.
- Push the buildspec.yml file to your GitHub repository.

**Step 5: Setting Up AWS CodeBuild**
- AWS CodeBuild is where the magic happens. It takes your code, runs the commands in buildspec.yml, and produces a build artifact (in this case, a Docker image).
- Go to AWS CodeBuild in the AWS Management Console.
- Click Create Build Project.
- Configure the project:
- Project Name: my-react-app-build
- Source Provider: GitHub
- Repository: Connect to your GitHub repository.
- Environment Image: Managed Image, Ubuntu, Standard Runtime, aws/codebuild/standard:5.0
- Buildspec: Use the buildspec.yml file in your repo.
- Click Create Build Project.

🚀 Step 6: Create appspec.yml for AWS CodeDeploy
- 📌 The appspec.yml file is used by AWS CodeDeploy to manage deployments. Create this file in the root of your project:
`version: 0.0`
`os: linux`
`files:`
` - source: /`
` destination: /var/www/html`
`hooks:`
 `ApplicationStop:`
 `- location: scripts/stop_server.sh`
 timeout: 300
` runas: root`
 `ApplicationStart:`
 `- location: scripts/start_server.sh`
 `timeout: 300`
` runas: root`

- This file tells CodeDeploy how to deploy your app to your target environment (e.g., ECS, EC2, etc.).

**Step 7: Setting Up AWS CodePipeline**
- AWS CodePipeline ties everything together. It orchestrates the entire CI/CD workflow, from code changes to deployment.
- Go to AWS CodePipeline in the AWS Management Console.
- Click Create Pipeline.
- Configure the pipeline:
- Pipeline Name: my-react-app-pipeline
- Source Stage: Connect to your GitHub repository.
- Build Stage: Select the CodeBuild project you created earlier.
- Deploy Stage: Configure deployment to your desired target (e.g., ECS, EC2, etc.).
- Click Create Pipeline.

**Step Step 8: Testing the Pipeline**
- Now for the fun part - testing your pipeline!
- Watch as AWS CodePipeline automatically:
- Pulls the latest code from GitHub.
- Builds the app using CodeBuild.
- Builds the Docker image.
- Deploys the app to your target environment.
- Visit your app's URL to see the updated version live!

**🔧 Step 8: Push Code to GitHub**
- Since we are using AWS CodePipeline, which integrates with GitHub, we need to push our repository:
`git add .`
`git commit -m "Updated app text"`
`git push origin main`

**The Result: A Fully Automated CI/CD Pipeline**
- Congratulations! You've just built a fully automated CI/CD pipeline for your ReactJS app. Every time you push new code to GitHub, your app is automatically built, tested, and deployed. No more late-night deployment headaches - just fast, reliable updates.
- This setup is just the beginning. You can extend your pipeline by adding testing stages, notifications, or deploying to other AWS services like ECS or CloudFront.

**Why This Matters**
- CI/CD pipelines are more than just a convenience - they're a necessity in modern software development. They enable you to:
- Ship faster: Automate repetitive tasks and focus on writing code.
- Reduce errors: Catch issues early with automated testing.
- Scale effortlessly: Handle updates and new features with ease.
-By combining AWS CodePipeline, Docker, and GitHub, you've built a pipeline that's not only powerful but also scalable and reliable.

**Final Thoughts**
Building a CI/CD pipeline might seem daunting at first, but the rewards are well worth the effort. With automation, you can spend less time worrying about deployments and more time building amazing apps.
So, what are you waiting for? Dive in, automate your workflow, and take your development process to the next level.

- Got questions or suggestions? Drop a comment below or connect with me on LinkedIn! Let's build something amazing together. 🚀

#CICD #AWS #ReactJS #Docker #DevOps #Automation #CloudComputing


