class ChangeLocationCoords < ActiveRecord::Migration
  def self.up
    change_column :space_files, :Lat, :decimal, {:precision => 8, :scale => 6}
  end

  def self.down
    change_column :space_files, :Lat, :decimal
  end
end
