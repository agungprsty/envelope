import style from './sass/style.scss';

let envelope = $('.envelope');
let message = $('#message');
let close = $('.close');
let t1 = gsap.timeline({ paused: true });             // GreenSock Animations Platform
let flap = CSSRulePlugin.getRule(".envelope:before"); 
const mediaQuery = window.matchMedia('(max-width: 678px)');

// Animations Envelope with Paper
t1.to(flap, { 
  duration: 0.5, 
  cssRule: {
    rotateX: 180
  }
})
.set(flap, {
  cssRule: {
    zIndex: 10
  }
})
.to('.letter', {
  translateY: -200,
  duration: 0.9, 
  ease: "back.inOut(1.5)"
})
.set('.letter', {
  zIndex: 99
})
.to('.letter', {
  duration: .7,  
  ease: "back.out(.4)",
  translateY: -5,
  translateZ: (mediaQuery.matches) ? 100 : 360  // 250
});

let t2 = gsap.timeline({ paused: true }); 
t2.to('.shadow', {
  delay: 1.4,
  width: 450,
  boxShadow: "-75px 150px 10px 5px #eeeef3",
  ease: "back.out(.2)",
  duration: .7
});
  
function openCard(e) {
  t1.play();
  t2.play();
}

function closeCard(e) {
  t1.reverse();
  t2.reverse();
}

$(envelope).click(function() {
  openCard();
});

$(close).click(function(e) {
   e.stopPropagation();
   closeCard();
});

// Limit text 
function textAbstract(el, maxlength = 470, delimiter = " ") {
  let txt = $(el).text();
  if (el == null) {
    return "";
  }
  if (txt.length <= maxlength) {
    return txt;
  }
  let t = txt.substring(0, maxlength);
  let re = /\s+\S*$/;
  let m = re.exec(t);
  t = t.substring(0, m.index);
  return t + "...";
}

var maxlengthwanted = 473;

message.each(function(index, element) {
  $(element).text(textAbstract(element, maxlengthwanted, " "));
});