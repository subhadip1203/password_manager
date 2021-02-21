### set up virtual environment

create virtual environment : python3 -m venv env

activate virtual env and go inside virtual env : source env/bin/activate





###   Install Django and Django-Rest-Framework
pip install django djangorestframework django-cors-headers

every time install new package ,edit requirement.txt =>
pip freeze > requirements.txt

### create project 

django-admin startproject SetUp .


### add important app names
edit file settings.py => location : SetUp/settings.py

INSTALLED_APPS = (
    ...
    'rest_framework',
    'corsheaders',
    ...
)

MIDDLEWARE = (
    ...
    #'django.middleware.csrf.CsrfViewMiddleware',
    'django.middleware.common.CommonMiddleware',
    ...
)


CORS_ALLOW_CREDENTIALS = True
CORS_ORIGIN_WHITELIST = [
    'http://localhost:3030',
] 
CORS_ORIGIN_REGEX_WHITELIST = [
    'http://localhost:3030',
]

###  create folders for different versions ( like V1 ,V2 etc)

mkdir V1 && touch V1/__init__.py

