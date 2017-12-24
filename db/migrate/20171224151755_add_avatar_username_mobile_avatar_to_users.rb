class AddAvatarUsernameMobileAvatarToUsers < ActiveRecord::Migration[5.1]
  def change
    add_column :users, :username, :string
    add_column :users, :mobile, :string
    add_column :users, :avatar, :string

    add_index :users, :username
    add_index :users, :mobile
  end
end
