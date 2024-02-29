export type Topic = {
    createTime: Number,
    name: String,
    cover: String,
}

export type Article = {
    _id: String,
    createTime: Number,
    createTimeObj?: Date,
    updateTime: Number,
    title: String,
    topics: Array<Topic>,
    type: 'article' | 'moment' | 'photo',
    cover: String,
    htmlContent: String,
    textContent: String,
    desc: String,
    location: String,
    imgs: Array<String>,
    weather: Object
}