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

imagemin.mozjpeg = require("imagemin-mozjpeg");

gulp.task("styles", function() {
	return gulp.src("src/less/**/*.less")
		.pipe(plumber())
		.pipe(less())
		.pipe(postcss([
			autoprefixer()
		]))
		.pipe(gulp.dest("src/css"))
		.pipe(server.stream());
});

gulp.task("svg", function() {
	return gulp.src('src/img/**/*.svg')
		.pipe(imagemin([
			imagemin.svgo()

		]))
		.pipe(gulp.dest("src/img"));
});

gulp.task("img", function() {
	return gulp.src("categories/**/*.{png,jpg,jpeg}")
		.pipe(imagemin([
			imagemin.optipng({optimizationLevel: 3}),
			imagemin.jpegtran({progressive: true}),
            imagemin.mozjpeg({progressive: true}),
		]))
		.pipe(gulp.dest(function(file){
    		return file.base;
		}));
});

gulp.task("jslibs", function() {
	return gulp.src("src/js/**/*.min.js")
		.pipe(concat("libs.js"))
		.pipe(gulp.dest("final/js"));
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

gulp.task("minifycss", function() {
	return gulp.src("src/css/**/slick*")
		.pipe(minifycss())
		.pipe(concat({suffix: ".min"}))
		.pipe(gulp.dest("src/css"));
});

gulp.task("copy", function(){
	return gulp.src(["src/img/**/*.{svg,jpg,jpeg,png}", "src/**/*.html"])
		.pipe(gulp.dest("final"));
});

gulp.task("del", function(){
	del("final");
});

gulp.task("build", function(done){
	run("del", "minifycss", "jslibs", "copy", done);
});

// gulp.task("js:build", function(){
// 	gulp.src("src/js/main.js")
// 		.pipe(sourcemaps.init())
// 		.pipe(rigger())
// 		.pipe(sourcemaps.write())
// 		.pipe(gulp.dest("src/js"))
// 		.pipe(server.stream());
// });



