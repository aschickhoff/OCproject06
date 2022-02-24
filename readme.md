<h1 align="center">OpenClassrooms Project 6</h1>
<h3 align="center">Develop a User Interface for a Python Web Application</h3>

<p align="left">This is my sixth project for OpenClassrooms where I had to develop a website that will retrieve movie data from an API and display it on a web interface. 


</p>

## Prerequisite

- [Python3](https://www.python.org/ "Python") is installed

## Installation Steps

1. Clone the repository

```Bash
git clone https://github.com/aschickhoff/OCproject06.git
```

2. Clone the OCMovies-API project
```Bash
git clone https://github.com/OpenClassrooms-Student-Center/OCMovies-API-EN-FR.git
```

3. Move to the ocmovies-api root folder
```Bash
cd ocmovies-api-en
```

4. Install project dependencies
```Bash
pipenv install
```

5. Create and populate project database
```Bash
pipenv run python manage.py create_db
```

6. Run the server
```Bash
pipenv run python manage.py runserver
```

7. Open index.html
