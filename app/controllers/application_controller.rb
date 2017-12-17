class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception
  before_action :gain_gon

  private

  def gain_current_user
    user = current_user && { :email => current_user[:email] }
  end

  def gain_gon
    gon.__INITIAL_STATE__ = {
      currentUser: gain_current_user
    }
  end
end
