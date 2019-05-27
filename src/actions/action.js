export const action = ( type, payload = undefined ) => {
    if( payload ){
        return { type, payload };
    }
    return { type };
};