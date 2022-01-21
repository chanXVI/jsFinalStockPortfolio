//listen to button click

document.getElementById("btn").addEventListener("click", function (event) {
  event.preventDefault();
  getPrice();
});

//
function getPrice() {
  let cryptoSymbol = document.getElementById("ticker").value.toUpperCase();
  const selectedDate = document.getElementById("buy_date").value;
  console.log(cryptoSymbol);
  const companyName = document.getElementById("company_name").value;
  const url = `https://api.polygon.io/v1/open-close/crypto/${cryptoSymbol}/USD/${selectedDate}?adjusted=false&apiKey=3ZuY0yWNgHOKmBwUfhFwVpKQNLY2jDbE`;
  fetch(url)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      let openPrice = data.open;
      let closePrice = data.close;
      console.log(data);
      console.log(data.open);
      //console.log(data.results.length);
      for (let i = 0; i < data.length; i++) {
        if (data.results[i].h > openPrice) {
          openPrice = data.results[i].h;
        }
        if (data.results[i].l < closePrice) {
          closePrice = data.results[i].l;
        }
      }

      console.log(openPrice);
      console.log(closePrice);

      //   create the card
      createCard(openPrice, closePrice);
    });
}

// function to create and fill with data from API
function createCard(openPrice, closePrice) {
  let cryptoSymbol = document.getElementById("ticker").value.toLowerCase();
  const yahooUrl = `https://finance.yahoo.com/quote/${cryptoSymbol}-USD/`;
  const analystPosition = `https://www.nasdaq.com/market-activity/stocks/${cryptoSymbol}/analyst-research`;
  const cryptoName = document.getElementById("company_name");
  const cryptoThree = document.getElementById("ticker");
  const buyDate = document.getElementById("buy_date");

  const newCard = document.createElement("div");
  newCard.classList.add("card");
  newCard.style.width = "18rem";

  newCard.innerHTML = `
    <h3>Symbol: ${cryptoThree.value.toUpperCase()}</h3>
  <img class="card-img-top" src="../images/default_coin.jpg" alt="Card image cap">
  <div class="card-body">
      <h5 class="card-title">Cryptocurrency: ${cryptoName.value.toUpperCase()}</h5>
      <a href="${yahooUrl}" target="_blank"class="card-link">Crypto Info</a><br>
  </div>
  <ul class="list-group list-group-flush">
      <li class="list-group-item">Date: ${buyDate.value} </li>
      <li class="list-group-item">Open price: $${openPrice}</li>
      <li class="list-group-item">Close price: $${closePrice}</li>
  </ul>
  <div class="card-body">
      <a href="${analystPosition}" target="_blank" class="card-link">What analysts say?</a>
  </div>
  `;
  document.getElementsByClassName("card-deck")[0].appendChild(newCard);
}
