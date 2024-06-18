import { createBrowserRouter } from "react-router-dom";
import { AppLayout } from "../pages/layout";
import SubjectPage from "../pages/SubjectPage";
import TestPage from "../pages/TestPage";
import IndexPage from "../pages";

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
            path: "subject/:subjectId",
            element: <SubjectPage />,
        },
        {
            path: "test/:testId",
            element: <TestPage />,
        }
    ]
  },
]);

export default router;
