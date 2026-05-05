import React from "react";
import MovieDataService from '../../services/movies.js';
import {Link, useParams} from "react-router-dom";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

export default function AddReview({user}) {
  let initialReviewState = "";


  const { id } = useParams();

  const [review, setReview] = React.useState(initialReviewState);

  const [submitted, setSubmitted] = React.useState(false);
  const onChangeReview = event => setReview(event.target.value);

  const saveReview = () => {
    const data = {
      review: review,
      name: user.name,
      user_id: user.id,
      movie_id: id,
    }



      MovieDataService.createReview(data).then(res => setSubmitted(true)).catch(e => {console.log(e)});


  }
  return (
    <div>
      {submitted ? (
          <div>
            <h4>Review submitted successfully</h4>
            <Link to={"/movies/" + id}>
              Back to movie
            </Link>
          </div>
      ) : (
          <Form>
            <Form.Group>
              <Form.Label>Create Review </Form.Label>
              <Form.Control type="text" required={true} value={review} onChange={onChangeReview} />
            </Form.Group>
            <Button variant={"primary"} onClick={saveReview}>Submit</Button>
          </Form>
      )}
    </div>
  );
};