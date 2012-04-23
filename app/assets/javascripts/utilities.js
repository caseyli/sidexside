function loadSelect(data, select_tag) {
	
	ihtml = "";
	jQuery.each(data, function() {
		ihtml += "<option value='" + this.id + "'>" + this.title + "</option>";
	});
	$(select_tag).html(ihtml);
}

function merge(type, number, key_name) {
	/* Invoke Edit Box on Merge Value */
	$("#" + type + "_" + number + "_" + key_name).children(".editable").dblclick();
	
	/* Replace Edit Box with value from opposite item */
	var opposite_number = parseInt(number)%2 + 1;
	var merge_value = $("#" + type + "_" + opposite_number.toString() + "_" + key_name).children(".editable").html();
	if(merge_value == "&lt;double-click to edit&gt;") {
		merge_value = "";
	}
	$("#input-" + number + "-" + key_name).val(merge_value);
	
	/* Disable Opposite Merge Button */
	$("#merge_" + opposite_number.toString() + "_" + key_name).hide("100");
	
}

function saveAll(number, type) {
	/* Create message */
	var item_name = "";
	if(number == 1) {
		item_name = "the " + type + " on the left"
	}
	else {
		item_name = "the " + type + " on the right"
	}
	$("#modal-item-name").html(item_name);
	
	/* Attach handler to close button */
	$("#modal-close").on("click", function(){
		hideSaveAllModal();
	});
	
	/* Attach handler to save button */
	$("#modal-saveAll").on("click", function(){
		$(".btnSave-" + number).click();
		hideSaveAllModal();
	});
	
	/* Show modal */
	$('#saveAllModal').modal('show');
	
	return false;
}

function discardAll(number) {
	$(".btnDiscard-" + number).click();
}

function mergeAll(number) {
	$(".merge-" + number).click();
}

function hideSaveAllModal() {
	$("#saveAllModal").modal("hide");
		
	/* Remove handlers so there is no conflict in Product 1 and Product 2 saving */
	$("#modal-close").off("click");
	$("#modal-saveAll").off("click");
}
