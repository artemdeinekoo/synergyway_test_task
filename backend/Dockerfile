FROM python:3.9

ENV PYTHONUNBUFFERED 1
ENV PYTHONDONTWRITEBYTECODE 1

WORKDIR /app/backend

COPY requirements.txt /app/backend/
RUN pip install -r requirements.txt


CMD [ "python", "manage.py", "runserver", "0.0.0.0:8000" ]