class AddLocationToSpaceFiles < ActiveRecord::Migration
  def self.up
    add_column :space_files, :Lat, :Decimal
    add_column :space_files, :Long, :Decimal
  end

  def self.down
    remove_column :space_files, :Long
    remove_column :space_files, :Lat
  end
end
