var accounts;
var account;

function setStatus(message) {
  var status = document.getElementById("status");
  status.innerHTML = message;
};

function refreshBalance() {
  var meta = MetaCoin.deployed();

  meta.getBalance.call(account, {from: account}).then(function(value) {
    var balance_element = document.getElementById("balance");
    balance_element.innerHTML = value.valueOf();
  }).catch(function(e) {
    console.log(e);
    setStatus("Error getting balance; see log.");
  });
};

function sendHash() {
  //getAddresses();
  var meta = MetaCoin.deployed();

  var address = document.getElementById("studentId").value;
  var hash = (document.getElementById("hash").value);
  //var hashbytes = toUTF8Array(hash);
  //alert(hashbytes);
  setStatus("Initiating transaction... (please wait)");

  meta.sendHash(address, hash, {from: account}).then(function() {
    setStatus("Transaction complete!");
    //refreshBalance();
  }).catch(function(e) {
    console.log(e);
    setStatus("Error sending contract; see log.");
  });
  //alert(address);
};

function getHashValue(studId) {
  var studId = document.getElementById('studId').value;
  alert(studId, account)
  var meta = MetaCoin.deployed();

  var h;
  h = meta.getHash(studId, {from: account}).then(function() {
    setStatus(h);
  });
};

function sendCoin() {
  var meta = MetaCoin.deployed();

  var amount = parseInt(document.getElementById("amount").value);
  var receiver = document.getElementById("receiver").value;

  setStatus("Initiating transaction... (please wait)");

  meta.sendCoin(receiver, amount, {from: account}).then(function() {
    setStatus("Transaction complete!");
    refreshBalance();
  }).catch(function(e) {
    console.log(e);
    setStatus("Error sending coin; see log.");
  });
};

window.onload = function() {
  web3.eth.getAccounts(function(err, accs) {
    if (err != null) {
      alert("There was an error fetching your accounts.");
      return;
    }

    if (accs.length == 0) {
      alert("Couldn't get any accounts! Make sure your Ethereum client is configured correctly.");
      return;
    }

    accounts = accs;
    account = accounts[0];
    //alert(account);
    //refreshBalance();
  });
}