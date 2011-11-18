class SpaceFilesController < ApplicationController
    skip_before_filter :verify_authenticity_token

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
            redirect_to '/'
        else
            render 'new'
        end
    end

    def download
        @space_file = SpaceFile.find(params[:id])
        filepath = File.join(Rails.root, "public",  @space_file.path_for_origin)
        send_file filepath
    end

    def filtered
        min_long = params[:minLo].insert(2, ".")
        max_long = params[:maxLo].insert(2, ".")
        min_lat = params[:minLat].insert(2, ".")
        max_lat = params[:maxLat].insert(2, ".")
        @space_files = SpaceFile.find(:all, :conditions => ["Lat < ? and Lat > ? and Lon < ? and Lon > ?", max_lat.to_f, min_lat.to_f, max_long.to_f, min_long.to_f])
    end


end
