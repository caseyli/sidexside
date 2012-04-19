function loadSelect(data, select_tag) {
	
	ihtml = "";
	jQuery.each(data, function() {
		ihtml += "<option value='" + this.id + "'>" + this.title + "</option>";
	});
	$(select_tag).html(ihtml);
}
