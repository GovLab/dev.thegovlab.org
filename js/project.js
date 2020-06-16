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

  el: '#projectpage',

  data () {
    return {
      projectData: [],
      listview: false,
      progessAr: ['m-define','m-prototype','m-test','m-complete'],
      progess:'',
      meta_title: 'The GovLab | Project',
      meta_content: '',
      projectslug:'project-network-of-innovators',
      apiURL: 'https://directus.thegovlab.com/thegovlab/items/projects'
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
    // this.projectslug=window.location.pathname.split('/');
    // this.projectslug = this.projectslug[this.projectslug.length - 1].split('.')[0];

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
  'projects',
  {
    filter: {
      slug: self.projectslug
    },
    fields: ['*.*','project_team.team_id.*','gallery.directus_files_id.*','project_team.team_id.picture.*']
  }
  ).then(data => {

  return data;

}).then(data2 => {
    self.progess = self.progessAr[data2.data[0].progress];
    console.log(data2.data[0]);
    self.meta_title = 'The GovLab | '+data2.data[0].name;
    self.meta_content = data2.data[0].description;
    self.projectData = data2.data[0];


})
.catch(error => console.error(error));
    },
    showList() {
      this.listview = true;
      console.log('her');
    },
    showThumb() {
      this.listview = false;
    },
    projectsMore(slug) {
      window.location.href= 'www.thegovlab.org'+slug+'.html';
    }
  }
});
