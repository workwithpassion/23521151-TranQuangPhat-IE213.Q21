import React, {useEffect} from "react";
import {Button, Card, Col, Form, Row} from "react-bootstrap";
import MovieDataService from "../../services/movies";
import {Link} from "react-router-dom";

export default function MoviesList() {
  const [movies, setMovies] = React.useState([]);
  const [searchTitle, setSearchTitle] = React.useState('');
  const [searchRating, setSearchRating] = React.useState('');
  const [ratings, setRatings] = React.useState([]);

  // Lab06
  const [currentPage, setCurrentPage] = React.useState(0);
  const [entriesPerPage, setEntriesPerPage] = React.useState(0);
  const [currentSearchMode, setCurrentSearchMode] = React.useState("");

  useEffect(() => {
    setCurrentPage(0)
  }, [currentSearchMode])

  useEffect(() => {
    // retrieveMovies()
    retrieveNextPage()
  },[currentPage])

  const  retrieveNextPage = () => {
    if(currentSearchMode === "findByTitle"){
      findByTitle()
    } else if(currentSearchMode === "findByRating"){
      findByRating()
    } else retrieveMovies()
  }



  const find = (query, by) => {
    MovieDataService.find(query, by, currentPage).then(res => {
      console.log(res.data)
      setMovies(res.data.movies);
    }).catch(e => {console.log(e)})
  }

  const findByTitle = () => {
    setCurrentSearchMode("findByTitle");
    find(searchTitle, "title");
  }

  const findByRating = () => {
    setCurrentSearchMode("findByRating");
    if (searchRating === 'All Ratings') retrieveMovies()
    else find(searchRating, "rated");
  }


  const onChangeSearchTitle = (event) => {
    const searchTitle = event.target.value;
    setSearchTitle(searchTitle);
  }
  const onChangeSearchRating = (event) => {
    const searchRating = event.target.value;
    setSearchRating(searchRating);
  }

  // lab06
  const retrieveMovies =  () => {
    setCurrentSearchMode("")
    MovieDataService.getAll(currentPage).then(res => {
      console.log(res.data)
      setMovies(res.data.movies);
      setCurrentPage(res.data.page);
      setEntriesPerPage(res.data.entries_per_page);
    }).catch(e => {
      console.log(e)
    })
  }

  const retrieveRatings =  () => {
    MovieDataService.getRatings().then(res => {
      console.log(res.data)
      setRatings(["All Ratings"].concat(res.data));
    }).catch(e => {
      console.log(e)
    })
  }
  React.useEffect(() =>{
    retrieveMovies();
    retrieveRatings();
  },[])

  return (
      <div style={{padding: "0 100px"}}>
        <Row style={{margin: "20px 0"}} >
          <Col style={{display: "flex", gap: "10px"}}>
            <Form.Group style={{flex : '1'}}>
              <Form.Control
                  type="text"
                  placeholder="Search by title"
                  value={searchTitle}
                  onChange={onChangeSearchTitle}
              />
            </Form.Group>
            <Button
                style={{maxWidth: '80px'}}
                variant="primary"
                type="button"
                onClick={findByTitle}>
              Search
            </Button>
          </Col>
          <Col style={{display: "flex", gap: "10px"}}>
            <Form.Group
                style={{flex : '1'}}>
              <Form.Control
                  as="select"
                  value={searchTitle}
                  onChange={onChangeSearchRating}
              >
                {ratings.map((rating) =>
                    <option value={rating}>{rating}</option>)}
              </Form.Control>
            </Form.Group>
            <Button
                style={{maxWidth: '80px'}}
                variant="primary"
                type="button"
                onClick={findByRating}>
              Search
            </Button>
          </Col>
        </Row>
        <Row>
          {movies.map((movie) =>
          <Col>
            <Card style={{width: '18rem'}}>
              <Card.Img src={movie?.poster + "/100px180"}/>
              <Card.Body>
                <Card.Title>{movie?.title}</Card.Title>
                <Card.Text>
                  Rating: {movie?.rated}
                </Card.Text>
                <Card.Text>
                  {movie?.plot}
                </Card.Text>
                <Link to={`/movies/${movie?._id}`}>View Review</Link>
              </Card.Body>
            </Card>
          </Col>
          )}
        </Row>
        <br/>
        Showing page: {currentPage}
        {currentPage > 0 && <Button variant={"link"} onClick={() => {setCurrentPage(currentPage - 1)}}>
          Get prev {entriesPerPage} results
        </Button>}

        <Button variant={"link"} onClick={() => {setCurrentPage(currentPage + 1)}}>
          Get next {entriesPerPage} results
        </Button>

      </div>
  );
};