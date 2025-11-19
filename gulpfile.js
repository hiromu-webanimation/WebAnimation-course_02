const { src, dest, watch, series, parallel } = require("gulp");

// 共通
const rename = require("gulp-rename");

// 読み込み先（階層が間違えていると動かないので注意）
const srcPath = {
    css: 'src/sass/**/*.scss',
    img: 'src/images/**/*',
    html: './**/*.html'
}

// 吐き出し先（なければ生成される）
const destPath = {
    css: 'css/',
    img: 'images/'
}

// ブラウザーシンク（リアルタイムでブラウザに反映させる処理）
const browserSync = require("browser-sync");
const browserSyncOption = {
    server: "./"
}
const browserSyncFunc = () => {
    browserSync.init(browserSyncOption);
}
const browserSyncReload = (done) => {
    browserSync.reload();
    done();
}

// Sassファイルのコンパイル処理（DartSass対応）
const sass = require('gulp-sass')(require('sass'));
const sassGlob = require('gulp-sass-glob-use-forward');
const plumber = require("gulp-plumber");
const notify = require("gulp-notify");
const postcss = require("gulp-postcss");
const cssnext = require("postcss-cssnext")
const cleanCSS = require("gulp-clean-css");
const sourcemaps = require("gulp-sourcemaps");
const browsers = [
    'last 2 versions',
    '> 5%',
    'ie = 11',
    'not ie <= 10',
    'ios >= 8',
    'and_chr >= 5',
    'Android >= 5',
]

const cssSass = () => {
    return src(srcPath.css)
        .pipe(sourcemaps.init())
        .pipe(
            plumber({
                errorHandler: notify.onError('Error:<%= error.message %>')
            }))
        .pipe(sassGlob())
        .pipe(sass.sync({
            includePaths: ['src/sass'],
            outputStyle: 'expanded'
        }))
        .pipe(postcss([cssnext(browsers)]))
        .pipe(sourcemaps.write('./'))
        .pipe(dest(destPath.css))
        .pipe(notify({
            message: 'コンパイル完了',
            onLast: true
        }))
}

// 画像圧縮
const imagemin = require("gulp-imagemin");
const imageminMozjpeg = require("imagemin-mozjpeg");
const imageminPngquant = require("imagemin-pngquant");
const imageminSvgo = require("imagemin-svgo");
const webp = require('gulp-webp');
const imgImagemin = () => {
    return src(srcPath.img)
    .pipe(imagemin([
        imageminMozjpeg({quality: 80}),
        imageminPngquant(),
        imageminSvgo({plugins: [{removeViewbox: false}]})
        ],
        {
            verbose: true
        }
    ))
    .pipe(dest(destPath.img))
}
const gulpWebp = () => {
    return src(srcPath.img)
		.pipe(rename(function (path) {
			path.basename += path.extname;
		}))
		.pipe(webp())
		.pipe(dest(destPath.img))
        
}

// ファイルの変更を検知
const watchFiles = () => {
    watch(srcPath.css, series(cssSass, browserSyncReload))
    watch(srcPath.img, series(imgImagemin, browserSyncReload))
    watch(srcPath.img, series(gulpWebp, browserSyncReload))
    watch(srcPath.html, series(browserSyncReload))
}

// 画像だけ削除
const del = require('del');
const fs = require('fs');
const path = require('path');
const delPath = {
    // css: '../dist/css/',
    // js: '../dist/js/script.js',
    // jsMin: '../dist/js/script.min.js',
    img: './images/',
    // html: '../dist/*.html',
    // wpcss: `../${themeName}/assets/css/`,
    // wpjs: `../${themeName}/assets/js/script.js`,
    // wpjsMin: `../${themeName}/assets/js/script.min.js`,
    // wpImg: `../${themeName}/assets/images/`
}
const clean = (done) => {
    del(delPath.img, { force: true, });
    // del(delPath.css, { force: true, });
    // del(delPath.js, { force: true, });
    // del(delPath.jsMin, { force: true, });
    // del(delPath.html, { force: true, });
    // del(delPath.wpcss, { force: true, });
    // del(delPath.wpjs, { force: true, });
    // del(delPath.wpjsMin, { force: true, });
    // del(delPath.wpImg, { force: true, });
    done();
};

// src/imagesに存在しないファイルをimages/から削除
const cleanOrphanImages = (done) => {
    const srcImgDir = path.resolve('src/images');
    const destImgDir = path.resolve('images');
    
    if (!fs.existsSync(destImgDir)) {
        done();
        return;
    }
    
    // src/images内のファイルリストを取得（ファイル名のみ、ディレクトリ構造は無視）
    const srcFileNames = new Set();
    const getAllSrcFiles = (dir) => {
        const files = fs.readdirSync(dir);
        files.forEach(file => {
            const filePath = path.join(dir, file);
            const stat = fs.statSync(filePath);
            if (stat.isDirectory()) {
                getAllSrcFiles(filePath);
            } else {
                // ファイル名のみを追加
                srcFileNames.add(file);
                // webp変換後のファイル名も追加
                // gulpWebpの処理: basename += extname → .webp
                // 実際の出力: header_01.png → header_01.png.webp
                const ext = path.extname(file);
                if (ext && ext !== '.webp') {
                    // 元のファイル名.webp の形式でwebpファイルが生成される
                    srcFileNames.add(file + '.webp');
                }
            }
        });
    };
    
    if (fs.existsSync(srcImgDir)) {
        getAllSrcFiles(srcImgDir);
    }
    
    // images/内のファイルをチェック
    const getAllDestFiles = (dir) => {
        if (!fs.existsSync(dir)) {
            return;
        }
        const files = fs.readdirSync(dir);
        files.forEach(file => {
            const filePath = path.join(dir, file);
            const stat = fs.statSync(filePath);
            if (stat.isDirectory()) {
                getAllDestFiles(filePath);
            } else {
                // '> 'で始まるファイルは削除
                if (file.startsWith('> ')) {
                    fs.unlinkSync(filePath);
                    console.log(`Deleted file with '> ' prefix: ${file}`);
                    return;
                }
                
                // .svg.svg のような不正な拡張子のファイルを削除
                if (file.endsWith('.svg.svg')) {
                    fs.unlinkSync(filePath);
                    console.log(`Deleted file with .svg.svg extension: ${file}`);
                    return;
                }
                
                // ファイル名を取得（ディレクトリ構造は無視）
                const fileName = path.basename(filePath);
                // src/imagesに存在しないファイルを削除
                if (!srcFileNames.has(fileName)) {
                    fs.unlinkSync(filePath);
                    console.log(`Deleted orphan file: ${fileName}`);
                }
            }
        });
    };
    
    getAllDestFiles(destImgDir);
    done();
};


// 画像タスクをexport
exports.imgImagemin = imgImagemin;
exports.gulpWebp = gulpWebp;

// npx gulpで出力する内容
exports.default = series(series(clean, cssSass, imgImagemin, gulpWebp, cleanOrphanImages), parallel(watchFiles, browserSyncFunc));

// クリーンアップタスク（export）
exports.clean = clean;

// 孤立した画像ファイルを削除
exports.cleanOrphan = cleanOrphanImages;

// npx gulp del → 画像最適化（重複を削除）
// exports.del = series(series(clean, cssSass, imgImagemin), parallel(watchFiles, browserSyncFunc));
