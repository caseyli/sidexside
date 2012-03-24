class HomeController < ApplicationController
  
  around_filter :shopify_session, :except => 'welcome'
  
  def welcome
    current_host = "#{request.host}#{':' + request.port.to_s if request.port != 80}"
    @callback_url = "http://#{current_host}/login/finalize"
  end
  
  def index
    @show_logo = true
    @header_sub_message = 'A simple app to let you <strong>compare</strong> information
            about your products.'
    
    
  end
  
  def compare_products
    @header_message = '<strong>Compare Products</strong>'
    
    # get 100 products
    @products = ShopifyAPI::Product.find(:all, :params => {:limit => 100})
    unless @products.empty?
      @product1 = @products[0]
      @product2 = @products[0]      
    end

    if request.post?
      @product1 = ShopifyAPI::Product.find(params[:product_1_id]) unless params[:product_1_id].nil?
      @product2 = ShopifyAPI::Product.find(params[:product_2_id]) unless params[:product_2_id].nil?
    end
  end
  
  def compare_variants
    @header_message = '<strong>Compare Variants</strong>'
    
    @products = ShopifyAPI::Product.find(:all, :params => {:limit => 100})
    unless @products.empty?
      @product = @products[0]
      @variants = ShopifyAPI::Product.find(@product.id).variants
    end
    
    if request.post?
      @product = ShopifyAPI::Product.find(params[:product_id]) unless params[:product_id].nil?
    end
  end
  
end