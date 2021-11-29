# [Front End] Voma is Code for Chicago's custom **vo**lunteer **ma**nagement system.

[![Netlify Status](https://api.netlify.com/api/v1/badges/afcfce28-1025-4d56-ab25-1c8b40d05966/deploy-status)](https://app.netlify.com/sites/voma/deploys)

[https://voma.netlify.app/](https://voma.netlify.app/)

## What is Voma?

At a high level we're trying to achieve the following:

1. Facilitate a smooth process from attending onboarding night to setting up a 1x1 with a project lead
2. Better identify and develop our volunteer's skillsets - where do our skills currently align and where do we want them to go?
3. Integrate with our existing tools (Meetup, Slack, Trello, etc.)
4. Better visualize the scope of our members through skill dashboards and other visualizations
5. Automate whenever possible to reduce bottlenecks in onboarding

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

### Tech Stack

React<br />
Node / Express<br />
PostgreSQL

### Planned Integrations

Slack<br />
Meetup<br />
Trello

### Scope of MVP

1. New Member completes onboarding form (modeled after current Google Form)
2. System generates user profile based on input
3. Project Leads review new volunteers and set up 1x1s / assign to projects

## Repositories

[Front End](https://github.com/Code-For-Chicago/Voma-frontend)<br />

## How to Contribute Guide
[How to Contribute to Voma](How-to-Contribute.md)

## 🔧 Requirements

```
node >=14.17.0
npm >=6.14.13
```

You can use a tool like [nvm](https://github.com/nvm-sh/nvm) to get the version of Node that you need

## 🚀 Setup

1. Clone the project with `git clone git@github.com:Code-For-Chicago/Voma-frontend.git`
2. In the `meta-development` slack channel, request the .env file. Once you receive it, add it to the top-level directory of the app. 
3. Install dependencies with `npm i`
4. Start the Express server with `npm run start`
5. Open a new terminal window or tab
6. Move into the `client` directory with `cd client`
7. Install those dependencies with `npm i`
8. Start the React server with `npm run start`


### Setting up a local database
If you are going to mostly be doing frontend work, you can skip this next section. 

1. The first thing you'll need to do is install the service on you machine. These [installation instructions](https://docs.docker.com/engine/install/) over at the docker docs site are handy for this part. 
  - If you're using Windows I highly advise setting up Windows Subsystem for Linux using version 2 or greater. Doing this will make it so our makefile works in your environment and overall just makes it easier to interact with Docker. Luckily, Docker has also provided a [guide for getting this setup](https://docs.docker.com/docker-for-windows/wsl/).
2. Next, pull the Docker official image for Postgres from the docker hub repository by running the following in your command line: 
`docker pull postgres`
  - You can find the documentation of the [image here](https://github.com/docker-library/docs/blob/master/postgres/README.md)
3. Run the database container using Docker, or Docker Compose.
  * **Docker**: After it finishes pulling, enter the following in your command line:
`docker run -d  -p 5432:5432 -e POSTGRES_PASSWORD=password --name postgres-dev postgres`
    - You can set `POSTGRES_PASSWORD` to whatever you want, just make sure you remember it!
    - You don't need to specify the `--name` either. If you omit this, docker will randomly assign you one.
  * **Docker Compose**: navigate to the /docker-compose/ directory. Verify the postgres username and password in the file here, or modify if desired. Run the command `docker-compose up` to launch the containers for postgres and adminer (database admin tool) [source](https://hub.docker.com/_/postgres). To run containers in the background (do not show live logs in the terminal window), use the `-d` flag; to stop containers running in the background use the command `docker-compose down`.
4. Open up docker and click on the **Containers/Apps** tab. You should something running.
5. Next, we'll pull a **pgAdmin** image. pgAdmin is a an administration and development tool for Postgres. Enter the follwowing in your command line:
`docker pull dpage/pgadmin4`
6. After it finishes pulling, run the image instance with the following command:
        docker run \ 
            -p 80:80 \
            -e 'PGADMIN_DEFAULT_EMAIL=email' \
            -e 'PGADMIN_DEFAULT_PASSWORD=password' \
            --name dev-pgadmin \ 
            -d dpage/pgadmin4
    - Enter your email and your own password for the two environment variables. 
    - Feel free to name it something other than dev-pgadmin.
7. Now we need to grab the host address of our DB server. Enter the following in your command line: 
`docker inspect postgres-dev -f "{{json .NetworkSettings.Networks }}"`. 
It should return a JSON object - look for the `IPAddress` field, and note that value. 
  - Make sure to replace `postgres-dev` with whatever you named your db server in step 3. 
7. Go back to docker. You should see a new instance running. Go to http://localhost:80 in your browser. You will see a pgAdmin login prompt. Enter the credentials you defined in step 6, and you should be able to log in. 
8. Click Add a New Server (or right-click the Servers folder in the left pane and select Create -> Server). In the **General** tab, add a name, something like `dev-server`. On the **Connection** tab, add the IP address you got in step 7 in the **host** field, and enter the username and password you created in step 3. If you didn't specify a username, the default value is `postgres`. It should be able to connect to database. 
9. Create a file named `.env.local` at the root of `voma-frontend`. Enter the following values: 
    DB_NAME='postgres'
    DB_USER='postgres'
    DB_PASSWORD='password'
    DB_HOST='localhost'
  - Make sure to replace 'password' with whatever you set in step 3. 
  - If you specified a different username in step 3, enter that value for `DB_USER`. 
10. Enter the following in your command line: 
`npm run sync`
11. If you get the console message `Database synced!`, you're golden!
  - If you get an SSL error when trying to start the app, you can comment out lines 8-12 in `db/index.js`. 