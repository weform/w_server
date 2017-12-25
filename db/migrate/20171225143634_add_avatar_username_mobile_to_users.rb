class AddAvatarUsernameMobileToUsers < ActiveRecord::Migration[5.1]
  def change
    add_column :users, :username, :string
    add_index :users, :username
    add_column :users, :mobile, :string
    add_index :users, :mobile
  end
end
