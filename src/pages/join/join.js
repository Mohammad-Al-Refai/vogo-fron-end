import { Button, InputGroup, FormControl, Alert, Modal } from "react-bootstrap";
import "./join.css";
import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";
import store from "../reducer/store";

export function JoinPage(props) {
  const history = useHistory();
  const [name, setName] = useState("");
  const [code, setCode] = useState("");
  const [show, setShow] = useState(false);
  const [message, setMessage] = useState("");

 useEffect((x)=>{
  props.socket.on("message", (msg) => {
   
    if(msg.tag==="join"){
     console.log(msg);
     localStorage.setItem("code", code);
     
 
     if (!msg.state) {
       setMessage("this vote is not exist !");
       setShow(true);
     } else {
       if (msg.result.isFinish) {
         setMessage("this vote is finished !");
         setShow(true);
       } else {
 
     store.dispatch({
       type: "updateVoteData",
       payload: {
         admin_name: msg.result.admin_name,
         question: msg.result.question,
         options: msg.result.options,
         isFinish: msg.result.isFinish,
       },
     });
         history.push("vote");
       }
     }
    }
   });
   
 },[props,setMessage,setShow,code,history])

  return (
    <div className="my-container">
      <h3>Join to the vote by code invitation</h3>
      <InputGroup
        className="mb-3"
        value={props.user.code}
        onChange={(e) => setName(e.target.value)}
      >
        <InputGroup.Prepend>
          <InputGroup.Text id="basic-addon1">Name</InputGroup.Text>
        </InputGroup.Prepend>
        <FormControl
          placeholder="..."
          aria-label="Username"
          aria-describedby="basic-addon1"
        />
      </InputGroup>
      <InputGroup
        className="mb-3"
        value={props.user.code}
        onChange={(e) => setCode(e.target.value)}
      >
        <InputGroup.Prepend>
          <InputGroup.Text id="basic-addon1">Code</InputGroup.Text>
        </InputGroup.Prepend>

        <FormControl
          placeholder="...."
          aria-label="Username"
          aria-describedby="basic-addon1"
        />
        <InputGroup.Append></InputGroup.Append>
      </InputGroup>
      <div className="d-flex">
      <Button
          variant="green"
          onClick={() => {
            history.push("create");
          }}
        >
          create new vote
        </Button>
      <Button
        onClick={() => {
          console.log("join")
          if(code===""){
            setMessage("Please enter code invitation !")
            setShow(true)
          }else if(name===""){
            setMessage("Please enter your name !")
            setShow(true)
          }else{
            props.socket.emit("join", { code: code });
          store.dispatch({ type: "updateName", payload: { name: name } });
          store.dispatch({ type: "updateCode", payload: { code: code } });
       
          }
        }}
      >
        Join
      </Button>
     
      </div>
    
      <Modal show={show}>
        <Modal.Header closeButton>
          <Modal.Title>Oops</Modal.Title>
        </Modal.Header>
        <Modal.Body>{message}</Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => {
              setShow(false);
            }}
          >
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

function initlJoinData(state) {
  return {
    user: { name: state.user.name, code: state.user.code },
    vote: {
      admin_name: state.vote.admin_name,
      question: state.vote.question,
      options: state.vote.options,
      isFinish: state.vote.isFinish,
    },
  };
}

export default connect(initlJoinData)(JoinPage);
