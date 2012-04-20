function loadSelect(data, select_tag) {
	
	ihtml = "";
	jQuery.each(data, function() {
		ihtml += "<option value='" + this.id + "'>" + this.title + "</option>";
	});
	$(select_tag).html(ihtml);
}

function merge(type, number, key_name) {
	$("#" + type + "_" + number + "_" + key_name).children(".editable").dblclick();
	
	var opposite_number = parseInt(number)%2 + 1;
	var merge_value = $("#" + type + "_" + opposite_number.toString() + "_" + key_name).children(".editable").html();
	$("#input-" + number + "-" + key_name).val(merge_value);
}