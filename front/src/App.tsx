import { BrowserRouter, Route, Routes } from "react-router-dom";
import {AdminEdit, Auth, Home} from "./page";
import Admin from "./page/Admin";
import {AuthProvider} from "./context/AuthProvider";
import {PrivateRoute} from "./routes/PrivateRoute";

function App() {
  return (
      <BrowserRouter>
          <AuthProvider>
            <Routes>
              <Route path="/" element={<Home/>}/>
              <Route path="/auth" element={<Auth/>}/>
              <Route element={<PrivateRoute/>}>
                <Route path="/admin" element={<Admin />} />
                <Route path="/admin/:id" element={<AdminEdit />} />
              </Route>
            </Routes>
          </AuthProvider>
      </BrowserRouter>
  );
}

export default App;