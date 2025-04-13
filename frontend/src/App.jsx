import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Lading from "./Pages/Landing/Landing.jsx";
import Home from "./Pages/Home/Home.jsx";
import Login from "./Pages/Login/Login.jsx";
import Match from "./Pages/Match/Match.jsx";

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
