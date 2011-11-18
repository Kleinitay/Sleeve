# == Schema Information
#
# Table name: space_files
#
#  id         :integer(4)      not null, primary key
#  name       :string(255)
#  created_at :datetime
#  updated_at :datetime
#  Lat        :integer(10)
#  Long       :integer(10)
#

require 'test_helper'

class SpaceFileTest < ActiveSupport::TestCase
  # Replace this with your real tests.
  test "the truth" do
    assert true
  end
end
