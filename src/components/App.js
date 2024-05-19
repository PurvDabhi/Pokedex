//routes
import {BrowserRouter,Routes,Route} from "react-router-dom";
//stylesheet
import "../styles/style.css"

// pages and sections
import Header from "./sections/Header";
import Home from "./pages/Home";
import Search from "./pages/Search";
import Pokemon from "./pages/Pokemon";
import Signup from "./sections/signup";
import Login from "./sections/login";
import Trainer from "./sections/trainer";


export default function App() {

  return(
    <>
  <BrowserRouter>
    <Header/>
    <Routes>
      <Route path="/home" element={<Home/>}></Route>
      <Route path="/search" element={<Search/>}></Route>
      <Route path="/pokemon/:pokemon" element={<Pokemon/>}></Route>
      <Route path="/" element={<Login/>}/>
      <Route path="/signup" element={<Signup/>}/>
      <Route path="/trainer" element={<Trainer/>}/>
      <Route path="*" element={<Home/>} />
    </Routes>
  </BrowserRouter>
  </>
);
  }

