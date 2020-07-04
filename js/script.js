var datafullpage;
var flag = 0;
var transparent = true;
var title = "Home";
var listOfAvailable=["dyslexia","cogaud","mr","vizLCA","ssmi","assistBrowser","ptTask","aviation","icord"];


function getDetails(section) {

    console.log("gettingdata");
    $.ajax({
        async: true,
        type: "GET",
        url: section + "?" + new Date().getTime(),
        success: function(data) {
            console.log("gotdata");
             history.pushState(title,title,"index.html?req="+title);
            //work to be done here

            datafullpage = data;
            $('#kpmaincontent').hide().fadeIn(500);
            $('#kpmaincontent').html(datafullpage);


            if (location.href.lastIndexOf("#") > 1)
                $([document.documentElement, document.body]).animate({
                    scrollTop: $(location.href.substr(location.href.lastIndexOf("#"))).offset().top
                }, 0100);
            $('footer').show();

            callNav();




            callBackground();
       
            //   pJSDom[0].pJS.particles.move.enable = false;
            // pJSDom[0].pJS.particles.move.enable = true;
            // pJSDom[0].pJS.fn.particlesRefresh();
            //applyScript();
            // scrollToSection('icord-'+section);
            //     menuItems.removeClass("active-item");
            // $('#a-'+section).addClass("active-item")   
            // activeItem='#a-'+section;
        }
    });

    //    return false;
};
var particles;
function callBackground() {
    if(pJSDom[0]!=undefined) 
    {
      for(var i=0;i<pJSDom.length;i++)
      {
        pJSDom[i].pJS.fn.particlesRefresh();
      }
       return;
    }

    $('#parallax').parallax({
        invertX: true,
        invertY: false
    });
    console.log("herer");

    particles=   particlesJS("particles-js", {
        "particles": {
            "number": {
                "value": 21,
                "density": {
                    "enable": true,
                    "value_area": 400
                }
            },
            "color": {
                "value": "#000000"
            },
            "shape": {
                "type": "polygon",
                "stroke": {
                    "width": 1,
                    "color": "#000000"
                },
                "polygon": {
                    "nb_sides": 3
                },
                "image": {
                    "src": "img/github.svg",
                    "width": 100,
                    "height": 100
                }
            },
            "opacity": {
                "value": 1,
                "random": false,
                "anim": {
                    "enable": false,
                    "speed": 1,
                    "opacity_min": 0.1,
                    "sync": false
                }
            },
            "size": {
                "value": 1,
                "random": true,
                "anim": {
                    "enable": false,
                    "speed": 12,
                    "size_min": 0.1,
                    "sync": false
                }
            },
            "line_linked": {
                "enable": true,
                "distance": 150,
                "color": "#000000",
                "opacity": 0.5,
                "width": 0.5
            },
            "move": {
                "enable": true ,
                "speed": 0.7,
                "direction": "none",
                "random": true,
                "straight": false,
                "out_mode": "bounce",
                "bounce": false,
                "attract": {
                    "enable": false,
                    "rotateX": 1201.7978896429047,
                    "rotateY": 1200
                }
            }
        },
        "interactivity": {
            "detect_on": "window",
            "events": {
                "onhover": {
                    "enable": false,
                    "mode": "repulse"
                },
                "onclick": {
                    "enable": true,
                    "mode": "push"
                },
                "resize": true
            },
            "modes": {
                "grab": {
                    "distance": 400,
                    "line_linked": {
                        "opacity": 1
                    }
                },
                "bubble": {
                    "distance": 400,
                    "size": 40,
                    "duration": 2,
                    "opacity": 8,
                    "speed": 3
                },
                "repulse": {
                    "distance": 200,
                    "duration": 0.4
                },
                "push": {
                    "particles_nb": 4
                },
                "remove": {
                    "particles_nb": 2
                }
            }
        },
        "retina_detect": true
    });
}
// Fires when the user goes back or forward in the history.
window.onpopstate = function(e) {
  if (e.state != null) {
   
   callPage();
  }
}

// window.addEventListener('popstate', function(event) {
//       console.log('popstate fired! ');
// console.log(event.state);
//       updateContent(event.state);
//     });
$(document).ready(function() {
    callPage();
});

function callPage() {
    
    

    // if (getUrlParameter("req")==undefined || getUrlParameter("req").toLowerCase() == "home")
    // {
    //     callHome();
    //     return;
    // }
        
  
        callProjects(getUrlParameter("req"));
  
}

function callNav() {

    $navbar = $('.navbar[change-on-scroll]');
    scroll_distance = $navbar.attr('change-on-scroll') || 500;

    // Check if we have the class "navbar-change-on-scroll" then add the function to remove the class "navbar-transparent" so it will transform to a plain color.

    if ($('.navbar[change-on-scroll]').length != 0) {
        checkScrollForTransparentNavbar();
        $(window).on('scroll', checkScrollForTransparentNavbar)
    }
}
// $(window).on('scroll',function() {
//     var t = $('window').scrollTop();
//     return 150 < t ? ($(".nav").removeClass("navbar-transparent"), $("body").addClass("not-on-top")) : ($("body").removeClass("not-on-top"), $(".nav").addClass("navbar-transparent")), !1
// })

