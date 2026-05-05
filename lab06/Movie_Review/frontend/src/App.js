
  import './App.css';
  import {Nav, Navbar} from "react-bootstrap";
  import {Link, Route, Routes, useNavigate} from "react-router-dom";
  import React from 'react';
  import MoviesList from "./components/MoviesList/MoviesList";
  import AddReview from "./components/AddReview/AddReview";
  import Movie from "./components/Movie/Movie";
  import Login from "./components/Login/Login";
  import 'bootstrap/dist/css/bootstrap.min.css';
  import EditReview from "./components/EditReview/EditReview";

  function App() {
    const navigate = useNavigate();
    const [user, setUser] = React.useState(null);
    async function login(user = null) {
      console.log(user)// default user to null
      setUser(user);
    }
    async function logout() {
      setUser(null);
    }

    return (
      <div className="App">
        <Navbar bg="light" expand="lg">
          <Navbar.Brand href="#home">Movie Reviews</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link>
                <Link to={"/movies"}>Movies</Link>
              </Nav.Link>
              <Nav.Link>
                {user ? (
                    <a onClick={logout} href='https://uit.edu.vn'>Logout User</a>
                ) : (
                    <Link to={"/login"}>Login</Link>
                )}
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Navbar>

        <Routes>
          <Route path="/" element={<MoviesList />} />
          <Route path="/movies" element={<MoviesList />} />

          <Route
              path="/movies/:id/review"
              element={<AddReview user={user} />}
          />

          <Route
              path="/movies/:id/review/:reviewId/edit"
              element={<EditReview user={user} />}
          />

          <Route
              path="/movies/:id"
              element={<Movie user={user}  />}
          />

          <Route
              path="/login"
              element={<Login login={login} history={navigate}  />}
          />
        </Routes>
      </div>
    );
  }

  export default App;
