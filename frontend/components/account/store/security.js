import { observable, runInAction, action } from 'mobx'

class Store {
  @observable data = {
    cookies: [],
    email: {},
    mobile: '',
    password: false
  }

  @action fetch = () => {
    $.ajax({
      url: '/settings/security',
      dataType: 'json'
    })
      .done(result => {
        runInAction(() => {
          this.data = result.user
        })
      })
  }
}

const security = new Store()

export default security
