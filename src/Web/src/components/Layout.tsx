import * as React from 'react'
import { NavMenu } from './Navigation'
import { TopBar } from './Toolbars'

export class Layout extends React.Component<{}, {}> {
    public render() {
        return (
            <div>
                <NavMenu />
                <TopBar />
                <div className='container-fluid' style={{marginTop: 50, marginLeft: 69}}>{ this.props.children }</div>
            </div>
        );
    }
}
