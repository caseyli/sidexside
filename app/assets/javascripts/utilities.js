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
	
	/* Disable Merge Button */
	
}