// import "./App.css";
// import Home from "./Home";
// import Header from "./Header";
// import Checkout from "./Checkout";
// import Login from "./Login";
// import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

// function App() {
//   return (
//     <div className="App">
//       <Router>
//         <Header />
//         <Routes>
//           <Route path="/" element={<Home />} />
//           <Route path="/login" element={<Login />} />
//           <Route path="/checkout" element={<Checkout />} />
//         </Routes>
//       </Router>
//     </div>
//   );
// }

// export default App;
import "./App.css";
import Home from "./Home";
import Header from "./Header";
import Checkout from "./Checkout";
import { db, auth } from "./firebase";
import Login from "./Login";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/login">
            <Login />
          </Route>

          <Route path="/checkout">
            <Header />
            <Checkout />
          </Route>

          <Route path="/">
            <Header />
            <Home />
          </Route>

        </Routes>
      </Router>
    </div>
  );
}

export default App;