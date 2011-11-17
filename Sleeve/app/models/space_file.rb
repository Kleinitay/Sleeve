# == Schema Information
#
# Table name: space_files
#
#  id         :integer(4)      not null, primary key
#  name       :string(255)
#  created_at :datetime
#  updated_at :datetime
#

class SpaceFile < ActiveRecord::Base
    has_attached_file :source, :url => :path_for_origin


    def path_for_origin
        File.join("files", "#{:id}_#{name}")
    end

end
