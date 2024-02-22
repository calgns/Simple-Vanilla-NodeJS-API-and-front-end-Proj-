// import json
import { patchJSON, postJSON } from "./fetch";
import axios from "axios";

const urlBase = "http://localhost:3000/base";
const urlTest = "http://localhost:3000/test";

let sobrenomes = ["Abreu", "Aguiar", "Amaral", "Araújo", "Arcoverde", "Assunção", "Azevedo", "Barros", "Belchior", "Bonfim", "Braga", "Britto", "Cabral", "Camargo", "Campos", "Cardoso", "Carvalho", "Castelo", "Coelho", "Cordeiro", "Costa", "Cruz", "Cunha", "Damasceno", "Dantas", "Drummond", "Duarte", "Fagundes", "Farias", "Ferraz", "Figueiredo", "Freitas", "Gomes", "Guimarães", "Lacerda", "Leal", "Lima", "Lopes", "Macedo", "Magalhães", "Marinho", "Matos", "Menezes", "Miranda", "Monteiro", "Morais", "Moreira", "Nascimento", "Neves", "Noronha"];


let links = document.querySelector(".links");
await axios.get(urlTest).then((res) => {

  if(res.status === 200) {
    let data = res.data;

    links.innerHTML = JSON.stringify(data, null, 2);
    console.log("🚀 ~ file: index.js ~ line 13 ~ res.status === 200", res.status === 200)
    console.log("🚀 ~ file: index.js ~ line 13 ~ res.data.dev", res.data)

    return "response status: 200, OK ;)";
  }
  // location.reload();
}).catch((err) => {
  console.log("🚀 ~ file: index.js ~ line 13 ~ err", err);
  // location.reload();
})

const handlePost = (target, url, random=false) => {
  if (target.detail > 1) return;
  target.preventDefault();
  
  let dt = {
    nome: `${document.querySelector("#nome").value}`,
    idade: `${document.querySelector("#idade").value}`,
    servico: `${document.querySelector("input[name=serviço]:checked").value}`,
  }
  
  if (random) {
    let i = Math.floor(Math.random() * 100);
    dt = {
      nome: `${document.querySelector("#nome").value + " " + [...sobrenomes][Math.floor(Math.random() * 50)]}`,
      idade: `${i<=17?42:i}`,
      servico: `${["Afilifado/Funcionario", "PJ/Semelhantes", "Cliente"][Math.floor(Math.random() * 3)]}`,
    }
  } 
  axios.post(urlTest, dt)
  // target.stopImmediatePropagation();
  
  axios.get(url).then((res, err) => {
    if(res.status === 200) {
      let data = res.data;
      links.innerHTML = JSON.stringify(data, null, 2);
    } else console.log("error", err);
  }).catch((err) => {
    console.log("error", err);
    // location.reload();
  })
  console.log("trusted")
}


const submit = document.querySelector(".submit input");
submit.addEventListener("click", (x) => handlePost(x, urlTest));

const random = document.querySelector(".random button");
random.addEventListener("click", (x) => handlePost(x, urlTest, true));



// CREATE BUTTONS AND ADD EVENT LISTENERS TO THEM FOR POST AND PATCH

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
