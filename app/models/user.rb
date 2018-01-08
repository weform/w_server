class User < ApplicationRecord
  mount_uploader :avatar, AvatarUploader
  authenticates_with_sorcery!

  attr_accessor :password, :password_confirmation

  validates :email, uniqueness: { case_sensitive: false },
    format: { with: /\A[^@]+@([^@\.]+\.)+[^@\.]+\z/ },
    allow_nil: true, presence: true
  validates :mobile, uniqueness: true,
    format: { with: /\A\d{11}\z/, message: :only_chinese_mobile },
    allow_nil: true
  validates :password, confirmation: true, presence: true, length: { minimum: 5 },
            if: :need_validate_password
  validates :password, :password_confirmation, presence: { on: :crate, message: '密码和确认密码不能为空' },
            if: :need_validate_password

  private
  def need_validate_password
    self.new_record? ||
      (!self.password.nil? or !self.password_confirmation.nil?)
  end
end

# == Schema Information
#
# Table name: users
#
#  id                              :uuid             not null, primary key
#  email                           :string           not null
#  crypted_password                :string
#  salt                            :string
#  created_at                      :datetime         not null
#  updated_at                      :datetime         not null
#  activation_state                :string
#  activation_token                :string
#  activation_token_expires_at     :datetime
#  remember_me_token               :string
#  remember_me_token_expires_at    :datetime
#  reset_password_token            :string
#  reset_password_token_expires_at :datetime
#  reset_password_email_sent_at    :datetime
#  username                        :string
#  mobile                          :string
#  avatar                          :string
#
# Indexes
#
#  index_users_on_activation_token      (activation_token)
#  index_users_on_email                 (email) UNIQUE
#  index_users_on_mobile                (mobile)
#  index_users_on_remember_me_token     (remember_me_token)
#  index_users_on_reset_password_token  (reset_password_token)
#  index_users_on_username              (username)
#
