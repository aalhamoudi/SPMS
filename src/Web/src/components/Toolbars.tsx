import * as React from 'react'

export class User extends React.Component<{}, {}> {
    render() {
        let style = {
            color: "white",
            position: "fixed" as "fixed",
            display: "block",
            right: 5,
            textAlign: "center"
            
        };
        let iconStyle = {
            padding: "10px 15px"
        };
        return <div style={style}>
            <span className={`fa fa-user-o fa-2x`} style={iconStyle}></span>
            <div>
                <h5 style={{ margin: 7.5 }}>Name</h5>
            </div>
        </div>
    }
}

export class TopBar extends React.Component<{}, {}> {
    render() {
        let style = {
            backgroundColor: "#2b2b2b",
            height: 50,
            width: "100vw",
            marginLeft: 69,
            position: "fixed" as "fixed",
            top: 0
        };
        return <header style={style}>
            <User />
        </header>
    }
}