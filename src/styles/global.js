import { createGlobalStyle } from 'styled-components'

import ReactToastify from 'react-toastify/dist/ReactToastify.min.css'
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
  @import url(${ReactToastify});

  &&&{
    body {
      font-family: "Montserrat-Regular" !important;
      font-size: 1rem;
      font-weight: 400;
      line-height: 1.5;
      color: #172439 !important;
    }

    /* Replace Modal Styles */
    .modal-content {
      border: none !important;
      border-radius: 15px !important;
    }
    .modal-footer {
      border: none !important;
    }

    .modal-header {
      border: none !important;
      justify-content: center !important;
    }

    /* Replace Toast Styles */
    .Toastify {
      .Toastify__toast {
        font-family: 'Montserrat-Medium' !important;
        border-radius: 10px !important;
        box-shadow: none !important;
        border: none !important;
        font-size: 14px !important;
        padding: 20px;
      }
      .Toastify__toast--default {
        background: #EBEBEB !important;
        color: #172439 !important;
      }
      .Toastify__toast--info {
        background: #172439 !important;
        color: #FFFFFF !important;
      }
      .Toastify__toast--success {
        background: #6ADC91 !important;
        color: #FFFFFF !important;
      }
      .Toastify__toast--warning {
        background: #2DA577 !important;
        color: #FFFFFF !important;
      }
      .Toastify__toast--error {
        background: #E05252 !important;
        color: #FFFFFF !important;
      }
    }
  }

`
