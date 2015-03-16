var Router = Backbone.Router.extend ({

	routes: {
		""						 : "loadGenre",
		"genre/:genre" : "loadGenre",
		"myplaylist"	 : "myplaylist"
	},

	initialize: function() {

		//views

		this.headerView     	= new HeaderView();
		this.tracks 					= new TrackCollection();
		this.tracksView 			= new TrackCollectionView({
			collection: this.tracks
		});
		this.searchView 			= new SearchView();

		//initial structure

		$(".header").html( this.headerView.render().el );
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

	},

	loadGenre: function(genre) {
		if (genre === null) {
			this.tracks.loadGenre("electronic");
		} else {
		this.tracks.loadGenre(genre);
		}
	},
	search: function(query) {
		if (query === null) {
			this.tracks.search("yeah yeah yeahs");
		} else {
		this.tracks.search(query);
		}
	}
});