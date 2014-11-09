var fs = require("fs")
var path = require("path")
var pkgs = require("pkgs")
var root = require('find-root')()
var pkg

var pkgPath = path.resolve(root, "package.json")
var metaPath = path.resolve(root, "meta.json")

try {
  pkg = require(pkgPath)
} catch(e) {
  return console.error("Invalid JSON file: %s", pkgPath)
}

pkgs(
  Object.keys(pkg.dependencies),
  {omit: ["readme, versions, time"]},
  function(err, packages) {
    packages = packages.map(function(p) {
      var blurbPath = path.resolve(root, "blurbs/"+p.name+".md")
      if (fs.existsSync(blurbPath)) {
        p.blurb = fs.readFileSync(blurbPath, "utf-8")
      }
      return p
    })

    fs.writeFileSync(metaPath, JSON.stringify({dependencies: packages}, null, 2))
  }
)
