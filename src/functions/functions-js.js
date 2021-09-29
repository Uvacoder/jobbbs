import dayjs from "dayjs"
// import {relativeTime} from "dayjs/plugin"
var relativeTime = require('dayjs/plugin/relativeTime')
dayjs.extend(relativeTime)

export const timeFromNow=(date)=>dayjs(date).fromNow()