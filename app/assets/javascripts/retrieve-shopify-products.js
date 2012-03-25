function retrieveProductsAndLoadSelect(async, select_tags) {
	$.ajax({
		url : "/products/index",
		async : async,
		dataType : "json",
		success : function(data, textStatus, jqXHR) {
			jQuery.each(select_tags, function(){
				loadSelect(data, this.toString());	
			});
		},
		error : function(jqXHR, textStatus, errorThrown) {
			alert("Sorry, there was an error trying to retrieve product information.");
		}
	});
}

function retrieveProductAndLoadData(async, product_id, product_number) {
	var product = null;
	$.ajax({
		url : "/products/show",
		async : async,
		dataType : "json",
		data : {
			id : product_id
		},
		success : function(data, textStatus, jqXHR) {
			loadProduct(data, product_number)
		},
		error : function(jqXHR, textStatus, errorThrown) {
			alert("Sorry, there was an error trying to retrieve product information.");
		}
	});

	return product;
}


function loadProduct(product, product_number) {
	$("#product_" + product_number + "_header").html(product.title);

	if(product.images.length > 0) {
		ihtml = "<img src='" + product.images[0].src + "' class='product-image' />";
		$("#product_" + product_number + "_image").html(ihtml);
	}

	$("#product_" + product_number + "_product_type").html(product.product_type);
	$("#product_" + product_number + "_price_range").html(product.price_range);
	$("#product_" + product_number + "_vendor").html(product.vendor);
	$("#product_" + product_number + "_body_html").html(product.body_html);
}


