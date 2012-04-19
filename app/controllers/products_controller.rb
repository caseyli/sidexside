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
  
  def update
    product = ShopifyAPI::Product.find(params[:id])
    
    product.update_attributes({ params[:key_name].to_sym => params[:value] })
    result = product.save
    message = "Updated #{product.title}'s #{params[:key_name]} with #{params[:value]}!"
    message = product.errors.full_messages[0] if !result
    
    response = {:result => result, :message => "Updated #{product.title}'s #{params[:key_name]} with #{params[:value]}!"}
    
    respond_to do |format|
      format.json { render :json => response.to_json }
    end
  end
  
end