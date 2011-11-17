# == Schema Information
#
# Table name: users
#
#  id                  :integer(4)      not null, primary key
#  name                :string(255)
#  email               :string(255)
#  created_at          :datetime
#  updated_at          :datetime
#  source_file_name    :string(255)
#  source_content_type :string(255)
#  source_file_size    :integer(4)
#  source_updated_at   :datetime
#

class User < ActiveRecord::Base
    attr_accessible :name, :email

    email_regex = /\A[\w+\-.]+@[a-z\d\-.]+\.[a-z]+\z/i
  validates :email, :presence => true,
                    :format   => { :with => email_regex }
end
