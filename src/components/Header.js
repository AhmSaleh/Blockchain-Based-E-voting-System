import React from 'react';
import { Menu, Segment } from 'semantic-ui-react';
import swal from "sweetalert";

export default class MenuExampleInvertedSegment extends React.Component {
    state = { activeItem: 'candidate' }
    
    handleItemClick = (e, { name }) => {
        this.setState({ activeItem: name });

        switch(name){
            case 'Logout':
                this.logout();
            break;
            
            case 'Elections':
                this.goToPreviousElections();
            break;

            default:
            break;
        }
    }

    // Logout functionality
    logout = async () => {
        swal({
        title: "Logging Out",
        text: "Are you sure you want to log out?",
        icon: "warning",
        buttons: true,
        dangerMode: true,
        }).then((willLogout) => {
        if (willLogout) {
            // Removing all cached login values
            localStorage.removeItem("nationalID");
            localStorage.removeItem("password");
            localStorage.removeItem("token");

            // Redirecting to login page
            window.location.pathname = "/login";
        } else {
            swal("You did not logout.");
        }
        });
    }

    goToPreviousElections = () => {
        window.location.pathname = "/elections";
    }

    render(){
        const { activeItem } = this.state

        return (
            
            <Segment inverted>
                    <Menu inverted secondary>
                    <Menu.Item
                        name='Elections'
                        active={activeItem === 'Elections'}
                        onClick={this.handleItemClick}
                    />  
                    <Menu.Item
                        name='Logout'
                        active={activeItem === 'Logout'}
                        onClick={this.handleItemClick}
                    />
                    </Menu>
            </Segment>
        )
    }
    
}