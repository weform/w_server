class Account::ProfilesController < Account::BaseController
  layout false

  def show
    respond_to do |format|
      format.json do
        render :show
      end
    end
  end

  def update
    respond_to do |format|
      format.json do
        if @user.update(user_params)
          render :show
        else
          render json: { errors: @user.errors.full_messages }, status: 422
        end
      end
    end
  end

  private

  def user_params
    params.require(:user).permit(:username, :avatar)
  end
end
