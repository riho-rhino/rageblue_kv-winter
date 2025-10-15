import $ from "jquery"
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

opning();
function tick(time) {
  return new Promise((resolve) => {
    setTimeout(function () {
      resolve()
    }, time)
  })
}
async function opning() {
  $('body').addClass('noscroll');
  $('.mv_wrap').addClass('show');
  await tick(200);
  $('.animated-text').addClass('show');
  await tick(1000);
  $('.mv_logo').addClass('show');
  await tick(1500);
  $('body').removeClass('noscroll');
  $('.mv_wrap').addClass('hidden');
  await tick(500);
  $('.alllooks_btn,.allitems').addClass('show');
  $('.style_1').addClass('in');
  
}




$(function () {
    $('.alllooks_btn').on('click', function (e) {
      e.preventDefault();
      $('.modal').addClass('show');
      $('body').addClass('noscroll');
    });
  
    $('.modal_looks li a').on('click', function (e) {
      e.preventDefault();
      var targetId = $(this).attr('href'); 
      var targetOffset = $(targetId).offset().top - 50;;
  
      $('html, body').animate({ scrollTop: targetOffset }, 0, function () {
        $('.modal').removeClass('show');
        $('body').removeClass('noscroll');
      });
    });
  
    $('.modal .close').on('click', function () {
      $('.modal').removeClass('show');
      $('body').removeClass('noscroll');
    });
  });



  
  gsap.utils.toArray('.fadein,.fadein2').forEach((el) => {
    ScrollTrigger.create({
      trigger: el,
      start: 'top 70%',
      onEnter: () => el.classList.add('in'),
    });
  });
  
  gsap.utils.toArray('.fadein3').forEach((el) => {
    ScrollTrigger.create({
      trigger: el,
      start: 'top 80%',
      onEnter: () => el.classList.add('in'),
    });
  });
  
  gsap.utils.toArray('.active').forEach((el) => {
    ScrollTrigger.create({
      trigger: el,
      start: 'top 70%',
      onEnter: () => el.classList.add('move'), 
    });
  });


//   最初のテキストanimation
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789 ";
  const speed = 40;
  const totalDuration = 1000;

  function animateText(element) {
    const targetText = element.dataset.text;
    const steps = Math.ceil(totalDuration / speed);
    let frame = 0;

    const interval = setInterval(() => {
      frame++;
      const progress = frame / steps;
      const fixedCount = Math.floor(progress * targetText.length);
      const scrambleCount = targetText.length - fixedCount;

      const scrambled = Array.from({ length: scrambleCount }, () => {
        return characters[Math.floor(Math.random() * characters.length)];
      });

      const result = targetText.slice(0, fixedCount) + scrambled.join("");
      element.textContent = result;

      if (progress >= 1) {
        element.textContent = targetText;
        clearInterval(interval);
      }
    }, speed);
  }

  const observer = new MutationObserver((mutationsList) => {
    for (const mutation of mutationsList) {
      if (
        mutation.type === "attributes" &&
        mutation.attributeName === "class" &&
        mutation.target.classList.contains("show") &&
        !mutation.target.classList.contains("animated-started")
      ) {
        mutation.target.classList.add("animated-started");
        animateText(mutation.target);
      }
    }
  });

  document.querySelectorAll(".animated-text").forEach((el) => {
    observer.observe(el, { attributes: true });
    if (el.classList.contains("show") && !el.classList.contains("animated-started")) {
      el.classList.add("animated-started");
      animateText(el);
    }
  });

  