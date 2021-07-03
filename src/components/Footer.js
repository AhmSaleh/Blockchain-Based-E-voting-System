import Footer from 'rc-footer';
import 'rc-footer/assets/index.css';

export default () =>{
    return (
        <div style={{position: "fixed", bottom: 0, width: "0%"}}>
          <Footer
              className="footer"
              columns={[
              {
                icon: (
                  <img src="https://www.flaticon.com/svg/vstatic/svg/3661/3661733.svg?token=exp=1619391411~hmac=21fcd2d91c800f34ded6dd598fb59a2c" />
                ),
                title: 'Blockchain E-Voting System',
                url: 'https://yuque.com',
                description: 'AS',
                openExternal: true,
              },
              ]}
              bottom="© 2020-2021"
          />
        </div>
      )
}
