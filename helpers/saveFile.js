import fs from 'fs';

const file = './db/data.json';

export const saveDB = ( data ) => {
    fs.writeFileSync( file, JSON.stringify( data ) );
}

export const readDb = () => {
    if ( !fs.existsSync(file) )
        return null;

    const data = fs.readFileSync( file, { encoding: 'utf-8' } );
    return JSON.parse( data );
}
