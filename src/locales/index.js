import en_us from './en-us.js'
import zh_cn from './zh-cn.js'
import it_it from './it-it.js'

import { sprintf } from 'sprintf-js'

const format = function () {
    return sprintf.apply(arguments)
};


export default {
    format,
    en_us,
    it_it,
    zh_cn
}
