import { createBrowserRouter, RouterProvider } from "react-router-dom";
import SignUp from "./pages/auth/Signup";
import Login from "./pages/auth/Login";
import ProtectedRoute from "./utils/ProtectedRoutes";
import MainLayout from "./components/MainLayout";
import ConversationPage from "./components/ConversationPage";
import ChatbotForm from "./components/ChatbotForm";

const routes = createBrowserRouter([
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <MainLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        index: true,
        element: <ChatbotForm />, 
      },
      {
        path: "conversations",
        element: <ChatbotForm />,
      },
      {
        path: "conversations/:conversationId",
        element: <ConversationPage />,
      },
    ],
  },
  {
    path: "/sign-up",
    element: <SignUp />,
  },
  {
    path: "/login",
    element: <Login />,
  },
]);

const App = () => {
  return <RouterProvider router={routes} />;
};

export default App;
