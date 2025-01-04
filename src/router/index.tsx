import { createBrowserRouter } from "react-router-dom";
import IndexPage from "../pages";
import AboutPage from "../pages/AboutPage";
import DeckAddQuestionPage from "../pages/DeckAddQuestionPage";
import DeckCreatePage from "../pages/DeckCreatePage";
import DeckLeaderboardPage from "../pages/DeckLeaderboardPage";
import DeckListPage from "../pages/DeckListPage";
import DeckOverviewPage from "../pages/DeckOverviewPage";
import DeckTestPage from "../pages/DeckTestPage";
import { AppLayout } from "../pages/layout";
import Login from "../pages/LoginPage";
import Results from "../pages/Results";
import SubjectPage from "../pages/SubjectPage";
import TestPage from "../pages/TestPage";
import TestSimulator from "../pages/TestSimulator";
import BookmarkRedirect from "../pages/TestSimulator/BookmarkRedirect";
import ExamRedirect from "../pages/TestSimulator/ExamRedirect";

const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      {
        index: true,
        element: <IndexPage />,
      },
      {
        path: "about",
        element: <AboutPage />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "exam-request",
        element: (
          <div>
            Currently all Exams are added using Langchain and gpt-3.5-turbo to
            extract the exam questions from the PDFs into JSON format, which is
            then added into a NoSQL DB. Its not perfect and it makes some
            mistakes sometimes, however it definitely saves time. If you wish
            for me to add an exam for you, please message me on Discord and send
            the corresponding PDF. Preferably with answers, or else the AI
            hallucination makes it unreliable. Discord: younissk
          </div>
        ),
      },
      {
        path: "feature-request",
        element: (
          <div>
            I will update this web app periodically. If you want a specific
            feature, send me a message on Discord: younissk
          </div>
        ),
      },
      {
        path: "subject/:subjectId",
        element: <SubjectPage />,
      },
      {
        path: "exam",
        element: <ExamRedirect />,
      },
      {
        path: "results",
        element: <Results />,
      },
      {
        path: "test-simulation",
        element: <TestSimulator />,
      },
      {
        path: "test/:testId",
        element: <TestPage />,
      },
      {
        path: "bookmarks",
        element: <BookmarkRedirect />,
      },
      {
        path: "/decks",
        element: <DeckListPage />,
      },
      {
        path: "/decks/:deckId",
        element: <DeckOverviewPage />,
      },
      {
        path: "/decks/:deckId/test",
        element: <DeckTestPage />,
      },
      {
        path: "/decks/:deckId/leaderboard",
        element: <DeckLeaderboardPage />,
      },
      {
        path: "/decks/new",
        element: <DeckCreatePage />,
      },
      {
        path: "/decks/:deckId/new-question",
        element: <DeckAddQuestionPage />,
      },
      {
        path: "*",
        element: "Page Not Found",
      },
    ],
  },
]);

export default router;
