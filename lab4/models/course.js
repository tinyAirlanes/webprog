/**
 * @typedef Course
 * @property {integer} id
 * @property {string} name
 * @property {integer} duration
 * @property {string} group
 * @property {integer} credits
 * @property {string} date
 */


class course
{

    constructor(id,name,duration,group,credits,date)
    {
        this.id = id
        this.name = name
        this.duration = duration
        this.group = group
        this.credits = credits
        this.date = date
    }
}

module.exports = course;