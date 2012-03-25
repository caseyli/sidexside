function retrieveVariantsAndLoadSelect(async, select_tags) {
	$.ajax({
		url : "/variants/index",
		dataType : "json",
		async : async,
		data : {
			product : $("#product_id").val()
		},
		success : function(data, textStatus, jqXHR) {
			jQuery.each(select_tags, function(){
				loadSelect(data, this.toString());
			});
		},
		error : function(jqXHR, textStatus, errorThrown) {
			alert("Sorry, there was an error trying to retrieve variants information." + errorThrown + $("#product_id").val());
		}
	});
}

function retrieveVariantAndLoadData(async, variant_id, variant_number) {
	$.ajax({
		url : "/variants/show",
		async : async,
		dataType : "json",
		data : {
			id : variant_id
		},
		success : function(data, textStatus, jqXHR) {
			loadVariant(data, variant_number);
		},
		error : function(jqXHR, textStatus, errorThrown) {
			alert("Sorry, there was an error trying to retrieve variants information.");
		}
	});
}

function loadVariant(variant, variant_number) {
	$("#variant_" + variant_number + "_header").html(variant.title);
	$("#variant_" + variant_number + "_price").html(variant.price);
	$("#variant_" + variant_number + "_requires_shipping").html(variant.requires_shipping);
	$("#variant_" + variant_number + "_inventory_quantity").html(variant.inventory_quantity);
}
