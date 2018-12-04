![Mixolydian](static/logo.png?raw=true)

**Version** 1.1

**Authors**: Andrew Quach and Stan Lyakhov

CS290 Web Development Final Project

## Introduction
Mixolydian is a reddit-inspired website that allows musicians, both hobbyists and professionals, to upload and share their original music with the world. Mixolydian is designed as both a self-promotion platform and a place for users to discover new music of different genres.

Mixolydian operates on a `Flask` backend and a `React` based frontend.
## Planned Features
New functionality and features will be implemented gradually.

- [x] User Authentication
- [x] Music upload
- [x] Music player
- [x] Posts filtering by genre and title
- [x] Individual user page
- [ ] Comment section for each post
- [ ] Post "favorite" system

## Running the Website
The first step to running the server is installing all the dependencies.
The python dependencies can be installed using the `pip` package management system.
```
pip install -r requirements.txt
```

The JavaScript dependencies can be installed using npm.
```
cd static
npm install
```

Finally, the front-end assets need to be bundled using `webpack`.
```
npm run build     # Production build
npm run dev-build # Development/debug build
npm run watch     # Automatically detects changes and executes a development build
```

Before starting the server, the `SQLite` database must be initialized.
```
flask init-db
```

To start the server, you must set some flask environment variables
```
export FLASK_APP=flaskr
export FLASK_RUN_PORT=<port_number>
flask run
```

Alternatively, the `.flaskenv` file contains the required development environment variables that will be set automatically.
