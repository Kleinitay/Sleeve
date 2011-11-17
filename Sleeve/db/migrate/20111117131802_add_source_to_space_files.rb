class AddSourceToSpaceFiles < ActiveRecord::Migration
  def self.up
    add_column :space_files, :source_file_name, :string
    add_column :space_files, :source_content_type, :string
    add_column :space_files, :source_file_size, :integer
    add_column :space_files, :source_updated_at, :datetime
  end

  def self.down
    remove_column :space_files, :source_updated_at
    remove_column :space_files, :source_file_name
    remove_column :space_files, :source_content_type
    remove_column :space_files, :source_file_size
  end
end
