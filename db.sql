CREATE TABLE USERS (
    uid SERIAL PRIMARY KEY,
    first_name VARCHAR(255), 
    last_name VARCHAR(255), 
    password VARCHAR(255),
    DOB DATE,
    created_date DATE DEFAULT CURRENT_DATE,
    last_modified DATE,
    role INT DEFAULT 0
);

CREATE TABLE TAGS (
    tid SERIAL PRIMARY KEY NOT NULL,
    uid INT,
    tname VARCHAR(255),
    colour VARCHAR(255),
    FOREIGN KEY (uid) REFERENCES USERS(uid)
);

CREATE TABLE SESSIONS (
    sid SERIAL PRIMARY KEY,
    tid INT,
    uid INT,
    date DATE DEFAULT CURRENT_DATE,
    start_time DATE,
    end_time DATE,
    time_spent INT,
    FOREIGN KEY(tid) REFERENCES TAGS(tid),
    FOREIGN KEY(uid) REFERENCES USERS(uid)
);