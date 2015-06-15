let subId;

export function pusher(regstate) {
  return regstate.pushManager.getSubscription()
    .then(subscription => {
      if (!subscription) {
        return subscribe(regstate);
      }
      return subscription;
    }).then(subscription => {
      if(subscription.subscriptionId) {
        subId = subscription.subscriptionId;
      } else {
        subId = subscription.endpoint.split('/').slice(-1)[0];
      }
      fetch(`/register?subId=${subId}`);
    });
}

export function push() {
  if(subId) {
    return fetch('/notify');
  }
  return Promise.reject();
}


function subscribe(regsgate) {
  return regsgate.pushManager.subscribe({userVisibleOnly: true});
}
