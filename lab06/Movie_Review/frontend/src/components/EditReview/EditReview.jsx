import {Link, useParams} from "react-router-dom";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import {useState} from "react";
import MovieDataService from '../../services/movies.js';

export default function EditReview({user}) {


    const { id,reviewId } = useParams();
    const [review, setReview] = useState(reviewId);
    const [submitted, setSubmitted] = useState(false);
    const onChangeReview = event => setReview(event.target.value);

    const saveReview = () => {
        const data = {
            review_id: reviewId,
            review: review,
            name: user.name,
            user_id: user.id,
            movie_id: id,
        }

            MovieDataService.updateReview(data).then(res => {setSubmitted(true); console.log(res.data)})
                .catch(err => console.log(err));


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
                      <Form.Label>Edit Review </Form.Label>
                      <Form.Control type="text" required={true} value={review} onChange={onChangeReview} />
                  </Form.Group>
                  <Button variant={"primary"} onClick={saveReview}>Submit</Button>
              </Form>
          )}
      </div>
  );
};