import { createBrowserRouter } from "react-router-dom";
import { AppLayout } from "../pages/layout";
import SubjectPage from "../pages/SubjectPage";
import TestPage from "../pages/TestPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
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
