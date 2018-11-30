const handleSearchInput = (e) => { // handles searching for socks
  e.preventDefault();
  sendAjax('GET', '/getSocks', null, (data) => { // if query matches a sock name, display it. if not, don't.
    let count = 0;
    if ($("#searchBar").val() === '') {
      for(let i = 0; i < 30; i++) {
        document.querySelectorAll(".imgContentDiv")[i].style.display = "inline-block";
        document.querySelectorAll(".imgContentDiv")[i].style.position = "relative";
        document.getElementById("noResults").style.visibility = "hidden";
      }
      return false;
    }
    if ($("#searchBar").val() !== '') {
      for(let i = 0; i < 30; i++) {
        if (data.socks[i].name.toLowerCase().includes($("#searchBar").val().toLowerCase())) {
          document.querySelectorAll(".imgContentDiv")[i].style.display = "inline-block";
          if (count > 0) {
            count--;
          }
        } else {
          if (count < 30) {
            count++;
          }
          document.querySelectorAll(".imgContentDiv")[i].style.display = "none";
        }
      }
    }
    if (count === 30) {
      document.getElementById("noResults").style.visibility = "visible";
    } else {
      document.getElementById("noResults").style.visibility = "hidden";
    }
  });
  return false;
};

const handleSearchSubmit = (e) => { // handles searching for socks
  e.preventDefault();
  $("#errorMessage").fadeIn({width:'hide'},350);
  setTimeout(function() {
   $("#errorMessage").fadeOut({width:'hide'}, 350);
  }, 3000);
  if ($("#searchBar").val() === '') {
    handleError("Please type in a valid query!");
    return false;
  }
  sendAjax('GET', '/getSocks', null, (data) => { // if query matches a sock name, display it. if not, don't.
    let exists = false;
    if ($("#searchBar").val() === '') {
      for(let i = 0; i < 30; i++) {
        document.querySelectorAll(".imgContentDiv")[i].style.display = "inline-block";
        document.querySelectorAll(".imgContentDiv")[i].style.position = "relative";
      }
      return false;
    }
    for(let i = 0; i < 30; i++) {
      document.querySelectorAll(".imgContentDiv")[i].style.display = "none";
      if (data.socks[i].name.toLowerCase().includes($("#searchBar").val().toLowerCase())) {
        document.querySelectorAll(".imgContentDiv")[i].style.display = "inline-block";
        exists = true;
      }
    }
    if (exists === false) {
      window.alert("No Results Found");
      document.getElementById("noResults").style.visibility = "hidden";
      $("#searchBar").val(''); 
      for(let i = 0; i < 30; i++) {
        document.querySelectorAll(".imgContentDiv")[i].style.display = "inline-block";
        document.querySelectorAll(".imgContentDiv")[i].style.position = "relative";
      }
      return false;
    }
  });
  return false;
};

const handlePassChange = (e) => { // handles password change
  e.preventDefault();
  $("#errorMessage").fadeIn({width:'hide'},350);
  setTimeout(function() {
   $("#errorMessage").fadeOut({width:'hide'}, 350);
  }, 3000);
  if ($("#oldPass").val() === '' || $("#newPass").val() === '') {
    handleError("All fields are required.");
    return false;
  }
  sendAjax('POST', $("#passChangeForm").attr("action"), $("#passChangeForm").serialize(), function() {
    window.alert("Password Change Successful!");
    $("#oldPass").val(''); 
    $("#newPass").val(''); 
  });
  return false;
};

const handleAddFunds = (e) => { // adds funds to account page
  e.preventDefault();
  $("#errorMessage").fadeIn({width:'hide'},350);
  setTimeout(function() {
   $("#errorMessage").fadeOut({width:'hide'}, 350);
  }, 3000);
  if (!parseInt($("#fundsToAdd").val())) {
    handleError("Please enter a valid number.");
    return false;
  }
  sendAjax('POST', $("#addFundsForm").attr("action"), $("#addFundsForm").serialize(), function() {
    window.alert("Updated funds! Refresh page to see changes.");
  });
  return false;
};

