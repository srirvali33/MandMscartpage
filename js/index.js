$(document).ready(function () {

    var itemname;
    var itemprice;
    var quant;
    var cartitems = [];
    var count;
    var prevcount = 0;
    //    var ref=0;


    $('.card-link.add').click(function (e) {

        itemname = $(this).parent().siblings('.card-title').text().trim();
        itemprice = $(this).parent().siblings('.card-text').children().text();
        quant = parseInt($(this).parent().siblings('.form-select').val());

        var itemobj = { name: itemname, price: itemprice, quantity: quant };



        if ((cartitems.some(itemnamefound => itemnamefound.name === itemname) && (quant > 0))) {

            console.log("found");
            let obj = cartitems.find((o, i) => {
                if (o.name === itemname) {
                    var prevquant = parseInt(cartitems[i].quantity);
                    cartitems[i] = { name: itemname, price: itemprice, quantity: prevquant + quant };
                    return true;
                }
            });

        } else if ((quant > 0)) {
            console.log("not found");
            cartitems.push(itemobj);

        }

        else {

            console.log("not applicable!")
        }

        console.log(cartitems);
        currentcount = quant;
        count = parseInt(currentcount) + parseInt(prevcount);
        prevcount = count;

        if (count > 0) {
            $('.badge').text(count);
        }






    });



    $('.card-link.Remove').click(function (e) {

        itemname = $(this).parent().siblings('.card-title').text().trim();
        itemprice = $(this).parent().siblings('.card-text').children().text();
        quant = $(this).parent().siblings('.form-select').val();


        currentcount = quant;
        count = parseInt(prevcount) - parseInt(currentcount);
        prevcount = count;
        //console.log(count);
        $('.badge').text(count);




    });

    $('.cart').click(function (e) {

        //e.preventDefault();
        localStorage.setItem("cartitems",JSON.stringify(cartitems));
        $.ajax({
            
           // url:"https://webhook.site/b5df8de1-1850-47a0-a19a-f5da84d1b832",
           url: "cartitems.json",
            type: "POST",
            data: JSON.stringify(cartitems),
            dataType: "json",
            success: function (response) {
                console.log(response);
                
            },
            error: function (error) {
                console.log(error);
            },
        });





    });






});


