$(document).ready(function(){
    var count = 0;
    var time = 0;
    var result, timer;
  
    var jokes = [
      "You're so slow, the astro grew a beard while racing... go look..., GOTCHA!!! didn't I?",
      "You're so slow, we had to measure your 10 second race with a calendar",
      "You're so slow, you came in 2nd in a 1 man race",
      "You're so slow, you have to chase the zombies",
      "You're slower than a slow cooker",
      "You're slower than a 1 legged dog on tranquilizers",
      "You're slower than Daenerys Targaryen on her way to Westeros",
      "You gotta get those fingers to the gym asap my nigga! You too slow!",
      "You've got some supreme slowness in those fingers son! You gotta do some finger cardio!",
      "You've got limitted edition slow fingers! go claim your Ginnes record!",
    ];
  
    function initialize(){
      timer = setInterval(game, 100);
    }
  
    function game() {
      if (count >= 1000 && count < 2000) {
        $('.rsg').html('READY');
      } else if (count >= 2000 && count < 3000) {
        $('.rsg').html('SET');
      } else if (count >= 3000 && count < 4000) {
        $('.rsg').html('GO!');
      } else {
        $('.rsg').html('');
      }
  
      if (time >= 13000 && !result) {
        result = 'lost';
        stop();
        showResult(jokes[Math.floor(Math.random() * jokes.length)], 'joke');
      }
  
      if (count >= 3000) {
        time += 100;
        $('.timer').html(time / 1000);
      }
  
      count += 100;
    }
    
    function stop() {
      clearInterval(timer);
    }
  
    function reset() {
      count = 0;
      time = 0;
      result = null;
  
      $('.result').addClass('hide').html('');
      $('.astro').css({
        'top': '50%',
        'left': 0
      });
      $('.timer').html(0);
  
      initialize();
    }
  
    $(window).keydown(function (e) {
      let position = $('.astro').offset();
      let target = $('.crossing-line').offset();
  
      // console.log('position ', position);
      // console.log('target ', target);
      
      if(count > 3000){
        if (position.left + 20 > target.left) {
          if (time >= 10000 && !result) {
            result = 'lost';
            stop();
            showResult('YOU LOSE!');
          }
          if (time < 10000 && !result) {
            result = 'won';
            stop();
            showResult('YOU WIN!');
          }
        }
  
        if (e.keyCode === 37) {
          if (position.left > 0) {
            $('.astro').css('left', Math.max(position.left - 50, 0));
          }
        }
        if (e.keyCode === 38) {
          if (position.top > 0) {
            $('.astro').css('top', Math.max(position.top - 50, 0));
          }
        }
        if (e.keyCode === 39) {
          if (position.left + $('.astro').width() < window.innerWidth) {
            $('.astro').css('left', Math.min(position.left + 50, window.innerWidth - $('.astro').width()));
          }
        }
        if (e.keyCode === 40) {
          if (position.top + $('.astro').height() < window.innerHeight) {
            $('.astro').css('top', Math.min(position.top + 50, window.innerHeight - $('.astro').height()));
          }
        }
      }
    });
  
    $(window).keyup(function (e) {
      let position = $('.astro').offset();
      // console.log('position ', position);
    });
  
    function showResult(msg, className) {
      $('.result').removeClass('hide').html(`
          <div class=${className || ''}>${msg}</div>
          <div class="reset-btn">RESTART</div>
        `).promise().done(function () {
          $('.reset-btn').click(reset);
        });
    }
  
    initialize();
  
  });