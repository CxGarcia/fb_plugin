let iterator = -1;
let div;
let payeeInfo;

chrome.storage.sync.get(["value"], function (result) {
  if (result.value) iterator = result.value;
  createDiv();
});

const officers = [
  {
    name: "Officer 1",
    daily: 200,
    days: 20,
    position: "1ENG",
    vessel: "AT84",
    accountNumber: 21890005560,
  },
  {
    name: "Officer 2",
    daily: 250,
    days: 20,
    position: "CENG",
    vessel: "AT84",
    accountNumber: 21890002921,
  },
  {
    name: "Officer 3",
    daily: 150,
    days: 20,
    position: "2ENG",
    vessel: "AT84",
    accountNumber: 21890003169,
  },
  {
    name: "Officer 4",
    daily: 150,
    days: 20,
    position: "MST",
    vessel: "AT85",
    accountNumber: 21890002917,
  },
  {
    name: "Officer 5",
    daily: 150,
    days: 10,
    position: "1DO",
    vessel: "AT85",
    accountNumber: 21890003239,
  },
  {
    name: "Officer 6",
    daily: 150,
    days: 20,
    position: "2DO",
    vessel: "AT85",
    accountNumber: 21890005076,
  },
];

window.addEventListener("keydown", (event) => {
  let keyPressed = doWhichKey(event);
  console.log(iterator);
  if (keyPressed == 40 || keyPressed == 38) {
    if (keyPressed == 40 && iterator < officers.length - 1) iterator++;
    else if (keyPressed == 38 && iterator > 0) iterator--;
    else return;

    console.log(iterator);

    let currentOfficer = officers[iterator];
    selectAccount(currentOfficer);

    let clip = appendValue(currentOfficer);

    let copyString = `${iterator + 1}. ${clip} - ${currentOfficer.name}`;
    copyToClipboard(copyString);

    chrome.storage.sync.set({ value: iterator }, function () {
      console.log("storing " + iterator);
    });
  }
});

function doWhichKey(event) {
  event = event || window.event;
  let charCode = event.keyCode || event.which;
  return charCode;
}

function appendValue({ name, daily, days, position, vessel }) {
  let amount = document.querySelector("input[name='txtValor']");
  let description = document.querySelector("input[name='txtConcepto']");
  let string = `${vessel} ${position} JUL ${days} x ${daily}`;
  let total = daily * days;

  amount.value = total;
  description.value = string;

  payeeInfo.innerHTML = `${
    iterator + 1
  }. ${name} | ${vessel} | ${position} | ${days} x ${daily} = ${total}`;

  return string;
}

function copyToClipboard(string) {
  var el = document.createElement("textarea");
  el.value = string;
  el.setAttribute("readonly", "");
  el.style = { position: "absolute", left: "-9999px" };
  document.body.appendChild(el);
  el.select();
  document.execCommand("copy");
  document.body.removeChild(el);
}

function selectAccount({ accountNumber }) {
  const option = document.querySelector(`option[text='${accountNumber}']`);

  const select = document.querySelector("select[name='ddmTercero']");

  select.selectedIndex = option.index;
}

function createDiv() {
  payeeInfo = document.createElement("p");
  payeeInfo.setAttribute("class", "payeeInfo");

  if (iterator >= 0) {
    let currentOfficer = officers[iterator];
    payeeInfo.innerHTML = `${iterator + 1}. ${currentOfficer.name} | ${
      currentOfficer.vessel
    } | ${currentOfficer.accountNumber} | ${
      currentOfficer.days * currentOfficer.daily
    }`;
  } else {
    payeeInfo.innerHTML = "Facebank Quick Pay is Active";
  }

  div = document.createElement("div");
  div.setAttribute("class", "currentPayee");
  div.appendChild(payeeInfo);

  let mainForm =
    document.querySelector("form[name='form1']") ||
    document.querySelector("form[name='form2']");

  mainForm != null ? mainForm.appendChild(div) : null;
}
