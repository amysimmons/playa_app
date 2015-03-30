class AddBooleanToSkips < ActiveRecord::Migration
  def change
    add_column :skips, :is_skipped, :boolean
  end
end
