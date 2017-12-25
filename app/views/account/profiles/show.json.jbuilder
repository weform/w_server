json.user do
  json.username @user.username
  json.avatar @user.avatar_url
end

# json.(@user, :email, :username, :avatar)
