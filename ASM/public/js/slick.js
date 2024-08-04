$(document).ready(function(){
    $('.slider').slick({
        dots: true,  
        autoplay: true, 
        autoplaySpeed: 3000, 
    });
});

function slickProducts () {
    $(document).ready(function () {
        $(".container__slick--product").slick({
            slidesToShow: 5,
            slidesToScroll: 1,
            infinity: false,
            arrows: false,
            autoplay: true,
            autoplaySpeed: 1000,
        });
    })
}
function slickProducts_3items () {
    $(document).ready(function () {
        $(".slickProducts_3items").slick({
            slidesToShow: 3,
            slidesToScroll: 1,
            infinity: false,
            arrows: false,
            autoplay: true,
            autoplaySpeed: 1000,
        });
    })
}
slickProducts_3items();
slickProducts();
