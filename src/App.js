import PrivateRoute from './components/PrivateRoute/PrivateRoute';
import Home from './pages/Home';
import Login from './pages/Login';
import { LOGIN, LISTINGS } from './Routes/Routes';
import { createBrowserRouter , createRoutesFromElements, Route, RouterProvider} from "react-router-dom";

const routeDefinitions = createRoutesFromElements(
  <Route>
    <Route path={LOGIN} element={<Login/>}/>
    <Route path={LISTINGS} element={<PrivateRoute element={<Home />} />}/>
  </Route>
)
const router = createBrowserRouter(routeDefinitions)
function App() {
  return <RouterProvider router={router}/>;
}

export default App;
