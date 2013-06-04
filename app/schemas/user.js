var mongoose = require('mongoose'),    
    bcrypt = require('bcrypt'),
    Schema = mongoose.Schema;

// Define schema
var UserSchema = new Schema({
    name : {
        first:  { type: String, required: true },
        middle: { type: String, required: false },
        last:   { type: String, required: false }
    },
    email:  { type: String, required: true, unique: true },    
    social: {
        linkedin: {type: String, required: false},
        twitter:  {type: String, required: false},
        facebook: {type: String, required: false},
        google:   {type: String, required: false}
    },
    contact:{
        mobile: {type: Number, required: false},
        home:   {type: Number, required: false},
        work:   {type: Number, required: false}
    },
    address : {
      address1: {type:String, required:false},
      address2: {type:String, required:false},
      city:     {type:String, required:false},
      state:    {type:String, required:false},
      country:  {type:String, required:false},
      zip:      {type:String, required:false}
    },
    salt:       { type: String, required: true },
    hash:       { type: String, required: true }
});

UserSchema.set('toJSON',  { getters: true, virtuals: false });

UserSchema.virtual('password')
.get(function () {
  return this._password;
})
.set(function (password) {
  this._password = password;
  var salt = this.salt = bcrypt.genSaltSync(10);
  this.hash = bcrypt.hashSync(password, salt);
});

UserSchema.virtual('name.full')
.get(function () {
  return ( this.name.first + ' ' + this.name.last );
})
.set(function (full) {
  var split = name.split(' ');
  this.name.first = split[0];
  this.name.last = split[1];
});

UserSchema.method('verifyPassword', function(password, callback) {
  bcrypt.compare(password, this.hash, callback);
});

UserSchema.static('authenticate', function(email, password, callback) {
  this.findOne({ email: email }, function(err, user) {
      if (err) { return callback(err); }
      if (!user) { return callback(null, false); }
      user.verifyPassword(password, function(err, passwordCorrect) {
        if (err) { return callback(err); }
        if (!passwordCorrect) { return callback(null, false); }
        return callback(null, user);
      });
    });
});

// Save new user
UserSchema.static('add', function(userInfo, callback) {
        
        // Build user object
        var attrs = {
            name : { 
                first: userInfo.fname,
                middle: userInfo.mname,
                last: userInfo.lname 
            }, 
            email: userInfo.email,
            password: userInfo.password,
            address : { 
                address1: userInfo.address1, 
                address2: userInfo.address2, 
                city: userInfo.city, 
                state: userInfo.state, 
                zip: userInfo.zip, 
                country : userInfo.country
            },
            contact : {
                mobile: userInfo.contactno,
                home: userInfo.home,
                work: userInfo.work
            }            
        };
    
        var User = mongoose.model('User', UserSchema);
        var newUser = new User(attrs);
    
        // Save into database
        newUser.save(function(err) {
            if (err) {throw err;}
            
            // Execute callback passed from route
            callback(null, userInfo, newUser);
        });
    });

UserSchema.static("info", function(email, callback){
    this.findOne({ email: email }, function(err, user) {
      if (err) { return callback(err); }
      if (!user) { return callback(null, false); }
      return callback(null, user);         
    });
    
});

UserSchema.static("edit", function (email, update, callback) {
    //Allow only edit of firstname / lastname
    return this.findOneAndUpdate({email: email}, 
    {
        name: {
            first: update.fname,
            last: update.lname
        }
    }, 
    function (err, user) {
            if (err) {
                return callback(err);
            }
            if (!user) {
                return callback(null, false);
            }
            return callback(null, user);
        });

});

module.exports = mongoose.model('User', UserSchema);
