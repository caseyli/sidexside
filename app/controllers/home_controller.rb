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
    @product_keys = ProductKey.all
  end
  
  def compare_variants
    @header_message = '<strong>Compare Variants</strong>'
    @variant_keys = VariantKey.all
  end
  
  def help
    @header_message = '<strong>Help and Support</strong>'
  end
  
  def feedback
    @header_message = '<strong>Feedback</strong>'
    
     if !params[:email_address].blank? && !params[:message].blank?
      FeedbackMailer.feedback_email("Sidexside Feedback from " + params[:email_address],
                                  params[:email_address],
                                  params[:message]).deliver
      @success = true
    else
      @sucess = false      
    end  
    
  end
  
  def about
    @header_message = '<strong>About</strong>'
  end
  
end