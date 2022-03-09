
const timeToDate = (s) => {

  let time = new Date(s * 1000).toLocaleString('en-US', {timeZone:'CST'});

  if (time[1] === '/') {
    time = '0' + time;
  };

  if (time[4] === '/') {
    time = time.substring(0, 3) + '0' + time.substring(3, time.length);
  }

  
  // let month = time.substring(0, 2);
  // let day = time.substring(3, 5);
  // let year = time.substring(6, 10);
  // I might in the future want to edit the way the date it outputted, this 
  // would be the way to do it I think.


  return time;
}

export default timeToDate