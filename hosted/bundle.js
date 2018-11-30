'use strict';

var handleSearchInput = function handleSearchInput(e) {
  // handles searching for socks
  e.preventDefault();
  sendAjax('GET', '/getSocks', null, function (data) {
    // if query matches a sock name, display it. if not, don't.
    var count = 0;
    if ($("#searchBar").val() === '') {
      for (var i = 0; i < 30; i++) {
        document.querySelectorAll(".imgContentDiv")[i].style.display = "inline-block";
        document.querySelectorAll(".imgContentDiv")[i].style.position = "relative";
        document.getElementById("noResults").style.visibility = "hidden";
      }
      return false;
    }
    if ($("#searchBar").val() !== '') {
      for (var _i = 0; _i < 30; _i++) {
        if (data.socks[_i].name.toLowerCase().includes($("#searchBar").val().toLowerCase())) {
          document.querySelectorAll(".imgContentDiv")[_i].style.display = "inline-block";
          if (count > 0) {
            count--;
          }
        } else {
          if (count < 30) {
            count++;
          }
          document.querySelectorAll(".imgContentDiv")[_i].style.display = "none";
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

var handleSearchSubmit = function handleSearchSubmit(e) {
  // handles searching for socks
  e.preventDefault();
  $("#errorMessage").fadeIn({ width: 'hide' }, 350);
  setTimeout(function () {
    $("#errorMessage").fadeOut({ width: 'hide' }, 350);
  }, 3000);
  if ($("#searchBar").val() === '') {
    handleError("Please type in a valid query!");
    return false;
  }
  sendAjax('GET', '/getSocks', null, function (data) {
    // if query matches a sock name, display it. if not, don't.
    var exists = false;
    if ($("#searchBar").val() === '') {
      for (var i = 0; i < 30; i++) {
        document.querySelectorAll(".imgContentDiv")[i].style.display = "inline-block";
        document.querySelectorAll(".imgContentDiv")[i].style.position = "relative";
      }
      return false;
    }
    for (var _i2 = 0; _i2 < 30; _i2++) {
      document.querySelectorAll(".imgContentDiv")[_i2].style.display = "none";
      if (data.socks[_i2].name.toLowerCase().includes($("#searchBar").val().toLowerCase())) {
        document.querySelectorAll(".imgContentDiv")[_i2].style.display = "inline-block";
        exists = true;
      }
    }
    if (exists === false) {
      window.alert("No Results Found");
      document.getElementById("noResults").style.visibility = "hidden";
      $("#searchBar").val('');
      for (var _i3 = 0; _i3 < 30; _i3++) {
        document.querySelectorAll(".imgContentDiv")[_i3].style.display = "inline-block";
        document.querySelectorAll(".imgContentDiv")[_i3].style.position = "relative";
      }
      return false;
    }
  });
  return false;
};

var handlePassChange = function handlePassChange(e) {
  // handles password change
  e.preventDefault();
  $("#errorMessage").fadeIn({ width: 'hide' }, 350);
  setTimeout(function () {
    $("#errorMessage").fadeOut({ width: 'hide' }, 350);
  }, 3000);
  if ($("#oldPass").val() === '' || $("#newPass").val() === '') {
    handleError("All fields are required.");
    return false;
  }
  sendAjax('POST', $("#passChangeForm").attr("action"), $("#passChangeForm").serialize(), function () {
    window.alert("Password Change Successful!");
    $("#oldPass").val('');
    $("#newPass").val('');
  });
  return false;
};

var handleAddFunds = function handleAddFunds(e) {
  // adds funds to account page
  e.preventDefault();
  $("#errorMessage").fadeIn({ width: 'hide' }, 350);
  setTimeout(function () {
    $("#errorMessage").fadeOut({ width: 'hide' }, 350);
  }, 3000);
  if (!parseInt($("#fundsToAdd").val())) {
    handleError("Please enter a valid number.");
    return false;
  }
  sendAjax('POST', $("#addFundsForm").attr("action"), $("#addFundsForm").serialize(), function () {
    window.alert("Updated funds! Refresh page to see changes.");
  });
  return false;
};

var handleBuySocks = function handleBuySocks(e) {
  // handles when user wants to buy socks; make sure request is valid and recursively calls buy page to make sure data is updated
  e.preventDefault();
  var currFundsVal = parseInt($("#currFunds").val());
  var socksPriceVal = parseInt($("#socksPrice").val());
  if (currFundsVal - socksPriceVal - 1 < 0) {
    window.alert("Not enough funds to buy.");
    return false;
  }
  sendAjax('POST', $("#buySocksForm").attr("action"), $("#buySocksForm").serialize(), function () {
    ConfirmPage($("#socksProps").val(), $("#socksBought").val(), $("#socksPrice").val(), $("#socksCategory").val(), $("#socksPicture").val());
  });
  return false;
};

var ContentPage = function ContentPage(props) {
  // created content page; when clicked, user should be logged in so it takes them to search page
  return React.createElement(
    'div',
    { id: 'loginStart' },
    React.createElement(
      'div',
      { className: 'taglineDiv' },
      React.createElement(
        'h1',
        null,
        ' Socko\'s Socks! '
      ),
      React.createElement(
        'h3',
        null,
        ' "Who needs friends when you have cool socks?" '
      )
    ),
    React.createElement('br', null),
    React.createElement(
      'div',
      { id: 'topRow' },
      React.createElement(
        'div',
        { id: 'scarySock' },
        React.createElement('img', { className: 'sockClass', src: 'assets/img/scarySock.jpg', alt: 'Scary Socks' }),
        React.createElement(
          'label',
          { htmlFor: 'scarySock' },
          ' Scary Socks'
        )
      ),
      React.createElement(
        'div',
        { id: 'crazySock' },
        React.createElement('img', { className: 'sockClass', src: 'assets/img/crazySock.jpg', alt: 'Crazy Socks' }),
        React.createElement(
          'label',
          { htmlFor: 'crazySock' },
          ' Crazy Socks'
        )
      ),
      React.createElement(
        'div',
        { id: 'funnySock' },
        React.createElement('img', { className: 'sockClass', src: 'assets/img/funnySock.jpg', alt: 'Funny Socks' }),
        React.createElement(
          'label',
          { htmlFor: 'funnySock' },
          ' Funny Socks'
        )
      )
    ),
    React.createElement(
      'div',
      { id: 'bottomRow' },
      React.createElement(
        'div',
        { id: 'coolSock' },
        React.createElement('img', { className: 'sockClass', src: 'assets/img/coolSock.jpg', alt: 'Cool Socks' }),
        React.createElement(
          'label',
          { htmlFor: 'coolSock' },
          ' Cool Socks'
        )
      ),
      React.createElement(
        'div',
        { id: 'superSock' },
        React.createElement('img', { className: 'sockClass', src: 'assets/img/superSock.jpg', alt: 'Super Socks' }),
        React.createElement(
          'label',
          { htmlFor: 'superSock' },
          ' Super Socks'
        )
      ),
      React.createElement(
        'div',
        { id: 'normalSock' },
        React.createElement('img', { className: 'sockClass', src: 'assets/img/normalSock.jpg', alt: 'Normal Socks' }),
        React.createElement(
          'label',
          { htmlFor: 'normalSock' },
          ' Normal Socks'
        )
      )
    )
  );
};

var AccountPage = function AccountPage(props) {
  // create account page and load in account info from account database; add funds and change password when prompted
  sendAjax('GET', '/getAccInfo', null, function (data) {
    ReactDOM.render(React.createElement(
      'div',
      { id: 'accountStart' },
      React.createElement(
        'div',
        { id: 'accountStart' },
        React.createElement(
          'div',
          { className: 'taglineDiv' },
          React.createElement(
            'h1',
            null,
            ' Socko\'s Socks! '
          ),
          React.createElement(
            'h3',
            null,
            ' "Who needs friends when you have cool socks?" '
          )
        )
      ),
      React.createElement(
        'div',
        { id: 'accountInfo' },
        React.createElement(
          'h1',
          null,
          ' Account Information '
        ),
        React.createElement('br', null),
        React.createElement(
          'p',
          null,
          ' Username: \xA0 \xA0 \xA0 \xA0 \xA0 \xA0 \xA0 \xA0 \xA0 \xA0 \xA0 \xA0 \xA0 ',
          data.info[0].username,
          ' '
        ),
        React.createElement(
          'p',
          null,
          ' Purchases: \xA0 \xA0 \xA0 \xA0 \xA0 \xA0 \xA0 \xA0 \xA0 \xA0 \xA0 \xA0 \xA0  ',
          data.info[0].purchases,
          ' '
        ),
        React.createElement(
          'p',
          null,
          ' Funds: \xA0 \xA0 \xA0 \xA0 \xA0 \xA0 \xA0 \xA0 \xA0 \xA0 \xA0 \xA0 \xA0 \xA0 $',
          data.info[0].funds,
          ' '
        ),
        React.createElement(
          'form',
          { id: 'passChangeForm',
            name: 'passChangeForm',
            onSubmit: handlePassChange,
            action: '/passChange',
            method: 'POST',
            className: 'passForm'
          },
          React.createElement('input', { id: 'username', type: 'hidden', name: 'username', value: data.info[0].username }),
          React.createElement(
            'label',
            { htmlFor: 'oldPass' },
            'Old Password: '
          ),
          React.createElement('input', { id: 'oldPass', type: 'password', name: 'oldPass', placeholder: 'old password' }),
          React.createElement(
            'label',
            { htmlFor: 'newPass' },
            'New Password: '
          ),
          React.createElement('input', { id: 'newPass', type: 'password', name: 'newPass', placeholder: 'new password' }),
          React.createElement('input', { type: 'hidden', name: '_csrf', value: props.csrf }),
          React.createElement('br', null),
          React.createElement('input', { className: 'passForm', id: 'passSubmit', type: 'submit', value: 'Change Password' })
        ),
        React.createElement(
          'form',
          { id: 'addFundsForm',
            name: 'addFundsForm',
            onSubmit: handleAddFunds,
            action: '/addFunds',
            method: 'POST',
            className: 'fundsForm'
          },
          React.createElement(
            'label',
            { htmlFor: 'fundsToAdd' },
            'Funds to Add: '
          ),
          React.createElement('input', { id: 'fundsToAdd', type: 'text', name: 'fundsToAdd', placeholder: '0' }),
          React.createElement('input', { type: 'hidden', name: '_csrf', value: props.csrf }),
          React.createElement('br', null),
          React.createElement('input', { className: 'fundsForm', id: 'fundsSubmit', type: 'submit', value: 'Add Funds' })
        )
      )
    ), document.querySelector("#content"));
  });
  return React.createElement('div', null);
};

var SearchPage = function SearchPage(props) {
  // create search page to load socks from database; if sock is clicked or searched for, load buy page with correct info.
  sendAjax('GET', '/getSocks', null, function (data) {
    ReactDOM.render(React.createElement(
      'div',
      { id: 'searchPageDiv' },
      React.createElement(
        'div',
        { id: 'searchStart' },
        React.createElement(
          'div',
          { className: 'taglineDiv' },
          React.createElement(
            'h1',
            null,
            ' Socko\'s Socks! '
          ),
          React.createElement(
            'h3',
            null,
            ' "Who needs friends when you have cool socks?" '
          )
        ),
        React.createElement(
          'div',
          { id: 'searchInfo' },
          React.createElement(
            'form',
            { id: 'searchForm',
              name: 'searchForm',
              onInput: handleSearchInput,
              onSubmit: handleSearchSubmit,
              action: '/searchSocks',
              method: 'GET',
              className: 'searchForm'
            },
            React.createElement('input', { id: 'searchBar', type: 'text', name: 'searchBar', placeholder: 'Search...' }),
            React.createElement('input', { type: 'hidden', name: '_csrf', value: props.csrf }),
            React.createElement('input', { id: 'searchProps', type: 'hidden', name: 'searchProps', value: props }),
            React.createElement('input', { type: 'image', src: 'assets/img/searchButton.png', alt: 'searchButton', className: 'searchSubmit' })
          )
        )
      ),
      React.createElement(
        'div',
        { id: 'displayContent' },
        React.createElement(
          'div',
          { className: 'imgContentDiv' },
          React.createElement('img', { src: data.socks[0].picture, alt: data.socks[0].name }),
          React.createElement(
            'h5',
            null,
            ' ',
            data.socks[0].name,
            ' '
          )
        ),
        React.createElement(
          'div',
          { className: 'imgContentDiv' },
          React.createElement('img', { src: data.socks[1].picture, alt: data.socks[1].name }),
          React.createElement(
            'h5',
            null,
            ' ',
            data.socks[1].name,
            ' '
          )
        ),
        React.createElement(
          'div',
          { className: 'imgContentDiv' },
          React.createElement('img', { src: data.socks[2].picture, alt: data.socks[2].name }),
          React.createElement(
            'h5',
            null,
            ' ',
            data.socks[2].name,
            ' '
          )
        ),
        React.createElement(
          'div',
          { className: 'imgContentDiv' },
          React.createElement('img', { src: data.socks[3].picture, alt: data.socks[3].name }),
          React.createElement(
            'h5',
            null,
            ' ',
            data.socks[3].name,
            ' '
          )
        ),
        React.createElement(
          'div',
          { className: 'imgContentDiv' },
          React.createElement('img', { src: data.socks[4].picture, alt: data.socks[4].name }),
          React.createElement(
            'h5',
            null,
            ' ',
            data.socks[4].name,
            ' '
          )
        ),
        React.createElement(
          'div',
          { className: 'imgContentDiv' },
          React.createElement('img', { src: data.socks[5].picture, alt: data.socks[5].name }),
          React.createElement(
            'h5',
            null,
            ' ',
            data.socks[5].name,
            ' '
          )
        ),
        React.createElement(
          'div',
          { className: 'imgContentDiv' },
          React.createElement('img', { src: data.socks[6].picture, alt: data.socks[6].name }),
          React.createElement(
            'h5',
            null,
            ' ',
            data.socks[6].name,
            ' '
          )
        ),
        React.createElement(
          'div',
          { className: 'imgContentDiv' },
          React.createElement('img', { src: data.socks[7].picture, alt: data.socks[7].name }),
          React.createElement(
            'h5',
            null,
            ' ',
            data.socks[7].name,
            ' '
          )
        ),
        React.createElement(
          'div',
          { className: 'imgContentDiv' },
          React.createElement('img', { src: data.socks[8].picture, alt: data.socks[8].name }),
          React.createElement(
            'h5',
            null,
            ' ',
            data.socks[8].name,
            ' '
          )
        ),
        React.createElement(
          'div',
          { className: 'imgContentDiv' },
          React.createElement('img', { src: data.socks[9].picture, alt: data.socks[9].name }),
          React.createElement(
            'h5',
            null,
            ' ',
            data.socks[9].name,
            ' '
          )
        ),
        React.createElement(
          'div',
          { className: 'imgContentDiv' },
          React.createElement('img', { src: data.socks[10].picture, alt: data.socks[10].name }),
          React.createElement(
            'h5',
            null,
            ' ',
            data.socks[10].name,
            ' '
          )
        ),
        React.createElement(
          'div',
          { className: 'imgContentDiv' },
          React.createElement('img', { src: data.socks[11].picture, alt: data.socks[11].name }),
          React.createElement(
            'h5',
            null,
            ' ',
            data.socks[11].name,
            ' '
          )
        ),
        React.createElement(
          'div',
          { className: 'imgContentDiv' },
          React.createElement('img', { src: data.socks[12].picture, alt: data.socks[12].name }),
          React.createElement(
            'h5',
            null,
            ' ',
            data.socks[12].name,
            ' '
          )
        ),
        React.createElement(
          'div',
          { className: 'imgContentDiv' },
          React.createElement('img', { src: data.socks[13].picture, alt: data.socks[13].name }),
          React.createElement(
            'h5',
            null,
            ' ',
            data.socks[13].name,
            ' '
          )
        ),
        React.createElement(
          'div',
          { className: 'imgContentDiv' },
          React.createElement('img', { src: data.socks[14].picture, alt: data.socks[14].name }),
          React.createElement(
            'h5',
            null,
            ' ',
            data.socks[14].name,
            ' '
          )
        ),
        React.createElement(
          'div',
          { className: 'imgContentDiv' },
          React.createElement('img', { src: data.socks[15].picture, alt: data.socks[15].name }),
          React.createElement(
            'h5',
            null,
            ' ',
            data.socks[15].name,
            ' '
          )
        ),
        React.createElement(
          'div',
          { className: 'imgContentDiv' },
          React.createElement('img', { src: data.socks[16].picture, alt: data.socks[16].name }),
          React.createElement(
            'h5',
            null,
            ' ',
            data.socks[16].name,
            ' '
          )
        ),
        React.createElement(
          'div',
          { className: 'imgContentDiv' },
          React.createElement('img', { src: data.socks[17].picture, alt: data.socks[17].name }),
          React.createElement(
            'h5',
            null,
            ' ',
            data.socks[17].name,
            ' '
          )
        ),
        React.createElement(
          'div',
          { className: 'imgContentDiv' },
          React.createElement('img', { src: data.socks[18].picture, alt: data.socks[18].name }),
          React.createElement(
            'h5',
            null,
            ' ',
            data.socks[18].name,
            ' '
          )
        ),
        React.createElement(
          'div',
          { className: 'imgContentDiv' },
          React.createElement('img', { src: data.socks[19].picture, alt: data.socks[19].name }),
          React.createElement(
            'h5',
            null,
            ' ',
            data.socks[19].name,
            ' '
          )
        ),
        React.createElement(
          'div',
          { className: 'imgContentDiv' },
          React.createElement('img', { src: data.socks[20].picture, alt: data.socks[20].name }),
          React.createElement(
            'h5',
            null,
            ' ',
            data.socks[20].name,
            ' '
          )
        ),
        React.createElement(
          'div',
          { className: 'imgContentDiv' },
          React.createElement('img', { src: data.socks[21].picture, alt: data.socks[21].name }),
          React.createElement(
            'h5',
            null,
            ' ',
            data.socks[21].name,
            ' '
          )
        ),
        React.createElement(
          'div',
          { className: 'imgContentDiv' },
          React.createElement('img', { src: data.socks[22].picture, alt: data.socks[22].name }),
          React.createElement(
            'h5',
            null,
            ' ',
            data.socks[22].name,
            ' '
          )
        ),
        React.createElement(
          'div',
          { className: 'imgContentDiv' },
          React.createElement('img', { src: data.socks[23].picture, alt: data.socks[23].name }),
          React.createElement(
            'h5',
            null,
            ' ',
            data.socks[23].name,
            ' '
          )
        ),
        React.createElement(
          'div',
          { className: 'imgContentDiv' },
          React.createElement('img', { src: data.socks[24].picture, alt: data.socks[24].name }),
          React.createElement(
            'h5',
            null,
            ' ',
            data.socks[24].name,
            ' '
          )
        ),
        React.createElement(
          'div',
          { className: 'imgContentDiv' },
          React.createElement('img', { src: data.socks[25].picture, alt: data.socks[25].name }),
          React.createElement(
            'h5',
            null,
            ' ',
            data.socks[25].name,
            ' '
          )
        ),
        React.createElement(
          'div',
          { className: 'imgContentDiv' },
          React.createElement('img', { src: data.socks[26].picture, alt: data.socks[26].name }),
          React.createElement(
            'h5',
            null,
            ' ',
            data.socks[26].name,
            ' '
          )
        ),
        React.createElement(
          'div',
          { className: 'imgContentDiv' },
          React.createElement('img', { src: data.socks[27].picture, alt: data.socks[27].name }),
          React.createElement(
            'h5',
            null,
            ' ',
            data.socks[27].name,
            ' '
          )
        ),
        React.createElement(
          'div',
          { className: 'imgContentDiv' },
          React.createElement('img', { src: data.socks[28].picture, alt: data.socks[28].name }),
          React.createElement(
            'h5',
            null,
            ' ',
            data.socks[28].name,
            ' '
          )
        ),
        React.createElement(
          'div',
          { className: 'imgContentDiv' },
          React.createElement('img', { src: data.socks[29].picture, alt: data.socks[29].name }),
          React.createElement(
            'h5',
            null,
            ' ',
            data.socks[29].name,
            ' '
          )
        )
      ),
      React.createElement(
        'h1',
        { id: 'noResults' },
        ' No Results Found'
      )
    ), document.querySelector("#content"));

    var _loop = function _loop(i) {
      var buyButton = document.querySelectorAll(".imgContentDiv")[i];
      buyButton.addEventListener("click", function (e) {
        e.preventDefault();
        BuyPage(props, data.socks[i].name, data.socks[i].price, data.socks[i].category, data.socks[i].picture); // call buy page with clicked on data
        return false;
      });
    };

    for (var i = 0; i < 30; i++) {
      _loop(i);
    }
  });
  return React.createElement(
    'div',
    { id: 'searchPageDiv' },
    React.createElement(
      'div',
      { id: 'searchStart' },
      React.createElement(
        'div',
        { className: 'taglineDiv' },
        React.createElement(
          'h1',
          null,
          ' Socko\'s Socks! '
        ),
        React.createElement(
          'h3',
          null,
          ' "Who needs friends when you have cool socks?" '
        )
      ),
      React.createElement(
        'div',
        { id: 'searchInfo' },
        React.createElement(
          'form',
          { id: 'searchForm',
            name: 'searchForm',
            onInput: handleSearchInput,
            onSubmit: handleSearchSubmit,
            action: '/searchSocks',
            method: 'GET',
            className: 'searchForm'
          },
          React.createElement('input', { id: 'searchBar', type: 'text', name: 'searchBar', placeholder: 'Search...' }),
          React.createElement('input', { type: 'hidden', name: '_csrf', value: props.csrf }),
          React.createElement('input', { id: 'searchProps', type: 'hidden', name: 'searchProps', value: props }),
          React.createElement('input', { type: 'image', src: 'assets/img/searchButton.png', alt: 'searchButton', className: 'searchSubmit' })
        )
      )
    )
  );
};

var BuyPage = function BuyPage(props, name, price, category, picture) {
  // create and render buypage
  window.history.pushState('buy', 'buyPage', '/buy');
  $('html, body').animate({ scrollTop: 0 }, 'fast');
  sendAjax('GET', '/getSocks', null, function (data) {
    var pic1 = "";
    var pic1Name = "";
    var pic1Price = "";
    var pic1Category = "";
    var pic2 = "";
    var pic2Name = "";
    var pic2Price = "";
    var pic2Category = "";
    var pic3 = "";
    var pic3Name = "";
    var pic3Price = "";
    var pic3Category = "";
    var count = 4;
    for (var i = 0; i < 30; i++) {
      // get suggested socks to show user based on what sock is initially selected
      if (data.socks[i].category === category && data.socks[i].name != name) {
        count--;
        switch (count) {
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
    sendAjax('GET', '/getAccInfo', null, function (data) {
      ReactDOM.render(React.createElement(
        'div',
        { id: 'buyStart' },
        React.createElement(
          'div',
          { className: 'taglineDiv' },
          React.createElement(
            'h1',
            null,
            ' Socko\'s Socks! '
          ),
          React.createElement(
            'h3',
            null,
            ' "Who needs friends when you have cool socks?" '
          )
        ),
        React.createElement('br', null),
        React.createElement(
          'div',
          { id: 'buyInfo' },
          React.createElement('img', { src: picture, alt: name }),
          React.createElement(
            'h3',
            null,
            ' Name: ',
            name,
            ' '
          ),
          React.createElement(
            'h3',
            null,
            ' Category: ',
            category,
            ' '
          ),
          React.createElement(
            'h3',
            null,
            ' Price: ',
            price,
            ' '
          ),
          React.createElement(
            'form',
            { id: 'buySocksForm',
              name: 'buySocksForm',
              onSubmit: handleBuySocks,
              action: '/buySocks',
              method: 'POST',
              className: 'buyForm'
            },
            React.createElement('input', { id: 'socksBought', type: 'hidden', name: 'socksBought', value: name }),
            React.createElement('input', { id: 'socksPrice', type: 'hidden', name: 'socksPrice', value: price }),
            React.createElement('input', { id: 'socksCategory', type: 'hidden', name: 'socksCategory', value: category }),
            React.createElement('input', { id: 'socksPicture', type: 'hidden', name: 'socksPicture', value: picture }),
            React.createElement('input', { id: 'socksProps', type: 'hidden', name: 'socksProps', value: props }),
            React.createElement('input', { id: 'currFunds', type: 'hidden', name: 'currFunds', value: data.info[0].funds }),
            React.createElement('input', { type: 'hidden', name: '_csrf', value: props.csrf }),
            React.createElement('input', { className: 'buyForm', type: 'submit', value: 'Buy Now!' })
          )
        ),
        React.createElement(
          'div',
          { id: 'similarSocks' },
          React.createElement(
            'div',
            { id: 'recommend' },
            React.createElement(
              'h4',
              null,
              ' Based on your selection, we also recommend '
            ),
            React.createElement('br', null)
          ),
          React.createElement(
            'div',
            { id: 'socksR' },
            React.createElement(
              'div',
              { id: 'sock1' },
              React.createElement('img', { src: pic1, alt: pic1Name }),
              React.createElement(
                'h5',
                null,
                ' ',
                pic1Name,
                ' '
              )
            ),
            React.createElement(
              'div',
              { id: 'sock2' },
              React.createElement('img', { src: pic2, alt: pic2Name }),
              React.createElement(
                'h5',
                null,
                ' ',
                pic2Name,
                ' '
              )
            ),
            React.createElement(
              'div',
              { id: 'sock3' },
              React.createElement('img', { src: pic3, alt: pic3Name }),
              React.createElement(
                'h5',
                null,
                ' ',
                pic3Name,
                ' '
              )
            )
          )
        )
      ), document.querySelector("#content"));
      var sock1Link = document.querySelector("#sock1"); // reload buypage with new content if suggested sock is clicked
      sock1Link.addEventListener("click", function (e) {
        BuyPage(props, pic1Name, pic1Price, pic1Category, pic1);
      });
      var sock2Link = document.querySelector("#sock2");
      sock2Link.addEventListener("click", function (e) {
        BuyPage(props, pic2Name, pic2Price, pic2Category, pic2);
      });
      var sock3Link = document.querySelector("#sock3");
      sock3Link.addEventListener("click", function (e) {
        BuyPage(props, pic3Name, pic3Price, pic3Category, pic3);
      });
    });
  });
  return React.createElement('div', null);
};

var ConfirmPage = function ConfirmPage(props, name, price, category, picture) {
  // created buy confirm page; user is redirected after successfully buying a pair of socks
  window.history.pushState('confirmation', 'confirmationPage', '/confirmation');
  ReactDOM.render(React.createElement(
    'div',
    { id: 'confirmStart' },
    React.createElement(
      'div',
      { className: 'taglineDiv' },
      React.createElement(
        'h1',
        null,
        ' Socko\'s Socks! '
      ),
      React.createElement(
        'h3',
        null,
        ' "Who needs friends when you have cool socks?" '
      )
    ),
    React.createElement('br', null),
    React.createElement(
      'div',
      { id: 'confirmInfo' },
      React.createElement(
        'h2',
        null,
        ' Thank you for your purchase!'
      ),
      React.createElement('br', null),
      React.createElement(
        'h3',
        null,
        ' Receipt Information: '
      ),
      React.createElement(
        'h4',
        null,
        ' Name: ',
        name,
        ' '
      ),
      React.createElement(
        'h4',
        null,
        ' Price: ',
        price,
        ' '
      ),
      React.createElement(
        'h4',
        null,
        ' Category: ',
        category,
        ' '
      ),
      React.createElement('br', null),
      React.createElement(
        'div',
        { id: 'backBrowsingTab' },
        React.createElement('img', { src: 'assets/img/leftArrow.png', alt: 'toSearch' }),
        React.createElement(
          'a',
          { href: 'search' },
          ' ',
          React.createElement(
            'h5',
            null,
            ' Back to Browsing '
          ),
          ' '
        )
      ),
      React.createElement(
        'div',
        { id: 'myCollectionTab' },
        React.createElement('img', { src: 'assets/img/leftArrow.png', alt: 'toCollection' }),
        React.createElement(
          'a',
          { href: 'collection' },
          ' ',
          React.createElement(
            'h5',
            null,
            ' My Collection '
          ),
          ' '
        )
      )
    )
  ), document.querySelector("#content"));
  return React.createElement('div', null);
};

var CollectionPage = function CollectionPage(props) {
  return React.createElement(
    'div',
    { id: 'collectionStart' },
    React.createElement(
      'div',
      { className: 'taglineDiv' },
      React.createElement(
        'h1',
        null,
        ' Socko\'s Socks! '
      ),
      React.createElement(
        'h3',
        null,
        ' "Who needs friends when you have cool socks?" '
      )
    ),
    React.createElement('br', null),
    React.createElement(
      'div',
      null,
      React.createElement(
        'h2',
        null,
        ' Collection Page TBD '
      )
    )
  );
};

var createContentPage = function createContentPage(csrf) {
  // render content page
  ReactDOM.render(React.createElement(ContentPage, { csrf: csrf }), document.querySelector("#content"));
};

var createAccountPage = function createAccountPage(csrf) {
  // render account page
  ReactDOM.render(React.createElement(AccountPage, { csrf: csrf }), document.querySelector("#content"));
};

var createSearchPage = function createSearchPage(csrf) {
  // render search page
  ReactDOM.render(React.createElement(SearchPage, { csrf: csrf }), document.querySelector("#content"));
};

var createCollectionPage = function createCollectionPage(csrf) {
  // render collection page
  ReactDOM.render(React.createElement(CollectionPage, { csrf: csrf }), document.querySelector("#content"));
};

var setup = function setup(csrf) {
  // take to page and change url based on clicked button
  createContentPage(csrf);
  var urlString = window.location.href;
  var homeButton = document.querySelector("#homeButton");
  var accountButton = document.querySelector("#accountButton");
  var collectionButton = document.querySelector("#collectionButton");
  for (var i = 0; i < document.querySelectorAll(".sockClass").length; i++) {
    var searchButton = document.querySelectorAll(".sockClass")[i];
    searchButton.addEventListener("click", function (e) {
      e.preventDefault();
      createSearchPage(csrf);
      window.history.pushState('search', 'searchPage', '/search');
      return false;
    });
  }
  homeButton.addEventListener("click", function (e) {
    console.log("click");
    createContentPage(csrf);
    window.history.pushState('home', 'homePage', '/home');
    return false;
  });
  accountButton.addEventListener("click", function (e) {
    e.preventDefault();
    createAccountPage(csrf);
    window.history.pushState('account', 'accountPage', '/account');
    return false;
  });
  collectionButton.addEventListener("click", function (e) {
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

var getToken = function getToken() {
  // get csrf token
  sendAjax('GET', '/getToken', null, function (result) {
    setup(result.csrfToken);
  });
};

if (performance.navigation.type === 1) {
  // if page is refreshed, take to home page
  window.history.pushState('home', 'homePage', '/home');
}

$(document).ready(function () {
  getToken();
});
"use strict";

// handle error and redirects for website

var handleError = function handleError(message) {
  $("#errMessage").text(message);
  $("#errorMessage").fadeIn({ width: 'toggle' }, 350);
};

var redirect = function redirect(response) {
  $("#errorMessage").fadeIn({ width: 'hide' }, 350);
  window.location = response.redirect;
};

var sendAjax = function sendAjax(type, action, data, success) {
  $.ajax({
    cache: false,
    type: type,
    url: action,
    data: data,
    dataType: 'json',
    success: success,
    error: function error(xhr, status, _error) {
      var messageObj = JSON.parse(xhr.responseText);
      handleError(messageObj.error);
    }
  });
};
