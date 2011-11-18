# == Schema Information
#
# Table name: space_files
#
#  id                  :integer(4)      not null, primary key
#  name                :string(255)
#  created_at          :datetime
#  updated_at          :datetime
#  Lat                 :integer(10)
#  Long                :integer(10)
#  source_file_name    :string(255)
#  source_content_type :string(255)
#  source_file_size    :integer(4)
#  source_updated_at   :datetime
#

class SpaceFile < ActiveRecord::Base
    has_attached_file :source, :url => :path_for_origin


    def path_for_origin
        filepath = File.join("/files", "#{id}_#{name}_#{source_file_name}")
        filepath
    end

end
