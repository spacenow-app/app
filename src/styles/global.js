import { createGlobalStyle } from 'styled-components'

import MontserratRegular from './default-theme/lib/fonts/Montserrat/Montserrat-Regular.ttf'
import MontserratMedium from './default-theme/lib/fonts/Montserrat/Montserrat-Medium.ttf'
import MontserratBold from './default-theme/lib/fonts/Montserrat/Montserrat-Bold.ttf'
import MontserratSemiBold from './default-theme/lib/fonts/Montserrat/Montserrat-SemiBold.ttf'
import Boostrap from './default-theme/lib/bootstrap/css/bootstrap.min.css'

export default createGlobalStyle`
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

  @font-face{
    font-family: 'Montserrat-SemiBold';
    src: url(${MontserratSemiBold});
  }

  @import url(${Boostrap});

  &&&{
    body {
      font-family: "Montserrat-Regular" !important;
      font-size: 1rem;
      font-weight: 400;
      line-height: 1.5;
      color: #172439;
    }
  }

`
