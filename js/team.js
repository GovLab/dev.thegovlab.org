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


Vue.use(VueMeta);
new Vue({

  el: '#teamlist',

  data () {
    return {
      teamData: [],
      more_body: false,
      meta_title: 'The GovLab | Team',
      meta_content: 'Deepening our understanding of how to govern more effectively and legitimately through technology.',
      apiURL: 'https://directus.thegovlab.com/thegovlab/items/team?sort=order&fields=*,picture.*'
    }
  },
  metaInfo () {
        return {
          title: this.meta_title,
          meta: [
            {title: this.meta_title, property:'og:title'},
      {  name: 'description', content: this.meta_content, property:'og:description'}
    ]
    }
  },
  created: function created() {
    this.fetchTeam();
  },
  methods: {

    fetchTeam() {
      self = this;
      const client = new DirectusSDK({
        url: "https://directus.thegovlab.com/",
        project: "thegovlab",
        storage: window.localStorage
      });

      client.getItems(
  'team',
  {
    sort: 'name',
    fields: ['*.*','picture.*','projects.projects_id.*']
  }
).then(data => {

  var stefaan =  data.data.filter(function(obj) {
  return obj.slug === 'stefaan-verhulst';
})
var beth =  data.data.filter(function(obj) {
return obj.slug === 'beth-simone-noveck';
})

    data.data = data.data.filter(function(obj) {
    return obj.slug !== 'stefaan-verhulst' && obj.slug !== 'beth-simone-noveck';
  })


  data.data.unshift(stefaan[0]);
  data.data.unshift(beth[0]);
  return data;

}).then(data2 => {


    self.teamData = data2.data;
})
.catch(error => console.error(error));
    },
    showDesc(teammember) {
      teammember['extended'] = true;
    },
    showExc(teammember) {
      teammember['extended'] = false;
    },
    showProj(teammember) {
      teammember['extended_project'] = true;
    },
    hideProj(teammember) {
      teammember['extended_project'] = false;
    },
    teamMore(slug) {
      window.location.href= slug+'.html';
    }
  }
});
