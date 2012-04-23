class FeedbackMailer < ActionMailer::Base
  default from: "from@example.com"
  
  def feedback_email(subject, from_email, message)
    @from_email = from_email
    @message = message
    mail(:to => "casey.li@gmail.com",
         :from => from_email,
         :subject => subject)
  end
end
