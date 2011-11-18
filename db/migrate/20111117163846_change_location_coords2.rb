class ChangeLocationCoords2 < ActiveRecord::Migration
  def self.up
    change_column :space_files, :Lat, :float
    change_column :space_files, :Long, :float
  end

  def self.down
    change_column :space_files, :Lat, :decimal, {:precision => 8, :scale => 6}
    change_column :space_files, :Long, :decimal
  end
end
