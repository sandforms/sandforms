Meteor.startup(function() {
  if (Migrations.areLocked()) {
    console.log('Migrations locked!  Application should terminate')
  } else {
    console.log('Migrations are not locked - proceeding');
  }
  Migrations.migrateTo('latest');
});


