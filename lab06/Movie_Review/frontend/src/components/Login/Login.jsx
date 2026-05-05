import {useState} from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

export default function Login(props) {
  const [name, setName] = useState('');
  const [id, setId] = useState('');
  const onNameChange = (event) => {
    setName(event.target.value);
  }
  const onIdChange = (event) => {
    setId(event.target.value);
  }

  const login = () => {
    props.login({name: name, id: id});
    // react mới không còn dùng useHistory nữa
    props.history('/');
  }
  return (
    <div>
      <Form>
        <Form.Group>
          <Form.Label>
            Username
          </Form.Label>
          <Form.Control type="text" placeholder={"Enter username"} value={name} onChange={onNameChange} />
        </Form.Group>
        <Form.Group>
          <Form.Label>
            ID
          </Form.Label>
          <Form.Control type="text" placeholder={"Enter id"} value={id} onChange={onIdChange} />
        </Form.Group>
        <Button variant={'primary'} onClick={login}>Submit</Button>
      </Form>
    </div>
  );
};