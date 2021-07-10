import { Button, Form, Card, Toast } from "react-bootstrap";
import "../createVote/CreateVote.css";
import { useState, useEffect } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import store from "../reducer/store";

function Vote(props) {
  
  const [showToast, setShowToast] = useState(false);
  const [sendAble, setSendAble] = useState("");
  const [result, setResult] = useState("");
  const history = useHistory();
  console.log(props);
  useEffect(() => {
    if(props.code===""){
      history.push("/");
      window.location.reload()
     }
    store.dispatch({
      type: "updateAdminState",
      payload: { isAdmin: false },
    });
    props.socket.on("message", (data) => {
      history.push("live-result");
    });
    props.socket.on("end_vote", (data) => {
      if (data.state === 200) {
        setShowToast(true);
        setSendAble("disabled");
      }
    });
  }, [props.socket, setSendAble, setShowToast, history,props.code]);
  return (
    <div className="w-50">
      <Card className=" fade-out">
        <Card.Header>
          <Card.Title>{props.question}</Card.Title>
        </Card.Header>
        <Card.Body>
          <Card.Text>Options</Card.Text>
          <Form>
            <div className="mb-3 d-flex flex-column">
              <Form.Check
                onClick={() => {
                  setResult(props.options[0]);
                }}
                inline
                label={props.options[0]}
                name="group1"
                type="radio"
                id={`inline-radio-1`}
              />
              <Form.Check
                onClick={() => {
                  setResult(props.options[1]);
                }}
                inline
                label={props.options[1]}
                name="group1"
                type="radio"
                id={`inline-radio-2`}
              />
              <Form.Check
                onClick={() => {
                  setResult(props.options[2]);
                }}
                inline
                label={props.options[2]}
                name="group1"
                type="radio"
                id={`inline-radio-3`}
              />
            </div>
          </Form>
        </Card.Body>
        <Card.Footer>
          <Button
            className={sendAble}
            onClick={() => {
             if(result!==""){
              props.socket.emit("vote", {
                code: props.code,
                result: result,
                name: props.name,
              });
             }else{
               setShowToast(true)
             }
            }}
          >
            Send
          </Button>
          <div className="m-2 d-flex justify-content-center ">
            <Toast show={showToast} autohide={true} onClose={()=>setShowToast(false)}>
              <Toast.Header>
                <strong className="mr-auto text-danger">
                  Error
                </strong>
                <small>Alert</small>
              </Toast.Header>
              <Toast.Body>you must select one option !</Toast.Body>
            </Toast>
          </div>
        </Card.Footer>
      </Card>
    </div>
  );
}
function initVoteData(state) {
  return {
    name: state.user.name,
    code: state.user.code,
    admin_name: state.vote.admin_name,
    question: state.vote.question,
    options: state.vote.options,
    isFinish: state.vote.isFinish,
  };
}

export default connect(initVoteData)(Vote);
