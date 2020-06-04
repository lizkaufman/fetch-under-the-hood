//-----regular fetch:-----

fetch('https://api.kanye.rest')
  .then((res) => res.json()) //separate .then because res.json() returns a promise itself!
  .then((data) => console.log(data));

//-----async/await fetch:-----

async function asyncFetch() {
  const res = await fetch('https://api.kanye.rest');
  const data = await res.json();
  console.log(data);
}
asyncFetch();

//-----the ollll' xml request:-----

const request = new XMLHttpRequest(); //object created with the constructor method

request.responseType = 'text';
request.onload = function (event) {
  //defining what we want it to do when it loads (similar to fetch when the promise resolves)
  //like an event listener listening for load
  console.log(event.target.response);
};

request.open('GET', 'https://api.kanye.rest');
request.send();

//-----rebuilding fetch from scratch:-----

class Response {
  constructor(response) {
    this.response = response;
  }
  text() {
    return this.response.text();
  }
  async json() {
    //json method on response object
    const text = await this.text(); //.text given to us by XML request (async, so it returns a promise!)
    return JSON.parse(text);
  }
}

window.fetch = function (url, options) {
  return new Promise((resolve, reject) => {
    const request = new XMLHttpRequest(); //object created with the constructor method

    request.responseType = 'blob';
    request.onload = function (event) {
      const response = new Response(event.target.response);
      resolve(response);
    };
    request.onerror = function (err) {
      reject(err);
    };

    request.open('GET', url);
    request.send();
  });
};

async function asyncFetch() {
  const res = await fetch('https://api.kanye.rest');
  const data = await res.json();
  console.log(data);
}

asyncFetch();
