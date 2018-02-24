var app = new Vue({
  el: '#app',
  methods: {
    getTour: function() {
      const _this = this;
      fetch('/agent/tour').then((data) => {
        return data.json();
      }).then((data) => {
        console.log(data);
        _this.tour = data.trip;
      })
    }
  },
  data: {
    customer_name: 'Michael Jackson',
    tour: {
      steps: [{
        columns: []
      }]
    }
  }
})