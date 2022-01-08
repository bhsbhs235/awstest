print('Start #################################################################');
db = db.getSiblingDB('admin');
// move to the admin db - always created in Mongo
db.auth("root", "example");
// log as root admin if you decided to authenticate in your docker-compose file...
db = db.getSiblingDB("marketboard");
db.marketboard
db.createUser({
  user:  'root',
  pwd: 'example',
  roles: [{
    role: 'readWrite',
    db: 'marketboard'
  }]
})
print('db.active.count() : '+db.active.count());
print('END #################################################################');
