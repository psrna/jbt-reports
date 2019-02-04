'use strict'

class Sprint {

    constructor(){}

    /**
     * Returns number of the current sprint based on actual date
     */
    getCurrentSprint(){
        /** number of weeks between today and the first sprint date */
        let daysDiff = this.daysBetween(new Date(), this.getFirstSprint().sprintStartDate);
        /** Number of sprints between today and the first sprint (e.g. 136), every sprint has 3 weeks */ 
        let sprintsDiff = Math.floor(daysDiff / 21);    //sprint has 3 weeks == 21 days

        let currentSprintNumber = this.getFirstSprint().sprintNumber + sprintsDiff;
        let currentSprintStartDate = this.addDays(this.getFirstSprint().sprintStartDate, (sprintsDiff * 21)); //sprint has 3 weeks == 21 days

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

        let days = (x - this.getFirstSprint().sprintNumber) * 21; 
        let sprintXStartDate = this.addDays(this.getFirstSprint().sprintStartDate, days);

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

    daysBetween(d1, d2){
        return Math.abs(Math.round((d2 - d1) / (24 * 60 * 60 * 1000)));
    }

    addDays(dt, n){
        return new Date(dt.setDate(dt.getDate() + n));    
    }
}


module.exports = Sprint;