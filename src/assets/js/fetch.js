const base = "http://localhost:3000/base";
const url = "http://localhost:3000/test";

// First normal fetch promise.
fetch(base)
  .then((res) => res.json())
  .then((data) => showInfo(data));

const showInfo = (data) => {
  console.log(data);
};


// Second async/await fetch promise.
// data modified and ready to be sent in POST request
const dev1 = [
  { nome: "SA", href: "./dev/sa", disable: true },
  { nome: "BR", href: "./dev/br" },
  { nome: "CA", href: "./dev/ca", disable: true },
];

// OBS: next time try PUT or PATCH method if possible.
// post in json method
export async function postJSON() {
  try {
    // parsing data after getting it and modifying
    const res = await fetch(base);
    // const res = await fetch(url) ? await fetch(url).json() : {};
    console.log("first")
    // const data = typeof res == "object" ? await res.json() : {};
    const data = await res.json();
    data.dev = dev1
    console.log("🚀 ~ postJSON ~ data.dev:", data.dev)
    

    // const data = await res.json();
    // let data;
    // await fetch(base).then((res) => {
    //   data = res.json() 
    //   data.dev = dev1
    // }).catch((err) => console.log("Error catched - postJSON fetch: ", err));

    // debug
    console.log("data.dev - postJSON: ", data);
    data.dev2 = [{ nome: "SA", href: "./dev/sa", disable: true }];

    // POST request
    const response = await fetch(url, {
      method: "POST", // or 'PUT' or 'PATCH'
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    // response
    const result = await response.json();
    console.log("Success - postJSON:", JSON.stringify(result));

  } catch (error) {
    console.error("Error catched - postJSON:", error);
  }
}

export const patchJSON = async() => {
  try {
    const response = await fetch(url, {
      method: "PATCH", // or 'PUT' or 'PATCH'
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ dev2: [{ nome: "SA123", href: "./dev/saaaaaaa", disable: null }] }),
    })
  
    const result = await response.json();
    console.log("Success - patchJSON:", JSON.stringify(result));
    
  } catch (error) {
    console.log("Error catched - patchJSON:", error);
  }
}

// const data = { username: "example" };
// postJSON();
