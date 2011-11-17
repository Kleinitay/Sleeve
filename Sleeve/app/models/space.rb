# == Schema Information
#
# Table name: spaces
#
#  id         :integer(4)      not null, primary key
#  name       :string(255)
#  location   :string(255)
#  created_at :datetime
#  updated_at :datetime
#

class Space < ActiveRecord::Base
end
