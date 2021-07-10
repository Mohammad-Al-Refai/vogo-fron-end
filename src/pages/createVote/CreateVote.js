import React, { useState, useEffect } from "react";

import {
  Button,
  InputGroup,
  FormControl,
  Card,
  Modal,
  Spinner,
  Toast,
} from "react-bootstrap";

import { useHistory } from "react-router-dom";
import store from "../reducer/store";
import { API_create_vote } from "../connection/connection";
import "./CreateVote.css";
export function CreateVote(props) {
 
  let history = useHistory();
  const [name, setName] = useState("");
  const [question, setQuestion] = useState("");
  const [option1, setOption1] = useState("");
  const [option2, setOption2] = useState("");
  const [option3, setOption3] = useState("");
  const [createState, setCreateState] = useState(false);
  const [show, setShow] = useState(false);
  const [showToast, setShowToast] = useState(false);
 
  useEffect(() => {
    props.socket.on("message", (msg) => {
      setShow(false);
      setShowToast(false);
      localStorage.setItem("code", msg.code);
      localStorage.setItem("id", msg.id);

      store.dispatch({
        type: "updateAdminState",
        payload: { isAdmin: true },
      });

      console.log(msg);
      store.dispatch({
        type: "updateCode",
        payload: { code: msg.code },
      });
      history.push("live-result");
    });
  });
  return (
    <div className="w-75">
      <Card className="fade-out">
        <Card.Header>
          <Card.Title>Create Vote</Card.Title>
        </Card.Header>
        <Card.Body>
          <InputGroup
            className="mb-3"
            onChange={(e) => {
              setName(e.target.value);
              
              setCreateState((name!=="")&&(question!=="")&&(option1!=="")&&(option2!=="")&&(option3!==""))
            }}
          >
            <InputGroup.Prepend>
              <InputGroup.Text id="basic-addon1">Your Name</InputGroup.Text>
            </InputGroup.Prepend>
            <FormControl
              placeholder=""
              aria-label="Username"
              aria-describedby="basic-addon1"
            />
          </InputGroup>
          <InputGroup
            onChange={(e) => {
              setQuestion(e.target.value);
              setCreateState((name!=="")&&(question!=="")&&(option1!=="")&&(option2!=="")&&(option3!==""))
            }}
          >
            <InputGroup.Prepend>
              <InputGroup.Text>Question</InputGroup.Text>
            </InputGroup.Prepend>
            <FormControl as="textarea" aria-label="With textarea" />
          </InputGroup>
        </Card.Body>
        <Card.Footer>
          <Card.Text>Options</Card.Text>
          <InputGroup
            className="mb-3"
            onChange={(e) => {
              setOption1(e.target.value);
              setCreateState((name!=="")&&(question!=="")&&(option1!=="")&&(option2!=="")&&(option3!==""))
            }}
          >
            <InputGroup.Prepend>
              <InputGroup.Text id="basic-addon1">Option 1</InputGroup.Text>
            </InputGroup.Prepend>
            <FormControl
              placeholder=""
              aria-label="Username"
              aria-describedby="basic-addon1"
            />
          </InputGroup>
          <InputGroup
            className="mb-3"
            onChange={(e) => {
              setOption2(e.target.value);
              setCreateState((name!=="")&&(question!=="")&&(option1!=="")&&(option2!=="")&&(option3!==""))
            }}
          >
            <InputGroup.Prepend>
              <InputGroup.Text id="basic-addon1">Option 2</InputGroup.Text>
            </InputGroup.Prepend>
            <FormControl
              placeholder=""
              aria-label="Username"
              aria-describedby="basic-addon1"
            />
          </InputGroup>
          <InputGroup
            className="mb-3"
            onChange={(e) => {
              setOption3(e.target.value);
              setCreateState((name!=="")&&(question!=="")&&(option1!=="")&&(option2!=="")&&(option3!==""))
              
             console.log( (name!=="")&&(question!=="")&&(option1!=="")&&(option2!=="")&&(option3!==""))
            }}
          >
            <InputGroup.Prepend>
              <InputGroup.Text id="basic-addon1">Option 3</InputGroup.Text>
            </InputGroup.Prepend>
            <FormControl
              placeholder=""
              aria-label="Username"
              aria-describedby="basic-addon1"
            />
          </InputGroup>

          <Button
            className={createState ? "" : "disabled"}
            onClick={() => {
              setShow(true);
              localStorage.removeItem("id");
              localStorage.removeItem("code");
              props.socket.emit(
                "create",
                { name, question, options: [option1, option2, option3] },
                (callback) => {
                  console.log(callback);
                }
              );
            }}
          >
            Create
          </Button>
        </Card.Footer>
      </Card>
      <Toast
        onClose={() => setShowToast(false)}
        show={showToast}
        delay={10000}
        autohide
      >
        <Toast.Header>
          <img src="holder.js/20x20?text=%20" className="rounded mr-2" alt="" />
          <strong className="mr-auto">Error</strong>
          <small>404</small>
        </Toast.Header>
        <Toast.Body>No internet !!</Toast.Body>
      </Toast>
      <Modal show={show}>
        <Modal.Header>
          <Modal.Title>Loading</Modal.Title>
        </Modal.Header>
        <Modal.Body className="d-flex justify-content-center">
          <Spinner animation="grow" />
        </Modal.Body>
        <Modal.Footer></Modal.Footer>
      </Modal>
    </div>
  );
}

