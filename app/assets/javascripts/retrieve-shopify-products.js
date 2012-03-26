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
}

function retrieveProductImageAndLoad(product_id, image_tag) {
	
	$.ajax({
		url : "/products/show",
		dataType : "json",
		data : {
			id : product_id
		},
		success : function(data, textStatus, jqXHR) {
			loadProductImage(data, image_tag);
		},
		error : function(jqXHR, textStatus, errorThrown) {
			alert("Sorry, there was an error trying to retrieve product information.");
		}
	});
}


function loadProduct(product, product_number) {
	$("#product_" + product_number + "_header").html(product.title);
	loadProductImage(product, "#product_" + product_number + "_image")
	$("#product_" + product_number + "_product_type").html(product.product_type);
	$("#product_" + product_number + "_price_range").html(product.price_range);
	$("#product_" + product_number + "_vendor").html(product.vendor);
	$("#product_" + product_number + "_body_html").html(product.body_html);
}

function loadProductImage(product, image_tag) {
	if(product.images.length > 0) {
		ihtml = "<img src='" + product.images[0].src + "' class='product-image' />";
		$(image_tag).html(ihtml);
	}
}
