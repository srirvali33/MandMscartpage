$(document).ready( function(){

    var itemname;
    var itemprice;
    var quant;
   var cartitems;
   var count;
   var prevcount=0;
//    var ref=0;


    $('.card-link.add').click(function(e){

        itemname=$(this).parent().siblings('.card-title').text().trim();
        itemprice=$(this).parent().siblings('.card-text').children().text();
        quant=$(this).parent().siblings('.form-select').val();

       // console.log(itemname+itemprice+quant);
       currentcount=quant;
       count=parseInt(currentcount)+parseInt(prevcount);
       prevcount=count;
       console.log(count);
        $('.badge').text(count);
        

        


    } );



    $('.card-link.Remove').click(function(e){

        itemname=$(this).parent().siblings('.card-title').text().trim();
        itemprice=$(this).parent().siblings('.card-text').children().text();
        quant=$(this).parent().siblings('.form-select').val();

       // console.log(itemname+itemprice+quant);
       currentcount=quant;
       count=parseInt(prevcount)-parseInt(currentcount);
       prevcount=count;
       console.log(count);
        $('.badge').text(count);

        


    } );
   





});
