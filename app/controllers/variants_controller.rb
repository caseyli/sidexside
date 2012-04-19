class VariantsController < ApplicationController
  
  respond_to :json
  
  around_filter :shopify_session
  
  def index
    @variants = ShopifyAPI::Product.find(params[:product]).variants
    respond_with @variants
  end
  
  def show
    @variant = ShopifyAPI::Variant.find(params[:id])
    respond_with @variant
  end
  
  def update
    variant = ShopifyAPI::Variant.find(params[:id])
    
    variant.update_attributes({ params[:key_name].to_sym => params[:value] })
    
    result = variant.save
    message = "Updated #{variant.title}'s #{params[:key_name]} with #{params[:value]}!"
    message = variant.errors.full_messages[0] if !result
    
    response = {:result => result, :message => message }
    
    respond_to do |format|
      format.json { render :json => response.to_json }
    end
  end
end