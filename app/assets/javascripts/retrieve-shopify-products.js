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
	var oldText = $(this).html().trim();
	if(oldText == "&lt;double-click to edit&gt;") {
		oldText = "";
	}
	
	/* Extract Key Name and Product ID for update */
	var keyName = $(this).data("key_name");
	var productId = $(this).data("product_id");
	var productNumber = parseInt($(this).data("product_number"));
	var opposite_product_number = productNumber%2 + 1;
	
	/* IDs needed to capture cases when user edits multiple fields */
	var inputId = "input" + "-" + productNumber + "-" + keyName;
	var oldInputId = "old-" + inputId;
	var saveId = "save" + "-" + productNumber + "-" + keyName;
	var discardId = "discard" + "-" + productNumber + "-" + keyName;
	
	/* Some fields should use text area */
	var inputTag = '<input id="' + inputId + '" type="text" class="editBox" value="" />';
	if(keyName == "body_html") {
		inputTag = '<textarea id="' + inputId + '" class="editBox editable-textarea" value="" cols="60" rows="15""/>';
	}
	
	var oldInputTag = '<input id="' + oldInputId + '" type="hidden" value="" />';
	/* Display form */
	$(this).html("").html(
		'<div class="field-form">' + 
			inputTag + oldInputTag +
		'</div>' +
		'<a href="#" class="btnSave-' + productNumber + ' btn btn-success" id="' + saveId + '" data-product_id="' + productId + '" data-key_name="' + keyName +'">Save</a> ' +
		'<a href="#" class="btnDiscard-' + productNumber + ' btn btn-danger" id="' + discardId + '">Cancel</a>'
	);
	$("#" +  inputId).val(oldText);
	$("#" +  oldInputId).val(oldText);
	$(this).off("dblclick", swapInProductUpdateForm);
	
	
	/* Add Event Handler for clicking on Save */
	$("#" + saveId).on("click", function() {
		
		/* Extract new value and element that was clicked on */
	    var element = $(this);
	    var newText = element.siblings(".field-form").children(".editBox").val();
		
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
	    			if($("#product_1_id").val() == $("#product_2_id").val()) {
	    				refreshProduct(opposite_product_number.toString());
	    			}
	    			    		
	    			element.parent().html(newText).on("dblclick", swapInProductUpdateForm);
	    			
	    			/* Reenable any merge buttons that may have been disabled */
					$("#merge_" + opposite_product_number + "_" + keyName).show('100');	
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
	$("#" + discardId).on("click", function() {	
		oldText = $("#" + oldInputId).val();
		if(oldText == "") {
			oldText = "&lt;double-click to edit&gt;";
		}	
		$(this).parent().html(oldText).on("dblclick", swapInProductUpdateForm);
		
		/* Reenable any merge buttons that may have been disabled */
		$("#merge_" + opposite_product_number + "_" + keyName).show('100');
		
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