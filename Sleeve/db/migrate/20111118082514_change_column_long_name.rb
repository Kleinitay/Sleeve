class ChangeColumnLongName < ActiveRecord::Migration
  def self.up
       rename_column :space_files, :Long, :Lon
  end

  def self.down
  end
end
