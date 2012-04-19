function retrieveProductsAndLoadSelect(async, select_tags) {
	$.ajax({
		url : "/products/",
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
		url : "/products/" + product_id,
		async : async,
		dataType : "json",
		success : function(data, textStatus, jqXHR) {
			loadProduct(product_id, data, product_number)
		},
		error : function(jqXHR, textStatus, errorThrown) {
			alert("Sorry, there was an error trying to retrieve product information.");
		}
	});
}

function retrieveProductImageAndLoad(product_id, image_tag) {
	
	$.ajax({
		url : "/products/" + product_id,
		dataType : "json",
		success : function(data, textStatus, jqXHR) {
			loadProductImage(data, image_tag);
		},
		error : function(jqXHR, textStatus, errorThrown) {
			alert("Sorry, there was an error trying to retrieve product information.");
		}
	});
}


function loadProduct(product_id, product, product_number) {
	/* TODO: Lots of repetiton here, refactor */
	$("#product_" + product_number + "_header").html(product.title);
	loadProductImage(product, "#product_" + product_number + "_image")
	$("#product_" + product_number + "_handle").html(editableProductTag(product_id, "handle", product.handle, product_number));
	$("#product_" + product_number + "_tags").html(editableProductTag(product_id, "tags", product.tags, product_number));
	$("#product_" + product_number + "_product_type").html(editableProductTag(product_id, "product_type", product.product_type, product_number));
	$("#product_" + product_number + "_vendor").html(editableProductTag(product_id, "vendor", product.vendor, product_number));
	$("#product_" + product_number + "_body_html").html(editableProductTag(product_id, "body_html", product.body_html, product_number));
	
	/* TODO: This is an awful work around for event handlers being added twice */
	$(".editable").off("dblclick", swapInProductUpdateForm);
	$(".editable").on("dblclick", swapInProductUpdateForm);
}

function loadProductImage(product, image_tag) {
	if(product.images.length > 0) {
		ihtml = "<img src='" + product.images[0].src + "' class='product-image' />";
		$(image_tag).html(ihtml);
	}
}

function refreshProduct(product_number) {
	retrieveProductAndLoadData(true, $("#product_" + product_number + "_id").val(), product_number);
}

function swapInProductUpdateForm() {
	/* Extract old value in case user cancels and to prefill form */
	oldText = $(this).html().trim();
	if(oldText == "&lt;double-click to edit&gt;") {
		oldText = "";
	}
	
	/* Extract Key Name and Product ID for update */
	keyName = $(this).data("key_name");
	productId = $(this).data("product_id");
	productNumber = parseInt($(this).data("product_number"));
	
	/* IDs needed to capture cases when user edits multiple fields */
	inputId = "input" + productId + "-" + keyName
	saveId = "save" + productId + "-" + keyName
	
	/* Some fields should use text area */
	inputTag = '<input id="' + inputId + '" type="text" class="editBox" value="" />';
	if(keyName == "body_html") {
		inputTag = '<textarea id="' + inputId + '" class="editBox editable-textarea" value="" cols="60" rows="15""/>';
	}
	
	/* Display form */
	$(this).html("").html(
		'<form>' + 
			inputTag +
		'</form>' +
		'<a href="#" class="btnSave btn btn-success" id="' + saveId + '" data-product_id="' + productId + '" data-key_name="' + keyName +'">Save</a> ' +
		'<a href="#" class="btnDiscard btn btn-danger">Cancel</a>'
	);
	$("#" +  inputId).val(oldText);
	$(this).off("dblclick", swapInProductUpdateForm);
	
	
	/* Add Event Handler for clicking on Save */
	$("#" + saveId).on("click", function() {
		
		/* Extract new value and element that was clicked on */
	    element = $(this);
	    newText = element.siblings("form").children(".editBox").val();
		
		element.html("<img src='/ajax-loader-small.gif'> Saving...");
		
	    /* Make AJAX Call to update DB value */
	    $.ajax({
	    	url: "/products/" + $(this).data("product_id"),
	    	dataType: "json",
	    	type: "PUT",
	    	data: { key_name : $(this).data("key_name"), value : newText },
	    	success: function(data, textStatus, jqXHR) {
	    		if(data.result) {
	    			/* If displaying the same product, refresh the product */
	    			opposite_product_number = productNumber%2 + 1;
	    			if($("#product_1_id").val() == $("#product_2_id").val()) {
	    				refreshProduct(opposite_product_number.toString());
	    			}
	    			    		
	    			element.parent().html(newText).live("dblclick", swapInProductUpdateForm);	
	    		}
	    		else {
					alert(data.message);	    			
	    		}
	    	},
	    	error: function(jqXHR, textStatus, errorThrown) {
	    		element.html("Save");
	    		alert("Sorry, could not update your product information.");
	    	}	
	    });
	    
		return false;
	});

	/* Add Event Handler for click on Cancel */
	$(".btnDiscard").on("click", function() {	
		if(oldText == "") {
			oldText = "&lt;double-click to edit&gt;";
		}	
		$(this).parent().html(oldText).bind("dblclick", swapInProductUpdateForm);
		return false;
	});
	
	return false;
}

function editableProductTag(product_id, key_name, innerHTML, product_number) {
	if(innerHTML == "" || innerHTML == null) {
		innerHTML = "&lt;double-click to edit&gt;";
	}
	return "<div class='editable' data-key_name='" + key_name + "' " +
							     "data-product_id='" + product_id + "' " +
							     "data-product_number='" + product_number + "'" +
							     ">" + innerHTML + "</div>";
	
}
