import { readFile } from 'fs/promises';
import { createDeck, createQuestion, linkQuestionToDeck } from './firebase/firestore';
import { Question } from './data/interfaces/Test';
import { Deck } from './data/interfaces/Deck';
import readline from 'readline';

// Function to prompt user input in the terminal
const prompt = (query: string): Promise<string> => {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  return new Promise((resolve) => rl.question(query, (ans) => {
    rl.close();
    resolve(ans);
  }));
};

const main = async () => {
  try {
    // Prompt for deck title
    const title = await prompt('Enter the deck title: ');

    // Create a new deck
    const creatorId = 'QDqj5IQKkxSH34ZmlCon4Okp0B12';
    const newDeck: Partial<Deck> = {
      title,
      creatorId,
      leaderboard: [],
      questionIds: [],
    };

    console.log('Creating new deck...');
    const deckId = await createDeck(newDeck);
    console.log(`Deck created with ID: ${deckId}`);

    // Read questions from JSON file
    const data = await readFile('questions.json', 'utf8');
    const questions: Question[] = JSON.parse(data);

    console.log('Adding questions to the deck...');
    for (const question of questions) {
      // Add each question to Firestore
      const questionId = await createQuestion({
        ...question,
        deckIds: [deckId],
      });
      console.log(`Question added with ID: ${questionId}`);

      // Link question to the deck
      await linkQuestionToDeck(deckId, questionId);
      console.log(`Linked question ${questionId} to deck ${deckId}`);
    }

    console.log('All questions added successfully.');
  } catch (error) {
    console.error('Error:', error);
  }
};

main();


