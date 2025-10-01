import { parseISO, formatDistanceToNow } from "date-fns";

export const TimeAgo = ({timestamp}) => {
   let timeAgo='';
   if(timestamp){
    const date = parseISO(timestamp);
    const timePeriod = formatDistanceToNow(date);
    // timeAgo = `${timePeriod} ago`
    if(timePeriod.includes('days'))
        timeAgo = `${timePeriod.split(' ')[0]} d`
    else if(timePeriod.includes('year'))
      timeAgo = `${timePeriod.split(' ')[0]} y`
    else if(timePeriod.includes('hour')){
      if(timePeriod.includes('about'))
        timeAgo = `${timePeriod.replace('hour', '').replace('about', '')} h` 
      else
      timeAgo = `${timePeriod.split(' ')[0]} h`
    }
   else if(timePeriod.includes('minutes'))
      timeAgo = `${timePeriod.split(' ')[0]} m`
    else
       timeAgo = 'just now'
  }

  return (
    <span style={{fontSize: '10px'}}>&nbsp; <i>{timeAgo}</i></span>
  )
}
