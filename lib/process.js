module.exports = function(process){
    
//Process Management
process.on('uncaughtException', function (err) {
  console.log('PROCESS: Caught exception: ' + err);
});

process.on('exit', function() {  
  console.log('PROCESS: !!!!!EXITED!!!!');
});
    
}