function checkScrollForTransparentNavbar() {
    if ($(document).scrollTop() > scroll_distance) {
        []
        if (transparent) {
            transparent = false;
            // $('.navbar[change-on-scroll]').addClass('fixed-top');
            // $('.navbar[change-on-scroll]').removeClass('absolute-top');

            $('.navbar[change-on-scroll]').css('background-color', 'rgba(255,255,255,1)');
            // $('.navbar[change-on-scroll]').removeClass('bg-transparent');

            $('#mySidenav-right').css('margin-top', '100px');
            $('#mySidenav-left').css('margin-top', '100px');
            $('#nav-bar').removeClass('invisible-nav');
            $('#navhead').css('visibility', 'visible');
            // if(activeItem!='none') $(activeItem).addClass('active-item');
        }
    } else {
        if (!transparent) {
            transparent = true;
            //  $('.navbar[change-on-scroll]').removeClass('fixed-top');
            //  $('.navbar[change-on-scroll]').addClass('absolute-top');

            //  $('.navbar[change-on-scroll]').css('background-color','transparent');
            //  $('.navbar[change-on-scroll]').addClass('bg-transparent');

            $('.navbar[change-on-scroll]').css('background-color', 'rgba(255,255,255,0.6)');
            $('#nav-bar').addClass('invisible-nav');
            $('#navhead').css('visibility', 'collapse');
            // menuItems.removeClass("active-item");

        }
    }
}

$('footer').hide();

function scrollToSection(section) {
    $([document.documentElement, document.body]).animate({
        scrollTop: $(("#" + section)).offset().top
    }, 2000);

}
var flagg = false;
$('button').on('click', function() {
    if (flagg == false) {
        $('article').css('filter', 'blur(10px)');
        flagg = true;
        // $('nav').css('visibility','hidden');
    } else {
        flagg = true;
        $('article').css('filter', 'blur(0px)');
        // $('nav').css('visibility','visible');
    }
    $('body').toggleClass('open');
});
$('#navbar-back').on('click',function(){
   if(listOfAvailable.includes(title)) callProjects("projects")
   else callHome();
})

$("#ProjectsLi").on('click', function() {
    callProjects("projects");
    $('body').toggleClass('open');

})

$("#PublicationsLi").on('click', function() {
  callProjects("publications");
  $('body').toggleClass('open');

})
$("#HomeLi").on('click', function() {
    callHome();
    $('body').toggleClass('open');

})

var getUrlParameter = function getUrlParameter(sParam) {
    var sPageURL = window.location.search.substring(1),
        sURLVariables = sPageURL.split('&'),
        sParameterName,
        i;

    for (i = 0; i < sURLVariables.length; i++) {
        sParameterName = sURLVariables[i].split('=');

        if (sParameterName[0] === sParam) {
            return sParameterName[1] === undefined ? true : decodeURIComponent(sParameterName[1]);
        }
    }
};

function callProjects(value) {
  if ($("#kpmaincontent").css("margin-top") != "15rem") $("#kpmaincontent").css("margin-top", "15rem")
  $("#smcheader-navbar").css('visibility', 'visible');
  console.log(value);
  title=value;
  if(value=="publications")
  {
    $("#idForTitle").html("Publications");
    getDetails("p.html");
    return;
  }
  
  if(value=="projects")
  {
    $("#idForTitle").html("Projects");
    getDetails("w.html");
    return;
  }
  if(value == "dyslexia")
  {
    
    console.log(value);

    $("#idForTitle").html("Dyslexia");
    getDetails('p1.html');
  return;
  }
  if(value=="cogaud")
  {
    $("#idForTitle").html("Cognition & Auditory Rehab Kit");
  
  getDetails('p2.html')
  return;

  }
  if(value=="mr")
  {
  
    $("#idForTitle").html("Mixed Reality");
    
  getDetails('p3.html')
  return;

  }
  if(value=="vizLCA")
  {
 
    $("#idForTitle").html("Visualisation : LCA");
    
  getDetails('p4.html')
  return;

  }

  if(value=="ssmi")
  {
 
    $("#idForTitle").html("Eye Gaze Controlled Apps");
    
  getDetails('p5.html')
  return;

  }
  if(value=="assistBrowser")
  {
 
    $("#idForTitle").html("Assistive Web Browser");
    
  getDetails('p6.html')
  return;

  }
  if(value=="ptTask")
  {
    $("#idForTitle").html("Pointing Task & Analysis");
  getDetails('p7.html')
  return;

  }
  if(value=="aviation")
  {
    $("#idForTitle").html("Aviation Studies");
  getDetails('p8.html')
  return;

  }

  if(value=="icord")
  {
    $("#idForTitle").html("Website Design ICoRD'19");
  getDetails('p9.html')
  return;
  }
callHome();

}

function callHome() {
  console.log("Call home called")
    $("#idForTitle").html("Home");
    title = "home";
    $("#kpmaincontent").css("margin-top", "")
    $("#smcheader-navbar").css('visibility', 'hidden');
    getDetails("b.html");

}

