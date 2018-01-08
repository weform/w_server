# == Route Map
#
# yarn check v1.3.2
# success Folder in sync.
# Done in 0.12s.
#           Prefix Verb   URI Pattern                 Controller#Action
#             root GET    /                           home#index
#            users POST   /users(.:format)            users#create
#         sessions POST   /sessions(.:format)         sessions#create
#          session DELETE /sessions/:id(.:format)     sessions#destroy
#            login GET    /login(.:format)            sessions#new
#                  POST   /login(.:format)            sessions#create
#           logout DELETE /logout(.:format)           sessions#destroy
#           signup GET    /signup(.:format)           users#new
#                  POST   /signup(.:format)           users#create
#     account_root GET    /account(.:format)          account/base#index
#          account GET    /account/*path(.:format)    account/base#index
# account_profiles GET    /account/profiles(.:format) account/profiles#show
#                  PATCH  /account/profiles(.:format) account/profiles#update
#                  PUT    /account/profiles(.:format) account/profiles#update
# 

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
