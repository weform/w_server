import { observable, runInAction, action } from 'mobx'

class Store {
  @observable user = {
    avatar: '',
    username: ''
  }

  @action fetch = () => {
    $.ajax({
      url: '/account/profiles',
      dataType: 'json'
    })
      .done(result => {
        console.log(result)
        runInAction(() => {
          this.user = result.user
        })
      })
  }
}

const profiles = new Store()

export default profiles
