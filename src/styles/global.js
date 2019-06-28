import { createGlobalStyle } from 'styled-components'

import MontserratRegular from './default-theme/lib/fonts/Montserrat/Montserrat-Regular.ttf'
import MontserratMedium from './default-theme/lib/fonts/Montserrat/Montserrat-Medium.ttf'
import MontserratBold from './default-theme/lib/fonts/Montserrat/Montserrat-Bold.ttf'
import Boostrap from './default-theme/lib/bootstrap/css/bootstrap.min.css'

export default createGlobalStyle`
&&&{
  body {
    font-family: 'Montserrat-Regular' !important;

    @font-face{
      font-family: 'Montserrat-Regular';
      src: url(${MontserratRegular});
    }
    @font-face{
      font-family: 'Montserrat-Medium';
      src: url(${MontserratMedium});
    }
    @font-face{
      font-family: 'Montserrat-Bold';
      src: url(${MontserratBold});
    }

    @import url(${Boostrap});
  }
}
  
`
