class SessionController < ApplicationController
  def new
  end
  def create
    user = User.find_by :username => params["data"]["username"]
    if user.present? && user.authenticate(params["data"]["password"])
        session[:user_id] = user.id
        render :json => user
    else
      # if login is invalid make you go to the error handler
      render json: {}, status: 404
    end
  end
  def destroy

    session[:user_id] = nil
    render json: {status: 'logged out'}
  end
end
