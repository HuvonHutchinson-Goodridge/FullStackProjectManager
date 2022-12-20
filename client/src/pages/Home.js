import { StyledTitle, StyledSubTitle, Avatar, StyledButton, ButtonGroup } from "../components/styles"
import { StyledContainer } from './../components/styles'
import Logo from "./../assets/icon.jfif"

const Home = () => {
    return (
        <StyledContainer>
        <div>
            
            <div style={{
                width: "100%", position: "absolute", top: 0, left: 0, backgroundColor: "transparent",
                padding: "15px",
                display: "flex",
                justifyContent: "flex-start"
            }}>
                <Avatar image={Logo} />
            </div>
            <StyledTitle size={65}>
                WELCOME TO BUGTRACKER
            </StyledTitle>
            <StyledSubTitle size={27}>
                LOG ALL THE BUGS IN YOUR SOFTWARE
            </StyledSubTitle>
            <ButtonGroup style={{ justifyContent: "space-evenly" }}>
                <StyledButton to="/login">Login</StyledButton>
                <StyledButton to="/registration">Registration</StyledButton>
                </ButtonGroup>
                
            </div>
        </StyledContainer>
    )
}

export default Home;