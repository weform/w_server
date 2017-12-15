class User < ApplicationRecord
  authenticates_with_sorcery!

  attr_accessor :password, :password_confirmation

  validates :email, uniqueness: { case_sensitive: false },
    format: { with: /\A[^@]+@([^@\.]+\.)+[^@\.]+\z/ },
    allow_nil: true, presence: true
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
