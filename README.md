<<<<<<< HEAD
# app
=======
# Tatkal Ready — booking preparation assistant

A small static web app to prepare a train journey, keep traveller profiles in the current browser, use a booking-time countdown, and track a readiness checklist. Booking is completed manually through the official IRCTC website.

## Features

- Journey details and planned booking countdown
- Passenger profiles stored in browser `localStorage`
- Copy passenger details to clipboard
- Persistent pre-booking checklist
- Docker image served by Nginx
- Docker Compose for local run
- GitHub Actions CI build on pushes and pull requests

## Run locally with Docker

Requirements: Docker Engine and Docker Compose plugin.

```bash
git clone <YOUR_GITHUB_REPOSITORY_URL>
cd tatkal-assistant
docker compose up --build -d
```

Open http://localhost:8080.

View logs and stop the app:

```bash
docker compose logs -f
docker compose down
```

## Run without Docker

Open `app/index.html` in a browser, or serve the `app/` directory with a local static web server.

## Push to GitHub

Create an empty repository on GitHub, then run inside this directory:

```bash
git init
git add .
git commit -m "Initial Tatkal Ready app"
git branch -M main
git remote add origin https://github.com/<YOUR_GITHUB_USERNAME>/tatkal-assistant.git
git push -u origin main
```

GitHub Actions will build the Docker image on pushes and pull requests to `main`. This workflow builds the image; it does not publish or deploy it.

## Data and privacy

Passenger profiles, trip details, and checklist status are stored in browser `localStorage` on the device and browser being used. They are not sent to a backend by this app. Anyone with access to that browser profile may be able to see them. Do not store IRCTC passwords, OTPs, payment credentials, Aadhaar numbers, or other sensitive identifiers. Use a private/trusted device and clear browser data when appropriate.

## Scope and compliance

This app does not automate login, CAPTCHA, payment, seat selection, or ticket submission. It does not fetch live availability. Confirm current rules and booking timings on official IRCTC channels: https://www.irctc.co.in/nget/train-search.
>>>>>>> 65482fe (train)
