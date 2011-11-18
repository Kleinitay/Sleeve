class CreateSpaceFiles < ActiveRecord::Migration
  def self.up
    create_table :space_files do |t|
      t.string :name

      t.timestamps
    end
  end

  def self.down
    drop_table :space_files
  end
end
