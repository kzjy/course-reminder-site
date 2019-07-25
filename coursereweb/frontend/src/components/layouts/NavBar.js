import React, { Component } from 'react'
import { connect } from 'react-redux'
import { toggleNavbar, selectActive, updateWindow } from '../../actions/navAction'
import { logout } from '../../actions/authAction'
import SideNav, { Toggle, Nav, NavItem, NavIcon, NavText } from '@trendmicro/react-sidenav';

// Be sure to include styles at some point, probably during your bootstraping
import '@trendmicro/react-sidenav/dist/react-sidenav.css';

export class NavBar extends Component {

    state = {
        expanded: true,
        selected: '',
    }

    toggle = () => {
        this.setState({expanded: !this.state.expanded})
    }

    onSelect = selected => {
        if (selected === 'logout') {
            this.props.logout();
        } else {
            this.props.selectActive(selected)
            const to = '/' + selected;
            if (this.props.location.pathname !== to) {
                this.props.history.push(to);
            }
        }
    }

    componentDidMount() {
        this.props.updateWindow(window.innerWidth);
        window.addEventListener('resize', this.update);
    }
      
    componentWillUnmount() {
        window.removeEventListener('resize', this.update);
    }

    update = () => {
        if (Math.abs(window.innerWidth - this.props.navStatus.window) > 150) {
            this.props.updateWindow(window.innerWidth);
        }
        
    }

    render() {
        return (
            <SideNav style={{position:'fixed', backgroundColor:'rgba(120,194,173,0.9)'}} expanded={this.props.navStatus.open} onToggle={this.props.toggleNavbar} onSelect={this.onSelect}>
                <SideNav.Toggle />
                <SideNav.Nav defaultSelected="">

                    {/* HOME  */}
                    <NavItem navitemClassName="nav-item" eventKey="">
                        <NavIcon >
                            <i className="fas fa-home" style={{color:'#FFF', fontSize: '1.75em' }}></i>
                            {/* <i className="fa fa-fw fa-home"  /> */}
                        </NavIcon>
                        <NavText style={{color:'#FFF'}}>Home</NavText>
                        
                    </NavItem>

                    {/* DASHBOARD */}
                    <NavItem eventKey="dashboard">
                        <NavIcon>
                        <i className="fas fa-stream" style={{ color:'#FFF', fontSize: '1.75em' }} />
                        </NavIcon>
                        <NavText style={{color:'#FFF'}}>Dashboard</NavText>
                    </NavItem>

                    {/* CALENDAR */}
                    <NavItem eventKey="calendar">
                        <NavIcon>
                        <i className="far fa-calendar" style={{color:'#FFF', fontSize: '1.75em' }} />
                        </NavIcon>
                        <NavText style={{color:'#FFF'}}>Calendar</NavText>
                    </NavItem>

                    <hr/>

                    {/* LOGOUT */}
                    <NavItem eventKey="logout">
                        <NavIcon>
                            <i className="fas fa-sign-out-alt" style={{color:'#FFF', fontSize: '1.75em' }} />
                        </NavIcon>
                        <NavText style={{color:'#FFF'}}>Logout</NavText>
                    </NavItem>
                </SideNav.Nav>

            </SideNav>
        )
    }
}

const mapStateToProps = state => ({
    navStatus: state.navReducer
})

export default connect(mapStateToProps, { toggleNavbar, selectActive, updateWindow, logout })(NavBar);