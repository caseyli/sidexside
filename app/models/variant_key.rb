class VariantKey < ResourceKey
  def self.all
    [
      VariantKey.new("Price", "price", true, "string"),
      VariantKey.new("Compare at Price","compare_at_price", true, "string"),
      VariantKey.new("Weight (g)", "grams", true, "string"),
      VariantKey.new("SKU", "sku", true, "string"),
      VariantKey.new("Taxable", "taxable", true, "boolean"),
      VariantKey.new("Requires Shipping", "requires_shipping", true, "boolean"),
      VariantKey.new("Inventory Quantity", "inventory_quantity", false, "string"),
      VariantKey.new("Inventory Policy", "inventory_policy", true, "string")
      
    ]
  end
end