const handleBuySocks = (e) => { // handles when user wants to buy socks; make sure request is valid and recursively calls buy page to make sure data is updated
  e.preventDefault();
  const currFundsVal = parseInt($("#currFunds").val());
  const socksPriceVal = parseInt($("#socksPrice").val());
  if (currFundsVal - socksPriceVal - 1< 0) {
    window.alert("Not enough funds to buy.");
    return false;
  }
  sendAjax('POST', $("#buySocksForm").attr("action"), $("#buySocksForm").serialize(), function() {
    ConfirmPage($("#socksProps").val(), $("#socksBought").val(), $("#socksPrice").val(), $("#socksCategory").val(), $("#socksPicture").val());
  });
  return false;
};

const ContentPage = (props) => { // created content page; when clicked, user should be logged in so it takes them to search page
  return (
    <div id="loginStart">
     <div className="taglineDiv">
        <h1> Socko's Socks! </h1>
        <h3> "Who needs friends when you have cool socks?" </h3>
      </div>
      <br/>
       <div id="topRow"> 
        <div id="scarySock">
          <img className="sockClass" src="assets/img/scarySock.jpg" alt="Scary Socks"/>
          <label htmlFor="scarySock"> Scary Socks</label>
        </div>
        <div id="crazySock">
          <img className="sockClass" src="assets/img/crazySock.jpg" alt="Crazy Socks"/>
          <label htmlFor="crazySock"> Crazy Socks</label>
        </div>
        <div id="funnySock">
          <img className="sockClass" src="assets/img/funnySock.jpg" alt="Funny Socks"/>
          <label htmlFor="funnySock"> Funny Socks</label>
        </div>
      </div>
      <div id="bottomRow">
        <div id="coolSock">
          <img className="sockClass" src="assets/img/coolSock.jpg" alt="Cool Socks"/>
          <label htmlFor="coolSock"> Cool Socks</label>
        </div>
        <div id="superSock">
          <img className="sockClass" src="assets/img/superSock.jpg" alt="Super Socks"/>
          <label htmlFor="superSock"> Super Socks</label>
        </div>
        <div id="normalSock">
          <img className="sockClass" src="assets/img/normalSock.jpg" alt="Normal Socks"/>
          <label htmlFor="normalSock"> Normal Socks</label>
        </div>
      </div>
    </div>
  );
};

const AccountPage = (props) => { // create account page and load in account info from account database; add funds and change password when prompted
  sendAjax('GET', '/getAccInfo', null, (data) => {
    ReactDOM.render(
      <div id="accountStart">
        <div id="accountStart">
          <div className="taglineDiv">
            <h1> Socko's Socks! </h1>
            <h3> "Who needs friends when you have cool socks?" </h3>
          </div>
        </div>
        <div id="accountInfo">
          <h1> Account Information </h1>
          <br/>
          <p> Username: &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; {data.info[0].username} </p>
          <p> Purchases: &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;  {data.info[0].purchases} </p>
          <p> Funds: &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; ${data.info[0].funds} </p>
          <form id="passChangeForm" 
            name="passChangeForm"
            onSubmit={handlePassChange}
            action="/passChange"
            method="POST"
            className="passForm"
          >
          <input id="username" type="hidden" name="username" value={data.info[0].username}/>
          <label htmlFor="oldPass">Old Password: </label>
          <input id="oldPass" type="password" name="oldPass" placeholder="old password"/>
          <label htmlFor="newPass">New Password: </label>
          <input id="newPass" type="password" name="newPass" placeholder="new password"/>
          <input type="hidden" name="_csrf" value={props.csrf} />
          <br/>
          <input className="passForm" id="passSubmit" type="submit" value="Change Password" />
          </form>
          <form id="addFundsForm" 
            name="addFundsForm"
            onSubmit={handleAddFunds}
            action="/addFunds"
            method="POST"
            className="fundsForm"
          >
          <label htmlFor="fundsToAdd">Funds to Add: </label>
          <input id="fundsToAdd" type="text" name="fundsToAdd" placeholder="0"/>
          <input type="hidden" name="_csrf" value={props.csrf} />
          <br/>
          <input className="fundsForm" id="fundsSubmit" type="submit" value="Add Funds" />
          </form>
        </div>
      </div>, document.querySelector("#content")
    );
  });
  return (
    <div>
    </div>
  );
};

