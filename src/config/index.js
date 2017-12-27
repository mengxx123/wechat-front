let debug = process.env.NODE_ENV !== 'production'

let imgDomain
let apiDomain
let domain

if (process.env.NODE_ENV === 'production') {
    imgDomain = 'http://120.79.29.47'
    apiDomain = 'http://example.yunser.com'
    domain = {
        api: 'http://example.yunser.com'
    }
} else {
    imgDomain = 'http://120.79.29.47'
    // apiDomain = 'http://localhost'
    apiDomain = 'http://localhost:1030'
    // apiDomain = 'http://192.168.3.35:9998'
    domain = {
        wechat: 'http://localhost:1030'
    }
}

module.exports = {
    imgDomain,
    apiDomain,
    debug,
    domain
}
