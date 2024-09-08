const scroll = new LocomotiveScroll({
  el: document.querySelector('#main'),
  smooth: true
});


function firstpageanim(){
  var tl = gsap.timeline();

  tl.from("#nav",{
    y: '-10',
    opacity: 0,
    ease: Expo.easeInOut,
    duration: 1.5
  })

  .to(".boundingelem",{
    y: '0',
    ease: Expo.easeInOut,
    duration: 1.5,
    delay: -1,
    stagger: .2
  })

  .to(".boundingelem1",{
    y: '0',
    ease: Expo.easeInOut,
    duration: 1.5,
    delay: -1,
    stagger: .2
  })

  .from("#herofooter",{
    y: '-10',
    opacity: 0,
    duration: 1.5,
    delay: -1,
    ease: Expo.easeInOut
  })
}

var timer;
var crsr = document.querySelector("#minicircle")



function cursorsquez(){
  //define default scale value
  var xscale = 1;
  var yscale = 1;

  var xprev = 0;
  var yprev = 0;

  window.addEventListener("mousemove", function(dets){
    clearTimeout(timer);
    xscale = gsap.utils.clamp(0.8, 1.2, dets.clientX - xprev);
    yscale = gsap.utils.clamp(0.8, 1.2, dets.clientY - yprev);

    xprev = dets.clientX;
    yprev = dets.clientY;

    cursorfollower(xscale, yscale);

    timer = setTimeout(function(){
      crsr.style.transform = `translate(${dets.clientX}px, ${dets.clientY}px) scale(1, 1) `
  },100);
  });
}

cursorsquez();

function cursorfollower(xscale, yscale){
  window.addEventListener("mousemove", function(dets){
    crsr.style.transform = `translate(${dets.clientX}px, ${dets.clientY}px) scale(${xscale}, ${yscale}) `;
  })
}


cursorfollower();
firstpageanim();




document.querySelectorAll("#elem").forEach(function(elem){

  var rotate=  0;
  var diff = 0;


  elem.addEventListener("mouseleave", function(dets){


    gsap.to("#minicircle", {
      height: "12px",
      width: "12px"
    })

    gsap.to(elem.querySelector("img"),{
      opacity: 0,
      ease: Power3,
      duration: 0.5
    });
  });


  elem.addEventListener("mousemove", function(dets){
    diff = dets.clientX - rotate;
    rotate = dets.clientX;
    var tdiff = dets.clientY - elem.getBoundingClientRect().top;
    console.log(tdiff);

    gsap.to("#minicircle", {
      height: "60px",
      width: "60px",
      mixBlendMode: "none"
    })

    gsap.to(elem.querySelector("img"),{
      opacity: 1,
      ease: Power3,
      top: tdiff,
      left: dets.clientX,
      rotate: gsap.utils.clamp(-20, 20, diff)
    });
  });
});