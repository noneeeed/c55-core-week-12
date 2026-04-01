import fs from "fs";
import Database from "better-sqlite3";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __dirname = dirname(fileURLToPath(import.meta.url));

const jsonPath = join(__dirname, "../data/data.json");
const dbPath = join(__dirname, "../data/flashcards.db");

const jsonData = JSON.parse(fs.readFileSync(jsonPath, "utf8"));
const db = new Database(dbPath);

const insertDeck = db.prepare(`
  INSERT INTO decks (id, name, description) 
  VALUES (@id, @name, @description)
`);

const insertCard = db.prepare(`
  INSERT INTO cards (question, answer, learned, deck_id) 
  VALUES (@question, @answer, @learned, @deck_id)
`);

const migrate = db.transaction((data) => {
  for (const deck of data.decks) {
    insertDeck.run(deck);
  }

  for (const card of data.cards) {
    insertCard.run({
      ...card,
      learned: card.learned ? 1 : 0,
      deck_id: card.deckId,
    });
  }
});

migrate(jsonData);
db.close();
