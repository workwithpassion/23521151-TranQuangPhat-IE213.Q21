import MovieDataService from '../../services/movies'
import React from "react";
import {Button, Card, Col, Container, Row} from "react-bootstrap";
import {Link, useParams} from "react-router-dom";
import moment from 'moment';

export default function Movie({user}) {
  const [movie, setMovie] = React.useState({
    id: null,
    title: "",
    rated: "",
    reviews: [],
  });

  const { id } = useParams();

  console.log(id);

  const getMovie = id => {
    MovieDataService.get(id).then(res => {
      console.log(res.data)
      setMovie(res.data)
    }).catch(err => {
      console.log(err)
    })
  }

  React.useEffect(() => {
    getMovie(id)
  },[id])

  return (
    <div>
<Container>
  <Row>
    <Col>
      <img src={movie?.poster+"/100px250"} fluid />
    </Col>
    <Col>
      <Card>
        <Card.Header as="h5">{movie?.title}</Card.Header>
        <Card.Body>
          <Card.Text>{movie?.plot}</Card.Text>
          {user && <Link to={`/movies/${id}/review`}>Add Review</Link>}
        </Card.Body>
      </Card>
      <br/>
      <h2 style={{textAlign: 'start'}}>Reviews</h2>
      <br/>
      {movie?.reviews.map((review, index) =>
        (
            // Media không còn  tồn tại trong bootstrap mới nhất
            <div key={index}>
              <div style={{textAlign: 'start'}}>
                <h5>{review.name + " reviewed on "}{moment(review.date).format("Do MMMM YYYY")}</h5>
                <p>{review.review}!</p>

                {user && user.id === review?.user_id && (
                    <Row>
                      <Col>
                        <Link
                            to={{
                              pathname: "/movies/" + id + "/review",
                              state: { currentReview: review }
                            }}
                        >
                          Edit
                        </Link>
                      </Col>

                      <Col>
                        <Button variant="link">Delete</Button>
                      </Col>
                    </Row>
                )}
              </div>
            </div>))}
    </Col>
  </Row>
</Container>
    </div>
  );
};