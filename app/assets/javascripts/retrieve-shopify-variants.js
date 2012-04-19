function retrieveVariantsAndLoadSelect(async, select_tags) {
	$.ajax({
		url : "/variants",
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
		url : "/variants/" + variant_id,
		async : async,
		dataType : "json",
		success : function(data, textStatus, jqXHR) {
			loadVariant(data, variant_number);
		},
		error : function(jqXHR, textStatus, errorThrown) {
			alert("Sorry, there was an error trying to retrieve variants information.");
		}
	});
}

function loadVariant(variant, variant_number) {
	/* TODO: Lots of repetiton here, refactor */
	$("#variant_" + variant_number + "_header").html(editableVariantTag(variant.id, "title", variant.title, variant_number));
	$("#variant_" + variant_number + "_price").html(editableVariantTag(variant.id, "price", variant.price, variant_number));
	$("#variant_" + variant_number + "_grams").html(editableVariantTag(variant.id, "grams", variant.grams, variant_number));
	$("#variant_" + variant_number + "_compare_at_price").html(editableVariantTag(variant.id, "compare_at_price", variant.compare_at_price, variant_number));
	$("#variant_" + variant_number + "_requires_shipping").html(editableVariantTag(variant.id, "requires_shipping", variant.requires_shipping.toString(), variant_number));
	$("#variant_" + variant_number + "_sku").html(editableVariantTag(variant.id, "sku", variant.sku, variant_number));
	$("#variant_" + variant_number + "_inventory_quantity").html(variant.inventory_quantity);
	$("#variant_" + variant_number + "_inventory_management").html(editableVariantTag(variant.id, "inventory_management", variant.inventory_management, variant_number));
	$("#variant_" + variant_number + "_inventory_policy").html(editableVariantTag(variant.id, "inventory_policy", variant.inventory_policy, variant_number));
	$("#variant_" + variant_number + "_taxable").html(editableVariantTag(variant.id, "taxable", variant.taxable.toString(), variant_number));
	
	/* TODO: This is an awful work around for event handlers being added twice */
	$(".editable").off("dblclick", swapInVariantUpdateForm);
	$(".editable").on("dblclick", swapInVariantUpdateForm);
}

function swapInVariantUpdateForm() {
	/* Extract old value in case user cancels and to prefill form */
	oldText = $(this).html().trim();
	if(oldText == "&lt;double-click to edit&gt;") {
		oldText = "";
	}
	
	/* Extract Key Name and Variant ID for update */
	var keyName = $(this).data("key_name");
	var variantId = $(this).data("variant_id");
	var variantNumber = parseInt($(this).data("variant_number"));
	
	/* IDs needed to capture cases when user edits multiple fields */
	var inputId = "input" + variantId + "-" + variantNumber + "-" + keyName
	var oldInputId = "old-" + inputId;
	var saveId = "save" + variantId + "-" + variantNumber + "-" + keyName
	var discardId = "discard" + variantId + "-" + variantNumber + "-" + keyName;
	
	/* Some fields should use text area */
	var inputTag = '<input id="' + inputId + '" type="text" class="editBox" value="" />';
	if( (keyName == "requires_shipping") ||
		(keyName == "taxable")
	){
		inputTag = '<select id="' + inputId + '" class="editBox editable-textarea">' +
			'<option value="true">True</option>' +
			'<option value="false">False</option>' +
			'</select>';
	}
	
	var oldInputTag = '<input id="' + oldInputId + '" type="hidden" value="" />';
	
	/* Display form */
	$(this).html("").html(
		'<form>' + 
			inputTag + oldInputTag +
		'</form>' +
		'<a href="#" class="btnSave btn btn-success" id="' + saveId + '" data-variant_id="' + variantId + '" data-key_name="' + keyName +'">Save</a> ' +
		'<a href="#" class="btnDiscard btn btn-danger" id="' + discardId + '">Cancel</a>'
	);
	
	$("#" +  inputId).val(oldText);
	$("#" +  oldInputId).val(oldText);
	
	$(this).off("dblclick", swapInVariantUpdateForm);
	
	
	/* Add Event Handler for clicking on Save */
	$("#" + saveId).on("click", function() {
		
		/* Extract new value and element that was clicked on */
	    var element = $(this);
	    var newText = element.siblings("form").children(".editBox").val();
		
		element.html("<img src='/ajax-loader-small.gif'> Saving...");
		
	    /* Make AJAX Call to update DB value */
	    $.ajax({
	    	url: "/variants/" + $(this).data("variant_id"),
	    	dataType: "json",
	    	type: "PUT",
	    	data: { key_name : $(this).data("key_name"), value : newText },
	    	success: function(data, textStatus, jqXHR) {
	    		if(data.result) {
	    			/* If displaying the same variants, refresh the variant */
	    			opposite_variant_number = variantNumber%2 + 1;
	    			if($("#variant_1_id").val() == $("#variant_2_id").val()) {
	    				refreshVariant(opposite_variant_number.toString());
	    			}
	    			    		
	    			element.parent().html(newText).on("dblclick", swapInVariantUpdateForm);	
	    		}
	    		else {
	    			alert(data.message);	
	    		}
	    	},
	    	error: function(jqXHR, textStatus, errorThrown) {
	    		element.html("Save");
	    		alert("Sorry, could not update your variant information.");
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
		$(this).parent().html(oldText).on("dblclick", swapInVariantUpdateForm);
		return false;
	});
	
	return false;
}

function refreshVariant(variant_number) {
	retrieveVariantAndLoadData(true, $("#variant_" + variant_number + "_id").val(), variant_number);
}

function editableVariantTag(variant_id, key_name, innerHTML, variant_number) {
	if(innerHTML == "" || innerHTML == null) {
		innerHTML = "&lt;double-click to edit&gt;";
	}
	return "<div class='editable' data-key_name='" + key_name + "' " +
							     "data-variant_id='" + variant_id + "' " +
							     "data-variant_number='" + variant_number + "'" +
							     ">" + innerHTML + "</div>";	
}
