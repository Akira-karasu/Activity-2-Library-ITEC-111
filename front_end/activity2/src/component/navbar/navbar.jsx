import profile from '../../assets/profile.png';
import ProfileDropdown from '../button/profileDropdown';
import "../navbar/navbar..css"


export default function Navbar({ token, logout }) {
    const user = {
        name: token.username,
        avatar: profile
    };

    return (
        <nav className="navbar">
            <h2 style={{width: "200px"}}>My Library</h2>
            <ProfileDropdown user={user} onLogout={logout} />
        </nav>
    );
}