const SearchPage = (props) => {
  // create search page to load socks from database; if sock is clicked or searched for, load buy page with correct info.
  sendAjax('GET', '/getSocks', null, (data) => {
    ReactDOM.render(
      <div id="searchPageDiv">
        <div id="searchStart">
          <div className="taglineDiv">
            <h1> Socko's Socks! </h1>
            <h3> "Who needs friends when you have cool socks?" </h3>
          </div>
          <div id="searchInfo">
            <form id="searchForm" 
            name="searchForm"
            onInput={handleSearchInput}
            onSubmit={handleSearchSubmit}
            action="/searchSocks"
            method="GET"
            className="searchForm"
            >
            <input id="searchBar" type="text" name="searchBar" placeholder="Search..."/>
            <input type="hidden" name="_csrf" value={props.csrf} />
            <input id="searchProps" type="hidden" name="searchProps" value={props} />
            <input type="image" src="assets/img/searchButton.png" alt="searchButton" className="searchSubmit" />
            </form>
          </div>
        </div>
        <div id="displayContent"> 
            <div className="imgContentDiv">
              <img src={data.socks[0].picture} alt={data.socks[0].name} />
              <h5> {data.socks[0].name} </h5>
            </div>
            <div className="imgContentDiv">
              <img src={data.socks[1].picture} alt={data.socks[1].name} />
              <h5> {data.socks[1].name} </h5>
            </div>
            <div className="imgContentDiv">
              <img src={data.socks[2].picture} alt={data.socks[2].name} />
              <h5> {data.socks[2].name} </h5>
            </div>
            <div className="imgContentDiv">
              <img src={data.socks[3].picture} alt={data.socks[3].name} />
              <h5> {data.socks[3].name} </h5>
            </div>
            <div className="imgContentDiv">
              <img src={data.socks[4].picture} alt={data.socks[4].name} />
              <h5> {data.socks[4].name} </h5>
            </div>
            <div className="imgContentDiv">
              <img src={data.socks[5].picture} alt={data.socks[5].name} />
              <h5> {data.socks[5].name} </h5>
            </div>
            <div className="imgContentDiv">
              <img src={data.socks[6].picture} alt={data.socks[6].name} />
              <h5> {data.socks[6].name} </h5>
            </div>
            <div className="imgContentDiv">
              <img src={data.socks[7].picture} alt={data.socks[7].name} />
              <h5> {data.socks[7].name} </h5>
            </div>
            <div className="imgContentDiv">
              <img src={data.socks[8].picture} alt={data.socks[8].name} />
              <h5> {data.socks[8].name} </h5>
            </div>
            <div className="imgContentDiv">
              <img src={data.socks[9].picture} alt={data.socks[9].name} />
              <h5> {data.socks[9].name} </h5>
            </div>
            <div className="imgContentDiv">
              <img src={data.socks[10].picture} alt={data.socks[10].name} />
              <h5> {data.socks[10].name} </h5>
            </div>
            <div className="imgContentDiv">
              <img src={data.socks[11].picture} alt={data.socks[11].name} />
              <h5> {data.socks[11].name} </h5>
            </div>
            <div className="imgContentDiv">
              <img src={data.socks[12].picture} alt={data.socks[12].name} />
              <h5> {data.socks[12].name} </h5>
            </div>
            <div className="imgContentDiv">
              <img src={data.socks[13].picture} alt={data.socks[13].name} />
              <h5> {data.socks[13].name} </h5>
            </div>
            <div className="imgContentDiv">
              <img src={data.socks[14].picture} alt={data.socks[14].name} />
              <h5> {data.socks[14].name} </h5>
            </div>
            <div className="imgContentDiv">
              <img src={data.socks[15].picture} alt={data.socks[15].name} />
              <h5> {data.socks[15].name} </h5>
            </div>
            <div className="imgContentDiv">
              <img src={data.socks[16].picture} alt={data.socks[16].name} />
              <h5> {data.socks[16].name} </h5>
            </div>
            <div className="imgContentDiv">
              <img src={data.socks[17].picture} alt={data.socks[17].name} />
              <h5> {data.socks[17].name} </h5>
            </div>
            <div className="imgContentDiv">
              <img src={data.socks[18].picture} alt={data.socks[18].name} />
              <h5> {data.socks[18].name} </h5>
            </div>
            <div className="imgContentDiv">
              <img src={data.socks[19].picture} alt={data.socks[19].name} />
              <h5> {data.socks[19].name} </h5>
            </div>
            <div className="imgContentDiv">
              <img src={data.socks[20].picture} alt={data.socks[20].name} />
              <h5> {data.socks[20].name} </h5>
            </div>
            <div className="imgContentDiv">
              <img src={data.socks[21].picture} alt={data.socks[21].name} />
              <h5> {data.socks[21].name} </h5>
            </div>
            <div className="imgContentDiv">
              <img src={data.socks[22].picture} alt={data.socks[22].name} />
              <h5> {data.socks[22].name} </h5>
            </div>
            <div className="imgContentDiv">
              <img src={data.socks[23].picture} alt={data.socks[23].name} />
              <h5> {data.socks[23].name} </h5>
            </div>
            <div className="imgContentDiv">
              <img src={data.socks[24].picture} alt={data.socks[24].name} />
              <h5> {data.socks[24].name} </h5>
            </div>
            <div className="imgContentDiv">
              <img src={data.socks[25].picture} alt={data.socks[25].name} />
              <h5> {data.socks[25].name} </h5>
            </div>
            <div className="imgContentDiv">
              <img src={data.socks[26].picture} alt={data.socks[26].name} />
              <h5> {data.socks[26].name} </h5>
            </div>
            <div className="imgContentDiv">
              <img src={data.socks[27].picture} alt={data.socks[27].name} />
              <h5> {data.socks[27].name} </h5>
            </div>
            <div className="imgContentDiv">
              <img src={data.socks[28].picture} alt={data.socks[28].name} />
              <h5> {data.socks[28].name} </h5>
            </div>
            <div className="imgContentDiv">
              <img src={data.socks[29].picture} alt={data.socks[29].name} />
              <h5> {data.socks[29].name} </h5>
            </div>
        </div>
        <h1 id="noResults"> No Results Found</h1>
      </div>, document.querySelector("#content")
    );
    for(let i = 0; i < 30; i++) {
      const buyButton = document.querySelectorAll(".imgContentDiv")[i];
      buyButton.addEventListener("click", (e) => {
        e.preventDefault();
        BuyPage(props, data.socks[i].name, data.socks[i].price, data.socks[i].category, data.socks[i].picture); // call buy page with clicked on data
        return false;
      });
    }
  });
  return (
     <div id="searchPageDiv">
        <div id="searchStart">
          <div className="taglineDiv">
            <h1> Socko's Socks! </h1>
            <h3> "Who needs friends when you have cool socks?" </h3>
          </div>
          <div id="searchInfo">
            <form id="searchForm" 
            name="searchForm"
            onInput={handleSearchInput}
            onSubmit={handleSearchSubmit}
            action="/searchSocks"
            method="GET"
            className="searchForm"
            >
            <input id="searchBar" type="text" name="searchBar" placeholder="Search..."/>
            <input type="hidden" name="_csrf" value={props.csrf} />
            <input id="searchProps" type="hidden" name="searchProps" value={props} />
            <input type="image" src="assets/img/searchButton.png" alt="searchButton" className="searchSubmit" />
            </form>
        </div>
      </div>
    </div>
  );
};

