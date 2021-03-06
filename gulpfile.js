var gulp = require("gulp");
var less = require("gulp-less");
var autoprefixer = require("autoprefixer");
var postcss = require("gulp-postcss");
var server = require("browser-sync").create();
var plumber = require("gulp-plumber");
var imagemin = require("gulp-imagemin");
var concat = require("gulp-concat");
var minifycss = require("gulp-csso");
var rename = require("gulp-rename");
var run = require("run-sequence");
var del = require("del");
var rigger = require("gulp-rigger");
var sourcemaps = require("gulp-sourcemaps");
var minjs = require("gulp-uglify");
var htmlsrc = require("gulp");

var BUILD_PATH = "../themes/rfid_style";

var Path = {
	build: {
		html: BUILD_PATH,
		js: BUILD_PATH + "/js/",
		css: BUILD_PATH + "/css/",
		fonts: BUILD_PATH + "/fonts/",
		img: BUILD_PATH + "/img/"
	},
	src: {
		html: "src",
		js: "src/js/",
		css: "src/css/",
		fonts: "src/fonts/",
		img: "src/img/"
	}
}

imagemin.mozjpeg = require("imagemin-mozjpeg");

gulp.task("styles", function() {
	return gulp.src("src/less/**/*.less")
		.pipe(plumber())
		.pipe(less())
		.pipe(postcss([
			autoprefixer()
		]))
		.pipe(gulp.dest(Path.src.css))
		.pipe(server.stream());
	;
});

gulp.task("svg", function() {
	return gulp.src('src/img/**/*.svg')
		.pipe(imagemin([
			imagemin.svgo()

		]))
		.pipe(gulp.dest("src/img"));
});


gulp.task("server", ["styles"], function() {
	server.init({
		server: "src"
	});
	gulp.watch("src/less/**/*.less", ["styles"]);
	gulp.watch("src/*.html")
		.on("change", server.reload);	

	gulp.watch("src/js/*.js")
		.on("change", server.reload);
});


gulp.task("copy:img", function(){
	return gulp.src(["src/img/**/*.{svg,jpg,jpeg,png}"])
		.pipe(gulp.dest("rfid_style/img"));
});

gulp.task("copy:html", function(){
	return gulp.src(["src/*.html"])
		.pipe(gulp.dest(Path.build.html));
});

gulp.task("copy:fonts", function(){
	return gulp.src(["src/fonts/*.{woff2,woff,ttf}"])
		.pipe(gulp.dest(Path.build.fonts));
});

gulp.task("build:js", function(){
	return gulp.src([
		"src/js/jquery.min.js",
		"src/js/magnific-popup.min.js",
		"src/js/slick.min.js",
		"src/js/main.js"
	])
	.pipe(minjs())
	.pipe(concat("app.js"))
	.pipe(gulp.dest(Path.build.js))
});


gulp.task("build:img", function() {
	return gulp.src("src/**/*.{png,jpg,jpeg}")
		.pipe(imagemin([
			imagemin.optipng({optimizationLevel: 3}),
			imagemin.jpegtran({progressive: true}),
      imagemin.mozjpeg({progressive: true}),
		]))
		.pipe(gulp.dest(Path.build.html));
});

gulp.task("build:css", function() {
	return gulp.src(
		[
			"src/css/fonts.css", 
			"src/css/normalize.css", 
			"src/css/slick.css", 
			"src/css/magnific-popup.css",
			"src/css/style.css",
			"src/css/media.css"
		])
		.pipe(minifycss())
		.pipe(concat("app.css"))
		.pipe(gulp.dest(Path.build.css));
});

gulp.task("del", function(){
	del("rfid_style");
});

gulp.task("build", function(done){
	run("del", "build:css", "build:js", "build:img", "copy:fonts", "copy:html", done);
});



