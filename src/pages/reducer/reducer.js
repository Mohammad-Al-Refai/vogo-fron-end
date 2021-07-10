export function reducer(
  state = {
    user: { name: "", code: "", isAdmin: false },
    vote: { admin_name: "", question: "", options: [], isFinish: false },
  },
  action
) {
  switch (action.type) {
    case "updateNameAndCode":
      state.user.name = action.payload.name;
      state.user.code = action.payload.code;
      return state;
      case "updateName":
        state.user.name = action.payload.name;
       
        return state;
    case "updateCode":
      state.user.code = action.payload.code;
      return state;
      case "updateAdminState":
        state.user.isAdmin = action.payload.isAdmin;
        return state;
    case "updateVoteData":
      state.vote.admin_name = action.payload.admin_name;
      state.vote.question = action.payload.question;
      state.vote.options = [...action.payload.options];
      state.vote.isFinish = action.payload.isFinish;
      return state;
      case "clear":
        state.user.name=''
        state.user.code=''
        state.user.isAdmin=false
        state.vote.admin_name = '';
        state.vote.question = '';
        state.vote.options = [];
        state.vote.isFinish =false;
        return state;
    default:
      return state;
  }
}

function NEW_ID() {
  let numbers = "1 2 3 4 5 6 7 8 9 0".split(" ");
  return numbers
    .map((num) => numbers[Math.floor(Math.random() * numbers.length)])
    .join("");
}
