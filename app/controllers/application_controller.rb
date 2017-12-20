class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception
  before_action :gain_gon, :set_headers

  private

  def require_login
    raise StandardError unless current_user
  end

  def gain_current_user
    current_user && current_user.slice(:email, :id)
  end

  def set_headers
    response.headers['Pragma'] = 'no-cache'
    response.headers['Cache-Control'] = 'no-cache, no-store'
    response.headers['Expires'] = '0'
  end

  def gain_gon
    gon.__INITIAL_STATE__ = {
      currentUser: gain_current_user
    }
  end
end
