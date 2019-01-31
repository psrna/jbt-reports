'use strict'

class Sprint {

    constructor(){}

    /**
     * Returns number of the current sprint based on actual date
     */
    getCurrentSprint(){
        /** number of weeks between today and the first sprint date */
        let weeksDiff = this.weeksBetween(new Date(), this.getFirstSprint().sprintStartDate);
        /** Number of sprints between today and the first sprint (e.g. 136), every sprint has 3 weeks */ 
        let sprintsDiff = Math.floor(weeksDiff / 3);  

        let currentSprintNumber = this.getFirstSprint().sprintNumber + sprintsDiff;
        let currentSprintStartDate = this.add_weeks(this.getFirstSprint().sprintStartDate, (sprintsDiff * 3));

        return {
            sprintNumer : currentSprintNumber,
            sprintStartDate : currentSprintStartDate
        }
    }

    /**
     * Returns sprint object 
     * @param {*} x 
     */
    getSprint(x){

        let weeks = (x - this.getFirstSprint().sprintNumber) * 3; 
        let sprintXStartDate = this.add_weeks(this.getFirstSprint().sprintStartDate, weeks);

        return {
            sprintNumer : x,
            sprintStartDate : sprintXStartDate
        }
    }    


    /**
     * Returns first Devtools sprint,  (Freesia Train)
     */
    getFirstSprint(){
        return {
            sprintNumber : 136,
            sprintStartDate : new Date("August 9, 2017")
        }
    }

    weeksBetween(d1, d2) {
        return Math.abs(Math.round((d2 - d1) / (7 * 24 * 60 * 60 * 1000)));
    }

    add_weeks(dt, n) {
        return new Date(dt.setDate(dt.getDate() + (n * 7)));      
    }
}


module.exports = Sprint;