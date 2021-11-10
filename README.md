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
