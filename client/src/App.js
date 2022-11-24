import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Registeruser from "./components/Registeruser";
import Loginuser from "./components/Loginuser";
import Renderpage from "./slidebar/Renderpage";
import Userprofile from "./pages/Userprofile";
import Page404 from "./pages/Page404";
import Userlist from "./pages/Userlist";
import Bookspage from "./pages/Bookspage";
import Createbook from "./pages/Createbook";
import Adduser from "./pages/Adduser";
import Editbook from "./pages/Editbook";
import Edituser from "./pages/Edituser";
import EditProfle from "./pages/EditProfle";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="register" element={<Registeruser />} />
        <Route path="login" element={<Loginuser />} />
        <Route path="/" element={<Renderpage />}>
          <Route index element={<Userprofile />} />
          <Route path="users" element={<Userlist />} />
          <Route path="books" element={<Bookspage />} />
          <Route path="create_books" element={<Createbook />} />
          <Route path="add_user" element={<Adduser />} />
          <Route path="profile/update/:_id" element={<EditProfle />} />
          <Route path="books_edit/:_id" element={<Editbook />} />
          <Route path="user_edit/:_id" element={<Edituser />} />
        </Route>
        <Route path="*" element={<Page404 />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
