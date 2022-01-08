import React from 'react';

import Box from '@material-ui/core/Box';
import List from '@material-ui/core/List';
import { listItems } from './listItem';

// import MemberBoard from './memberboard';
import BoardAdmin from './boardadmin';

function Admin() {
    return (
        <Box width="100%" display="flex" flexDirection="row">
            <Box width="200px"><List>{listItems}</List></Box>
            {/*<Box width="80%"><MemberBoard/></Box>*/}
            <Box width="80%"><BoardAdmin/></Box>
        </Box>
    )
}

export default Admin;