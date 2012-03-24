class VariantsController < ApplicationController
  
  respond_to :json
  
  around_filter :shopify_session, :except => 'welcome'
  
  def index
    @variants = ShopifyAPI::Product.find(params[:product]).variants
    respond_with @variants
  end
  
  def show
    @variant = ShopifyAPI::Variant.find(params[:id])
    respond_with @variant
  end
end