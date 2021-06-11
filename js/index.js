$(document).ready(function () {

    var itemname;
    var itemprice;
    var quant;
    var cartitems = [];
    var count;
    var prevcount = 0;



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
        quant = parseInt($(this).parent().siblings('.form-select').val());

        var itemobj = { name: itemname, price: itemprice, quantity: quant };


        if ((cartitems.some(itemnamefound => itemnamefound.name === itemname) && (quant > 0))) {




            console.log("found");
            cartitems.find((o, i) => {
                if (o.name === itemname) {
                    var prevquant = parseInt(cartitems[i].quantity);
                    if ((quant <= prevquant)) {

                        cartitems[i] = { name: itemname, price: itemprice, quantity: prevquant - quant };

                        var diffval = parseInt(cartitems[i].quantity);

                        if (diffval == 0) {
                            console.log("not found or removing");
                            cartitems.pop(cartitems[i]);

                        }



                    }


                }
            });


        }



        else {

            console.log("not applicable!")
        }


        currentcount = quant;
        count = parseInt(prevcount) - parseInt(currentcount);
        prevcount = count;
        if (count > 0) {
            $('.badge').text(count);
        }




    });

    $('.cart').click(function (e) {

        e.preventDefault();
        localStorage.setItem("cartitems", JSON.stringify(cartitems));
        $.ajax({

            url: "https://webhook.site/b5df8de1-1850-47a0-a19a-f5da84d1b832",
            //url: "cartitems.json",
            type: "POST",
            data: JSON.stringify(cartitems),
            dataType: "json",
            success: function (response) {
                window.location.href = "../html/cart.html";
                console.log(response);

            },
            error: function (error) {
                console.log(error);
            },
        });





    });












});

$(window).on('load', function (e) {

    $.ajax({

        url: "http://www.json-generator.com/api/json/get/ctVUzTrApu?indent=2",
        //url: "cartitems.json",
        type: "GET",

        success: function (response) {
            var cartdata;
            $(response).each(function (o, i) {



                name1 = i.name;
                quant = i.quantity;
                price = i.price;
                var prevcart = $('.allitems').find('.cartitems').html();
                console.log(prevcart);

                $('.cartitems').find('.itemname').text(name1);
                $('.cartitems').find('.itemquant').text(quant);
                $('.cartitems').find('.itemprice').text(price);


                
                cartdata = $('.allitems').find('.cartitems').html();
                console.log(cartdata);


                if (cartdata.length > 0) {


                    $('.allitems').append(prevcart+cartdata);

                }

                else {

                    $('.allitems').append(cartdata);
                }



            });



            console.log(response);

        },
        error: function (error) {
            console.log(error);
        }
    });





});


