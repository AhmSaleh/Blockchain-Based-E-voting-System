import React from 'react'
import { Menu, Segment } from 'semantic-ui-react'

export default class MenuExampleInvertedSegment extends React.Component {
    state = { activeItem: 'candidate' }
    handleItemClick = (e, { name }) => this.setState({ activeItem: name })

    render(){
        const { activeItem } = this.state

        return (
            
            <Segment inverted>
                    <Menu inverted secondary>
                    <Menu.Item
                        name='Candidate'
                        active={activeItem === 'candidate'}
                        onClick={this.handleItemClick}
                    />
                    <Menu.Item
                        name='Election'
                        active={activeItem === 'election'}
                        onClick={this.handleItemClick}
                    />  
                    </Menu>
            </Segment>
        )
    }
    
}