var _url= "evelist.json";
var upcoming_eve;
var timeinterval;

fetch(_url).then(function(x){
  x.json().then(function(data){
    upcoming_eve = data["evelist"];
  });
});
setTimeout(function(){
  upcoming_eve.forEach(function(eve_i){
    var eve_i_event = eve_i["event"];
    var eve_i_date = eve_i["Date"];
    var eve_i_img = eve_i["img"]; 
    var $input = $('<input/>').attr({ type: 'button', class:'eventsButton', id:eve_i_date, "data-img" :eve_i_img, value:eve_i_event, name:eve_i_event});
    $input.appendTo('div#upcoming_eve');
  });
  startClock(upcoming_eve[0]["Date"]);
  $('#event_name').text(upcoming_eve[0]["event"]);
  var $input = $('<img>').attr({ src: upcoming_eve[0]["img"], height:"350", width:"700"});
  $input.appendTo('section#eve_img');
} ,2000);


$(document).on('click','.eventsButton',function(){
  clearInterval(timeinterval);
  $('#eve_img').empty();
  startClock(this.id);
  $('#event_name').text(this.name);
  var $input = $('<img>').attr({ src: $(this).attr("data-img"), height:"350", width:"700"});
  $input.appendTo('section#eve_img');
});

function leftTimeToNewYear(endThisYear){
    var j = Date.parse(endThisYear);  
    var k = Date.parse(new Date());
    var t = j-k;

  var seconds = Math.floor( (t/1000) % 60 );
  var minutes = Math.floor( (t/1000/60) % 60 );
  var hours = Math.floor( (t/(1000*60*60)) % 24 );
  var days = Math.floor( t/(1000*60*60*24) );
  return {
    'total': t,
    'days': days,
    'hours': hours,
    'minutes': minutes,
    'seconds': seconds
  };
}

//leftTimeToNewYear(endThisYear).seconds
// we can call it easily

function startClock(endThisYear){
    var clock = document.getElementById("clockdiv");
    var daysSpan = clock.querySelector('.days');
    var hoursSpan = clock.querySelector('.hours');
    var minutesSpan = clock.querySelector('.minutes');
    var secondsSpan = clock.querySelector('.seconds');

    function updateClock(){
         var t = leftTimeToNewYear(endThisYear);
        daysSpan.innerHTML = t.days;
        hoursSpan.innerHTML = ('0' + t.hours).slice(-2);
        minutesSpan.innerHTML = ('0' + t.minutes).slice(-2);
        secondsSpan.innerHTML = ('0' + t.seconds).slice(-2);
    //var timeInterval = setInterval(function(){

        if(t.total <= 0){
            var newyear =document.getElementById("2017");
            newyear.innerHTML="Happy New Year 2017"
            clearInterval(timeinterval);
            zerozero();
        }

   }
   updateClock();
   timeinterval = setInterval(updateClock, 1000);
}






