import data from "../json/countries.json" assert { type: "json" };
import fs from "fs";
// import data from "/src/assets/json/countries.json";
// import data from "/home/carl/apiProject/src/assets/json/countries.json";
// const data = require('/home/carl/apiProject/src/assets/json/countries.json');

let alphabetical = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];
let newData = {};
const alphabeticalOrder = (arr) => {
  for(let i in arr){
    newData[arr[i]] = [];
    data.map((x) => {
      if(x.name[0].toLowerCase() == arr[i].toLowerCase()) {
        newData[arr[i]].push(x);
      }
    })

    if (newData[arr[i]].length == 0) {
      newData[arr[i]] = null;
    }

  }
  console.log(newData);
};

alphabeticalOrder(alphabetical);


/* const readem = fs.readFileSync('./src/assets/json/countries.json', 'utf8'); // it paths depends on where you run/call the script
console.log(readem);*/

// fs.writeFileSync('./src/assets/json/countriesOrdered.json', JSON.stringify(newData), 'utf8');

// console.log(data)
// newData.a = [];
// newData.a.push({"aaa":"aaa"});
// newData.a.push({"aba":"aaa"});
// newData.c = "aaa";
// newData.d.push("aaa");

// JSON.stringify(newData)
// console.log(newData)