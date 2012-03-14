class HomeController < ApplicationController
  
  around_filter :shopify_session, :except => 'welcome'
  
  def welcome
    current_host = "#{request.host}#{':' + request.port.to_s if request.port != 80}"
    @callback_url = "http://#{current_host}/login/finalize"
  end
  
  def index
    # get 5 products
    @products = ShopifyAPI::Product.find(:all, :params => {:limit => 10})
    @product1 = @products[0]
    @product2 = @products[1]
    
    if request.post?
      @product1 = ShopifyAPI::Product.find(params[:product_1_id]) unless params[:product_1_id].nil?
      @product2 = ShopifyAPI::Product.find(params[:product_2_id]) unless params[:product_2_id].nil?
    end
    
    @products_to_compare = []
    @products_to_compare << @product1
    @products_to_compare << @product2

    # get latest 5 orders
    @orders   = ShopifyAPI::Order.find(:all, :params => {:limit => 5, :order => "created_at DESC" })
  end
  
end