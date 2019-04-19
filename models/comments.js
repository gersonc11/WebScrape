var mongoose = require("mongoose");

// Save a reference to the Schema constructor
var Schema = mongoose.Schema;

var CommentSchema = new Schema({

    author: {
    type: String,
    required: true
    },

    body: {
    type: String,
    required: true
    }
  });
  
  // This creates our model from the above schema, using mongoose's model method
  var Comments = mongoose.model("Comment", CommentSchema);
  
  // Export the Article model
  module.exports = Comments;