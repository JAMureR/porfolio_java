// Cookie
function gpw_setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires="+ d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}
function gpw_getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i <ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}


window.GPWApp = {};

window.jQuery = window.$ = jQuery;
GPWApp.UpdateDOM = function(){
	var wish = gpw_getCookie("wishList");
    var wishlist = wish.split(",");

    var atwishlistText = GPWConfigs.settings.trans.add_to_wishlist ? GPWConfigs.settings.trans.add_to_wishlist : '';
    var addedtowishlistText = GPWConfigs.settings.trans.added_to_wishlist ? GPWConfigs.settings.trans.added_to_wishlist : '';
    var wishlist_style = GPWConfigs.settings.settings.wishlist_style;
    var wishlist_custom_style = GPWConfigs.settings.settings.wishlist_custom_style ?  GPWConfigs.settings.settings.wishlist_custom_style : '';
    var wishlist_added_custom_style = GPWConfigs.settings.settings.wishlist_added_custom_style ?  GPWConfigs.settings.settings.wishlist_added_custom_style : '';
    $('.gpw-collection-script').each(function(){
      var id_product = $(this).data('id');
      var handle = $(this).data('handle');
      if(wishlist_style=='button'){
      	if(wishlist.indexOf(id_product+'')==-1){
            $(this).siblings('.gpw-action').empty().append('<a class="add_wishlist button la-core-wishlist globo-add-to-wishlist" onclick="GPWApp.add('+id_product+',\''+handle+'\')"  title="'+atwishlistText+'" rel="nofollow" ><span>'+atwishlistText+'</span></a>');
        }else {
            $(this).siblings('.gpw-action').empty().append('<a class="add_wishlist button la-core-wishlist globo-add-to-wishlist gpw-added"  title="'+addedtowishlistText+'" rel="nofollow" ><span>'+addedtowishlistText+'</span></a>');
        }
      }
      else {
        if(wishlist.indexOf(id_product+'')==-1){
            $(this).siblings('.gpw-action').empty().append(wishlist_custom_style).insertAfter(this).attr('onclick','GPWApp.add('+id_product+',\''+handle+'\')');
        }
        else{
            $(this).siblings('.gpw-action').empty().append(wishlist_added_custom_style).insertAfter(this);
        }
      }
    });
}
GPWApp.UpdateDOM();
GPWApp.add = function(product_id,handle){
    if(product_id&&handle){
    	product_id = product_id.toString();
        var wish = gpw_getCookie("wishList");
        var handles = gpw_getCookie("wishListHandles");

        var wishlist = wish.split(",");
        var wishlistHandles = handles.split(",");


        if(wish!=""&&wishlist.length){
            if(wishlist.indexOf(product_id)==-1){
                wishlist.push(product_id);
                wishlistHandles.push(handle);
                if(GPWConfigs.settings.settings.limit_wishlist_products&&wishlist.length>GPWConfigs.settings.settings.max_wishlist_products){
                    // Remove first item
                    wishlist.shift();
                    wishlistHandles.shift();
                }
            }
        }else {
            wishlist = new Array();
            wishlist.push(product_id);

            wishlistHandles = new Array();
            wishlistHandles.push(handle);
        }

        gpw_setCookie("wishList", wishlist, 7);
        gpw_setCookie("wishListHandles", wishlistHandles, 7);
    }
  	GPWApp.UpdateDOM();
  	return false;
}
GPWApp.remove = function(product_id){
  	product_id = product_id.toString();
    var wish = gpw_getCookie("wishList");
    var handles = gpw_getCookie("wishListHandles");

    var wishlist = wish.split(",");
    var wishlistHandles = handles.split(",");

    if(wish!=""&&wishlist.length){
      	var index = wishlist.indexOf(product_id);
        if(index!=-1){
        	wishlist.splice(index,1);
          	wishlistHandles.splice(index,1);

			gpw_setCookie("wishList", wishlist, 7);
          	gpw_setCookie("wishListHandles", wishlistHandles, 7);
        }
    }
    GPWApp.renderViewer();
  	GPWApp.UpdateDOM();
}
GPWApp.renderViewer = async function(){
    var wish = gpw_getCookie("wishList");
    var handles = gpw_getCookie("wishListHandles");

    var wishlist = wish.split(",");
    var wishlistHandles = handles.split(",");

    if(wish==""||handles==""){
      	var emptyText  = GPWConfigs.settings.trans.empty ? GPWConfigs.settings.trans.empty : '';
      	var html_empty = '<tr class="empty"><td>'+emptyText+'</td></tr>';
      	$('.gpw-content').empty().append(html_empty);
      	return ;
    }

  	// Get Product if not initial
	var updateCollectionList = await GPWApp.updateCollectionList(wishlist,wishlistHandles);

  	var html_header = GPWApp.renderHeader();
  	var html_body = GPWApp.renderBody(wishlist);
  	var html = '<div class="responsive-table"> <div class="responsive-table"> <table class="shop_table cart wishlist_table gl_respon_table">'+html_header+html_body+'</table> </div> </div>'
    $('.gpw-content').empty().append(html);
}
GPWApp.updateCollectionList = async function(wishlist,wishlistHandles){
	var getP = [];
    wishlist.forEach(function(product_id,key) {
        if( typeof GPWCollection[product_id] ==='undefined'){
			var req = $.ajax({
              	type: "GET",
      			url: "https://"+GPWConfigs.shop_url+"/apps/wishlist/api/products/"+wishlistHandles[key]+".json",
              	cache: true,
              	success: function(data){
              	}
            });
          	getP.push(req)
        }
    });

	var pl = await Promise.all(getP);
    pl.forEach(function(data,key) {
    	GPWCollection[data.id] = data;
    });
}
GPWApp.renderHeader = function(){
	var html_wrapper = '',html='';
  	for(var i=0;i<GPWConfigs.settings.fields.length;i++){
        if(GPWConfigs.settings.fields[i].enable){
        	switch(GPWConfigs.settings.fields[i].value) {
                case "Image":
                    html += '<th class="product-thumbnail"></th>';
                    break;
                case "Title":
                	var a = GPWConfigs.settings.trans.title ? GPWConfigs.settings.trans.title : "";
                    html += '<th class="product-name"><span class="nobr">'+a+'</span></th>';
                    break;
                case "Price":
                    html += '<th class="product-price"><span class="nobr">'+(GPWConfigs.settings.trans.price ? GPWConfigs.settings.trans.price : "")+'</span></th>';
                    break;
                case "Availability":
                    html += '<th class="product-stock-stauts"><span class="nobr">'+(GPWConfigs.settings.trans.availability ? GPWConfigs.settings.trans.availability : "")+'</span></th>';
                    break;
                case "Action":
                    html += '<th class="product-add-to-cart">'+(GPWConfigs.settings.trans.action ? GPWConfigs.settings.trans.action : "")+'</th>';
                    break;
                default:
                    break;
             }
        }

    }
  	html_wrapper = '<thead><tr><th class="product-remove"></th>'+html+'</tr></thead>';
  	return html_wrapper;
}
GPWApp.renderBody = function(wishlist){
	var html_wrapper = '',html='';
    if(wishlist.length){
        for (var x = 0 ; x < wishlist.length;x++){
          	html+='<tr><td class="product-remove"> <div><a class="remove remove_from_wishlist" title="Remove this product" data-action="remove" onclick="GPWApp.remove('+GPWCollection[wishlist[x]].id+')" data-handle="'+GPWCollection[wishlist[x]].handle+'">×</a></div> </td>';
        	for(var i=0;i<GPWConfigs.settings.fields.length;i++){
                if(GPWConfigs.settings.fields[i].enable){
                    switch(GPWConfigs.settings.fields[i].value) {
                        case "Image":
                            html += '<td class="product-thumbnail"> <a target="_blank" href="/products/'+GPWCollection[wishlist[x]].handle+'"> <img width="219" height="280" src="'+GPWCollection[wishlist[x]].featured_image+'" class="attachment-shop_thumbnail size-shop_thumbnail wp-post-image" alt="Backpack double strap" sizes="(max-width: 219px) 100vw, 219px"> </a> </td>';
                            break;
                        case "Title":
                            html += '<td class="product-name"><a target="_blank" href="/products/'+GPWCollection[wishlist[x]].handle+'">'+GPWCollection[wishlist[x]].title+'</a></td>';
                            break;
                        case "Price":
                        	var price = '<span class="shopify-Price-amount amount"><span class="money">'+GPWConfigs.money_character + GPWCollection[wishlist[x]].price/100+'</span></span>';
                            if(GPWCollection[wishlist[x]].price_max!=GPWCollection[wishlist[x]].price_min)
                              price = '<span class="shopify-Price-amount amount"><span class="money">' + GPWConfigs.money_character+GPWCollection[wishlist[x]].price_min/100 +'</span></span>' + ' - ' +  '<span class="shopify-Price-amount amount"><span class="money">' + GPWConfigs.money_character + GPWCollection[wishlist[x]].price_max/100+'</span></span>';
                            html += '<td class="product-price">'+price+'</td>';
                            break;
                        case "Availability":
                        	var s = '<td class="product-stock-status"><span class="wishlist-in-stock">'+(GPWConfigs.settings.trans.in_stock ? GPWConfigs.settings.trans.in_stock : "")+'</span></td>';
							if(!GPWCollection[wishlist[x]].available) s = '<td class="product-stock-status"><span class="wishlist-out-of-stock">'+(GPWConfigs.settings.trans.out_of_stock ? GPWConfigs.settings.trans.out_of_stock : "")+'</span></td>';
                            html += s;
                            break;
                        case "Action":
                        	var atcInnerHTML = '';
                            var atcTitle = GPWConfigs.settings.trans.add_to_cart ? GPWConfigs.settings.trans.add_to_cart : "";
                            var atcText = GPWConfigs.settings.trans.add_to_cart ? GPWConfigs.settings.trans.add_to_cart : "";
                            var readmoreText = GPWConfigs.settings.trans.read_more ? GPWConfigs.settings.trans.read_more : "";
                            var seloptionText = GPWConfigs.settings.trans.select_options ? GPWConfigs.settings.trans.select_options : "";


                        	var atc = '<td class="product-add-to-cart"><a href="#" data-pid="'+GPWCollection[wishlist[x]].id+'" onclick="GPWApp.addtocart(this,'+GPWCollection[wishlist[x]].id+')" class="button add_to_cart_button add_to_cart">'+atcText+'</a></td>';
                            if(!GPWCollection[wishlist[x]].available) atc = '<td class="product-add-to-cart"><a href="'+GPWCollection[wishlist[x]].handle+'"  class="button add_to_cart button alt">'+readmoreText+'</a></td>';
                            if((GPWCollection[wishlist[x]].variants).length>1) atc = '<td class="product-add-to-cart"><a href="'+GPWCollection[wishlist[x]].handle+'"  class="button add_to_cart button alt">'+seloptionText+'</a></td>';


                            html += atc;
                            break;
                        default:
                            break;
                     }
                }
            }
          	html += '</tr>';
        }
    }

  	html_wrapper = '<tbody>'+html+'</tbody>';
  	return html_wrapper;
}

GPWApp.addtocart = function(ele,product_id){
    if(GPWCollection[product_id].variants.length==1){
      	$.ajax('/cart/add.js', { data: {
                quantity: 1,
                id: GPWCollection[product_id].variants[0].id
        	},
            type: "POST",
            complete: function(response) {
              if(response.status==200){
                if(GPWConfigs.settings.settings.disable_ajax_cart){
                	window.location.href='/cart';
                }
              	$(ele).html(GPWConfigs.settings.trans.added_to_cart ? GPWConfigs.settings.trans.added_to_cart : "");
              }
            },

        });
    }
}
function truncateText(str, maxLength) {
  if(str.length>=maxLength){
  	 str = str.substr(0,maxLength) + '...';
  }
  return str;
}
function arrayUnique(array) {
    var a = array.concat();
    for(var i=0; i<a.length; ++i) {
        for(var j=i+1; j<a.length; ++j) {
            if(a[i] === a[j])
                a.splice(j--, 1);
        }
    }

    return a;
}




$(document).ready(function(){
	var wishlistContainer = $('.gpw-content');
    if(wishlistContainer.length){
      	GPWApp.renderViewer();
    }
})
