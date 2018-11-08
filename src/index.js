document.addEventListener("DOMContentLoaded", function() {
let url = `http://localhost:3000/pups`
let dogBarDiv = document.querySelector('#dog-bar')
let dogInfoDiv = document.querySelector('#dog-info')

let allDogData;

  fetch(url)
  .then(responseObj => responseObj.json())
  // console.log(responseObj.json)
  .then((parsedResponse) => {
    allDogData = parsedResponse
    console.log(allDogData)
    allDogData.forEach((dog) => {
      dogBarDiv.innerHTML += `<span data-id=${dog.id}>${dog.name}</span>`
    })
  })//end of fetch

  dogBarDiv.addEventListener('click', (event) => {
    let dogId = event.target.dataset.id //try abstracting out later
    let dog = allDogData.find((dog) => {return dog.id == dogId})
    dogInfoDiv.innerHTML = `
    <img src="${dog.image}">
    <h2>${dog.name}</h2>
    <button id="dog-boolean">${dog.isGoodDog}</button>`

    let dogBoolean = document.querySelector('#dog-boolean')

    if (dog.isGoodDog){
      dogBoolean.innerText = 'Good dog!'
    } else {
      dogBoolean.innerText = 'Bad dog!'
    }
  })//end event listener

dogInfoDiv.addEventListener('click', (event) => {
  let dogId = event.target.dataset.id //try abstracting out later
  let dogBoolean = document.querySelector('#dog-boolean')

    if (dogBoolean.innerText === 'Good dog!'){
      dogBoolean.innerText = 'Bad dog!'
    } else {
      dogBoolean.innerText = 'Good dog!'
    }
    console.log(event.target)
    fetch(url + `${dogId}`, {
      method: 'PATCH',
      headers: {
          "Content-Type": "application/json; charset=utf-8"
         },
      body: JSON.stringify(
        "isGoodDog":
      ), // data can be `string` or {object}!

    })

})//end dogInfoDiv event listener





})//end doc listener
