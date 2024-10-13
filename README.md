# Full Stack Interview

#### Todo list for TODO app

- Replace dummy Dockerfile with [docker multi environment](https://github.com/vercel/next.js/tree/canary/examples/with-docker-multi-env)
- Add pino logger to Nest.js 
- Migrate to Nx Monorepo
- use tRPC for end-to-end type safety
- Add health check for MongoDB and Service
- Add pagination for todo list
- Add E2E test by using PlayWright
- Replace .env with .env.local
- Improve Accessibility [mdn](https://developer.mozilla.org/en-US/docs/Learn/Accessibility)


#### How to Run
```sh
docker compose up --build dashboard
# OR
docker-compose up --build dashboard
```

## Description

This project is a simple TODO application. This web app is very simple and consists of a single main entity, _todos_, whose schema is as follows:

- title: string
- creation_time: datetime
- estimated_time: int # in minutes

Users can:

- access the main page, listing all todos in a clean and well-organized manner
- add a new todo
- delete an existing todo

This is a simple demo project and no login or persistent user state is required: you can assume a single user will be using this system.

## Example

To give an example, a user can open the web application and see a list of current TODOs. They can then add a new TODO by entering title, and estimated time.
Once added, the new TODO will appear in the list. If the user decides they no longer need a TODO, they can delete it by interacting with it in a way that you will decide.

## Required Tools and Involved Tech Stack

Tools:

- Python (3.10 or later) (recommended [uv](https://docs.astral.sh/uv/getting-started/installation/), but can use any other alternative - conda, venv, ... - for local development)
- npm
- Docker

Tech Stack:

- MongoDB
- FastAPI
- React/Next.js

## Instructions

Your job is to implement this web app, starting from the skeleton code provided. More specifically:

- You'll be using MongoDB as the database. The _mongo_ folder contains a data sample to populate your database.
- You'll be using FastAPI to implement the actual TODO service. This service:
  - Interacts with MongoDB.
  - Is exposed through a REST API (which the dashboard will invoke).
  - Allows users to view, add and delete TODOs.
- You can decide whether to use React (_dashboard-react_ folder) or Next.js (_dashboard-next_ folder) to implement the user dashboard, with the features listed above. Next.js is preferred, but React is also acceptable. In any case, delete the folder you are not going to use and rename the other one to _dashboard_.

All three folders (_mongo_, _service_, \*dashboard-\*\*) have README.md with the instruction to run the three projects. Those instructions are expected to work unchanged.
