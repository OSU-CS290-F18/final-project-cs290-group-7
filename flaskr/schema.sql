DROP TABLE IF EXISTS user;
DROP TABLE IF EXISTS post;
DROP TABLE IF EXISTS token;

CREATE TABLE user (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    uname TEXT UNIQUE NOT NULL,
    pass TEXT NOT NULL,
    registered REAL NOT NULL,
    upvotes INTEGER default 0
);

CREATE TABLE post (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    genre TEXT NOT NULL,
    author_uname TEXT NOT NULL,
    upvotes INTEGER NOT NULL DEFAULT 0,
    created REAL NOT NULL,
    music TEXT NOT NULL,
    FOREIGN KEY (author_uname) REFERENCES user (uname)
);

CREATE TABLE token (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    jti STRING NOT NULL,
    identity TEXT NOT NULL,
    revoked INTEGER NOT NULL DEFAULT 0,
    expires REAL NOT NULL,
    FOREIGN KEY (identity) REFERENCES user (uname)
)
