---- Queries

-- **Question 1** — List the title and published year of every book in the `'Science Fiction'` genre, ordered by published year (oldest first).

SELECT title, published_year, genre
FROM books
WHERE genre = 'Science Fiction'
ORDER BY published_year ASC;

-- **Question 2** — Show every book published before 1950. Display the title and year only.

SELECT title, published_year
FROM books
WHERE published_year < 1950;

-- **Question 3** — Show every book in the database along with its author's full name. Combine `first_name` and `last_name` into a single column called `author`. _(Hint: you will need a JOIN.)_
SELECT b.title, a.first_name || ' ' || a.last_name AS author
FROM books b
JOIN authors a ON b.author_id = a.id;

-- **Question 4** — List all books written by Stephen King. Show the title and published year, ordered by year. _(Hint: JOIN the two tables and filter on the author's name.)_
SELECT b.title, b.published_year
FROM books b
JOIN authors a ON b.author_id = a.id
WHERE a.first_name = 'Stephen' AND a.last_name = 'King'
ORDER BY b.published_year ASC;

-- **Question 5** — Add yourself as a new author. Use your real name, or make one up. Pick any nationality and birth year.
SELECT * FROM authors; 
INSERT INTO authors (first_name, last_name, nationality, birth_year)
VALUES ('Bader', 'Almsaddi', 'Syrian', 1993); 

-- **Question 6** — Add one book for the author you just inserted. It can be a real book or a made-up one.
INSERT INTO books (title, author_id, genre, published_year)
VALUES (
  'Potatos Adventure', 
  (SELECT id FROM authors WHERE first_name = 'Bader' LIMIT 1), 
  'Adventure', 
  2024
);

-- **Question 7** — The genre for "The Dark Tower: The Gunslinger" was entered incorrectly as `'Fantasy'`. It should be `'Horror'`. Write an UPDATE to fix it, then verify the change with a SELECT.
UPDATE books
SET genre = 'Horror'
WHERE title LIKE '%Gunslinger%';


-- **Question 8** — Delete the book you added in Question 6. Make sure your query targets only that specific row.
DELETE FROM books
WHERE title = 'Potatos Adventure';
