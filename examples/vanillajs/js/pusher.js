let subId;

export function pusher(regstate) {
  return regstate.pushManager.getSubscription()
    .then(subscription => {
      if (!subscription) {
        return subscribe(regstate);
      }
      return subscription;
    }).then(subscription => {
      subId = subscription.endpoint.split('/').slice(-1)[0];
    });
}

export function push() {
  if(subId) {
    return fetch(`/notify?subId=${subId}`);
  }
  return Promise.reject();
}


function subscribe(regsgate) {
  return regsgate.pushManager.subscribe({userVisibleOnly: true});
}
