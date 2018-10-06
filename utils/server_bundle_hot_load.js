const serverBundleHotLoad = function (config) {
    const path = require("path");
    const webpack = require("webpack");
    const memoryFs = require("memory-fs");
    const complie = webpack(config);//这里默认编译后的文件将储存到硬盘
    const mmfs = new memoryFs();
    let serverEntryExports;
    complie.outputFileSystem = mmfs;//webpakc打包后文件将储存到内存
    const moduleWraper = (code) => {//相当于require("module").wrap(code)的作用=====>function(exports,require,module,__filename,__dirname){}
        return `(function(exports,require,module,__filename,__dirname){${code}});`;
    };
    const vm = require("vm");
    const str2JSModule = (code) => {
        code = moduleWraper(code);
        let script = new vm.Script(code, { filename: "temp.js", displayErrors: true });
        //wraper ==> function(exports,require,module,__filename,__dirname){}
        const wraper = script.runInThisContext();
        const codeModule = { exports: {} };
        wraper.call(codeModule, codeModule.exports, require, codeModule, __filename, __dirname);
        return codeModule.exports;
    }
    complie.watch({}, (err, states) => {//这里监视源文件，一旦发生更改将触发这个函数
        if (err) throw err;
        status = states.toJson();
        console.log(states.toString());
        //文件的路径：即在webpack配置的路劲
        let bundJspath = path.join(
            config.output.path,
            config.output.filename
        );
        let code = mmfs.readFileSync(bundJspath, "UTF-8");//:string
        serverEntryExports = str2JSModule(code);//这里相当于 require()
    });
    return function () {
        return serverEntryExports;
    }
}
module.exports = serverBundleHotLoad;
