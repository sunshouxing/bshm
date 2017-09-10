'use strict';

export default class BridgeController {
  // data
  currentThread = null;

  constructor($state, msApi, Folders, Labels) {
    'ngInject';

    this.$state = $state;
    this.msApi = msApi;

    this.folders = Folders.data;
    this.labels = Labels.data;
  }

  $onInit() {
    let apiName = 'mail.folder.inbox@get';

    this.msApi.request(apiName).then(
      // success callback
      response => {
        this.threads = response.data;
        this.loadingThreads = false;
      }
    );
  }

  /**
   * Open thread
   *
   * @param thread
   */
  openThread(thread) {
    // set the read status on the thread
    thread.read = true;

    // assign thread as the current thread
    this.currentThread = thread;

    // update the state without reloading the controller
    this.$state.go('app.mail.threads.thread', {threadId: thread.id}, {notify: false});
  }
}
