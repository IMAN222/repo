// buttonFunction handles the HTML-related interface and calls the fetch function
async function buttonFunction() {
  let _data = {
    val: document.getElementById("inputValue").value,
    devId: document.getElementById("inputId").value,
    time: Date.now()
  };
  const answer = await fetchJsonPOST("/mirror", _data);
  document.getElementById("resp").innerHTML = answer;
}

// fetchJsonPOST created the header and handles the POST request using fetch
async function fetchJsonPOST(url, payloadJson) {
  let _myHeader = {
    method: "POST",
    headers: {
      "Content-type": "application/json; charset=UTF-8"
    },
    body: JSON.stringify(payloadJson)
  };
  const _response = await fetch(url, _myHeader);
  const _respJson = await _response.text();
  return _respJson;
}
