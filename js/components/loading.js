export default () => {
  // dialog component
  return {
    templateUrl: 'templates/loading.html',
    controllerAs: '$ctrl',
    bindings: {
      'text': '@'
    },
    controller: [function () {
    }]
  };
};
