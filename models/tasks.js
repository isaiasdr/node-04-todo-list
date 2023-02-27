import { Task } from "./task.js";

export class Tasks {
    _list = {};

    get listArr() {
        const list = [];

        Object.keys( this._list ).forEach( key => list.push( this._list[ key ] ));

        return list;
    }

    constructor() {
        this._list = {};
    }

    createTask( description = '' ) {
        const task = new Task( description );
        this._list[ task.id ] = task;
    }

    deleteTask( id = '' ) {
        if ( this._list[ id ] )
            delete this._list[ id ];
    }

    loadTasksFromArray( tasks = [] ) {
        tasks.forEach( task => this._list[ task.id ] = task );
    }

    showCompleteList() {
        this.listArr.forEach( (task, index) => {
            const idx = (index+1+'.').blue;
            const status = task.completedDate ? 'Completed'.green : 'Pending'.red;

            console.log( `${ idx } ${ task.description } :: ${ status }` )
        });
    }

    listPendingsCompleteds ( completed = true ) {
        let counter = 0;
        this.listArr.forEach( task => {

            if ( completed && task.completedDate !== null ) {
                counter++;
                const idx = (counter + '.').blue;
                const status = task.completedDate.green;

                console.log( `${ idx } ${ task.description } :: ${ status }` );
            }

            else if ( !completed && task.completedDate === null ) {
                counter++;
                const idx = (counter + '.').blue;
                const status = 'Pending'.red;

                console.log( `${ idx } ${ task.description } :: ${ status }` );
            }
        });
    }

    toggleCompleted ( ids = [] ) {
        const list = this.listArr;

        list.forEach( task => {
            if ( ids.includes( task.id ) ) {
                const completedTask = this._list[task.id];

                if( !completedTask.completedDate )
                completedTask.completedDate = new Date().toISOString();
            }

            else {
                const pendingTask = this._list[task.id];
                pendingTask.completedDate = null;
            }
        });
    }
}
