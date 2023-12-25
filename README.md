# SynergyWay Test Task

## Setup project

- fill environments files
- run project

## Fill environment
1. run - > cp .env.sample .env

## Run with docker

> docker-compose up --build

## Start without docker

1. Go to server folder and run
     - > python3 -m venv venv
     - > venv/Scripts/activate
     - > pip install -r requirements.txt
     - > python manage.py makemigrations
     - > python manage.py migrate
     - > python manage.py runserver 0.0.0.0:8000
2. Go to client folder and run
    - > npm i
    - > npm run start 
