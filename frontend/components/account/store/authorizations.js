import { observable, runInAction, action } from 'mobx'

class Store {
  @observable data = {
    wechat: false,
    weibo: false,
    github: false
  }

  @action fetch = () => {
    $.ajax({
      url: '/settings/authorizations',
      dataType: 'json'
    })
      .done(result => {
        runInAction(() => {
          this.data = result.user.authorizations
        })
      })
  }
}

const authorizations = new Store()

export default authorizations
