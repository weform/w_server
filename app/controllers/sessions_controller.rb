class SessionsController < ApplicationController
  before_action :auth_user, except: [:destroy]
  after_action :set_csrf_headers, only: [:create, :destroy]

  def new
  end

  def create
    if user = login(params[:sessions][:email], params[:sessions][:password])
      render json: { msg: '登陆成功', status: 'ok', user: gain_current_user }, status: 200
    else
      render json: { msg: '登陆失败', status: 'error', user: gain_current_user }, status: 401
    end
  end

  def destroy
    logout
    render json: { msg: '退出成功', status: 'ok', user: gain_current_user }, status: 200
  end

  private

  def set_csrf_headers
    if request.xhr?
      response.headers['X-CSRF-Param'] = request_forgery_protection_token.to_s
      response.headers['X-CSRF-Token'] = form_authenticity_token
    end
  end

  def auth_user
    if logged_in?
      redirect_to root_path
    end
  end

end
