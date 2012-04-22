class ProductKey < ResourceKey
  def self.all
    [
      ProductKey.new("Handle", "handle", true, "string"),
      ProductKey.new("Tags", "tags", true, "string"),
      ProductKey.new("Product Type", "product_type", true, "string"),
      ProductKey.new("Vendor", "vendor", true, "string"),
      ProductKey.new("Description", "body_html", true, "string")
    ]
  end
end