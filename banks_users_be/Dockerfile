FROM python:3.9


WORKDIR /app

COPY requirements.txt /app/
RUN pip install -r requirements.txt

COPY . /app

RUN python manage.py makemigrations
RUN python manage.py migrate