# Django sample

A small Django app with an `Item` model, list views and tests.

## Setup

```bash
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
cp .env.example .env
python3 manage.py migrate
python3 manage.py runserver
```

Open http://127.0.0.1:8000/ and http://127.0.0.1:8000/items/.

## Test

```bash
python3 manage.py test -v2
```

CI runs this on every change through `.github/workflows/django-ci.yml`.
