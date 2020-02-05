import axios from "axios";

/* */

let obj = axios.create({
  baseURL: "https://s3.amazonaws.com/orama-media/json/"
});
/*
let obj = axios.create({
  baseURL: "https://hugo.bz/teste-json.php?"
});
/**/

export default obj;
