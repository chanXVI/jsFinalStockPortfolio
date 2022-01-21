document.getElementById("btn").addEventListener("click", function (event) {
  event.preventDefault();
  // checkTickerValidity();
  addToWatchlist();
});

// // check Ticker Validity
// function checkTickerValidity() {
//   let stockTicker = document.getElementById("ticker");

//   companiesUrl =
//     "https://financialmodelingprep.com/api/v3/financial-statement-symbol-lists?apikey=b69730ce3c06ccd2e426c334fa190596";
//   fetch(companiesUrl)
//     .then(function (response) {
//       return response.json();
//     })
//     .then(function (data) {
//       console.log(data[12]);
//       let i;
//       for (i = 0; i < data.length; i++) {
//         if (stockTicker.value.toUpperCase() === data[i]) {
//           console.log(stockTicker.value);
//           console.log(data[i]);
//           break;
//         }
//       }
//       if (i >= data.length - 1) {
//         stockTicker.value = prompt(
//           `The following stock ticker: ${stockTicker.value} doesn''t exist. Please enter a valid one:`
//         );
//         console.log(`The stock ticker value is ${stockTicker.value}`);
//       }
//     })
//     .catch(function (error) {
//       console.log("Error:" + error.message);
//     });
// }

// collections of function to run
function addToWatchlist() {
  let stockTicker = document.getElementById("ticker").value.toUpperCase();
  const dateBoughtAt = document.getElementById("buy_date").value;
  console.log(stockTicker);
  const companyName = document.getElementById("company_name").value;
  const url = `https://api.polygon.io/v2/aggs/ticker/${stockTicker}/range/1/hour/${dateBoughtAt}/2022-01-20?apiKey=W3vgmbxcAQ2mWW4NQEDQLOpm5Pdh_qbd`;
  fetch(url)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      let highestPrice = data.results[0].h;
      let lowestPrice = data.results[0].l;
      console.log(data);
      console.log(data.results);
      console.log(data.results.length);
      for (let i = 0; i < data.results.length; i++) {
        if (data.results[i].h > highestPrice) {
          highestPrice = data.results[i].h;
        }
        if (data.results[i].l < lowestPrice) {
          lowestPrice = data.results[i].l;
        }
      }

      console.log(highestPrice);
      console.log(lowestPrice);

      //   console.log(sardData.results.length);

      //   create card
      createCard(highestPrice, lowestPrice);
    });
}

// create card function
function createCard(highPrice, lowPrice) {
  //   console.log(data);
  let stockTicker = document.getElementById("ticker").value.toLowerCase();
  const moreInfoUrl = `https://finance.yahoo.com/quote/${stockTicker}/`;
  const analystPosition = `https://www.nasdaq.com/market-activity/stocks/${stockTicker}/analyst-research`;
  const companyName = document.getElementById("company_name");
  const companyTicker = document.getElementById("ticker");
  const buyDate = document.getElementById("buy_date");

  const newCard = document.createElement("div");
  newCard.classList.add("card");
  newCard.style.width = "18rem";

  newCard.innerHTML = `
    <h3>Ticker: ${companyTicker.value.toUpperCase()}</h3>
  <img class="card-img-top" src="../images/stockGoingUp.jpg" alt="Card image cap">
  <div class="card-body">
      <h5 class="card-title">Stock: ${companyName.value.toUpperCase()}</h5>
      <a href="${moreInfoUrl}" target="_blank"class="card-link">Company Info</a><br>
  </div>
  <ul class="list-group list-group-flush">
      <li class="list-group-item">Buy Date: ${buyDate.value} </li>
      <li class="list-group-item">Highest Since Buy: $${highPrice}</li>
      <li class="list-group-item">Lowest Since Buy: $${lowPrice}</li>
  </ul>
  <div class="card-body">
      <a href="${analystPosition}" target="_blank" class="card-link">What analysts say?</a>
  </div>
  `;
  document.getElementsByClassName("card-deck")[0].appendChild(newCard);
}