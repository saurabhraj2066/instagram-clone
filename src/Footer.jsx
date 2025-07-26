import React from 'react'
import {
    MDBFooter,
    MDBContainer,
    MDBCol,
    MDBRow,
    MDBIcon,
    MDBBtn
  } from 'mdb-react-ui-kit';
  
function Footer() {
    return (
        <MDBFooter className='bg-light text-center text-white'>
          <MDBContainer className='p-4 pb-0'>
            <section className='mb-4'>
              <MDBBtn
                floating
                className='m-1'
                style={{ backgroundColor: '#3b5998' }}
                href='https://www.facebook.com/' target='_blank'
                role='button'
              >
                <MDBIcon fab icon='facebook-f' />
              </MDBBtn>
    
              <MDBBtn
                floating
                className='m-1'
                style={{ backgroundColor: '#dd4b39' }}
                href='#!'
                role='button'
              >
                <MDBIcon fab icon='google' />
              </MDBBtn>

              <MDBBtn
                floating
                className='m-1'
                style={{ backgroundColor: '#ac2bac' }}
                href='https://www.instagram.com/saurabhraj2066/' target='_blank'
                role='button'
              >
                <MDBIcon fab icon='instagram' />
              </MDBBtn>
    
              <MDBBtn
                floating
                className='m-1'
                style={{ backgroundColor: '#0082ca' }}
                href='https://www.linkedin.com/feed/' target='_blank'
                role='button'
              >
                <MDBIcon fab icon='linkedin-in' />
              </MDBBtn>
    
              <MDBBtn
                floating
                className='m-1'
                style={{ backgroundColor: '#333333' }}
                href='https://github.com/saurabhraj2066?tab=repositories' target='_blank'
                role='button'
              >
                <MDBIcon fab icon='github' />
              </MDBBtn>
            </section>
          </MDBContainer>
    
          <div className='text-center p-3' style={{ backgroundColor: 'rgb(24, 112, 219)' }}>
            © 2022 Copyright: {" " }
            <a className='text-white' href='https://instagram-clone-react-4781c.web.app/' target='_blank'> 
               instagram.com
            </a>
          </div>
        </MDBFooter>

        
      );
}

export default Footer