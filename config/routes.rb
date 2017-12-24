Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  root 'home#index'

  resources :users, only: %i[create]
  resources :sessions, only: %i[create destroy]

  get '/login' => 'sessions#new'
  post '/login' => 'sessions#create'
  delete '/logout' => 'sessions#destroy', as: :logout
  get '/signup' => 'users#new'
  post '/signup' => 'users#create'

  namespace :account do
    root 'base#index'
    get '*path', to: 'base#index', constraints: ->(r) { r.format.html? }
    resource :profiles, only: %i[show update]
  end
end
