// database.js
// Your task: implement each function below using better-sqlite3.
// The function signatures are identical to storage.js so you can
// compare the two files side by side.
//
// When every function works correctly, `node app.js` should
// print exactly the same output as it did with storage.js.

import Database from "better-sqlite3";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const DB_FILE = join(__dirname, "../data/flashcards.db");

const db = new Database(DB_FILE);

// ----------------------------------------------------------------
// Decks
// ----------------------------------------------------------------

export function getAllDecks() {
  return db.prepare("SELECT * FROM decks").all();
  throw new Error("Not implemented");
}

export function getDeckById(id) {
  return db.prepare("SELECT * FROM decks WHERE id = ?").get(id);
  throw new Error("Not implemented");
}

export function addDeck(name, description) {
  const info = db
    .prepare("INSERT INTO decks (name, description) VALUES (?, ?)")
    .run(name, description);

  return {
    id: info.lastInsertRowid,
    name,
    description,
  };

  throw new Error("Not implemented");
}

export function deleteDeck(deckId) {
  const info = db.prepare("DELETE FROM decks WHERE id = ?").run(deckId);
  return info.changes > 0;
  throw new Error("Not implemented");
}

// ----------------------------------------------------------------
// Cards
// ----------------------------------------------------------------

export function getAllCardsForDeck(deckId) {
  return db
    .prepare(
      `
    SELECT id, question, answer, learned, deck_id AS deckId 
    FROM cards 
    WHERE deck_id = ?
  `,
    )
    .all(deckId);
  throw new Error("Not implemented");
}

export function addCard(question, answer, deckId) {
  const info = db
    .prepare("INSERT INTO cards (question, answer, deck_id) VALUES (?, ?, ?)")
    .run(question, answer, deckId);

  const newCard = db
    .prepare(
      `
    SELECT id, question, answer, learned, deck_id AS deckId 
    FROM cards 
    WHERE id = ?
  `,
    )
    .get(info.lastInsertRowid);

  return newCard;
  throw new Error("Not implemented");
}

export function markCardLearned(cardId) {
  db.prepare("UPDATE cards SET learned = 1 WHERE id = ?").run(cardId);

  return db
    .prepare(
      `
    SELECT id, question, answer, learned, deck_id AS deckId 
    FROM cards 
    WHERE id = ?
  `,
    )
    .get(cardId);
  throw new Error("Not implemented");
}

export function deleteCard(cardId) {
  const info = db.prepare("DELETE FROM cards WHERE id = ?").run(cardId);
  return info.changes > 0;
  throw new Error("Not implemented");
}
