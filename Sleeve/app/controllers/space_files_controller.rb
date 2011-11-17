class SpaceFilesController < ApplicationController
    def new
        @space_file = SpaceFile.new
    end

    def index
        @space_files = SpaceFile.all

        respond_to do |format|
            format.html # index.html.erb
            format.json { render json: @space_files }
        end
    end

    def create
        @space_file = SpaceFile.new(params[:space_file])
        if @space_file.save
            render 'index'
        else
            render 'new'
        end
    end

    def download
        @space_file = SpaceFile.find(params[:id])
        filepath = File.join(Rails.root, "public",  @space_file.path_for_origin)
        send_file filepath
    end


end
