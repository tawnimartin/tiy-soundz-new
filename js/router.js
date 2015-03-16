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
		this.fire 						= new FireCollection();
		this.fireView 				= new FireCollectionView({
			collection: this.fire
		});


		//initial structure

		$(".header").html( this.headerView.render().el );
		$(".nav").html( this.navView.render().el );
		$(".main-container").html(this.tracksView.el);
		$(".play-show" ).css( "display", "block" );
		$(".pause-show" ).css( "display", "none" );
		$(".search").append(this.searchView.render().el);
		$(".main-container").html(this.tracksView.el);

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
          this.searchPage();
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
		$(".main-container").empty();
		$(".search").empty();
		$(".main-container").html(this.fireView.render().el);
	},

	loadGenre: function(genre) {
		if (genre === null) {
			this.tracks.loadGenre("electronic");
		} else {
		this.tracks.loadGenre(genre);
		}
	},

	searchPage: function(query) {
		console.log("searchpage here");
		$(".search").empty();
		$(".search").append(this.searchView.render().el);
		this.search(router.searchView.searchkeyword);
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
			this.tracks.search("electro");
		}
	}
});