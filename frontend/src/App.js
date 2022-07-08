import './App.css';
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import LandingPage from "./screens/LandingPage/LandingPage";
import MyNotes from "./screens/MyNotes/MyNotes";
import { BrowserRouter, Route, Routes } from 'react-router-dom'

const App = () => (
  <BrowserRouter>
    <Header />
    <Routes>
        <Route exact path='/' element={<LandingPage />} />
        <Route path='/mynotes' element={<MyNotes />} />
    </Routes>
    <Footer />
  </BrowserRouter>
);

export default App;
