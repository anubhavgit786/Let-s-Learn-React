import styled from "styled-components";
import { useDarkMode } from "../context/DarkModeContext";

const StyledLogo = styled.div`
  text-align: center;
`;

const Img = styled.img`
  height: 9.6rem;
  width: auto;
`;

const Logo = ()=> 
{
  const { isDarkMode } = useDarkMode();
  const logoDark ="https://i.ibb.co/413sSDH/logo-dark.png"
  const logoLight = "https://i.ibb.co/Jd48Y9W/logo-light.png";
  const src = isDarkMode ? logoDark : logoLight;
  return (
    <StyledLogo>
      <Img src={src} alt="Logo" />
    </StyledLogo>
  );
}

export default Logo;
