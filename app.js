import { confirmDelete, inquirerMenu, listTasksToDelete, pause, readInput, showListChecklist } from './helpers/inquirer.js';
import { readDb, saveDB } from './helpers/saveFile.js';
import { Tasks } from './models/tasks.js';

const main = async () => {

    let opt = '';
    const tasks = new Tasks();
    const data = readDb();

    if ( data )
        tasks.loadTasksFromArray( data );

    do {
        
        opt = await inquirerMenu();

        switch (opt) {
            case 1:
                const description = await readInput('Enter description');
                tasks.createTask( description );
                break;

            case 2:
                tasks.showCompleteList();
                break;

            case 3:
                tasks.listPendingsCompleteds();
                break;

            case 4:
                tasks.listPendingsCompleteds( false );
                break;

            case 5:
                const ids = await showListChecklist( tasks.listArr );
                tasks.toggleCompleted( ids );
                break;
            
            case 6:
                const id = await listTasksToDelete( tasks.listArr );

                if ( id !== 0 ) {
                    const ok = await confirmDelete( `You sure?` );
    
                    if ( ok ) {
                        tasks.deleteTask( id );
                        console.log( 'Task Deleted'.green );
                    }
                }

                break
        
            default:
                break;
        }

        saveDB( tasks.listArr );

        /* if ( opt === 0 ) */ await pause();

    } while (opt !== 0);

};

main();