// const URL="https://api5234.herokuapp.com"
const URL = "http://localhost:5000";
export async function API_create_vote(
  name,
  question,
  option1,
  option2,
  option3
) {
  console.log(name)
  let request = await fetch(URL + "/createVote", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({
      vote: {
        admin_name: name.value,
        question: question,
        options: [option1, option2, option3],
      },
    }),
  });
  let response =await request.json();

  return response;
}
export async function API_join_vote(code) {
   let request = await fetch(URL + "/join/"+code)
    let response =await request.json();
  console.log(response)
    return response;

}
export async function API_result_vote(code) {
  let request = await fetch(URL + "/result/"+code)
  let response =await request.json();
console.log(response)
  return response;

}