const BuyPage = (props, name, price, category, picture) => { // create and render buypage
  window.history.pushState('buy', 'buyPage', '/buy');
  $('html, body').animate({ scrollTop: 0 }, 'fast');
  sendAjax('GET', '/getSocks', null, (data) => {
    let pic1 = "";
    let pic1Name = "";
    let pic1Price = "";
    let pic1Category = "";
    let pic2 = "";
    let pic2Name = "";
    let pic2Price = "";
    let pic2Category = "";
    let pic3 = "";
    let pic3Name = "";
    let pic3Price = "";
    let pic3Category = "";
    let count = 4;
    for(let i = 0; i < 30; i++) { // get suggested socks to show user based on what sock is initially selected
      if(data.socks[i].category === category && data.socks[i].name != name) {
        count--;
        switch(count) {
          case 3:
            pic1 = data.socks[i].picture;
            pic1Name = data.socks[i].name;
            pic1Price = data.socks[i].price;
            pic1Category = data.socks[i].category;
            break;
          case 2:
            pic2 = data.socks[i].picture;
            pic2Name = data.socks[i].name;
            pic2Price = data.socks[i].price;
            pic2Category = data.socks[i].category;
            break;
          case 1:
            pic3 = data.socks[i].picture;
            pic3Name = data.socks[i].name;
            pic3Price = data.socks[i].price;
            pic3Category = data.socks[i].category;
            break;
          default:
            console.log("");
        }
      }
    }
    sendAjax('GET', '/getAccInfo', null, (data) => {
      ReactDOM.render (
        <div id="buyStart">
          <div className="taglineDiv">
            <h1> Socko's Socks! </h1>
            <h3> "Who needs friends when you have cool socks?" </h3>
          </div>
          <br/>
          <div id="buyInfo">
            <img src={picture} alt={name}/>
            <h3> Name: {name} </h3>
            <h3> Category: {category} </h3>
            <h3> Price: {price} </h3>
            <form id="buySocksForm" 
              name="buySocksForm"
              onSubmit={handleBuySocks}
              action="/buySocks"
              method="POST"
              className="buyForm"
            >
            <input id="socksBought" type="hidden" name="socksBought" value={name} /> 
            <input id="socksPrice" type="hidden" name="socksPrice" value={price} />
            <input id="socksCategory" type="hidden" name="socksCategory" value={category} />
            <input id="socksPicture" type="hidden" name="socksPicture" value={picture} />
            <input id="socksProps" type="hidden" name="socksProps" value={props} />
            <input id="currFunds" type="hidden" name="currFunds" value={data.info[0].funds} />
            <input type="hidden" name="_csrf" value={props.csrf} />
            <input className="buyForm" type="submit" value="Buy Now!" />
            </form>
          </div>
          <div id="similarSocks">
            <div id="recommend">
              <h4> Based on your selection, we also recommend </h4>
              <br/>
            </div>
            <div id="socksR">
              <div id="sock1">
                <img src={pic1} alt={pic1Name}/>
                <h5> {pic1Name} </h5>
              </div>
              <div id="sock2">
                <img src={pic2} alt={pic2Name}/>
                <h5> {pic2Name} </h5>
              </div>
                <div id="sock3">
                <img src={pic3} alt={pic3Name}/>
                <h5> {pic3Name} </h5>
              </div>
            </div>
          </div>
        </div>, document.querySelector("#content")
      );
      const sock1Link = document.querySelector("#sock1"); // reload buypage with new content if suggested sock is clicked
      sock1Link.addEventListener("click", (e) => {
        BuyPage(props, pic1Name, pic1Price, pic1Category, pic1);
      });
      const sock2Link = document.querySelector("#sock2");
      sock2Link.addEventListener("click", (e) => {
        BuyPage(props, pic2Name, pic2Price, pic2Category, pic2);
      });
      const sock3Link = document.querySelector("#sock3");
      sock3Link.addEventListener("click", (e) => {
        BuyPage(props, pic3Name, pic3Price, pic3Category, pic3);
      });
    });
  });
  return (
    <div>
    </div>
  );
};

