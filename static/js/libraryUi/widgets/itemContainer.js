Zotero.ui.widgets.itemContainer = {};

Zotero.ui.widgets.itemContainer.init = function(el){
    Z.debug('itemContainer init', 3);
    var library = Zotero.ui.getAssociatedLibrary(el);
    var container = J(el);
    
    //TODO: this should basically all be event based rather than callbacks
    library.listen("citeItems", Zotero.ui.callbacks.citeItems);
    library.listen("exportItems", Zotero.ui.callbacks.exportItems);
    
    
    container.on('click', "#item-details-div .itemTypeSelectButton", function(){
        Z.debug("itemTypeSelectButton clicked", 3);
        var itemType = J("#itemType").val();
        Zotero.state.pathVars['itemType'] = itemType;
        Zotero.state.pushState();
        return false;
    });
    container.on('change', "#item-details-div .itemDetailForm #itemTypeSelect", function(){
        Z.debug("itemTypeSelect changed", 3);
        var itemType = J(this).val();
        Zotero.state.pathVars['itemType'] = itemType;
        Zotero.state.pushState();
    });
    
    Zotero.state.bindTagLinks(container);
};

//TODO: this some other way, and probably trigger something so the item widget will reset
/*
Zotero.ui.cancelItemEdit = function(e){
    Zotero.state.clearUrlVars(['itemKey', 'collectionKey', 'tag', 'q']);
    Zotero.state.pushState();
};
*/