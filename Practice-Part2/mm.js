const url='https//:google.com/'
function hello(a){
    console.log("Hello", a)
}

module.exports.hello=hello
module.exports.url =url 
console.log("Module",module)
console.log("Exports",exports)
console.log("Module.Exports",module.exports)
console.log("Dir Name",__dirname)
console.log("File Name",__filename)


