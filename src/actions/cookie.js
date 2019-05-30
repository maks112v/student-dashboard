import cookie from "react-cookies";

const expires = new Date();
expires.setDate( Date.now() + 1000 * 60 * 60 * 24 * 14 );

const cookieOptions = {
    path: "/"
};

export const cookieSave = ( name, value ) => {
    
    cookie.save( name, value, cookieOptions );
};

export const cookieDelete = ( name ) => {
    cookie.remove( name, cookieOptions );
};

export const cookieGet = ( name ) => {
    
    const data = cookie.load( name );
    return data;
};