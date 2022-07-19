-- data to initialize in our database

-- inserting data ahead of time so we can have fake data to work with
-- for development

USE todos_db;
INSERT INTO todos(todo, isCompleted)
VALUES('Run', true),
    ('Wash dishes', false),
    ('Fold laundry', 1),
    ('Print money', 0),
    ('Vogue the house down', false),
    ('Eat dinner', false);