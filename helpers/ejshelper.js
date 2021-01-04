const moment = require('moment')

module.exports = {

  // format date in a good way.
  formatDate: function (date, format) {
    return moment(date).format(format)
  },
  
  // return completed days in goal report page
  returncompletedDays: function(startDate,endDate,totalDays){
      var today=new Date();
      var startdate=new Date(startDate);
      var enddate=new Date(endDate); 
      if(today.getTime() > enddate.getTime()){
        return totalDays;
      }else{
        var completedDays = Math.floor(((today.getTime() - startdate.getTime()) / (1000 * 3600 * 24)) + 1);
        return completedDays;
      }
  },

  // return goal progress based on no. of days completed.
  returnProgress: function (startDate,endDate, totalDays) {
    var today = new Date();
    var startdate=new Date(startDate);
    var enddate=new Date(endDate);
    console.log(startdate);
    if (startdate.getTime() > today.getTime()) {
      return 0;
    } else if(today.getTime()>enddate.getTime()){
      return 100;
    }
    else {
      var completedDays = Math.floor(((today.getTime() - startdate.getTime()) / (1000 * 3600 * 24)) + 1);
      
      var progress = Math.floor((completedDays / totalDays) * 100);
      
      return progress;
    }

  },
  
  // return active goals on list menu
  returnActiveGoals: function(startDate,endDate){
    var activegoal=false;
    var today = new Date();
    var startdate=new Date(startDate);
    var enddate=new Date(endDate);
    console.log(startdate);
    if ((today.getTime() > startdate.getTime())&&(enddate.getTime()> today.getTime())) {
      activegoal=true;
    }
    return activegoal;
  }

 
}