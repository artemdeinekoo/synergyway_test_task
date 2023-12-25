FROM python:3.9

WORKDIR /app/

COPY requirements.txt /app/
RUN pip install -r requirements.txt

COPY . /app

RUN python manage.py makemigrations --no-input
RUN python manage.py migrate --no-input

CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]


