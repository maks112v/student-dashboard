import React from "react";
import { Checkbox, List } from "antd";

const Lessons = ( { lessons, onChange } ) => {
    return ( lessons ? <List itemLayout="horizontal" dataSource={ lessons }
                             renderItem={ lesson => ( <List.Item>
                                 <List.Item.Meta
                                     avatar={ <Checkbox onChange={ onChange }
                                                        checked={ lesson.completed }/> }
                                     title={ lesson.title }
                                 />
                             </List.Item> ) }/> : "" );
};

export default Lessons;