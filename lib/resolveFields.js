module.exports = function(props, fields){
  var vals = {};
  var keys = Object.keys(fields);

  if(!fields.Address || !fields.City || !fields.State || !fields.Zip){
    throw new Error('Invalid fields. Must contain metadata on Address, City, State, and Zip.');
  }

  for(var i=0; i<keys.length; i++){
    var val;
    var field = fields[keys[i]];
    if(field.type === 'dynamic'){
      val = new Function('props', field.value)(props); //eslint-disable-line
    }else{
      val = props[field.value];
    }
    vals[keys[i]] = val;
  }

  return vals;
}