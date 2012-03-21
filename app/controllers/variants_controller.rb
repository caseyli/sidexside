class VariantsController < ApplicationController
  
  respond_to :json
  
  def index
    product = params[:product]
    @variants = ShopifyAPI::Product.find(params[:product]).variants
    respond_with @variants
  end
  
end