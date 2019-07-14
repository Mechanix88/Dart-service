$(document).ready(function(){
var accordeon = $(".accordeon__item")
accordeon.on('click', function(){
    $(this).toggleClass("accordeon--active").siblings().removeClass('accordeon--active')

})




var avatar = $(".team__link")
var avatar2 = $('.team__item')
var slider = $(".slider__item")
avatar.on('click', function(e){
    e.preventDefault()
    slider.hide()
    var show = $(this).attr('href')
    $(show).fadeIn()
})
avatar2.on('click' , function(){
    $(this).addClass("team__item--active").siblings().removeClass('team__item--active')
})
})


var burger = $(".burger-menu__button")
var burgerMenu = $('.burger-menu')
burgerMenu.on('click' , function(e){
    e.preventDefault()
    burger.toggleClass('burger-menu_button--active')
})

var burgerWrapper = $(".burger__wrapper")
burgerMenu.on('click' , function(e){
    e.preventDefault()
    burgerWrapper.toggleClass('burger__wrapper--active')
})


// var anchors = document.querySelectorAll('a[href*="#"]')
// for (let anchor of anchors) {
//     anchor.addEventListener('click',function(e){
//         e.preventDefault();
//         const blockID = anchor.getAttribute('href')
//         document.querySelector('' + blockID).scrollIntoView({
//             behavior: "smooth" , 
//             block: 'start'
//         })
//     })
// }


