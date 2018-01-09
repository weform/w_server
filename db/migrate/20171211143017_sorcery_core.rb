class SorceryCore < ActiveRecord::Migration[5.1]
  def change
    create_table :users, id: :uuid, default: 'uuid_generate_v4()' do |t|
      t.string :email,            :null => false
      t.string :crypted_password
      t.string :salt

      t.timestamps                :null => false
    end

    add_index :users, :email, unique: true
  end
end
