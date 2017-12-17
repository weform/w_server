class AccountController < ApplicationController
  before_action :require_login, :load_user
  layout 'account'

  def index
  end

  private

  def load_user
    @user = current_user
  end
end
