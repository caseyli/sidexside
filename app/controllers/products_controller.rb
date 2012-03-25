class ProductsController < ApplicationController
  
  respond_to :json
  
  around_filter :shopify_session
  
  def index
    @products = ShopifyAPI::Product.find(:all, :params => {:limit => 100})
    respond_with @products
  end
  
  def show
    @product = ShopifyAPI::Product.find(params[:id])
    respond_with @product
  end
  
end