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
  end
  
  def compare_variants
    @header_message = '<strong>Compare Variants</strong>'
  end
  
end