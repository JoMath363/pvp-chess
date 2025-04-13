import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Lading from "./Pages/Landing/Landing.jsx";
import Home from "./Pages/Home/Home.jsx";
import Match from "./Pages/Match/Match.jsx";
import Signup from "./Pages/Login/Signup.jsx";
import Login from "./Pages/Login/Login.jsx";

const appRouter = createBrowserRouter([
  { 
    path: "/",
    element: <Lading/>
  },
  { 
    path: "/home",
    element: <Home/>
  },
  { 
    path: "/signup",
    element: <Signup/>
  },
  { 
    path: "/login",
    element: <Login/>
  },
  { 
    path: "/match",
    element: <Match/>
  },
])

function App() {

  return (
    <>
      <RouterProvider router={appRouter} />
    </>
  )
}

export default App
