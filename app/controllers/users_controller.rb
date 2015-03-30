class UsersController < ApplicationController

  def index
    @users = User.all
    render :json => @users
  end

  def create
    @user = User.new user_params
    # this will create a new user with this parameters but it won't save them in the database
    # first i want to see if their passwords match
    # binding.pry
    if @user.save  
        session[:user_id] = @user.id
        # redirect_to :controller => 'users', :action => 'show_user', :username => @user.username
        render json: @user
    else
        render json: {}, status: 404
    end
  end

  def new
    @user = User.new
  end

  private
  def user_params
      params.permit(:username, :email, :password, :password_confirmation)
  end

end


