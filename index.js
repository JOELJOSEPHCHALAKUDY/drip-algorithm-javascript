
// algorithm to find start date and end date of current period relative to given contract bill start date and period:


const bill_period_map = {
'monthly' : 1, 
'quarterly' : 3,
'half-yearly' : 6, 
'annual' : 12
};

// get the bill start date
const bill_start_date = new Date('03-24-2021');
const start_date_of_bill_start_month =  new Date(bill_start_date.getFullYear(), bill_start_date.getMonth(), 1);


// func to find month diff btwn 2 dates
 const monthDiff = (dateOne, dateTwo) => {
    let months;
    months = (dateTwo.getFullYear() - dateOne.getFullYear()) * 12;
    months -= dateOne.getMonth();
    months += dateTwo.getMonth();
    return months <= 0 ? 0 : months;
}

const findDaterageForCurrentPeriod = (start_date,bill_period) => {

// get current date
const current_date = new Date();
const diff_value = monthDiff(start_date,current_date);
const factor = (diff_value % bill_period_map[bill_period]);

let from_date;
let to_date; 

 switch (bill_period) {
  case 'monthly':
    from_date = new Date(current_date.getFullYear(), current_date.getMonth(), 1);
    to_date = new Date(current_date.getFullYear(), current_date.getMonth() + 1, 0);
    break;
  case 'quarterly':
  case 'half-yearly':
  case 'annual':
    // factor  
    // 0 - month 1 ,
    // 1 - month 2 ,
    // 2 - month 3 ,
     
    from_date = new Date(current_date.getFullYear(), current_date.getMonth() - factor, 1);
    to_date = new Date(current_date.getFullYear(), current_date.getMonth() + bill_period_map[bill_period] - factor, 0);
    break;
};

return { start: `${from_date}`,  end: `${to_date}` };  //should return in prod { start: from_date,  end: to_date };

};

console.log(findDaterageForCurrentPeriod(start_date_of_bill_start_month,'annual'));


