import Footer from 'rc-footer';
import 'rc-footer/assets/index.css';
import { render } from 'react-dom';

export default (props) =>{
    return (
        <div>
        <Footer
            style={{position:"fixed", width:"100%", bottom:0, height:"150px"}}
            className="footer"
            columns={[
            {
              icon: (
                <img src="https://www.flaticon.com/svg/vstatic/svg/2152/2152539.svg?token=exp=1620231419~hmac=da2b1efbe77f01b82b8b5997fbaadf09" />
              ),
              title: 'Blockchain',
              url: 'https://yuque.com',
              description: 'AS',
              openExternal: true,
            },
            ]}
            bottom="Made with ❤️ by KING SALEH"
        />,
        </div>
      )
}
