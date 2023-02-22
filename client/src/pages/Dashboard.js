//Styled-Components
import { colors, StyledFormArea, StyledTitle, StyledSubTitle, Avatar, StyledButton, ButtonGroup } from "../components/styles"
import { StyledContainer } from './../components/styles'

//Images
import Logo from "./../assets/icon.jfif"

//Action Creators
import { LogOut } from './../store/actions'

//React
import { connect } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const Dashboard = ({ firstName, lastName, LogOut }) => {

    const navigate = useNavigate();

    return (
        <div>
            <StyledContainer>
                <div style={{
                    width: "100%", position: "absolute", top: 0, left: 0, backgroundColor: "transparent",
                    padding: "15px",
                    display: "flex",
                    justifyContent: "flex-start"
                }}>
                    <Avatar image={Logo} />
                </div>
                <StyledFormArea bg={colors.dark2}>
                    <StyledTitle size={65}>
                        Welcome, {`${firstName} ${lastName}`}
                    </StyledTitle>
                    <StyledSubTitle size={27}>
                        LOG ALL THE BUGS IN YOUR SOFTWARE
                    </StyledSubTitle>
                    <ButtonGroup>
                        <StyledButton onClick={() => LogOut(navigate)}>Logout</StyledButton>
                        <StyledButton to="/bug/frontpage">Bugs</StyledButton>
                    </ButtonGroup>
                </StyledFormArea>
            </StyledContainer>
        </div>
    )
}

const mapStateToProps = (state) => {
    return { firstName: state.authReducer.firstName, lastName: state.authReducer.lastName };
}

export default connect(mapStateToProps, {LogOut})(Dashboard);