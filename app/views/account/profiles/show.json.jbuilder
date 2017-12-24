json.user do
  json.username @user.username
  json.avatar @user.avatar
end

# json.(@user, :email, :username, :avatar)
