class AddSourceToSpaceFiles < ActiveRecord::Migration
  def self.up
    add_column :users, :source_file_name, :string
    add_column :users, :source_content_type, :string
    add_column :users, :source_file_size, :integer
    add_column :users, :source_updated_at, :datetime
  end

  def self.down
    remove_column :users, :source_updated_at
    remove_column :users, :source_file_name
    remove_column :users, :source_content_type
    remove_column :users, :source_file_size
  end
end
