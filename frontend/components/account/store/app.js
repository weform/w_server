import { observable, runInAction, action } from 'mobx'

class Store {
  @observable isLoading = false;
  @observable isSudo = false;
  @observable dialogStatus = '';
  @observable needIdentify = false;
  @observable identifyWay = {};
  @observable confimOptions = {
    content: '',
    title: '',
    ensureFunc: () => {},
    cancelFunc: () => {}
  }

  @action closeDialog = () => {
    this.dialogStatus = ''
  }

  closeConfim = this.closeDialog;
  @action openConfim = options => {
    runInAction(() => {
      this.dialogStatus = 'confim'
      this.confimOptions = { ...this.confimOptions, ...options }
    })
  }
}

const app = new Store()
export default app
