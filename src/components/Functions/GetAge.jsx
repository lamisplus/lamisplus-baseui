import moment from 'moment';

export const Age = (date)=>{

    const  currentYear = moment(new Date());
    const  newdate = moment(date);
    const  years = currentYear.diff(newdate, 'years');
   return years;
    
}