const ConfirmPage = (props, name, price, category, picture) => { // created buy confirm page; user is redirected after successfully buying a pair of socks
  window.history.pushState('confirmation', 'confirmationPage', '/confirmation');
  ReactDOM.render (
    <div id="confirmStart">
      <div className="taglineDiv">
        <h1> Socko's Socks! </h1>
        <h3> "Who needs friends when you have cool socks?" </h3>
      </div>
      <br/>
      <div id="confirmInfo">
        <h2> Thank you for your purchase!</h2>
        <br/>
        <h3> Receipt Information: </h3>
        <h4> Name: {name} </h4>
        <h4> Price: {price} </h4>
        <h4> Category: {category} </h4>
        <br/>
        <div id="backBrowsingTab">
          <img src="assets/img/leftArrow.png" alt="toSearch"/>
          <a href="search"> <h5> Back to Browsing </h5> </a>
        </div>
        <div id="myCollectionTab">
          <img src="assets/img/leftArrow.png" alt="toCollection"/>
          <a href="collection"> <h5> My Collection </h5> </a>
        </div>
      </div>
    </div>, document.querySelector("#content")
  );
  return (
    <div>
    </div>
  );
};

const CollectionPage = (props) => { 
  return (
    <div id="collectionStart">
     <div className="taglineDiv">
        <h1> Socko's Socks! </h1>
        <h3> "Who needs friends when you have cool socks?" </h3>
      </div>
      <br/>
      <div>
        <h2> Collection Page TBD </h2>
      </div>
    </div>
  );
};

