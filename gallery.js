$(document).ready(function(){

    $('.buttons').click(function(){
        $(this).addClass('active').siblings().removeClass('active');
    
        var filter = $(this).attr('data-filter');
    
        if(filter == 'all'){
            $('.image').show(400); // Show all images
        } else {
            $('.image').not('.' + filter).hide(200); // Hide non-matching images
            $('.image').filter('.' + filter).show(400); // Show matching images
        }
    });

    $('.gallery').magnificPopup({
        delegate:'a', type:'image', gallery:{
            enabled:true
        }
    })

});