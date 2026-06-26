var colorboxConfig = {
	inline:true,
  	width:"90%",
  	height:'90%',
  	fixed:true,
  	href:"#inline_content"
}
if(typeof GPCCollection ==='undefined' ) var GPCCollection = {};
window.jQuery = window.$ = jQuery;
window.GPCApp = {};
GPCApp.UpdateDOM = function(){
	var compare = gpc_getCookie("compareList");
    var compareList = compare.split(",");

    var atcompareText = GPCConfigs.settings.trans.add_to_compare ? GPCConfigs.settings.trans.add_to_compare : '';
    var addedtocompareText = GPCConfigs.settings.trans.added_to_compare ? GPCConfigs.settings.trans.added_to_compare : '';
    var compare_style = GPCConfigs.settings.settings.compare_style;
    var compare_custom_style = GPCConfigs.settings.settings.compare_custom_style ?  GPCConfigs.settings.settings.compare_custom_style : '';
    var compare_added_custom_style = GPCConfigs.settings.settings.compare_added_custom_style ?  GPCConfigs.settings.settings.compare_added_custom_style : '';

    $('.gpc-collection-script').each(function(){
      var id_product = jQuery(this).data('id');
      var handle = jQuery(this).data('handle');
      if(compare_style=='button'){
      	if(compareList.indexOf(id_product+'')==-1){
            jQuery(this).siblings('.gpc-action').empty().append('<a class="globo-add-to-compare" onclick="GPCApp.add('+id_product+',\''+handle+'\')" title="'+atcompareText+'" rel="nofollow"><span>'+atcompareText+'</span></a>');
        }else {
            jQuery(this).siblings('.gpc-action').empty().append('<a class="globo-add-to-compare gpc-added" onclick="GPCApp.show()" title="'+addedtocompareText+'" rel="nofollow"><span>'+addedtocompareText+'</span></a>');
        }
      }
      else {
        if(compareList.indexOf(id_product+'')==-1){
            jQuery(this).siblings('.gpc-action').empty().append(compare_custom_style).insertAfter(this).attr('onclick','GPCApp.add('+id_product+',\''+handle+'\')');
        }
        else{
            jQuery(this).siblings('.gpc-action').empty().append(compare_added_custom_style).insertAfter(this).attr('onclick','GPCApp.show()');
        }
      }
    });
}
GPCApp.UpdateDOM();
GPCApp.add = function(product_id,handle){
    if(product_id&&handle){
    	product_id = product_id.toString();
        var compare = gpc_getCookie("compareList");
        var handles = gpc_getCookie("compareHandles");

        var compareList = compare.split(",");
        var compareHandles = handles.split(",");


        if(compare!=""&&compareList.length){
            if(compareList.indexOf(product_id)==-1){
                compareList.push(product_id);
                compareHandles.push(handle);
                if(GPCConfigs.settings.settings.limit_compareable_products&&compareList.length>GPCConfigs.settings.settings.max_compareable_products){
                    // Remove first item
                    compareList.shift();
                    compareHandles.shift();
                }

            }
        }else {
            compareList = new Array();
            compareList.push(product_id);

            compareHandles = new Array();
            compareHandles.push(handle);
        }

        gpc_setCookie("compareList", compareList, 7);
        gpc_setCookie("compareHandles", compareHandles, 7);
        var a = GPCApp.UpdateDOM();
        GPCApp.show();
    }
  	return false;
}
GPCApp.remove = function(product_id){
  	product_id = product_id.toString();
	var compare = gpc_getCookie("compareList");
  	var handles = gpc_getCookie("compareHandles");

  	var compareList = compare.split(",");
    var compareHandles = handles.split(",");

    if(compare!=""&&compareList.length){
      	var index = compareList.indexOf(product_id);
        if(index!=-1){
        	compareList.splice(index,1);
          	compareHandles.splice(index,1);


			gpc_setCookie("compareList", compareList, 7);
          	gpc_setCookie("compareHandles", compareHandles, 7);
        }
    }
    GPCApp.renderViewer();
  	GPCApp.UpdateDOM();
}
GPCApp.show = async function (){
  var a = await GPCApp.renderViewer();
  $.colorbox(colorboxConfig);
  $(window).resize(function() {
    $('.compare').colorbox.resize(colorboxConfig);
  });

}
GPCApp.renderViewer = async function(){
  	var compare = gpc_getCookie("compareList");
  	var compareList = compare.split(",");

  	var handles = gpc_getCookie("compareHandles");
  	var compareHandles = handles.split(",");
    if(compare==""||compare==""){
      	var emptyText  = GPCConfigs.settings.trans.empty ? GPCConfigs.settings.trans.empty : '';
      	var html_empty = '<tr class="empty"><td>'+emptyText+'</td></tr>';
      	$('table.compare-list').addClass('empty').find('tbody').empty().append(html_empty);
      	return ;
    }
  	// Get Product if not initial
	var updateCollectionList = await GPCApp.updateCollectionList(compareList,compareHandles);
  	var html = '';
    for(var i=0;i<GPCConfigs.settings.fields.length;i++){
        if(GPCConfigs.settings.fields[i].enable){
        	switch(GPCConfigs.settings.fields[i].value) {
                case "Remove":
                    html += renderRemove(compareList);
                    break;
                case "Image":
                    html += renderImage(compareList);
                    break;
                case "Title":
                    html += renderTitle(compareList);
                    break;
                case "Price":
                    html += renderPrice(compareList);
                    break;
                case "Action":
                    html += renderATC(compareList);
                    break;
                case "Description":
                    html += renderDescription(compareList);
                    break;
                case "Availability":
                    html += renderStock(compareList);
                    break;
                case "Options":
                    html += renderOptions(compareList);
                    break;
                default:
                    break;
             }
        }

    }

    if(compareList.length){
      	$('.compare-list tbody').empty().append(html);

    }
}
GPCApp.updateCollectionList = async function(compareList,compareHandles){
	var getP = [];
    compareList.forEach(function(product_id,key) {
        if( typeof GPCCollection[product_id] ==='undefined'){
			var req = $.ajax({
              	type: "GET",
      			url: "https://"+GPCConfigs.shop_url+"/apps/compare/api/products/"+compareHandles[key]+".json",
              	cache: true,
              	success: function(data){
              	}
            });
          	getP.push(req)
        }
    });

	var pl = await Promise.all(getP);
    pl.forEach(function(data,key) {
    	GPCCollection[data.id] = data;
    });
}
GPCApp.renderViewer();
GPCApp.addtocart = function(ele,product_id){
    if(GPCCollection[product_id].variants.length==1){
      	$.ajax('/cart/add.js', { data: {
                quantity: 1,
                id: GPCCollection[product_id].variants[0].id
        	},
            type: "POST",
            complete: function(response) {
              if(response.status==200){
                if(GPCConfigs.settings.settings.disable_ajax_cart){
                	window.location.href='/cart';
                }
              	$(ele).html(GPCConfigs.settings.trans.added_to_cart ? GPCConfigs.settings.trans.added_to_cart : "");
              }
            },

        });
    }
}
function renderRemove (compareList){
	var removeInnerHTML = '';
    var removeText = GPCConfigs.settings.trans.remove ? GPCConfigs.settings.trans.remove : '';
  	compareList.forEach(function(product_id) {
        removeInnerHTML+= '<td class=""> <a href="javascript:void(0)" onclick="GPCApp.remove('+product_id+')" class="product-remove">'+removeText+' <span class="remove">x</span> </a> </td>';
    });
  	var remove = '<tr class="remove"> <th>&nbsp;</th>'+removeInnerHTML+'</tr>';
  	return remove;
}
function renderImage (compareList){
	var imageInnerHTML = '';
  	compareList.forEach(function(product_id) {
      	if(typeof GPCCollection[product_id] === 'undefined') return;
      	var image = typeof GPCCollection[product_id] !== 'undefined' ? GPCCollection[product_id].featured_image : '';
        imageInnerHTML +='<td class=""> <div class="image-wrap"> <img width="266" height="386" src="'+image+'" class="attachment-shop_catalog size-shop_catalog" alt="" sizes="(max-width: 266px) 100vw, 386px"> </div> </td>'
    });
  	var image = '<tr class="image"> <th>Image <div class="fixed-th"></div> </th>'+imageInnerHTML+'</tr>';
  	return image;
}
function renderTitle (compareList){
	var titleInnerHTML = '';
  	var titleText = GPCConfigs.settings.trans.title ? GPCConfigs.settings.trans.title : "" ;
  	compareList.forEach(function(product_id) {
      	if(typeof GPCCollection[product_id] === 'undefined') return;
        titleInnerHTML+= '<td class="">'+truncateText(GPCCollection[product_id].title,30)+'</td>';
    });
  	var title = '<tr class="title"> <th>'+titleText+'</th>'+titleInnerHTML+'</tr>';
  	return title;
}
function renderPrice (compareList){
	var priceInnerHTML = '';
  	var priceText = GPCConfigs.settings.trans.price ? GPCConfigs.settings.trans.price : "" ;
  	compareList.forEach(function(product_id) {
      	if(typeof GPCCollection[product_id] === 'undefined') return;
      	var price = GPCConfigs.money_character + ' ' +parseFloat(Math.round(GPCCollection[product_id].price/100 * 100) / 100).toFixed(2);
      	if(GPCCollection[product_id].price_max!=GPCCollection[product_id].price_min)
          price = GPCConfigs.money_character+' '+parseFloat(Math.round(GPCCollection[product_id].price_min/100 * 100) / 100).toFixed(2) + ' - ' + GPCConfigs.money_character +' '+ parseFloat(Math.round(GPCCollection[product_id].price_max/100 * 100) / 100).toFixed(2);
        priceInnerHTML+= '<td class=""> <span class="shopify-Price-amount amount money">'+price+'</span> </td>';
    });
  	var price = '<tr class="price"> <th>'+ priceText +'</th>'+priceInnerHTML+'</tr>';
  	return price;
}
function renderATC (compareList){
	var atcInnerHTML = '';
  	var atcTitle = GPCConfigs.settings.trans.add_to_cart ? GPCConfigs.settings.trans.add_to_cart : "";
  	var atcText = GPCConfigs.settings.trans.add_to_cart ? GPCConfigs.settings.trans.add_to_cart : "";
  	var readmoreText = GPCConfigs.settings.trans.read_more ? GPCConfigs.settings.trans.read_more : "";
  	var seloptionText = GPCConfigs.settings.trans.select_options ? GPCConfigs.settings.trans.select_options : "";
  	compareList.forEach(function(product_id) {
      	if(typeof GPCCollection[product_id] === 'undefined') return;
      	var atc = atcText;
      	if(!GPCCollection[product_id].available) atc = readmoreText;
      	if((GPCCollection[product_id].variants).length>1) atc = seloptionText;
        atcInnerHTML+= '<td><a href="#" onclick="GPCApp.addtocart(this,'+product_id+')" data-pid="'+product_id+'" class="add_compare button add_to_cart_button add_to_cart button alt ajax_add_to_cart">'+atc+'</a></td>';
    });
  	var atc = '<tr class="g-atc"> <th>'+ atcTitle +'</th>'+atcInnerHTML+'</tr>';
  	return atc;
}
function renderDescription (compareList){
	var descriptionInnerHTML = '';
  	var desText = GPCConfigs.settings.trans.description ? GPCConfigs.settings.trans.description : "";
  	return '';
  	compareList.forEach(function(product_id) {
      	if(typeof GPCCollection[product_id] === 'undefined') return;
        descriptionInnerHTML+= '<td class="" style="white-space: nowrap; text-overflow:ellipsis; overflow: hidden; max-width:1px;"><p>'+GPCCollection[product_id].description+'</p></td>';
    });
  	var description = '<tr class="description"> <th>'+ desText +'</th>'+descriptionInnerHTML+'</tr>';
  	return description;
}
function renderStock (compareList){
	var stockInnerHTML = '';
  	var stockText = GPCConfigs.settings.trans.availability ? GPCConfigs.settings.trans.availability : "";
  	compareList.forEach(function(product_id) {
      	if(typeof GPCCollection[product_id] === 'undefined') return;
      	var s = '<span class="in-stock">'+GPCConfigs.settings.trans.in_stock ? GPCConfigs.settings.trans.in_stock : "" +'</span>';
        if(!GPCCollection[product_id].available) s = '<span class="out-of-stock">'+GPCConfigs.settings.trans.out_of_stock ? GPCConfigs.settings.trans.out_of_stock : "" +'</span>';
        stockInnerHTML+= '<td class="">'+s+'</td>';
    });
  	var stock = '<tr class="stock"> <th>'+ stockText +'</th>'+stockInnerHTML+'</tr>';
  	return stock;
}
function renderOptions(compareList){
  var arrOptions = [];
  compareList.forEach(function(product_id) {
    if(typeof GPCCollection[product_id] === 'undefined') return;
    arrOptions = arrOptions.concat(GPCCollection[product_id].options);
  });
  var htmlOptions = '';
  arrayUnique(arrOptions).forEach(function(key) {
    htmlOptions += renderOption(compareList,key);
  });
  return htmlOptions;
}
function renderOption(compareList,key){
	var optionInnerHTML = '',is_empty=true;
  	compareList.forEach(function(product_id) {
      	var availableOptions = getOptionWithKey(product_id,key);
      	if(availableOptions!='') is_empty = false;
      	optionInnerHTML += '<td>'+availableOptions+'</td>'
    });
    if(is_empty){ return '';
    }
  	var option = '<tr class="option"> <th>'+key+'</th>'+optionInnerHTML+'</tr>';
  	return option;
}
function getOptionWithKey(product_id,key){
  	var res = [];
  	var index = (GPCCollection[product_id].options).indexOf(key);
  	var variants = GPCCollection[product_id].variants;
    if(index>=0&&(variants).length){
        variants.forEach(function(variant) {
          if(variant.options[index]!="Default Title"){
              res.push(variant.options[index]);
          }
        });
    }
  return arrayUnique(res);
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
