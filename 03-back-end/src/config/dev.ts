import IConfig from './IConfig.interface';

const Config: IConfig = {
    server: {
        port: 40080,
        static:{
            path: "./static/",
            route: "/static",
            cacheControl: false,
            dotfiles: "deny | any",
            etag: false,
            index: false,
            maxAge: 360000,

        },
    },

};

export default Config;