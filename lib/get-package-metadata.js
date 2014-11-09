var fs = require("fs")
var manifest = require("..")
var get = require("pkgs")
var packages
manifest.meta = {}
get(
  Object.keys(manifest.dependencies),
  {omit: ["readme"]},
  function(err, packages) {
    packages.forEach(function(pkg){
      // TODO pretty it up
      manifest.meta[pkg.name] = pkg
    })
    fs.writeFileSync("../package.json", JSON.stringify(manifest, null, 2))
  }
)

// pkg.installCommand = "npm install " + pkg.name + (pkg.preferGlobal ? " -g" : "")

// pkg.starCount = pkg.users ? Object.keys(pkg.users).length : 0

// pkg.version = pkg['dist-tags'].latest

// if (pkg.versions) {
//   pkg.version = pkg.versions[pkg.version].version
//   pkg.publishedBy = pkg.versions[pkg.version]._npmUser
// }

// pkg.lastPublished = moment(pkg.time[pkg.version]).fromNow()

// delete pkg.versions
