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

// 시간을 가져와서 붙이기
const getHours = function (hours) {
  // AM or PM
  turnOn(1, 5);
  turnOn(1, 6 + Math.floor(hours / 12));

  // "시" 불 키기
  turnOn(3, 7);

  let hoursPos = hours % 12;
  // 0 1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 17 18 19 20 21 22 23
  // 0 1 2 3 4 5 6 7 8 9 10 11 0 1 2 3 4 5 6 7 8 9 10 11

  let ten = hoursPos / 10;
  let one = hoursPos % 10;
  // 0 1 2 3 4 5 6 7 8 9 0 1 0 1 2 3 4 5 6 7 8 9 0 1

  // "열" 불키기
  if (ten >= 1 || ten === 0) {
    turnOn(2, 1);
  }

  // "일의 자리" 불키기
  switch (one) {
    case 1:
    case 2:
    case 3:
    case 4:
      turnOn(2, 1 + one);
      break;
    case 5:
      turnOn(2, 1 + one);
      turnOn(3, 1);
      break;
    case 6:
      turnOn(3, one - 6);
      turnOn(3, one - 5);
      break;
    case 7:
      turnOn(3, one - 5);
      turnOn(3, one - 4);
      break;
    case 8:
      turnOn(3, one - 8);
      turnOn(3, one - 4);
      break;
    case 9:
      turnOn(3, one - 4);
      turnOn(3, one - 3);
      break;
  }
};

// 분을 가져와서 불키기
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

// 초를 가져와서 불키기
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

// 불키는 함수
const turnOn = function (row, cloumn) {
  let choiceRow = $("#clock tr")[row];
  let choiceCloumn = $(choiceRow).find("td")[cloumn];
  $(choiceCloumn).addClass("on");
};

// 불 끄는 함수 (매 초마다 초기화해서 동적으로 보여줌)
const turnOff = function () {
  $(".on").removeClass("on");
};

// 웹 구동시 바로 보이도록 함수 지정
getDate();

// 1초마다 함수 구공하는 함수
setInterval(getDate, 1000);
