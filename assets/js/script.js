$(function(){
  $('.project').hover(
    function(){
      if($("video",this)[0]){
        $("video",this)[0].play();
      }
    }
    , 
    function(){
      
      if($("video",this)[0]){
        $("video",this)[0].pause();
      }
    }
  );
  
  $("a").click(function(event){

    var pathName = this.pathname;
    var outsideLink = false;
    
    switch(pathName){
      case "/about":
        $("#about").toggleClass("active");
        $("header").addClass("inactive");
        break;
      case "/seeing-eye-pi":
        $("#seeing-eye-pi-detail").toggleClass("active");
        break;        
      default:
        outsideLink = true;
        break;
    }
    
    if(!outsideLink){
      event.preventDefault();
      history.pushState(null,null,this.pathname);
    }
    
  });
  
  $(".close-btn").click(function(){
    $(this).closest(".modal").removeClass("active");
    $("header").removeClass("inactive");
    history.pushState(null,null,"/");
  });
  
  $(document).keydown(function(e) {
    switch(e.which){
      case 27:
        $(".modal").removeClass("active");
        if(window.location.pathname !== "/" && window.location.href !== "/index.html"){
          history.pushState(null,null,"/");
        }
        break;
      default: return;
    }
  });  
        
});