module ApplicationHelper
  
  def cant_compare?
    @products.empty? or @products.size == 1
  end
  
end
