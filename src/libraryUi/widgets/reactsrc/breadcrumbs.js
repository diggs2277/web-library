Zotero.ui.widgets.reactbreadcrumbs = {};

Zotero.ui.widgets.reactbreadcrumbs.init = function(el){
	var library = Zotero.ui.getAssociatedLibrary(el);
	var reactInstance = ReactDOM.render(
		<BreadCrumbs library={library} />,
		document.getElementById('breadcrumbs')
	);
};

var BreadCrumb = React.createClass({
	getInitialProps: function() {
		return {
			label: "",
			path: ""
		};
	},
	render: function(){
		if(this.props.path != "") {
			return (
				<a href={this.props.path}>{this.props.label}</a>
			);
		} else {
			return (
				this.props.label
			);
		}
	}
});

var BreadCrumbs = React.createClass({
	componentWillMount: function() {
		var reactInstance = this;
		var library = this.props.library;

		library.listen("displayedItemsChanged displayedItemChanged selectedCollectionChanged", function(){
			reactInstance.forceUpdate()
		});
	},
	getInitialProps: function(){
		return {library:null};
	},
	render:function(){
		var library = this.props.library;
		if(library === null){
			return null;
		}
		
		var crumbs = [];
		var config = Zotero.state.getUrlVars();
		if(Zotero.config.breadcrumbsBase){
			Zotero.config.breadcrumbsBase.forEach(function(crumb){
				crumbs.push(crumb);
			});
		} else if(library.libraryType == 'user'){
			crumbs = [{label:'Home', path:'/'},
					   {label:'People', path:'/people'},
					   {label:(library.libraryLabel || library.libraryUrlIdentifier), path:'/' + library.libraryUrlIdentifier},
					   {label:'Library', path:'/' + library.libraryUrlIdentifier + '/items'}];
		} else{
			crumbs = [{label:'Home', path:'/'},
					   {label:'Groups', path:'/groups'},
					   {label:(library.libraryLabel || library.libraryUrlIdentifier), path:'/groups/' + library.libraryUrlIdentifier},
					   {label:'Library', path:'/groups/' + library.libraryUrlIdentifier + '/items'}];
		}

		if(config.collectionKey){
			Z.debug("have collectionKey", 4);
			curCollection = library.collections.getCollection(config.collectionKey);
			if( curCollection ){
				crumbs.push({label:curCollection.get('name'), path:Zotero.state.buildUrl({collectionKey:config.collectionKey})});
			}
		}
		if(config.itemKey){
			Z.debug("have itemKey", 4);
			crumbs.push({label:library.items.getItem(config.itemKey).title, path:Zotero.state.buildUrl({collectionKey:config.collectionKey, itemKey:config.itemKey})});
		}
		
		var crumbNodes = [];
		var titleString = "";
		crumbs.forEach(function(crumb, index){
			crumbNodes.push(
				<BreadCrumb label={crumb.label} path={crumb.path} />
			);
			if(crumb.label == "Home") {
				titleString += "Zotero | ";
			} else {
				titleString += crumb.label;
			}
			if(index < crumbs.length){
				crumbNodes.push(" > ");
				titleString += " > ";
			}
		});
		
		//set window title
		if(titleString != ""){
			Zotero.state.updateStateTitle(titleString);
		}

		return (
			<span>
				{crumbNodes}
			</span>
		);
	}
});