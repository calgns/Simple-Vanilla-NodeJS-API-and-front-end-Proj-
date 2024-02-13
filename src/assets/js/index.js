// import json
import { patchJSON, postJSON } from "./fetch";
import data from "/src/assets/json/test.json";

// Setting variables
let links = document.querySelector(".links div");
let pane = document.querySelector(".pane div");

data.dev.forEach((x) => {
  let a = document.createElement("a");
  let input = document.createElement("input");

  // Set Attr
  a.setAttribute("class", "link");
  input.setAttribute("class", "switch");
  input.setAttribute("id", "ID_" + x.nome);
  input.setAttribute("type", "checkbox");

  // Conditional a
  if (x.disable) {
    a.className += " disable";
    a.setAttribute("href", "#");
    input.checked = false;
  } else {
    a.setAttribute("href", x.href);
    a.setAttribute("target", "_blank");
    input.checked = true;
  }

  // Set attr
  a.setAttribute("rel", "noopener noreferrer");

  // append link
  links.appendChild(a);
  pane.appendChild(input);

  // add text
  a.innerHTML = x.nome;
});

let check = document.querySelectorAll(".switch");
const includes = (str, dis) => data.dev.map((x) => (x.nome.includes(str) ? (x.disable = dis) : ""));

check.forEach((_) => {
  _.addEventListener("change", (e) => {
    let nome = e.target.id.slice(3);
    !e.target.checked ? includes(nome, true) : includes(nome, false);
    console.log(data.dev);
  });
});

const post = document.querySelector(".post")
const postbtn = document.createElement("button");

postbtn.setAttribute("class", "postbtn");
postbtn.innerHTML = "post";
postbtn.addEventListener("click", () => {
  postJSON();
  console.log("post");
});

post.appendChild(postbtn);

const patch = document.querySelector(".patch")
const patchbtn = document.createElement("button");

patchbtn.setAttribute("class", "patchbtn");
patchbtn.innerHTML = "patch";
patchbtn.addEventListener("click", () => {
  patchJSON();
  console.log("patch");
});

patch.appendChild(patchbtn);

// check.addEventListener('change', (e) => {
//   includes("nome ") ()=> {
//     axius post
//   }
// })
