var Router = Backbone.Router.extend ({

	routes: {
		""							: "search",
		//"genre/:genre"  : "loadGenre",
		"search" 				: "search",
		"playlist"	 		: "playList",
		"main-nav"			: "search"
	},

	initialize: function() {

		//views

		this.headerView     	= new HeaderView();
		this.navView 					= new NavView();
		this.tracks 					= new TrackCollection();
		this.tracksView 			= new TrackCollectionView({
			collection: this.tracks
		});
		this.searchView 			= new SearchView();


		//initial structure

		$(".header").html( this.headerView.render().el );
		$(".nav").html( this.navView.render().el );
		$(".main-container").html(this.tracksView.el);
		$(".play-show" ).css( "display", "block" );
		$(".pause-show" ).css( "display", "none" );
		$(".search").append(this.searchView.render().el);

		//listeners

		this.listenTo(this.tracks, "reset", function() {
			this.tracksView.render();
		});

		this.listenTo(this.searchView, "search:data", function(options) {
			this.search(options.data);
		});

		this.listenTo(this.navView, "link:click", function(options){
				switch(options.name) {
        case "search":
          this.search(router.searchView.searchkeyword);
        break;
        case "playlist":
          this.playList();
        break;
        default:
          this.loadGenre();
        break;
      }
      this.navigate(options.href);
    });

	},

	playList: function() {
		alert("playlist page");
	},

	loadGenre: function(genre) {
		if (genre === null) {
			this.tracks.loadGenre("electronic");
		} else {
		this.tracks.loadGenre(genre);
		}
	},
	search: function(query) {
		var searchQuery = router.searchView.searchkeyword;
		var searchQueryBool = !!searchQuery;
		var thisQueryBool = !!query;
		if(searchQueryBool) {
			this.tracks.search(searchQuery);
		} else if (thisQueryBool) {
			this.tracks.search(query);
		} else {
			this.tracks.search("electronic");
		}
	}
});