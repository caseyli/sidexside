function loadSelect(data, select_tag) {
	
	ihtml = "";
	jQuery.each(data, function() {
		ihtml += "<option value='" + this.id + "'>" + this.title + "</option>";
	});
	$(select_tag).html(ihtml);
}

function editableTag(product_id, key_name, innerHTML, product_number) {
	return "<div class='editable' data-key_name='" + key_name + "' " +
							     "data-product_id='" + product_id + "' " +
							     "data-product_number='" + product_number + "'" +
							     ">" + innerHTML + "</div>";
	
}