const createContentPage = (csrf) => { // render content page
  ReactDOM.render(
    <ContentPage csrf={csrf} />,
    document.querySelector("#content")
  );
};

const createAccountPage = (csrf) => { // render account page
  ReactDOM.render(
    <AccountPage csrf={csrf} />,
    document.querySelector("#content")
  );
};

const createSearchPage = (csrf) => { // render search page
  ReactDOM.render(
    <SearchPage csrf={csrf} />,
    document.querySelector("#content")
  );
};

const createCollectionPage = (csrf) => { // render collection page
  ReactDOM.render(
    <CollectionPage csrf={csrf} />,
    document.querySelector("#content")
  );
};

const setup = function(csrf) { // take to page and change url based on clicked button
  createContentPage(csrf);
  let urlString = window.location.href;
  const homeButton = document.querySelector("#homeButton");
  const accountButton = document.querySelector("#accountButton");
  const collectionButton = document.querySelector("#collectionButton");
  for(let i = 0; i < document.querySelectorAll(".sockClass").length; i++) {
    const searchButton = document.querySelectorAll(".sockClass")[i];
    searchButton.addEventListener("click", (e) => {
      e.preventDefault();
      createSearchPage(csrf);
      window.history.pushState('search', 'searchPage', '/search');
      return false;
    });
  }
  homeButton.addEventListener("click", (e) => {
    console.log("click");
    createContentPage(csrf);
    window.history.pushState('home', 'homePage', '/home');
    return false;
  });
  accountButton.addEventListener("click", (e) => {
    e.preventDefault();
    createAccountPage(csrf);
    window.history.pushState('account', 'accountPage', '/account');
    return false;
  });
  collectionButton.addEventListener("click", (e) => {
    e.preventDefault();
    createCollectionPage(csrf);
    window.history.pushState('collection', 'collectionPage', '/collection');
    return false;
  });
    
  if (urlString.includes('/search')) {
    createSearchPage(csrf);
  } else if (urlString.includes('/collection')) {
    createCollectionPage(csrf);
  } else if (urlString.includes('/account')) {
    createAccountPage(csrf);
  } else {
    createContentPage(csrf); // default view
  }
};

const getToken = () => { // get csrf token
  sendAjax('GET', '/getToken', null, (result) => {
    setup(result.csrfToken);
  });
    
};

if(performance.navigation.type === 1) { // if page is refreshed, take to home page
  window.history.pushState('home', 'homePage', '/home'); 
}

$(document).ready(function() {
  getToken();
});

