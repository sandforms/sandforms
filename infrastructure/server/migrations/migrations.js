// Helpers
Migrations.areLocked = function() {
    var options = Migrations.options;

    var collection = Migrations._collection;

    var locked = collection.find({
        _id: "control"
    }).locked == true;

    return locked;
}