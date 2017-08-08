$("ul.cpt").mouseover(function(){
	$("li.cpt").show();
});
$("ul.cpt").mouseleave(function(){
	$("li.cpt").hide();
});
$('div.list').mouseover(function(){
	$(this).children('ul.dropdown').show();
});
$("div.list").mouseleave(function(){
	$("ul.dropdown").hide();
});
$(window).scroll(function(){
  if($(window).scrollTop()>0){
    $(".navbar1").css({"top":(-1)*$(window).scrollTop()});
  }else if($(window).scrollTop()<0 && (-1)*$(window).scrollTop()<$(".navbar1").height()){
    $(".navbar1").css({"top":$(window).scrollTop()});
  }
    var top = $(".navbar1").height()+parseInt($(".navbar1").css("top"), 10);
    if(top < 0){top=0;}
        $(".nav").css({"top":top});
        $(".inboxCal").css({"top":top});
  
});
/*****************cal******************/
var Cal = function(divId) {

  //Store div id
  this.divId = divId;

  // Days of week, starting on Sunday
  this.DaysOfWeek = [
    'Sun',
    'Mon',
    'Tue',
    'Wed',
    'Thu',
    'Fri',
    'Sat'
  ];

  // Months, stating on January
  this.Months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December' ];

  // Set the current month, year
  var d = new Date();

  this.currMonth = d.getMonth();
  this.currYear = d.getFullYear();
  this.currDay = d.getDate();

};

// Goes to next month
Cal.prototype.nextMonth = function() {
  if ( this.currMonth == 11 ) {
    this.currMonth = 0;
    this.currYear = this.currYear + 1;
  }
  else {
    this.currMonth = this.currMonth + 1;
  }
  this.showcurr();
};

// Goes to previous month
Cal.prototype.previousMonth = function() {
  if ( this.currMonth == 0 ) {
    this.currMonth = 11;
    this.currYear = this.currYear - 1;
  }
  else {
    this.currMonth = this.currMonth - 1;
  }
  this.showcurr();
};

// Show current month
Cal.prototype.showcurr = function() {
  this.showMonth(this.currYear, this.currMonth);
};

// Show month (year, month)
Cal.prototype.showMonth = function(y, m) {

  var d = new Date()
  // First day of the week in the selected month
  , firstDayOfMonth = new Date(y, m, 1).getDay()
  // Last day of the selected month
  , lastDateOfMonth =  new Date(y, m+1, 0).getDate()
  // Last day of the previous month
  , lastDayOfLastMonth = m == 0 ? new Date(y-1, 11, 0).getDate() : new Date(y, m, 0).getDate();


  var html = '<table class="tableGNR">';

  // Write selected month and year
  html += '<thead class="thd"><tr>';
  html += '<td class="tdGNR" colspan="7">' + this.Months[m] + ' ' + y + '</td>';
  html += '</tr></thead>';


  // Write the header of the days of the week
  html += '<tr class="days">';
  for(var i=0; i < this.DaysOfWeek.length;i++) {
    html += '<td class="tdGNR">' + this.DaysOfWeek[i] + '</td>';
  }
  html += '</tr>';

  // Write the days
  var i=1;
  do {

    var dow = new Date(y, m, i).getDay();

    // If Sunday, start new row
    if ( dow == 0 ) {
      html += '<tr>';
    }
    // If not Sunday but first day of the month
    // it will write the last days from the previous month
    else if ( i == 1 ) {
      html += '<tr>';
      var k = lastDayOfLastMonth - firstDayOfMonth+1;
      for(var j=0; j < firstDayOfMonth; j++) {
        html += '<td class="tdGNR"><a class="not-current" href="#">' + k + '</a></td>';
        k++;
      }
    }

    // Write the current day in the loop
    var chk = new Date();
    var chkY = chk.getFullYear();
    var chkM = chk.getMonth();
    if (chkY == this.currYear && chkM == this.currMonth && i == this.currDay) {
      html += '<td class="tdGNR"><a class="today" href="#">' + i + '</a></td>';
    } else if (chkY == this.currYear && chkM == this.currMonth && i < this.currDay) {
      html += '<td class="tdGNR"><a class="infToday" href="#">' + i + '</a></td>';
    } else if (chkY == this.currYear && chkM > this.currMonth) {
      html += '<td class="tdGNR"><a class="infToday" href="#">' + i + '</a></td>';
    } else if (chkY > this.currYear) {
      html += '<td class="tdGNR"><a class="infToday" href="#">' + i + '</a></td>';
    } else {
      html += '<td class="tdGNR">' + i + '</td>';
    }
    // If Saturday, closes the row
    if ( dow == 6 ) {
      html += '</tr>';
    }
    // If not Saturday, but last day of the selected month
    // it will write the next few days from the next month
    else if ( i == lastDateOfMonth ) {
      var k=1;
      for(dow; dow < 6; dow++) {
        html += '<td class="not-current tdGNR">' + k + '</td>';
        k++;
      }
    }

    i++;
  }while(i <= lastDateOfMonth);

  // Closes table
  html += '</table>';

  // Write HTML to the div
  document.getElementById(this.divId).innerHTML = html;
};

// On Load of the window
window.onload = function() {

  //positions blocks
  $(".navbar1").css({"top":"0","left":"0"});
  $(".nav").css({"left":"0","top":$(".navbar1").height()});
  $(".inboxCal").css({"right":"0","top":$(".navbar1").height()});
  $(".corps").css({"left":"0","top":$(".navbar1").height()+$(".nav").height()});

  // Start calendar
  var c = new Cal("divCal");			
  c.showcurr();

  // Bind next and previous button clicks
  getId('btnNext').onclick = function() {
    c.nextMonth();
  };
  getId('btnPrev').onclick = function() {
    c.previousMonth();
  };
}

// Get element by id
function getId(id) {
  return document.getElementById(id);
}