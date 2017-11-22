document.addEventListener('DOMContentLoaded',function(event){
  var dataText = [ "Hello, I'm Abhishek.", "Looking for Internship."];
  function typeWriter(text, i, fnCallback) {
    if (i < (text.length)) {
      document.querySelector("h1").innerHTML = text.substring(0, i+1) +'<span aria-hidden="true"></span>';
      setTimeout(function() {
        typeWriter(text, i + 1, fnCallback)
      }, 100);
    }
    else if (typeof fnCallback == 'function') {
      setTimeout(fnCallback, 2000);
    }
  }
  function StartTextAnimation(i) {
    if (typeof dataText[i] == 'undefined'){
      setTimeout(function() {
        StartTextAnimation(0);
      }, 20000);
    }
    if (i < dataText[i].length) {
      typeWriter(dataText[i], 0, function(){
        StartTextAnimation(i + 1);
      });
    }
  }
  StartTextAnimation(0);
});

$(function() {
  if(Modernizr.history){
    var newHash      = "",
        $mainContent = $("#main-content"),
        $pageWrap    = $("#page-wrap"),
        baseHeight   = 0,
        $el;    
      $pageWrap.height($pageWrap.height());
      baseHeight = $pageWrap.height() - $mainContent.height();
      $("nav").delegate("a", "click", function() {
        _link = $(this).attr("href");
        history.pushState(null, null, _link);
        loadContent(_link);
        return false;
      });
      function loadContent(href){
        $mainContent
          .find("#guts")
          .fadeOut(200, function() {
            $mainContent.hide().load(href + " #guts", function() {
              $mainContent.fadeIn(200, function() {
                $pageWrap.animate({
                  height: baseHeight + $mainContent.height() + "px"
                });
              });
              $("nav a").removeClass("current");
              console.log(href);
              $("nav a[href$="+href+"]").addClass("current");
            });
          });
        }
        $(window).bind('popstate', function(){
          _link = location.pathname.replace(/^.*[\\\/]/, '');
          loadContent(_link);
        });
      }
    });