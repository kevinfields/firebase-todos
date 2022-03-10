const timeToDate = (s, edit) => {

  let time = new Date(s * 1000).toLocaleString('en-US', {timeZone:'CST'});
  let editor = '';
  
  if (time[1] === '/') {
    time = '0' + time;
  };

  if (time[4] === '/') {
    time = time.substring(0, 3) + '0' + time.substring(3, time.length);
  }

  // 0 1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7 8 9 0 1 2
  // 0 3 / 0 8 / 2 0 2 2 ,   2 : 3 1 : 0 2   P M
  //                         1 1 : 2 2 : 0 3   P M

  if (edit) {
    if (time === '01/01/2000, 12:00:00 AM') {
      return 'Unedited';
    }
    editor = 'Last edited: ';
  }

  // time = time.substring(0, 11) + '0' + time.substring(12, 17);

  let date = time.substring(0, 10);

  let timeStamp;
  let apm;

  if (time[13] === ':') {
    timeStamp = '0' + time.substring(12, 16);
    apm = time.substring(20, 22);
  } else if (time[14] === ':') {
    timeStamp = time.substring(12, 17);
    apm = time.substring(21, 23);
  } else {
    timeStamp = '00:00';
    apm = 'A/P M'
    console.log('how did this happen');
  } 
  
  return `${editor}${timeStamp} ${apm} - ${date}`;
}

export default timeToDate