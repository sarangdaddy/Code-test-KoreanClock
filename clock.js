// 현재 시간을 분리하여 가져오기
const getDate = function () {
  turnOff();

  const date = new Date();
  const day = date.getDate();
  const hours = date.getHours();
  const min = date.getMinutes();
  const sec = date.getSeconds();

  getDay(day);
  getHours(hours);
  getMinutes(min);
  getSeconds(sec);
};

// 날짜를 가져와서 불키기
const getDay = function (day) {
  let tenPos = Math.floor(day / 10);
  let onePos = day % 10;

  //십자리
  if (tenPos > 1) {
    turnOn(0, tenPos - 2);
  }
  if (tenPos !== 0) {
    turnOn(0, 2);
  }

  //일의자리
  switch (onePos) {
    case 1:
    case 2:
    case 3:
    case 4:
    case 5:
      turnOn(0, 2 + onePos);
      break;
    case 6:
    case 7:
    case 8:
    case 9:
      turnOn(1, onePos - 6);
      break;
  }
  // '일'
  turnOn(1, 4);
};

const getHours = function (hours) {
  // AM or PM
  turnOn(1, 5);
  turnOn(1, 6 + Math.floor(hours / 12));

  // 시간 : 한시 두시 세시 ... 열시 열한시 열두시
  turnOn(3, 7);
  let hoursPos = hours % 12;
  // 1 2 3 4 5 6 7 8 9 10 11 0 1 2 3 4 5 6 7 8 9 10 11 0

  if (hoursPos === 1 / 10 >= 1) {
    turnOn(2, 1);
  } else if (hoursPos === 0) {
    turnOn(2, 1);
    turnOn(2, 3);
  }

  switch (hoursPos) {
    case 1:
    case 2:
    case 3:
    case 4:
      turnOn(2, 1 + hoursPos);
      break;
    case 5:
      turnOn(2, 1 + hoursPos);
      turnOn(3, 1);
      break;
    case 6:
      turnOn(3, hoursPos - 6);
      turnOn(3, hoursPos - 5);
      break;
    case 7:
      turnOn(3, hoursPos - 5);
      turnOn(3, hoursPos - 4);
      break;
    case 8:
      turnOn(3, hoursPos - 8);
      turnOn(3, hoursPos - 4);
      break;
    case 9:
      turnOn(3, hoursPos - 4);
      turnOn(3, hoursPos - 3);
      break;
  }
};

const getMinutes = function (min) {
  let ten = Math.floor(min / 10);
  let one = min % 10;

  if (ten > 0) {
    turnOn(4, 4);
  }

  switch (ten) {
    case 2:
    case 3:
    case 4:
    case 5:
      turnOn(4, ten - 2);
      break;
  }

  switch (one) {
    case 1:
    case 2:
      turnOn(4, 4 + one);
      break;
    case 3:
    case 4:
    case 5:
    case 6:
    case 7:
    case 8:
    case 9:
      turnOn(5, one - 3);
      break;
  }
  turnOn(5, 7);
};

const getSeconds = function (sec) {
  let ten = Math.floor(sec / 10);
  let one = sec % 10;

  if (ten > 0) {
    turnOn(6, 4);
  }

  switch (ten) {
    case 2:
    case 3:
    case 4:
    case 5:
      turnOn(6, ten - 2);
      break;
  }

  switch (one) {
    case 1:
    case 2:
      turnOn(6, 4 + one);
      break;
    case 3:
    case 4:
    case 5:
    case 6:
    case 7:
    case 8:
    case 9:
      turnOn(7, one - 3);
      break;
  }
  turnOn(7, 7);
};

const turnOn = function (row, cloumn) {
  let choiceRow = $("#clock tr")[row];
  let choiceCloumn = $(choiceRow).find("td")[cloumn];
  $(choiceCloumn).addClass("on");
};

const turnOff = function () {
  $(".on").removeClass("on");
};

getDate();
setInterval(getDate, 1000);
