import * as React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { Modal, Button } from 'react-materialize'

export class NavIcon extends React.Component<{link: string, icon: string}, {}> {
    render() {
        return <li>
                  <NavLink exact to={this.props.link} activeClassName='active' activeStyle={{backgroundColor: 'black'}}>
                       <span className={`fa fa-${this.props.icon} fa-3x`} style={{color: "white", margin: "10px 0px"}}></span>
                  </NavLink>
              </li>
    }
}

export class NavIcons extends React.Component<{}, {}> {
    render() {
        return <ul className="nav">{this.props.children}</ul>
    }
}

export class NavSettings extends React.Component<{}, {}> {
    render() {
        let style = {
            color: "white", 
            position: "fixed" as "fixed", 
            bottom: 10, 
            display: "block",
            padding: "10px 15px"
        };
        return <Modal
            header="Test"
            trigger={<span className={`fa fa-cogs fa-3x`} style={style}></span>}>
            <p>Hello World!</p>
        </Modal>
    }
}

export class NavToggler extends React.Component<{}, {}> {
    render() {
        let style = {
            color: "white", 
            display: "block",
            padding: "10px 15px"
        };
        return <li>
                   <span className={`fa fa-bars fa-3x`} style={style}></span>
               </li>
    }
}

export class NavSeparator extends React.Component<{}, {}> {
    render() {
        return <li>
                  <hr style={{width: 69, margin: 0}}/>
               </li>
    }
}

export class NavHeader extends React.Component<{}, {}> {
    render() {
        return <li>
                    <NavToggler />
                    <NavSeparator />
               </li>
    }
}


export class NavMenu extends React.Component<{}, {}> {
    public render() {
        let navStyle = {
            position: 'fixed' as 'fixed',
            width: 69,
            height: '100vh',
            float: 'left',
            top: 0,
            backgroundColor: '#2b2b2b'
        };
        return <div style={navStyle}>
                <div>
                    <NavIcons>
                        <NavIcon link="/" icon="home" />
                        <NavIcon link="/ajax/reactjs" icon="book" />
                        <NavIcon link="/websocket" icon="bug" />
                    </NavIcons>
                    <NavSettings />
                </div>
            </div>;
    }
}
