class UsersController < ApplicationController
   def show
        @user = User.find(params[:id])
    end
    def new
        @user = User.new
    end

    def create
        @user = User.new(params[:user])
    if @user.save
      # Handle a successful save.
    else
      @title = "Sign up"
      render 'new'
    end
    end

end
