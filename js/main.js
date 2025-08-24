// navbar ul
 const menuToggle = document.getElementById("menu-toggle");
  const navLinks = document.querySelector(".nav-links");
  menuToggle.addEventListener("click", () => {
    navLinks.classList.toggle("active");
  });
//carrousel banner

$(document).ready(function(){
  const $carouselOne=$(".carousel-one");
  $carouselOne.owlCarousel({
    items:1,
    autoplay:true,
    nav:false,
    dots:false,
    outoplayTimeout:2000,
    loop:true,
  });
  $(".custom-nav button").on("click",function(){
  const index=$(this).data("slide");
  $carouselOne.trigger("to.owl.carousel",[index]);

    $(".custom-nav button").removeClass("active-btn-nav");
    $(this).addClass("active-btn-nav");
   });

    $carouselOne.on("changed.owl.carousel",function(event){
      // return the true index of item in loop
      const currentSlide=event.relatedTarget.relative(event.item.index); 
       
      $(".custom-nav button").removeClass("active-btn-nav");
      $(`.custom-nav button[data-slide="${currentSlide}"]`).addClass("active-btn-nav");
    })
  
});

//carrousel testimonial
$(document).ready(function(){
  const $carousel=$(".carousel-two");
  $carousel.owlCarousel({
    items:2,
    margin:10,
    autoplay:true,
    nav:true,
    dots:true,
    outoplayTimeout:3000,
    responsive :{
      0 :{
        items:1
      },
      993 :{
         items:2
      }
     
    }
  });

});

   setTimeout(function(){
      let carouselBtns=document.getElementsByClassName('owl-nav')[1];
     if(carouselBtns){
   let prevBtn=carouselBtns.firstElementChild.firstElementChild;
   let nextBtn=carouselBtns.lastElementChild.firstElementChild;

   prevBtn.innerHTML=` <i class="fa fa-arrow-left" aria-hidden="true"></i>`;
   nextBtn.innerHTML=` <i class="fa fa-arrow-right" aria-hidden="true"></i>`;
    }
},500)

// colors cog
let siteColor=document.getElementsByClassName("color-container")[0];
let cogLock=document.getElementsByClassName("color-lock")[0];
cogLock.addEventListener("click", function(){
    siteColor.classList.toggle("show-colors");
});



// change site colors

// localStorage.setItem('colorTheme');
function setTheme(color){
    document.documentElement.style.setProperty('--main-color' , color);
    localStorage.setItem('colorTheme', color);
}

window.addEventListener("DOMContentLoaded", ()=>{
let colorTheme=localStorage.getItem('colorTheme');

if(colorTheme)
{
 document.documentElement.style.setProperty('--main-color' , colorTheme);
}
});



//counters section
let counters=document.querySelectorAll('.counter');
let startCounting=false;
function startCount(){
counters.forEach(counter=>{
    let targetValue=counter.getAttribute('num-target');
    let count=0;
    const speed=Math.ceil(targetValue/100);
    const interval=setInterval(()=>{
        count+=speed;
        counter.innerText=count;
      if(count>=targetValue){
        clearInterval(interval);
      }
    } ,2);
})
};

const countersSection=document.getElementsByClassName("counters")[0];
if(countersSection){
const observer= new 
IntersectionObserver((enteries)=>{
  enteries.forEach(entry=>{
    if(entry.isIntersecting && !startCounting){
        startCounting=true;
        startCount();
    }
  })}
, {threshold:0.5});
observer.observe(countersSection);

}



// scroll btn

const scrollBtn=document.getElementsByClassName('scroll-btn')[0];
if(scrollBtn){
let nav=document.getElementsByTagName('nav')[0];
function scrollPage(){
   if(window.scrollY>0){
    scrollBtn.style.display='block';
    nav.classList.add('shadow-nav');
   }
   else {
    scrollBtn.style.display='none';
    nav.classList.remove('shadow-nav');
   }
}
scrollPage()
document.addEventListener('DOMContentLoaded' , scrollPage);
document.addEventListener('scroll' , scrollPage);


scrollBtn.addEventListener('click', ()=>{
  window.scroll({
    top:0,
    behavior:"smooth"
  });
});
}




// services
let Gallery=document.querySelectorAll('.work-phots');
let cards=document.querySelectorAll('.photo-card');



Gallery.forEach((gall)=>{
  gall.addEventListener('click' , ()=>{
    let type=gall.dataset.filter;
    if(type==="All"){
      cards.forEach(card => card.style.display="flex");
    }else {
      cards.forEach(card=>{
    if(card.classList.contains(type)){
      card.style.display="flex";
    }else {
      card.style.display="none";
    }
    });
  }
  Gallery.forEach(gall=> gall.classList.remove('active-a'));
    gall.classList.add('active-a');
  });
})

// pricing
let pricingBtns=document.querySelectorAll('.btn');
let pricingSlides=document.querySelectorAll('.slide');

pricingBtns.forEach((btn)=>{
  btn.addEventListener('click',()=>{
    let type=btn.dataset.filter;
    pricingSlides.forEach((slide)=>{
      if(slide.classList.contains(type))
        slide.classList.remove('hidden-slide');
      else 
       slide.classList.add('hidden-slide');
    })
   pricingBtns.forEach(btn=> btn.classList.remove('active-btn'))
   btn.classList.add('active-btn');
  })
})

let priceCard=document.querySelectorAll('.price-card');

if(priceCard){
  priceCard.forEach((card)=>{
    card.addEventListener('click', ()=>{
      priceCard.forEach(card=>{
         card.classList.remove('shadow-card');
         card.lastElementChild.children[0].classList.remove('active-btn');
        });
      card.classList.add('shadow-card');
      card.lastElementChild.children[0].classList.add('active-btn');
    })
  })

}




let form = document.querySelector('form');

form.addEventListener('input' ,(e)=>{
    if(e.target.id === 'userName') nameValidation(e.target);
    else if(e.target.id==='userEmail')emailValidation(e.target);
    else if(e.target.id==='userPassword')passwordValidation(e.target);
    else msgValidation(e.target);
})
function handelerror(element, msg=""){
  element.nextElementSibling.innerText = msg;
}
function nameValidation(element){
    let input = element.value.trim();

    if(input.length < 3) {
        handelerror(element, "Please enter at least 3 characters!");
        return;
    }

    let onlyLetters = /^[A-Za-z]+$/;
    if (!onlyLetters.test(input)) {
        handelerror(element , 'Please enter letters only');
    } else {
        handelerror(element);
    }
}




function emailValidation(element){
   let input = element.value.trim();
    let validMail = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
    if (!validMail.test(input) || input==='' ) {
        handelerror(element , 'Enter valid email');
    } else {
        handelerror(element);
    }
}


function passwordValidation(element){
   let input = element.value.trim();

    if(input.length < 8) {
        handelerror(element, "Please enter at least 8 characters!");
    }else  {
      handelerror(element);
    }
    let validPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!validPassword.test(input)) {
        handelerror(element , 'Enter Valid Password');
    } else {
        handelerror(element);
    }
}


function msgValidation(element){
   let input = element.value.trim();

    if(input.length < 10) {
        handelerror(element, "Please enter at least 10 characters!");
    }else if(input.length >500) {
      handelerror(element, "You can enter maximum 500 charcter");
    } else {
        handelerror(element);
    }
}