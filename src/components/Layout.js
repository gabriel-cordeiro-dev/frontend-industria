import React from 'react'

import DataRender from './DataRender'
import Login from './auth/LoginForm'

function Layout(props){
    return(
        <>
            <Login>
                <DataRender/>
                <div className='contentContainer'>{props.children}</div>
            </Login>
            
        </>
    )
}

export default Layout