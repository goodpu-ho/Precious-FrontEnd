import {createGlobalStyle} from "styled-components";
import reset from "styled-reset"

export default createGlobalStyle`
    ${reset}
    /** 아래 code는 nico가 항상추가하는 코드 */
    *{
        box-sizing:border-box;
    }
`;