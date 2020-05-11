////////////////////////////////////////
// reload page after Forward and back
///////////////////////////////////////

const TYPE_BACK_FORWARD = 2;

function isReloadedPage() {
  return performance.navigation.type === TYPE_BACK_FORWARD;
}

function main() {
  if (isReloadedPage()) {
    window.location.reload();
  }
}
main();

////////////////////////////////////////////////////////////
///// TEAM  API REQUEST ` `
////////////////////////////////////////////////////////////



new Vue({

  el: '#teamlist',

  data () {
    return {
      teamData: [],
      more_body: false,
      apiURL: 'https://dev.thegovlab.com/wp-json/wp/v2/posts?categories=65&per_page=100&orderby=id&order=asc&_embed'
    }
  },

  created: function created() {
    this.fetchTeam();
  },

  methods: {

    fetchTeam() {

      var self = this; // Reference to the function self
      axios.get(self.apiURL).then(responseTeam => {

        self.teamData = responseTeam.data;

      });
    },
    showDesc(teammember) {
    	console.log('one');
      teammember.sticky = true;
    },
    showExc(teammember) {
    	console.log('two');
      teammember.sticky = false;
    }
  }
});
