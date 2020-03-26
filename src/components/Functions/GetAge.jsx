
export const Age = (date)=>{
  if(!date){
    return '';
  }
    var today = new Date();
    var dateParts = date.split("-");
    var dateObject = new Date(+dateParts[2], dateParts[1] - 1, +dateParts[0]);
    var birthDate = new Date(dateObject);  // create a date object directly from `dob1` argument
    console.log(dateObject);
    console.log(birthDate);
    var age_now = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate()))
    {
      age_now--;
    }
  
    if(age_now === 0){
      return m + ' month(s)';
    }
    console.log(age_now);
    return age_now + ' year(s)';
}