$(document).ready(function () {
  var itemname;
  var itemprice;
  var quant;
  var cartitems = [];
  var count;
  var prevcount = 0;

  $(".card-link.add").click(function (e) {
    itemname = $(this).parent().siblings(".card-title").text().trim();
    itemprice = $(this).parent().siblings(".card-text").children().text();
    quant = parseInt($(this).parent().siblings(".form-select").val());

    var itemobj = { name: itemname, price: itemprice, quantity: quant };

    if (
      cartitems.some((itemnamefound) => itemnamefound.name === itemname) &&
      quant > 0
    ) {
      console.log("found");
      let obj = cartitems.find((o, i) => {
        if (o.name === itemname) {
          var prevquant = parseInt(cartitems[i].quantity);
          cartitems[i] = {
            name: itemname,
            price: itemprice,
            quantity: prevquant + quant,
          };
          return true;
        }
      });
    } else if (quant > 0) {
      console.log("not found");
      cartitems.push(itemobj);
    } else {
      console.log("not applicable!");
    }

    console.log(cartitems);
    currentcount = quant;
    count = parseInt(currentcount) + parseInt(prevcount);
    prevcount = count;

    if (count > 0) {
      $(".badge").text(count);
      $("html, body").animate(
        {
          scrollTop: $(".badge").offset().top,
        },
        500
      );
    }
  });

  $(".card-link.Remove").click(function (e) {
    itemname = $(this).parent().siblings(".card-title").text().trim();
    itemprice = $(this).parent().siblings(".card-text").children().text();
    quant = parseInt($(this).parent().siblings(".form-select").val());

    var itemobj = { name: itemname, price: itemprice, quantity: quant };

    if (
      cartitems.some((itemnamefound) => itemnamefound.name === itemname) &&
      quant > 0
    ) {
      console.log("found");
      cartitems.find((o, i) => {
        if (o.name === itemname) {
          var prevquant = parseInt(cartitems[i].quantity);
          if (quant <= prevquant) {
            cartitems[i] = {
              name: itemname,
              price: itemprice,
              quantity: prevquant - quant,
            };

            var diffval = parseInt(cartitems[i].quantity);

            if (diffval == 0) {
              console.log("not found or removing");
              cartitems.pop(cartitems[i]);
            }
          }
        }
      });
    } else {
      console.log("not applicable!");
    }

    currentcount = quant;
    count = parseInt(prevcount) - parseInt(currentcount);
    prevcount = count;
    if (count > 0) {
      $(".badge").text(count);
      $("html, body").animate(
        {
          scrollTop: $(".badge").offset().top,
        },
        1000
      );
    }
    if (count < 0) {
      $(".badge").text(0);
      $(".badge").hide();
      
    }
  });

  $(".cartbtn .cart").click(function (e) {
    
    $.ajax({
      url: "	https://webhook.site/b5df8de1-1850-47a0-a19a-f5da84d1b832",
      //url: "cartitems.json",
      type: "POST",
      data: JSON.stringify(cartitems),
      dataType: "json",
      success: function (response) {
        window.location.href = "html/cart.html";
      },

      error: function (error) {
        console.log(error);
        window.location.href = "html/cart.html";
      },
    });
  });
});

$(window).on("load", function (e) {
  $.ajax({
    url: "http://www.json-generator.com/api/json/get/bOsXjslYaG?indent=2",
    //url: "cartitems.json",
    type: "GET",

    success: function (response) {
      var cartdata;
      var finalprice=0;
      $(response).each(function (o, i) {
        name1 = i.name;
        quant = i.quantity;
        price = i.price;
        total=price*quant;
        finalprice=finalprice+total;
        var prevcart = $(".allitems").find(".cartitems").html();
        console.log(prevcart);

        imageSection = `<div class="col-lg-3 col-sm-12 col-md-4 image">
                          <img src="../img/violet.jpg" />
                        </div>`;

        titleSection = ` <div class="col-lg-3 col-sm-8 col-md-4">
                          <span class="itemname"><strong class="mobilespecific"><i>Name</i></strong>${name1}</span>
                        </div>`;
        quantitySection = ` <div class="col-lg-3 col-sm-8 col-md-2">
                          <span class="itemquant"><strong class="mobilespecific"><i>Quantity</i></strong>${quant}</span>
                        </div>`;

        priceSection = `<div class="col-lg-3 col-sm-8 col-md-2">
                        <span class="itemprice"><strong class="mobilespecific"><i>Price</i></strong>${total}</span>
                      </div>`;


        cartdata =
          '<div class="cart-items">' +
          imageSection +
          titleSection +
          quantitySection +
          priceSection +
          "</div>";
        $(".allitems").append(cartdata);

      });

      var delivery= parseFloat($('#tax').text());
      $('#tax').text('$'+delivery);
      var finalprice2=finalprice+delivery;
      $('#total').text('$'+finalprice);
      $('#esttotal').text('$'+finalprice2);


      //console.log(response);
    },
    error: function (error) {
      console.log(error);
    },
  });
});
