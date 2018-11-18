export const pad = (num, size) => {
  let s = num.toString();
  while(s.length < size) s = '0' + s;
  return s;
}

export const getScheduleItem = (schedule, fares, ticketType) => {
  const trainNo = schedule.DailyTrainInfo.TrainNo;
  const trainDate = schedule.TrainDate;
  const originTimeStr = schedule.OriginStopTime.DepartureTime;
  const originTime = new Date(`${trainDate} ${originTimeStr}`).getTime();
  const destinationTimeStr = schedule.DestinationStopTime.ArrivalTime;
  const destinationTime = new Date(`${trainDate} ${destinationTimeStr}`).getTime();
  const duration = destinationTime - originTime;
  const durationMin = Math.round(duration / 1000 / 60);
  const durationStr = `${pad(Math.floor(durationMin / 60), 2)}:${pad(durationMin % 60, 2)}`;
  const price = Number(fares.find(fare => fare.TicketType === ticketType).Price);
  const priceStr = `$${price.toLocaleString('en')} ${ticketType === '商務' ? '(商務)' : ''}`;
   return {
    key: trainNo,
    trainNo: {
      value: trainNo
    },
    originTime: {
      value: originTime,
      text: originTimeStr
    },
    destinationTime: {
      value: destinationTime,
      text: destinationTimeStr
    },
    duration: {
      value: duration,
      text: durationStr
    },
    price: {
      value: price,
      text: priceStr
    }
  }
}
