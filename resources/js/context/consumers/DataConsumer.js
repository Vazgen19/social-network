import React, {forwardRef} from 'react';
import {DataConsumer} from '../providers/DataProvider';
import getContext from '../../helpers/getContext';


export default function withDataContext(ConnectedComponent, properties = []){
    return forwardRef((props, ref) => {
        return (
            <DataConsumer>
                {context => {
                    let contextProps = properties.length ? getContext(context, properties) : {}

                    return (
                        <ConnectedComponent {...contextProps} {...props} ref={ref} />
                    )
                }}
            </DataConsumer>
        )
    })
}


