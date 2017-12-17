Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  root 'home#index'

  resources :users, :sessions

  get '/login' => 'sessions#new'
  post '/login' => 'sessions#create'
  delete '/logout' => 'sessions#destroy', as: :logout
  get '/signup' => 'users#new'
  post '/signup' => 'users#create'

  get 'account' => 'account#index'
  get 'account/*path' => 'account#index', constraints: ->(r) { r.format.html? }
end
