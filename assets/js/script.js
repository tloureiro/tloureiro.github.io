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
  
  $(window).bind("popstate", urlRouter);
  
  $("a").click(urlRouter);
  
  $(".close-btn").click(function(){
    $(this).closest(".modal").removeClass("active");
    $("header").removeClass("inactive");
    history.pushState(null,null,"/");
  });
  
  $("#about .close-btn").click(function(){
    $("header").addClass("active");
  });
  
  $("#e-mail").click(function(){
    $(this).attr("href", "mailto:root" + "@" + "tloureiro.com" );
  });
  
  $(".arrow.left img").click(previousProjectFunction);
  $(".arrow.right img").click(nextProjectFunction);
  
  $(document).keydown(function(e) {
    switch(e.which){
      case 27:
        $(".modal").removeClass("active");
        if(window.location.pathname !== "/" && window.location.href !== "/index.html"){
          history.pushState(null,null,"/");
          $("header").removeClass("inactive");
        }
        break;
        case 37: 
          previousProjectFunction();
          break;
        case 39: 
          nextProjectFunction();
          break;        
      default: return;
    }
  });  
        
});

var previousProjectFunction = function(){
  
  var currentProject = $(".modal.project-detail.active");
  var pageId;
  
  if(currentProject.length){
    if(currentProject.prev(".modal.project-detail").length){
      $(".modal.project-detail").removeClass("active");
      currentProject.prev(".modal.project-detail").eq(0).addClass("active");
      pageId = currentProject.prev(".modal.project-detail").eq(0).attr('id').replace(/-detail$/,"");
    }else{
      $(".modal.project-detail").removeClass("active");
      $(".modal.project-detail:last").eq(0).addClass("active");
      pageId = $(".modal.project-detail:last").eq(0).attr('id').replace(/-detail$/,"");
    }
    
    history.pushState(null,null,"/" + pageId);
  }
};

var nextProjectFunction = function(){
  
  var currentProject = $(".modal.project-detail.active");
  var pageId;

  if(currentProject.length){
    if(currentProject.next(".modal.project-detail").length){
      $(".modal.project-detail").removeClass("active");
      currentProject.next(".modal.project-detail").eq(0).addClass("active");
      pageId = currentProject.next(".modal.project-detail").eq(0).attr('id').replace(/-detail$/,"");
    }else{
      $(".modal.project-detail").removeClass("active");
      $(".modal.project-detail:first").eq(0).addClass("active");
      pageId = $(".modal.project-detail:first").eq(0).attr('id').replace(/-detail$/,"");
    }
    
    history.pushState(null,null,"/" + pageId);
  }
};

var urlRouter = function(event){
    
    var destination;
    var outsideLink = false;
    
    if(this.pathname){
      
      if(this.hostname !== document.location.hostname){ //external
        destination = this.href;
      }else{ //internal
        destination = this.pathname;
      }
    }else{ //back button
      destination = document.location.pathname;
    }
    
    var projectUrls = ["/seeing-eye-pi", "/gridacord", "/sshish", "/fit-text-to-screen", "/hellochristinekim", "/purge"];
    
    if(destination === "/"){
      $(".active").removeClass("active");
      $("header").addClass("active");
    }else if(destination === "/about"){
      $(".active").removeClass("active");
      $("#about").addClass("active");
      $("header").addClass("inactive");
    }else if(projectUrls.indexOf(destination) >= 0){
      $(".active").removeClass("active");
      $("#"+ pathName.replace(/^\//,"") + "-detail").addClass("active");
    }else{
      outsideLink = true;
    }
    
    if(!outsideLink && this.pathname){ //not outside and not a back button call
      event.preventDefault();
      history.pushState(null,null,destination);
    }
};